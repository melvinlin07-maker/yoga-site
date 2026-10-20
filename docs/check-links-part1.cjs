const fs = require('fs');
const path = require('path');

const filesToCheck = [
  'beginner-yoga-guide.html',
  'classes.html',
  'index.html',
  'blog.html',
  'resources.html',
  'assessment.html',
  'neck-release.html',
  'reviews.html',
  'about.html',
  'contact.html',
  'videos.html',
  'posture-self-test.html'
];

let brokenCount = 0;

filesToCheck.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const hrefs = content.match(/href=["']([^"'#]+)["']/g) || [];
  hrefs.forEach(h => {
    const raw = h.replace(/href=["']/, '').replace(/["']$/, '').split('?')[0];
    if (raw.startsWith('http://') || raw.startsWith('https://') || raw.startsWith('tel:') || raw.startsWith('mailto:') || raw.startsWith('javascript:')) return;
    if (!fs.existsSync(raw)) {
      console.error(`Broken link in ${file}: ${raw}`);
      brokenCount++;
    }
  });
});

console.log('Total checked files:', filesToCheck.length);
console.log('Broken internal links count:', brokenCount);
