const { chromium } = require('C:/Users/user888/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(rootDir, decodeURIComponent(reqPath));

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    let contentType = 'text/html; charset=utf-8';
    if (filePath.endsWith('.css')) contentType = 'text/css';
    if (filePath.endsWith('.js')) contentType = 'application/javascript';
    if (filePath.endsWith('.json') || filePath.endsWith('.webmanifest')) contentType = 'application/json';
    if (filePath.endsWith('.png')) contentType = 'image/png';
    if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) contentType = 'image/jpeg';
    if (filePath.endsWith('.svg')) contentType = 'image/svg+xml';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(fs.readFileSync(filePath));
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(8085, async () => {
  console.log('Test server running on http://127.0.0.1:8085');
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });

  try {
    // 1. Desktop Test for body-tension-map.html
    const context = await browser.newContext({ permissions: ['clipboard-read', 'clipboard-write'] });
    const page = await context.newPage({ viewport: { width: 1280, height: 950 } });
    await page.goto('http://127.0.0.1:8085/body-tension-map.html', { waitUntil: 'networkidle' });

    console.log('Testing hotspot clicks...');
    await page.click('button[data-part="lowerback"]');
    await page.waitForTimeout(200);

    // Click generate button
    console.log('Clicking generate button...');
    await page.click('#generateBtn');
    await page.waitForTimeout(500);

    const isVisible = await page.$eval('#resultCard', el => el.classList.contains('is-visible'));
    const titleText = await page.$eval('#resTitle', el => el.textContent);
    console.log('Prescription is-visible:', isVisible, '| Title:', titleText);

    // Click share button to trigger toast
    await page.click('.js-share-btn');
    await page.waitForTimeout(400);

    const toastVisible = await page.$eval('#siteToast', el => el.classList.contains('is-show'));
    const toastText = await page.$eval('#siteToast', el => el.textContent);
    console.log('Toast visible:', toastVisible, '| Text:', toastText);

    // Screenshot desktop prescription
    await page.screenshot({ path: 'docs/body-map-desktop.png', fullPage: false });
    console.log('Saved docs/body-map-desktop.png');

    // 2. Mobile View Test
    const mobileContext = await browser.newContext({
      viewport: { width: 375, height: 812 },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('http://127.0.0.1:8085/body-tension-map.html', { waitUntil: 'networkidle' });

    // Click hips chip
    await mobilePage.click('button.part-chip[data-part="hips"]');
    await mobilePage.click('#generateBtn');
    await mobilePage.waitForTimeout(500);

    await mobilePage.screenshot({ path: 'docs/body-map-mobile.png', fullPage: false });
    console.log('Saved docs/body-map-mobile.png');

    // 3. Test beginner-yoga-guide share button
    await page.goto('http://127.0.0.1:8085/beginner-yoga-guide.html', { waitUntil: 'networkidle' });
    await page.click('button.share-btn-pill');
    await page.waitForTimeout(400);

    const guideToastText = await page.$eval('#siteToast', el => el.textContent);
    console.log('Guide share toast:', guideToastText);
    await page.screenshot({ path: 'docs/beginner-guide-share-desktop.png', fullPage: false });
    console.log('Saved docs/beginner-guide-share-desktop.png');

    console.log('✅ Part 2 Playwright verification completed successfully!');
  } catch (err) {
    console.error('Playwright verification failed:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
    server.close();
  }
});
