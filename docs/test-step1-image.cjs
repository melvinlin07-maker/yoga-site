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

server.listen(8786, async () => {
  try {
    const browser = await chromium.launch({ headless: true, channel: 'chrome' });
    const page = await browser.newPage();

    // 1. Desktop check Step 1
    await page.setViewportSize({ width: 1280, height: 1000 });
    await page.goto('http://127.0.0.1:8786/beginner-yoga-guide.html', { waitUntil: 'domcontentloaded' });
    const step1 = page.locator('#step-1');
    await step1.screenshot({ path: 'docs/step1-new-infographic-desktop.png' });

    // 2. Mobile check Step 1
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('http://127.0.0.1:8786/beginner-yoga-guide.html', { waitUntil: 'domcontentloaded' });
    const step1Mobile = page.locator('#step-1');
    await step1Mobile.screenshot({ path: 'docs/step1-new-infographic-mobile.png' });

    console.log('Successfully captured Step 1 new infographic screenshots!');
    await browser.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    server.close();
  }
});
