const { chromium } = require('C:/Users/user888/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// 1. JSON-LD Schema Validation
console.log('=== Checking JSON-LD Schemas ===');
const pagesToCheck = [
  'index.html',
  'classes.html',
  'beginner-yoga-guide.html',
  'neck-release.html',
  'assessment.html'
];

let allSchemasValid = true;
pagesToCheck.forEach(page => {
  const content = fs.readFileSync(path.join(rootDir, page), 'utf8');
  const scripts = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi) || [];
  console.log(`Checking ${page} (${scripts.length} JSON-LD scripts)...`);
  scripts.forEach((s, idx) => {
    const raw = s.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '').trim();
    try {
      const parsed = JSON.parse(raw);
      let types = [];
      if (parsed['@type']) types.push(parsed['@type']);
      if (parsed['@graph']) types = parsed['@graph'].map(g => g['@type']);
      console.log(`  Script #${idx + 1}: Valid JSON. Types found:`, types.join(', '));
    } catch (err) {
      console.error(`  ERROR in ${page} Script #${idx + 1}:`, err.message);
      allSchemasValid = false;
    }
  });
});

// 2. Open Graph Dimensions Check
console.log('\n=== Checking Open Graph 1200x630 Meta Tags ===');
const ogPages = [
  'index.html',
  'classes.html',
  'assessment.html',
  'neck-release.html',
  'reviews.html',
  'blog.html',
  'about.html',
  'contact.html',
  'videos.html',
  'posture-self-test.html',
  'beginner-yoga-guide.html'
];

ogPages.forEach(p => {
  const c = fs.readFileSync(path.join(rootDir, p), 'utf8');
  const mImg = c.match(/property=["']og:image["']\s+content=["']([^"']+)["']/i);
  const mW = c.match(/property=["']og:image:width["']\s+content=["']([^"']+)["']/i);
  const mH = c.match(/property=["']og:image:height["']\s+content=["']([^"']+)["']/i);
  const mTw = c.match(/name=["']twitter:card["']\s+content=["']([^"']+)["']/i);
  const img = mImg ? mImg[1] : 'MISSING';
  const w = mW ? mW[1] : 'MISSING';
  const h = mH ? mH[1] : 'MISSING';
  const tw = mTw ? mTw[1] : 'MISSING';
  console.log(`${p.padEnd(25)} Image: ${img.replace('https://sinyanyoga.com.tw/', '')} | ${w}x${h} | tw: ${tw}`);
});

// 3. Playwright Verification
const server = http.createServer((req, res) => {
  let p = req.url.split('?')[0];
  if (p === '/') p = '/index.html';
  const filePath = path.join(rootDir, p.replace(/^\//, ''));
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    const ct = ext === '.html' ? 'text/html; charset=utf-8' :
               ext === '.css' ? 'text/css' :
               ext === '.js' ? 'text/javascript' :
               ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' :
               ext === '.png' ? 'image/png' :
               ext === '.svg' ? 'image/svg+xml' : 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': ct });
    res.end(fs.readFileSync(filePath));
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(8785, async () => {
  try {
    const browser = await chromium.launch({ headless: true, channel: 'chrome' });
    const page = await browser.newPage();

    console.log('\n=== Playwright Browser Tests ===');

    // Test beginner-yoga-guide.html (Desktop)
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('http://127.0.0.1:8785/beginner-yoga-guide.html', { waitUntil: 'domcontentloaded' });
    const guideDesktopOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    await page.screenshot({ path: 'docs/beginner-guide-desktop.png', fullPage: true });

    // Test beginner-yoga-guide.html (Mobile)
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('http://127.0.0.1:8785/beginner-yoga-guide.html', { waitUntil: 'domcontentloaded' });
    const guideMobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    await page.screenshot({ path: 'docs/beginner-guide-mobile.png' });

    // Test classes.html FAQ accordion
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('http://127.0.0.1:8785/classes.html', { waitUntil: 'domcontentloaded' });
    const classesDesktopOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    
    // Expand first FAQ
    const firstDetails = page.locator('#faq details').first();
    await firstDetails.click();
    const isFirstOpen = await firstDetails.evaluate(el => el.open);
    
    // Screenshot FAQ section
    const faqSec = page.locator('#faq');
    if (await faqSec.count() > 0) {
      await faqSec.screenshot({ path: 'docs/classes-faq-desktop.png' });
    }

    console.log(JSON.stringify({
      guideDesktopOverflow,
      guideMobileOverflow,
      classesDesktopOverflow,
      isFirstFaqOpen: isFirstOpen,
      allSchemasValid
    }, null, 2));

    await browser.close();
  } catch (err) {
    console.error('Playwright error:', err);
  } finally {
    server.close();
  }
});
