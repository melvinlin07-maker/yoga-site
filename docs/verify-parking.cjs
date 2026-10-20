const { chromium } = require('C:/Users/user888/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const server = http.createServer((req, res) => {
  let p = req.url.split('?')[0];
  if (p === '/') p = '/contact.html';
  const filePath = path.join(rootDir, p.replace(/^\//, ''));
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    const ct = ext === '.html' ? 'text/html; charset=utf-8' : ext === '.css' ? 'text/css' : ext === '.js' ? 'text/javascript' : ext === '.jpg' ? 'image/jpeg' : 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': ct });
    res.end(fs.readFileSync(filePath));
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(8783, async () => {
  try {
    const browser = await chromium.launch({ headless: true, channel: 'chrome' });
    const page = await browser.newPage();

    // 1. Mobile check contact.html
    await page.setViewportSize({ width: 375, height: 900 });
    await page.goto('http://127.0.0.1:8783/contact.html', { waitUntil: 'domcontentloaded' });
    const mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    const links = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.parking-card-link')).map(a => ({
        href: a.href,
        text: a.innerText.trim().replace(/\n+/g, ' ')
      }));
    });

    await page.screenshot({ path: 'docs/contact-parking-mobile.png', fullPage: true });

    // 2. Desktop check contact.html
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('http://127.0.0.1:8783/contact.html', { waitUntil: 'domcontentloaded' });
    const desktopOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    
    // Screenshot specific parking section on desktop
    const infoCard = page.locator('div:has(> p:has-text("捷運指引"))').first();
    if (await infoCard.count() > 0) {
      await infoCard.screenshot({ path: 'docs/contact-parking-desktop-card.png' });
    }
    await page.screenshot({ path: 'docs/contact-parking-desktop.png', fullPage: true });

    // 3. Index check
    await page.goto('http://127.0.0.1:8783/index.html', { waitUntil: 'domcontentloaded' });
    const indexPillText = await page.locator('.loc-transit-pills').innerText();

    console.log(JSON.stringify({
      mobileOverflow,
      desktopOverflow,
      links,
      indexPillText
    }, null, 2));

    await browser.close();
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    server.close();
  }
});
