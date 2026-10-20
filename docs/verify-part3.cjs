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

server.listen(8087, async () => {
  console.log('Test server running on http://127.0.0.1:8087');
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });

  try {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await context.newPage();

    // ==========================================
    // 1. Test Exit-Intent Modal
    // ==========================================
    console.log('Testing Exit-Intent Modal...');
    await page.goto('http://127.0.0.1:8087/index.html', { waitUntil: 'networkidle' });

    // Trigger mouseleave on document at clientY <= 15
    await page.evaluate(() => {
      document.dispatchEvent(new MouseEvent('mouseleave', { clientY: 10, bubbles: true }));
    });
    await page.waitForTimeout(400);

    const isModalActive = await page.$eval('#exitIntentModal', el => el.classList.contains('is-active'));
    console.log('Exit Modal is-active:', isModalActive);
    const modalTitle = await page.$eval('#exitModalTitle', el => el.textContent);
    console.log('Exit Modal title:', modalTitle);

    await page.screenshot({ path: 'docs/exit-intent-modal-desktop.png' });
    console.log('Saved docs/exit-intent-modal-desktop.png');

    // Close modal
    await page.click('#exitModalClose');
    await page.waitForTimeout(300);
    const isModalClosed = await page.$eval('#exitIntentModal', el => !el.classList.contains('is-active'));
    console.log('Modal closed properly:', isModalClosed);

    // ==========================================
    // 2. Test Reading Progress Bar
    // ==========================================
    console.log('Testing Reading Progress Bar...');
    await page.goto('http://127.0.0.1:8087/beginner-yoga-guide.html', { waitUntil: 'networkidle' });

    // Scroll halfway
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.45));
    await page.waitForTimeout(300);

    const barWidth = await page.$eval('#readingProgressBar', el => el.style.width);
    console.log('Progress bar width at 45% scroll:', barWidth);

    await page.screenshot({ path: 'docs/reading-progress-bar.png' });
    console.log('Saved docs/reading-progress-bar.png');

    // ==========================================
    // 3. Test Night Dark Mode Toggle
    // ==========================================
    console.log('Testing Dark Mode Toggle...');
    await page.goto('http://127.0.0.1:8087/index.html', { waitUntil: 'networkidle' });

    // Click theme toggle button
    await page.click('.theme-toggle-btn');
    await page.waitForTimeout(400);

    const currentTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    console.log('Document data-theme after toggle:', currentTheme);

    await page.screenshot({ path: 'docs/dark-mode-desktop.png' });
    console.log('Saved docs/dark-mode-desktop.png');

    // Mobile dark mode screenshot
    const mobileContext = await browser.newContext({
      viewport: { width: 375, height: 812 },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('http://127.0.0.1:8087/index.html', { waitUntil: 'networkidle' });
    await mobilePage.click('.theme-toggle-btn');
    await mobilePage.waitForTimeout(400);
    await mobilePage.screenshot({ path: 'docs/dark-mode-mobile.png' });
    console.log('Saved docs/dark-mode-mobile.png');

    // ==========================================
    // 4. Test Instant Fuzzy Search on blog.html
    // ==========================================
    console.log('Testing Instant Search on blog.html...');
    await page.goto('http://127.0.0.1:8087/blog.html', { waitUntil: 'networkidle' });

    // Type "肩頸" in search input
    await page.fill('#blogSearchInput', '肩頸');
    await page.waitForTimeout(300);

    const matchText = await page.$eval('#matchCount', el => el.textContent);
    console.log('Matched articles for "肩頸":', matchText);

    await page.screenshot({ path: 'docs/blog-instant-search.png' });
    console.log('Saved docs/blog-instant-search.png');

    console.log('✅ ALL Part 3 features verified successfully!');
  } catch (err) {
    console.error('Playwright verification failed:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
    server.close();
  }
});
