const fs = require('fs');
const path = require('path');

console.log('=== Starting Part 1: SEO & Social Optimization ===');

// ==========================================
// 1. CREATE beginner-yoga-guide.html (HowTo Schema)
// ==========================================
const beginnerHtml = `<!doctype html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>新手居家瑜珈 3 步驟入門指南｜每天 10 分鐘溫和呼吸與脊椎伸展｜鑫彥瑜珈</title>
<meta name="description" content="給零基礎、身體僵硬新手的居家瑜珈 3 步驟指南：腹式呼吸調息、晨間溫和貓牛式活化脊椎、關節保護與放鬆大休息。每天 10 分鐘，在客廳就能安全啟動身心修復。">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&family=Noto+Serif+TC:wght@600;700;900&display=swap">
<link rel="stylesheet" href="theme.css?v=20261020-part1">
<link rel="icon" type="image/svg+xml" href="favicon.svg">

<!-- Open Graph / Social Meta -->
<meta property="og:type" content="article">
<meta property="og:site_name" content="鑫彥瑜珈">
<meta property="og:locale" content="zh_TW">
<meta property="og:title" content="新手居家瑜珈 3 步驟入門指南｜每天 10 分鐘溫和呼吸與伸展">
<meta property="og:description" content="零基礎、身體僵硬也能練！3 步驟居家流程：呼吸調息、溫和貓牛式、關節保護與大休息，在客廳安全啟動修復。">
<meta property="og:url" content="https://sinyanyoga.com.tw/beginner-yoga-guide.html">
<meta property="og:image" content="https://sinyanyoga.com.tw/assets/og/og-beginner.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:alt" content="新手居家瑜珈 3 步驟入門教學示範">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://sinyanyoga.com.tw/assets/og/og-beginner.jpg">
<link rel="canonical" href="https://sinyanyoga.com.tw/beginner-yoga-guide.html">

<!-- Schema.org HowTo + BreadcrumbList -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://sinyanyoga.com.tw/beginner-yoga-guide.html#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "首頁",
          "item": "https://sinyanyoga.com.tw/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "體態知識庫",
          "item": "https://sinyanyoga.com.tw/blog.html"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "新手居家瑜珈 3 步驟入門指南",
          "item": "https://sinyanyoga.com.tw/beginner-yoga-guide.html"
        }
      ]
    },
    {
      "@type": "HowTo",
      "@id": "https://sinyanyoga.com.tw/beginner-yoga-guide.html#howto",
      "name": "新手居家瑜珈 3 步驟入門流程：每天 10 分鐘身心修復",
      "description": "專為身體僵硬、零基礎新手設計的居家溫和瑜伽流程，透過腹式呼吸、溫和貓牛式脊椎伸展與關節大休息，安全放鬆不代償。",
      "totalTime": "PT10M",
      "image": "https://sinyanyoga.com.tw/assets/og/og-beginner.jpg",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "TWD",
        "value": "0"
      },
      "tool": [
        {
          "@type": "HowToTool",
          "name": "防滑瑜珈墊（或平整地毯）"
        },
        {
          "@type": "HowToTool",
          "name": "舒適透氣運動服"
        },
        {
          "@type": "HowToTool",
          "name": "瑜伽磚或厚毛巾（輔助支撐）"
        }
      ],
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "第 1 步：腹式調息與自律神經降噪（2～3 分鐘）",
          "text": "採金剛坐姿或仰臥平躺，一手放在胸口、一手放在肚臍上方。閉上雙眼，用鼻子深吸氣 4 秒感受腹部自然隆起，接著緩慢吐氣 6 秒感受腹部微收、肩膀完全下沉。重複 10～12 次呼吸循環，喚醒副交感神經，讓緊繃的肩頸與大腦降溫。",
          "url": "https://sinyanyoga.com.tw/beginner-yoga-guide.html#step-1",
          "image": "https://sinyanyoga.com.tw/assets/gentle-seated-calm-stretch.png"
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "第 2 步：晨間溫和貓牛式脊椎活化（4～5 分鐘）",
          "text": "進入四足跪姿，雙手在肩膀正下方、雙膝在臀部正下方。吐氣時從尾椎開始一節一節往上圓背，低頭看向肚臍，延展整條後背筋膜；吸氣時尾椎微翹、胸椎向前延展展開鎖骨，保持頸椎自然延伸不仰頭。流暢配合呼吸重複 8～10 組，喚醒深層脊椎活動度。",
          "url": "https://sinyanyoga.com.tw/beginner-yoga-guide.html#step-2",
          "image": "https://sinyanyoga.com.tw/assets/chest-opening-evening-stretch.png"
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "第 3 步：關節保護、骨盆釋壓與大休息（3～4 分鐘）",
          "text": "翻轉為仰臥平躺，雙手抱住雙膝輕貼腹部，左右溫柔晃動 30 秒按摩薦椎；接著雙手打開呈 T 字形，雙膝併攏緩緩倒向右側進行溫和扭轉，停留 5 次呼吸後換邊。最後雙腿伸直與肩同寬、掌心朝上進入大休息（Savasana），靜靜感受全身重力交付大地。",
          "url": "https://sinyanyoga.com.tw/beginner-yoga-guide.html#step-3",
          "image": "https://sinyanyoga.com.tw/assets/cozy-recovery-rest.png"
        }
      ]
    }
  ]
}
</script>
<style>
.howto-card {
  background: #ffffff;
  border: 1px solid var(--line-lt);
  border-radius: 16px;
  padding: 28px 24px;
  margin-bottom: 28px;
  box-shadow: 0 6px 22px rgba(67,34,47,0.06);
  transition: transform .25s ease, box-shadow .25s ease;
}
.howto-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(67,34,47,0.1);
}
.howto-badge {
  display: inline-block;
  background: var(--pink);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 12px;
}
.howto-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 13.5px;
  color: var(--muted);
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.howto-meta span {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}
.howto-img-wrap {
  border-radius: 12px;
  overflow: hidden;
  margin: 16px 0;
  border: 1px solid var(--line-lt);
  background: #fdfaf8;
  max-height: 380px;
}
.howto-img-wrap img {
  width: 100%;
  height: 100%;
  max-height: 380px;
  object-fit: cover;
  display: block;
}
.howto-tips {
  background: var(--cream-lt);
  border-left: 4px solid var(--pink);
  padding: 12px 16px;
  border-radius: 0 8px 8px 0;
  font-size: 13.5px;
  line-height: 1.6;
  margin-top: 14px;
  color: #553c43;
}
</style>
</head>
<body data-line-message="你好，我看了新手居家瑜珈 3 步驟指南，想預約首次 NT$299 AI 體態檢測！">

<nav class="nav"><div class="wrap">
  <a class="brand" href="index.html">鑫彥瑜珈<small>壁繩瑜伽 · 體態調整</small></a>
  <ul class="menu" id="menu">
    <li><a href="index.html">首頁</a></li>
    <li><a href="assessment.html">AI 體態檢測</a></li>
    <li><a href="neck-release.html">一對一調整</a></li>
    <li><a href="classes.html">課程方式</a></li>
    <li><a href="reviews.html">學員見證</a></li>
    <li><a href="blog.html">部落格</a></li>
    <li><a href="about.html">關於鑫彥</a></li>
  </ul>
  <a href="posture-self-test.html" class="btn nav-cta-btn js-scan" data-cta-location="nav">免費體態訊號掃描</a>
  <button class="nav-toggle" aria-label="選單" aria-controls="menu" aria-expanded="false" type="button">☰</button>
</div></nav>
<div class="page-back wrap"><a class="page-back-link" href="blog.html" data-back-link>← 回到體態知識庫</a></div>

<section class="section section--cream"><div class="wrap wrap--narrow">
  <div class="sec-head" style="margin-bottom:32px">
    <div class="eyebrow" style="color:var(--pink)">初學者專屬教學 · 搶佔 Google 教學摘要</div>
    <h1 style="font-size:clamp(24px,3.2vw,36px)">新手居家瑜珈 3 步驟入門指南</h1>
    <p style="font-size:16px;line-height:1.75;max-width:680px;margin:0 auto">身體僵硬、零基礎也可以在家開始！不追求高難度凹折，每天只要 10 分鐘，循序漸進喚醒深層自律神經與筋膜彈性。</p>
    <div class="howto-meta" style="justify-content:center;margin-top:14px">
      <span>⏱️ 總時間：約 10 分鐘</span>
      <span>🧘 難易度：零基礎友善</span>
      <span>🏡 器具需求：瑜珈墊或平整地墊</span>
    </div>
  </div>

  <!-- 步驟 1 -->
  <article class="howto-card" id="step-1">
    <span class="howto-badge">步驟 1 · 呼吸調息練習</span>
    <h2 style="font-size:20px;margin:0 0 10px;color:var(--ink)">腹式調息與自律神經降噪（2～3 分鐘）</h2>
    <p style="font-size:14.5px;line-height:1.7;color:var(--ink);margin:0 0 12px">
      現代人習慣淺快呼吸，胸鎖乳突肌與斜角肌整天過勞緊繃。在進入任何動作前，先讓呼吸慢下來，是啟動身體放鬆的核心開關。
    </p>
    <div class="howto-img-wrap">
      <img src="assets/gentle-seated-calm-stretch.png" alt="腹式調息與溫和伸展示範" loading="eager" width="800" height="450">
    </div>
    <h3 style="font-size:15px;color:var(--green-dk);margin:14px 0 6px">👉 動作細節要領：</h3>
    <ol style="font-size:14px;line-height:1.75;margin:0 0 12px 20px;padding:0">
      <li>採舒適坐姿（金剛坐或盤腿）或仰臥屈膝平躺，雙肩自然向下沉。</li>
      <li>單手放於胸口、另一手放於肚臍上方，閉上眼睛。</li>
      <li>用鼻子緩慢吸氣 4 秒，感受下腹部像氣球般溫柔隆起，胸口保持平穩不聳肩。</li>
      <li>用嘴唇微微吐氣 6 秒，感受肚臍慢慢向脊椎靠近，將肺部廢氣吐盡。</li>
      <li>連續進行 10～12 次深層循環。</li>
    </ol>
    <div class="howto-tips">
      <b>💡 新手防代償秘訣：</b>吐氣一定要比吸氣長（吐氣 6 秒、吸氣 4 秒），副交感神經才能順利接管，肩膀會自然「啪」一聲鬆下來。
    </div>
  </article>

  <!-- 步驟 2 -->
  <article class="howto-card" id="step-2">
    <span class="howto-badge">步驟 2 · 溫和脊椎活化</span>
    <h2 style="font-size:20px;margin:0 0 10px;color:var(--ink)">晨間溫和貓牛式脊椎流動（4～5 分鐘）</h2>
    <p style="font-size:14.5px;line-height:1.7;color:var(--ink);margin:0 0 12px">
      久坐使胸椎與腰椎失去分節活動度。透過貓牛式溫和帶動脊椎骨逐節延展，既能舒緩下背僵硬，也能消除早起腰部卡卡的沉重感。
    </p>
    <div class="howto-img-wrap">
      <img src="assets/chest-opening-evening-stretch.png" alt="溫和貓牛式開胸伸展" loading="lazy" width="800" height="450">
    </div>
    <h3 style="font-size:15px;color:var(--green-dk);margin:14px 0 6px">👉 動作細節要領：</h3>
    <ol style="font-size:14px;line-height:1.75;margin:0 0 12px 20px;padding:0">
      <li>進入四足跪姿：雙手手腕在肩膀正下方，十指均勻推地；雙膝在骨盆正下方。</li>
      <li><b>【吐氣·貓式】</b>：從骨盆尾椎開始向內收，腹肌微出力，將整條背部向上拱成漂亮的圓弧，頭部自然低垂放鬆看肚臍。</li>
      <li><b>【吸氣·牛式】</b>：尾椎微向天花板打開，腹部微收不塌腰，胸口向前延展穿過兩臂之間，鎖骨打開，視線看斜前方。</li>
      <li>保持手腕不壓迫，隨呼吸節奏流暢轉換 8～10 組。</li>
    </ol>
    <div class="howto-tips">
      <b>💡 新手防代償秘訣：</b>做牛式時千萬不要死命「折腰」，重點是將「胸口往前推開」，保護脆弱的腰椎不被擠壓。
    </div>
  </article>

  <!-- 步驟 3 -->
  <article class="howto-card" id="step-3">
    <span class="howto-badge">步驟 3 · 關節保護與放鬆</span>
    <h2 style="font-size:20px;margin:0 0 10px;color:var(--ink)">骨盆釋壓扭轉與大休息（3～4 分鐘）</h2>
    <p style="font-size:14.5px;line-height:1.7;color:var(--ink);margin:0 0 12px">
      最後階段透過平躺抱膝與溫和側扭轉，釋放腰大肌與骨盆周邊深層筋膜張力，最後在完全不動的大休息中讓大腦重整動作記憶。
    </p>
    <div class="howto-img-wrap">
      <img src="assets/cozy-recovery-rest.png" alt="仰臥骨盆釋壓與大休息修復" loading="lazy" width="800" height="450">
    </div>
    <h3 style="font-size:15px;color:var(--green-dk);margin:14px 0 6px">👉 動作細節要領：</h3>
    <ol style="font-size:14px;line-height:1.75;margin:0 0 12px 20px;padding:0">
      <li>翻轉仰臥平躺，雙膝彎曲抬離地面，雙手環抱雙膝微貼胸腹部。</li>
      <li>左右溫柔輕晃 30 秒，讓地板為薦椎與腰椎兩側豎脊肌做溫和按摩。</li>
      <li>雙手水平展開呈 T 字形，吐氣時雙膝自然倒向右側地板，左肩保持貼地，停留 5 次深長呼吸後換邊。</li>
      <li>雙腿向遠端伸直，雙腳自然外展比骨盆略寬，雙手置於身體兩側、掌心朝上。</li>
      <li>進入大休息（Savasana）：閉上雙眼，全身不施任何力氣，靜止放鬆 2 分鐘。</li>
    </ol>
    <div class="howto-tips">
      <b>💡 新手防代償秘訣：</b>大休息是整堂練習中最精華的步驟，千萬別急著跳過！它能讓剛剛被拉伸的神經突觸建立新的平衡記憶。
    </div>
  </article>

  <!-- 導流預約卡片 -->
  <div style="background:linear-gradient(135deg, rgba(67,34,47,.95), rgba(109,58,76,.95));color:#fff;border-radius:18px;padding:32px 24px;text-align:center;box-shadow:0 14px 36px rgba(67,34,47,.22);margin-top:36px">
    <span style="display:inline-block;padding:3px 12px;background:rgba(224,178,75,.2);color:var(--gold-lt);border-radius:20px;font-size:12.5px;font-weight:700;letter-spacing:1px;margin-bottom:10px">下一步 · 找出你的個人盲點</span>
    <h2 style="font-size:clamp(20px,2.8vw,26px);color:#fff;margin:0 0 10px">練完覺得哪裡卡卡、不確定自己有沒有做對？</h2>
    <p style="color:rgba(255,255,255,.85);font-size:14.5px;max-width:580px;margin:0 auto 20px;line-height:1.65">
      自主練習最怕用錯肌肉、不知不覺代償。來鑫彥瑜珈體驗一次 20 分鐘的專業 AI 體態檢測，精確看懂你的骨盆傾角、肩線與代償盲點！
    </p>
    <div style="display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap">
      <a href="assessment.html" class="btn" style="background:var(--gold);color:#26191f;font-weight:700;padding:12px 24px">了解首次 NT$299 AI 檢測流程 →</a>
      <a href="classes.html" class="btn" style="background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.3);padding:12px 24px">看壁繩瑜伽如何輔助新手 →</a>
    </div>
  </div>
</div></section>

<footer class="site">
  <b>鑫彥瑜珈<span class="fb-sep"> · </span><span class="fb-tag">壁繩瑜伽 × 體態調整</span></b><br>
  高雄市左營區新庄仔路 726 號 3 樓　|　每日 09:00–20:30　|　07-556-7387　|　<a class="js-line" href="#">預約首次 NT$299 AI 體態檢測</a><br>
  <a href="contact.html" class="footer-secondary">交通與聯絡</a> · <a href="resources.html" class="footer-secondary">免費資源</a> · <a href="rental.html" class="footer-secondary">場地出租・老師合作</a><br>
  <small class="legal">請尊重智慧財產權<span class="legal-links"><a href="terms.html">使用條款</a><a href="privacy.html">隱私政策</a><a href="disclaimer.html">免責說明</a></span></small>
</footer>

<a class="line-float js-line" href="#" aria-label="預約首次 NT$299 AI 體態檢測" data-line-purpose="reservation" data-cta-location="float" data-offer="ai_assessment" data-offer-value="299"><span>LINE 預約</span><b>原⁠價 NT$699｜首⁠次 NT$299 AI 檢⁠測</b></a>
<script src="site.js?v=20261020-part1"></script>
</body>
</html>`;

fs.writeFileSync('beginner-yoga-guide.html', beginnerHtml, 'utf8');
console.log('✓ Created beginner-yoga-guide.html with Schema.org HowTo');

// ==========================================
// 2. UPDATE classes.html (FAQ UI + Schema.org FAQPage + 1200x630 OG)
// ==========================================
let classes = fs.readFileSync('classes.html', 'utf8');

// Update OG in classes.html
classes = classes.replace(
  /<meta property="og:image" content="https:\/\/sinyanyoga\.com\.tw\/assets\/wall-rope-inversion\.jpg">/i,
  `<meta property="og:image" content="https://sinyanyoga.com.tw/assets/og/og-classes.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:alt" content="鑫彥瑜珈高雄左營壁繩瑜伽與一對一課程方式">
<meta name="twitter:image" content="https://sinyanyoga.com.tw/assets/og/og-classes.jpg">`
);

// Add Schema.org FAQPage to classes.html
const classesFaqSchema = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://sinyanyoga.com.tw/classes.html#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "身體很僵硬、完全碰不到腳趾，可以練瑜伽嗎？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "當然可以！正是因為身體僵硬、筋骨緊繃，才更需要練習。鑫彥瑜珈特別引進壁繩輔具（Wall Rope），透過壁繩承托身體約 30%～50% 的體重，即使柔軟度不足、核心尚未建立，也能在無壓力的狀態下安全延展深層筋膜，完全不需要先把自己練軟再來。"
      }
    },
    {
      "@type": "Question",
      "name": "完全零基礎、從來沒碰過瑜伽，上課會不會跟不上？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "不用擔心。鑫彥瑜珈採精緻小班制與一對一客製調整，教練能隨時照顧到每位學員的身體幅度與對位。初學者建議先從首次 NT$299 AI 體態檢測或一對一體驗開始，由老師帶領你從呼吸、基礎對位到日常代償修正，絕不會強迫做出超出極限的動作。"
      }
    },
    {
      "@type": "Question",
      "name": "初次上課需要自己準備瑜珈墊、壁繩或輔具嗎？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "教室現場備有專業頂級無毒瑜珈墊、壁繩裝置、瑜伽磚、抱枕與伸展帶，所有專用輔具皆免費提供使用，每次課後均由專人徹底清潔消毒。學員只需穿著舒適、具彈性的運動服裝並攜帶個人水壺即可輕鬆前來。"
      }
    },
    {
      "@type": "Question",
      "name": "有骨盆前傾、椎間盤問題、膝蓋舊傷或產後媽媽適合嗎？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "許多學員正是因為日常久坐腰痛、圓肩駝背或關節代償問題前來。鑫彥瑜珈擁有 AI 體態檢測系統，課前先以毫秒級分析你的骨盆傾角、肩線與頸椎前傾幅度，教練再依檢測報告為你避開壓迫角度、強化弱邊肌群。若有特殊舊傷或醫囑，請於課前告知老師，教練將給予最安全的替代動作。"
      }
    },
    {
      "@type": "Question",
      "name": "練習瑜伽需要注意哪些安全事項與課前準備？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "建議上課前 1～1.5 小時避免大量進食（可少量補充溫水或易消化輕食），練習過程中隨時保持自然均勻呼吸、不憋氣。若動作中有任何刺痛或頭暈，應立即放慢動作或進入大休息，瑜伽追求的是身體覺察與神經修復，而非咬牙硬撐。"
      }
    }
  ]
}
</script>`;

if (!classes.includes('classes.html#faq')) {
  classes = classes.replace('</head>', classesFaqSchema + '\n</head>');
}

// Add FAQ UI section in classes.html right before <section class="cta-band">
const classesFaqUI = `
<section class="section section--cream" id="faq"><div class="wrap wrap--narrow">
  <div class="sec-head">
    <div class="eyebrow" style="color:var(--pink)">初學者常見疑問</div>
    <h2>新手最關心的 5 個瑜伽疑慮</h2>
    <p>第一次踏入瑜珈教室難免擔心，我們整理了初學者最常詢問的 5 個核心問題：</p>
  </div>
  <div class="faq">
    <details><summary>身體很僵硬、完全碰不到腳趾，可以練瑜伽嗎？</summary><p>當然可以！正是因為身體僵硬、筋骨緊繃，才更需要練習。鑫彥瑜珈特別引進壁繩輔具（Wall Rope），透過壁繩承托身體約 30%～50% 的體重，即使柔軟度不足、核心尚未建立，也能在無壓力的狀態下安全延展深層筋膜，完全不需要先把自己「練軟」再來。</p></details>
    <details><summary>完全零基礎、從來沒碰過瑜伽，上課會不會跟不上？</summary><p>不用擔心。鑫彥瑜珈採精緻小班制與一對一客製調整，教練能隨時照顧到每位學員的身體幅度與對位。初學者建議先從「首次 NT$299 AI 體態檢測」或「一對一體驗」開始，由老師帶領你從呼吸、基礎對位到日常代償修正，絕不會強迫做出超出極限的動作。</p></details>
    <details><summary>初次上課需要自己準備瑜珈墊、壁繩或輔具嗎？</summary><p>教室現場備有專業頂級無毒瑜珈墊、壁繩裝置、瑜伽磚、抱枕與伸展帶，所有專用輔具皆免費提供使用，每次課後均由專人徹底清潔消毒。學員只需穿著舒適、具彈性的運動服裝並攜帶個人水壺即可輕鬆前來。</p></details>
    <details><summary>有骨盆前傾、椎間盤問題、膝蓋舊傷或產後媽媽適合嗎？</summary><p>許多學員正是因為日常久坐腰痛、圓肩駝背或關節代償問題前來。鑫彥瑜珈擁有 AI 體態檢測系統，課前先以毫秒級分析你的骨盆傾角、肩線與頸椎前傾幅度，教練再依檢測報告為你避開壓迫角度、強化弱邊肌群。若有特殊舊傷或醫囑，請於課前告知老師，教練將給予最安全的替代動作。</p></details>
    <details><summary>練習瑜伽需要注意哪些安全事項與課前準備？</summary><p>建議上課前 1～1.5 小時避免大量進食（可少量補充溫水或易消化輕食），練習過程中隨時保持自然均勻呼吸、不憋氣。若動作中有任何刺痛或頭暈，應立即放慢動作或進入大休息，瑜伽追求的是身體覺察與神經修復，而非咬牙硬撐。</p></details>
  </div>
</div></section>
`;

if (!classes.includes('id="faq"')) {
  classes = classes.replace('<section class="cta-band">', classesFaqUI + '\n<section class="cta-band">');
}

fs.writeFileSync('classes.html', classes, 'utf8');
console.log('✓ Updated classes.html with FAQ UI, Schema.org FAQPage, and 1200x630 OG');

// ==========================================
// 3. UPDATE index.html (Enriched FAQPage + 1200x630 OG)
// ==========================================
let index = fs.readFileSync('index.html', 'utf8');

// Update OG in index.html
index = index.replace(
  /<meta property="og:image" content="https:\/\/sinyanyoga\.com\.tw\/assets\/wall-rope-teacher\.jpg">/i,
  `<meta property="og:image" content="https://sinyanyoga.com.tw/assets/og/og-index.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:alt" content="鑫彥瑜珈高雄左營壁繩瑜伽與AI體態檢測">
<meta name="twitter:image" content="https://sinyanyoga.com.tw/assets/og/og-index.jpg">`
);

// Add beginner questions to index.html FAQPage JSON-LD graph
const oldIndexFaq = `{"@type":"Question","name":"檢測要到現場做嗎？","acceptedAnswer":{"@type":"Answer","text":"是的。檢測在高雄左營教室進行，老師會在現場看你的實際體態並當面解讀。"}},{"@type":"Question","name":"首次 NT$299 包含什麼？","acceptedAnswer":{"@type":"Answer","text":"包含一次 AI 體態檢測的現場拍攝、角度分析，以及老師當面解讀建議。此評估不是醫學診斷。"}},{"@type":"Question","name":"誰可以使用首次 NT$299 優惠？","acceptedAnswer":{"@type":"Answer","text":"限第一次到鑫彥瑜珈體驗 AI 體態檢測的訪客，每人限一次。請事先透過 LINE 預約，並以 LINE 回覆確認的時段為準。"}}`;

const newIndexFaq = `{"@type":"Question","name":"身體很僵硬、完全碰不到腳趾，可以練瑜伽嗎？","acceptedAnswer":{"@type":"Answer","text":"當然可以！正是因為身體僵硬、筋骨緊繃，才更需要練習。鑫彥瑜珈特別引進壁繩輔具（Wall Rope），透過壁繩承托身體約 30%～50% 的體重，即使柔軟度不足、核心尚未建立，也能在無壓力的狀態下安全延展深層筋膜，完全不需要先把自己練軟再來。"}},{"@type":"Question","name":"完全零基礎、從來沒碰過瑜伽，上課會不會跟不上？","acceptedAnswer":{"@type":"Answer","text":"不用擔心。鑫彥瑜珈採精緻小班制與一對一客製調整，教練能隨時照顧到每位學員的身體幅度與對位。初學者建議先從首次 NT$299 AI 體態檢測開始，由老師帶領你從呼吸、基礎對位到日常代償修正，絕不會強迫做出超出極限的動作。"}},{"@type":"Question","name":"初次到課需要自己準備瑜珈墊、壁繩或輔具嗎？","acceptedAnswer":{"@type":"Answer","text":"教室現場備有專業頂級無毒瑜珈墊、壁繩裝置、瑜伽磚、抱枕與伸展帶，所有專用輔具皆免費提供使用，每次課後均由專人徹底清潔消毒。學員只需穿著舒適、具彈性的運動服裝並攜帶個人水壺即可輕鬆前來。"}},{"@type":"Question","name":"檢測要到現場做嗎？","acceptedAnswer":{"@type":"Answer","text":"是的。檢測在高雄左營教室進行，老師會在現場看你的實際體態並當面解讀。"}},{"@type":"Question","name":"首次 NT$299 包含什麼？","acceptedAnswer":{"@type":"Answer","text":"包含一次 AI 體態檢測的現場拍攝、角度分析，以及老師當面解讀建議。此評估不是醫學診斷。"}},{"@type":"Question","name":"誰可以使用首次 NT$299 優惠？","acceptedAnswer":{"@type":"Answer","text":"限第一次到鑫彥瑜珈體驗 AI 體態檢測的訪客，每人限一次。請事先透過 LINE 預約，並以 LINE 回覆確認的時段為準。"}}`;

if (index.includes(oldIndexFaq)) {
  index = index.replace(oldIndexFaq, newIndexFaq);
}

// Add the two beginner questions to the visible HTML in index.html too
const targetIndexFaqItem = `<details><summary>完全沒基礎、身體很硬，也能檢測嗎？</summary><p>可以。檢測的目的就是先了解目前的體態，再討論適合自己的下一步，不需要先具備瑜伽基礎。</p></details>`;
const enrichedIndexFaqItem = `<details><summary>身體很僵硬、完全碰不到腳趾，可以練壁繩瑜伽嗎？</summary><p>當然可以！正是因為身體僵硬、筋骨緊繃，才更需要練習。鑫彥瑜珈引進壁繩輔具（Wall Rope），透過壁繩承托身體約 30%～50% 的體重，即使柔軟度不足、核心尚未建立，也能在無壓力的狀態下安全延展深層筋膜，完全不需要先把自己「練軟」再來。</p></details>
    <details><summary>初次上課需要自己準備瑜珈墊或輔具嗎？</summary><p>教室現場備有專業頂級無毒瑜珈墊、壁繩裝置、瑜伽磚、抱枕與伸展帶，所有專用輔具皆免費提供使用，每次課後均由專人徹底清潔消毒。學員只需穿著舒適、具彈性的運動服裝並攜帶個人水壺即可輕鬆前來。</p></details>
    <details><summary>完全沒基礎、身體很硬，也能檢測嗎？</summary><p>可以。檢測的目的就是先了解目前的體態，再討論適合自己的下一步，不需要先具備瑜伽基礎。</p></details>`;

if (index.includes(targetIndexFaqItem) && !index.includes('完全碰不到腳趾')) {
  index = index.replace(targetIndexFaqItem, enrichedIndexFaqItem);
}

fs.writeFileSync('index.html', index, 'utf8');
console.log('✓ Updated index.html with enriched FAQPage and 1200x630 OG');

// ==========================================
// 4. UPDATE REMAINING CORE PAGES WITH 1200x630 OG
// ==========================================
const pagesToUpdate = [
  {
    file: 'assessment.html',
    img: 'og-assessment.jpg',
    alt: '鑫彥瑜珈首次 NT$299 AI 體態檢測'
  },
  {
    file: 'neck-release.html',
    img: 'og-neck-release.jpg',
    alt: '鑫彥瑜珈一對一肩頸調整與深層筋膜放鬆'
  },
  {
    file: 'reviews.html',
    img: 'og-reviews.jpg',
    alt: '鑫彥瑜珈學員見證與真實課後心得'
  },
  {
    file: 'blog.html',
    img: 'og-blog.jpg',
    alt: '鑫彥瑜珈體態知識庫與熱門 Reels 短影音動作解析'
  },
  {
    file: 'contact.html',
    img: 'og-contact.jpg',
    alt: '鑫彥瑜珈高雄左營教室交通、捷運與周邊停車場指引'
  },
  {
    file: 'videos.html',
    img: 'og-videos.jpg',
    alt: '鑫彥瑜珈體態影音動作庫'
  },
  {
    file: 'posture-self-test.html',
    img: 'og-self-test.jpg',
    alt: '鑫彥瑜珈免費體態訊號掃描工具'
  },
  {
    file: 'about-wall-rope.html',
    img: 'og-classes.jpg',
    alt: '認識壁繩瑜伽原理與好處'
  },
  {
    file: 'about.html',
    img: 'og-about.jpg',
    alt: '關於鑫彥瑜珈與阿美老師壁繩瑜伽教學'
  }
];

pagesToUpdate.forEach(item => {
  if (!fs.existsSync(item.file)) return;
  let content = fs.readFileSync(item.file, 'utf8');
  
  // Replace og:image
  const ogImgRegex = /<meta property=["']og:image["']\s+content=["'][^"']+["']>/i;
  const newOg = `<meta property="og:image" content="https://sinyanyoga.com.tw/assets/og/${item.img}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:alt" content="${item.alt}">`;

  if (ogImgRegex.test(content)) {
    content = content.replace(ogImgRegex, newOg);
  }

  // Ensure twitter:card and twitter:image
  if (content.includes('name="twitter:card"')) {
    content = content.replace(
      /<meta name=["']twitter:card["']\s+content=["'][^"']+["']>/i,
      `<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:image" content="https://sinyanyoga.com.tw/assets/og/${item.img}">`
    );
  } else {
    content = content.replace('</head>', `<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:image" content="https://sinyanyoga.com.tw/assets/og/${item.img}">\n</head>`);
  }

  fs.writeFileSync(item.file, content, 'utf8');
  console.log(`✓ Updated OG metadata on ${item.file}`);
});

// ==========================================
// 5. LINK beginner-yoga-guide.html in blog.html and resources.html
// ==========================================
let blog = fs.readFileSync('blog.html', 'utf8');
if (!blog.includes('beginner-yoga-guide.html')) {
  // Add a featured tutorial card under topic clusters or near top
  const blogLinkTarget = '<!-- 聚落 1 -->';
  const featuredTutorialBanner = `<!-- 新手居家 3 步驟教學推薦 -->
    <div style="grid-column:1 / -1;background:linear-gradient(135deg, #fff9fa, #fff);border:2px solid rgba(217,143,163,.4);border-radius:14px;padding:22px 24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;box-shadow:0 6px 20px rgba(217,143,163,.1);margin-bottom:8px">
      <div style="max-width:680px">
        <span style="font-size:12px;font-weight:700;color:var(--pink);background:rgba(217,143,163,.15);padding:3px 10px;border-radius:12px;display:inline-block;margin-bottom:6px">新手必讀 · 居家實作指南</span>
        <h3 style="font-size:19px;margin:0 0 6px;color:var(--ink)">🧘‍♀️ 新手居家瑜珈 3 步驟入門流程（每天 10 分鐘）</h3>
        <p style="font-size:13.5px;color:var(--muted);margin:0;line-height:1.6">身體僵硬、零基礎也能在客廳開始！從呼吸調息、溫和貓牛式活化脊椎，到關節大休息修復，不代償、不痛動。</p>
      </div>
      <a href="beginner-yoga-guide.html" class="btn" style="background:var(--pink);color:#fff;font-weight:700;padding:11px 22px;white-space:nowrap;border-radius:24px">閱讀完整 3 步驟教學 →</a>
    </div>\n    `;
  blog = blog.replace(blogLinkTarget, featuredTutorialBanner + blogLinkTarget);
  fs.writeFileSync('blog.html', blog, 'utf8');
  console.log('✓ Linked beginner-yoga-guide.html in blog.html');
}

let resources = fs.readFileSync('resources.html', 'utf8');
if (!resources.includes('beginner-yoga-guide.html')) {
  // Add link in resources.html
  const resTarget = '<div class="resource-card';
  const resBanner = `<article class="resource-card" style="border-top:4px solid var(--pink)">
    <span class="resource-badge">新手必修圖解</span>
    <h2>新手居家瑜珈 3 步驟入門指南</h2>
    <p>每天 10 分鐘，在客廳安全啟動自律神經與深層筋膜放鬆。包含呼吸調息、溫和貓牛式與骨盆釋壓大休息完整圖解。</p>
    <a href="beginner-yoga-guide.html" class="btn" style="background:var(--pink);color:#fff;padding:9px 18px;margin-top:10px;display:inline-block">線上免費閱讀教學 →</a>
  </article>\n  `;
  if (resources.includes(resTarget)) {
    resources = resources.replace(resTarget, resBanner + resTarget);
    fs.writeFileSync('resources.html', resources, 'utf8');
    console.log('✓ Linked beginner-yoga-guide.html in resources.html');
  }
}

console.log('=== Part 1 Implementation Complete! ===');
