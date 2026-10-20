const fs = require('fs');

// --- 1. Update contact.html ---
let contact = fs.readFileSync('contact.html', 'utf8');

const parkingStyle = `
<style>
.parking-card-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 13px;
  background: #ffffff;
  border: 1px solid var(--line-lt);
  border-radius: 8px;
  color: var(--ink);
  text-decoration: none;
  font-size: 13.5px;
  transition: all .2s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.03);
}
.parking-card-link:hover {
  border-color: var(--pink);
  background: #fff9fa;
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(217,143,163,0.18);
}
.parking-card-link .nav-cta-arrow {
  color: var(--pink);
  font-weight: 700;
  font-size: 12px;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 2px;
}
</style>
</head>`;

if (!contact.includes('.parking-card-link')) {
  contact = contact.replace('</head>', parkingStyle);
}

const oldParkingRegex = /<p[^>]*><b>🚗 汽車停車：<\/b>[\s\S]*?<\/p>/;
const newParkingHtml = `<div style="margin:0 0 12px;padding:12px 14px;background:var(--cream-lt);border-radius:10px;border:1px solid rgba(217,143,163,.28)">
        <div style="font-weight:700;color:var(--ink);margin-bottom:8px">🚗 汽車停車（周邊推薦 3 大收費停車場，點擊直接導航）：</div>
        <div style="display:flex;flex-direction:column;gap:7px">
          <a class="parking-card-link" href="https://maps.app.goo.gl/GpE624Z3RZLq7hyq6" target="_blank" rel="noopener noreferrer">
            <span>🅿️ <b>新莊重清 停車場</b></span>
            <span class="nav-cta-arrow">開啟導航 ↗</span>
          </a>
          <a class="parking-card-link" href="https://maps.app.goo.gl/9rJgcesZi5rNQAKa8" target="_blank" rel="noopener noreferrer">
            <span>🅿️ <b>uTagGo★日月亭微笑停車場</b></span>
            <span class="nav-cta-arrow">開啟導航 ↗</span>
          </a>
          <a class="parking-card-link" href="https://reurl.cc/3yAX8R" target="_blank" rel="noopener noreferrer">
            <span>🅿️ <b>新中街停車場</b><small style="color:var(--muted);margin-left:4px">（左營區新中街 115 號）</small></span>
            <span class="nav-cta-arrow">開啟導航 ↗</span>
          </a>
        </div>
        <p style="margin:8px 0 0;color:var(--muted);font-size:12px">＊周邊新庄仔路亦有路邊公有收費停車格可供停放。</p>
      </div>`;

if (oldParkingRegex.test(contact)) {
  contact = contact.replace(oldParkingRegex, newParkingHtml);
  fs.writeFileSync('contact.html', contact, 'utf8');
  console.log('Successfully updated contact.html with 3 parking lots!');
} else {
  console.error('Could not find old parking text in contact.html');
}

// --- 2. Update index.html ---
let index = fs.readFileSync('index.html', 'utf8');
if (index.includes('🚗 漢神巨蛋/立文路好停車')) {
  index = index.replace('🚗 漢神巨蛋/立文路好停車', '🚗 周邊 3 處收費停車場好停');
  fs.writeFileSync('index.html', index, 'utf8');
  console.log('Successfully updated index.html parking pill!');
} else {
  console.log('index.html parking pill already updated or not found');
}
