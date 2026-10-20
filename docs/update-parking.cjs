const fs = require('fs');

let contact = fs.readFileSync('contact.html', 'utf8');

// Update CSS for parking-card-link
const parkingStyleRegex = /<style>[\s\S]*?\.parking-card-link[\s\S]*?<\/style>/;
const newParkingStyle = `<style>
.parking-card-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
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
.parking-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  text-align: left;
}
.parking-name {
  font-size: 13.5px;
  color: var(--ink);
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 5px;
}
.parking-addr {
  font-size: 12px;
  color: #735c63;
  margin-left: 20px;
}
.parking-card-link .nav-cta-arrow {
  color: var(--pink);
  font-weight: 700;
  font-size: 12px;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 5px 9px;
  background: rgba(217,143,163,.12);
  border-radius: 6px;
  flex-shrink: 0;
  margin-left: 8px;
  transition: all .2s ease;
}
.parking-card-link:hover .nav-cta-arrow {
  background: var(--pink);
  color: #fff;
}
</style>`;

if (parkingStyleRegex.test(contact)) {
  contact = contact.replace(parkingStyleRegex, newParkingStyle);
} else {
  contact = contact.replace('</head>', newParkingStyle + '\n</head>');
}

// Update the parking box in contact.html
const oldBoxRegex = /<div style="margin:0 0 12px;padding:12px 14px;background:var\(--cream-lt\)[\s\S]*?<\/div>[\s]*<p style="margin:8px 0 0;color:var\(--muted\);font-size:12px">＊周邊新庄仔路亦有路邊公有收費停車格可供停放。<\/p>[\s]*<\/div>/;

const newBoxHtml = `<div style="margin:0 0 12px;padding:14px;background:var(--cream-lt);border-radius:10px;border:1px solid rgba(217,143,163,.3)">
        <div style="font-weight:700;color:var(--ink);margin-bottom:10px;font-size:14px">🚗 汽車停車（周邊 3 處收費停車場與詳細地址，點擊直接導航）：</div>
        <div style="display:flex;flex-direction:column;gap:8px">
          <!-- 停車場 1 -->
          <a class="parking-card-link" href="https://maps.app.goo.gl/GpE624Z3RZLq7hyq6" target="_blank" rel="noopener noreferrer">
            <div class="parking-info">
              <span class="parking-name">🅿️ <b>新莊重清 停車場</b></span>
              <span class="parking-addr">📍 高雄市左營區新庄仔路 385 號（近重清路口）</span>
            </div>
            <span class="nav-cta-arrow">開啟導航 ↗</span>
          </a>

          <!-- 停車場 2 -->
          <a class="parking-card-link" href="https://maps.app.goo.gl/9rJgcesZi5rNQAKa8" target="_blank" rel="noopener noreferrer">
            <div class="parking-info">
              <span class="parking-name">🅿️ <b>uTagGo★日月亭微笑停車場</b></span>
              <span class="parking-addr">📍 高雄市左營區自由三路 161 號（微笑公園旁）</span>
            </div>
            <span class="nav-cta-arrow">開啟導航 ↗</span>
          </a>

          <!-- 停車場 3 -->
          <a class="parking-card-link" href="https://reurl.cc/3yAX8R" target="_blank" rel="noopener noreferrer">
            <div class="parking-info">
              <span class="parking-name">🅿️ <b>新中街停車場（Parc!Here）</b></span>
              <span class="parking-addr">📍 813 高雄市左營區新中里新中街 115 號</span>
            </div>
            <span class="nav-cta-arrow">開啟導航 ↗</span>
          </a>
        </div>
        <p style="margin:10px 0 0;color:var(--muted);font-size:12px;line-height:1.5">＊周邊新庄仔路沿線亦設有路邊公有計時收費停車格可供停放。</p>
      </div>`;

if (oldBoxRegex.test(contact)) {
  contact = contact.replace(oldBoxRegex, newBoxHtml);
  fs.writeFileSync('contact.html', contact, 'utf8');
  console.log('Successfully updated contact.html with full parking names and addresses!');
} else {
  console.error('Could not match oldBoxRegex in contact.html');
}
