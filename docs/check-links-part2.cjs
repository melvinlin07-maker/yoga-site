const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

console.log(`Checking internal links in ${htmlFiles.length} HTML files...`);

let totalLinks = 0;
let brokenLinks = [];

htmlFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // match href="..." and src="..."
  const hrefMatches = content.match(/href=["']([^"'#:]+)(#[^"']*)?["']/g) || [];
  const srcMatches = content.match(/src=["']([^"'#:]+)["']/g) || [];

  [...hrefMatches, ...srcMatches].forEach(m => {
    let target = m.replace(/^(href|src)=["']/, '').replace(/["']$/, '');
    if (target.includes('#')) target = target.split('#')[0];
    if (target.includes('?')) target = target.split('?')[0];

    // ignore mailto, tel, http, javascript, empty
    if (!target || target.startsWith('mailto:') || target.startsWith('tel:') || target.startsWith('http') || target.startsWith('javascript:')) {
      return;
    }

    totalLinks++;
    const resolvedPath = path.resolve(rootDir, target);
    if (!fs.existsSync(resolvedPath)) {
      brokenLinks.push({ file, target });
    }
  });
});

console.log(`Verified ${totalLinks} internal link references.`);
if (brokenLinks.length > 0) {
  console.error(`Found ${brokenLinks.length} broken links:`);
  brokenLinks.forEach(b => console.error(`  [${b.file}] -> ${b.target}`));
  process.exit(1);
} else {
  console.log('✅ 100% internal links valid! 0 broken links.');
}
