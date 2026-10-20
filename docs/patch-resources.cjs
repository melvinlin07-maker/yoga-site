const fs = require('fs');

let resources = fs.readFileSync('resources.html', 'utf8');

const target = '<section class="resource-archive">';
const banner = `<section class="section" style="padding-top:0"><div class="wrap">
  <div style="background:#fff;border:1px solid var(--line-lt);border-left:4px solid var(--pink);border-radius:14px;padding:22px 24px;box-shadow:0 6px 20px rgba(67,34,47,0.06);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px">
    <div style="max-width:680px">
      <span style="font-size:12px;font-weight:700;color:var(--pink);background:rgba(217,143,163,.15);padding:3px 10px;border-radius:12px;display:inline-block;margin-bottom:6px">線上免費圖解教材 · 零基礎友善</span>
      <h3 style="font-size:19px;margin:0 0 6px;color:var(--ink)">🧘‍♀️ 新手居家瑜珈 3 步驟入門流程（每天 10 分鐘）</h3>
      <p style="font-size:13.5px;color:var(--muted);margin:0;line-height:1.6">零基礎、身體僵硬友善！從呼吸調息、溫和貓牛式活化脊椎，到骨盆釋壓大休息完整教學步驟。</p>
    </div>
    <a href="beginner-yoga-guide.html" class="btn" style="background:var(--pink);color:#fff;font-weight:700;padding:10px 22px;border-radius:24px;white-space:nowrap">線上立即閱讀 →</a>
  </div>
</div></section>\n\n`;

if (!resources.includes('beginner-yoga-guide.html')) {
  resources = resources.replace(target, banner + target);
  fs.writeFileSync('resources.html', resources, 'utf8');
  console.log('✓ Linked beginner-yoga-guide.html in resources.html');
}
