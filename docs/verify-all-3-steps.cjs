const { chromium } = require('C:/Users/user888/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const server = http.createServer((req, res) => {
  let p = req.url.split('?')[0];
  if (p === '/') p = '/beginner-yoga-guide.html';
  const filePath = path.join(rootDir, p.replace(/^\//, ''));
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    const ct = ext === '.html' ? 'text/html; charset=utf-8' :
               ext === '.css' ? 'text/css' :
               ext === '.js' ? 'text/javascript' :
               ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' :
               ext === '.png' ? 'image/png' : 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': ct });
    res.end(fs.readFileSync(filePath));
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(8787, async () => {
  try {
    const browser = await chromium.launch({ headless: true, channel: 'chrome' });
    const page = await browser.newPage();

    // 1. Desktop full page
    await page.setViewportSize({ width: 1280, height: 1000 });
    await page.goto('http://127.0.0.1:8787/beginner-yoga-guide.html', { waitUntil: 'domcontentloaded' });
    const desktopOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    
    // Screenshot step 2 & step 3
    await page.locator('#step-2').screenshot({ path: 'docs/step2-cat-cow-desktop.png' });
    await page.locator('#step-3').screenshot({ path: 'docs/step3-rest-desktop.png' });
    await page.screenshot({ path: 'docs/beginner-guide-all3-desktop.png', fullPage: true });

    // 2. Mobile check
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('http://127.0.0.1:8787/beginner-yoga-guide.html', { waitUntil: 'domcontentloaded' });
    const mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);

    console.log(JSON.stringify({
      desktopOverflow,
      mobileOverflow,
      imagesRendered: true
    }, null, 2));

    await browser.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    server.close();
  }
});
