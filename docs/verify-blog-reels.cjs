const { chromium } = require('C:/Users/user888/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const server = http.createServer((req, res) => {
  let p = req.url.split('?')[0];
  if (p === '/') p = '/blog.html';
  const filePath = path.join(rootDir, p.replace(/^\//, ''));
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    const ct = ext === '.html' ? 'text/html; charset=utf-8' : ext === '.css' ? 'text/css' : ext === '.js' ? 'text/javascript' : ext === '.jpg' ? 'image/jpeg' : ext === '.mp4' ? 'video/mp4' : 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': ct });
    res.end(fs.readFileSync(filePath));
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(8782, async () => {
  try {
    const browser = await chromium.launch({ headless: true, channel: 'chrome' });
    const page = await browser.newPage();

    // Mobile check
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('http://127.0.0.1:8782/blog.html', { waitUntil: 'domcontentloaded' });
    const mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    const cardCount = await page.locator('.blog-videos-wrap .h-video-card').count();

    // Test clicking card 1
    await page.locator('.blog-videos-wrap .h-video-card').first().click();
    const isModalOpen = await page.evaluate(() => document.getElementById('videoModal').classList.contains('is-open'));
    await page.screenshot({ path: 'docs/blog-reels-mobile-modal.png' });
    await page.locator('#vmClose').click();

    await page.screenshot({ path: 'docs/blog-reels-mobile.png' });

    // Desktop check
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('http://127.0.0.1:8782/blog.html', { waitUntil: 'domcontentloaded' });
    const desktopOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    const cardDims = await page.evaluate(() => {
      const wrap = document.querySelector('.blog-videos-wrap');
      const grid = document.querySelector('.blog-videos-wrap .home-video-grid');
      const cards = Array.from(document.querySelectorAll('.blog-videos-wrap .h-video-card'));
      return {
        wrapWidth: wrap ? wrap.getBoundingClientRect().width : null,
        gridWidth: grid ? grid.getBoundingClientRect().width : null,
        cardWidths: cards.map(c => Math.round(c.getBoundingClientRect().width)),
        cardHeights: cards.map(c => Math.round(c.getBoundingClientRect().height))
      };
    });
    await page.screenshot({ path: 'docs/blog-reels-desktop.png' });

    console.log(JSON.stringify({ mobileOverflow, desktopOverflow, cardCount, isModalOpen, cardDims }, null, 2));

    await browser.close();
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    server.close();
  }
});
