const fs = require('fs');

let content = fs.readFileSync('blog.html', 'utf8');

// 1. Fix the CSS in <head> for blog.html
const oldStyleRegex = /<style>[\s\S]*?\/\* 部落格短影音精選區塊 \(3 Reels\) \*\/[\s\S]*?<\/style>/;

const newStyle = `<style>
/* 部落格短影音精選區塊 (3 Reels - 首頁同款大版面) */
.blog-videos-wrap {
  margin: 0 auto 56px;
  max-width: 1060px;
  width: 100%;
}
.home-video-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1060px;
  margin: 28px auto 0;
  width: 100%;
}
.h-video-card {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  background: #1c1417;
  aspect-ratio: 9/15;
  box-shadow: 0 10px 28px rgba(38,25,31,0.12);
  cursor: pointer;
  transition: transform .28s cubic-bezier(.16,1,.3,1), box-shadow .28s ease, border-color .25s ease;
  border: 1px solid rgba(217,143,163,.28);
  display: flex;
  flex-direction: column;
}
.h-video-card:hover {
  transform: translateY(-7px);
  box-shadow: 0 20px 40px rgba(38,25,31,0.24);
  border-color: rgba(224,178,75,.85);
}
.h-video-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform .45s ease;
}
.h-video-card:hover img {
  transform: scale(1.05);
}
.h-video-scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0.25) 52%, rgba(18,11,15,0.94) 100%);
  pointer-events: none;
}
.h-video-top-badges {
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  pointer-events: none;
  gap: 6px;
}
.h-badge-views {
  background: rgba(0,0,0,0.72);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  color: #FFE600;
  font-size: 11.5px;
  font-weight: 700;
  padding: 4px 9px;
  border-radius: 20px;
  border: 1px solid rgba(255,230,0,.35);
  letter-spacing: 0.3px;
}
.h-badge-cat {
  background: var(--pink);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 9px;
  border-radius: 20px;
  white-space: nowrap;
}
.h-video-play-btn {
  position: absolute;
  top: 44%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(224,178,75,0.92);
  color: #26191f;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 22px rgba(0,0,0,.45), 0 0 0 4px rgba(255,255,255,.2);
  z-index: 2;
  transition: transform .22s cubic-bezier(.16,1,.3,1), background .2s ease;
}
.h-video-card:hover .h-video-play-btn {
  transform: translate(-50%, -50%) scale(1.15);
  background: #FFE600;
  box-shadow: 0 8px 28px rgba(255,230,0,.5), 0 0 0 6px rgba(255,255,255,.3);
}
.h-video-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  z-index: 2;
  color: #fff;
}
.h-video-title {
  font-size: 16px;
  font-weight: 700;
  line-height: 1.38;
  margin: 0 0 6px;
  color: #ffffff;
  text-shadow: 0 2px 6px rgba(0,0,0,0.6);
}
.h-video-desc {
  font-size: 12.5px;
  line-height: 1.45;
  color: rgba(255,255,255,.82);
  margin: 0 0 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-shadow: 0 1px 4px rgba(0,0,0,0.6);
}
.h-video-action-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 700;
  color: var(--gold-lt);
  background: rgba(255,255,255,.12);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid rgba(224,178,75,.35);
  transition: background .2s, border-color .2s;
}
.h-video-card:hover .h-video-action-pill {
  background: rgba(224,178,75,.25);
  border-color: #FFE600;
}
.home-video-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
  flex-wrap: wrap;
}

/* Lightbox Modal CSS */
.v-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: rgba(15, 10, 13, 0.88);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: none;
  align-items: center;
  justify-content: center;
  padding: 16px;
  opacity: 0;
  transition: opacity .25s ease;
}
.v-modal-overlay.is-open {
  display: flex;
  opacity: 1;
}
.v-modal-card {
  background: #1c1417;
  border: 1px solid rgba(217,143,163,.3);
  border-radius: 20px;
  width: 100%;
  max-width: 400px;
  max-height: 92vh;
  box-shadow: 0 25px 60px rgba(0,0,0,.65);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  transform: scale(0.94);
  transition: transform .25s cubic-bezier(.16,1,.3,1);
}
.v-modal-overlay.is-open .v-modal-card {
  transform: scale(1);
}
.v-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #251b1f;
  border-bottom: 1px solid rgba(255,255,255,.08);
}
.v-modal-badges {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.v-modal-cat {
  font-size: 11.5px;
  font-weight: 700;
  color: #fff;
  background: var(--pink);
  padding: 3px 8px;
  border-radius: 6px;
}
.v-modal-views {
  font-size: 11.5px;
  color: rgba(255,255,255,.75);
  background: rgba(255,255,255,.1);
  padding: 3px 8px;
  border-radius: 6px;
}
.v-modal-close {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(255,255,255,.12);
  border: none;
  color: #fff;
  font-size: 20px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background .2s, transform .2s;
}
.v-modal-close:hover {
  background: var(--pink);
  transform: scale(1.08);
}
.v-modal-player-wrap {
  position: relative;
  background: #000;
  aspect-ratio: 9/16;
  max-height: 480px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.v-modal-player-wrap video {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #000;
  display: block;
}
.v-modal-body {
  padding: 16px;
  background: #1c1417;
  color: #fff;
  overflow-y: auto;
  max-height: 32vh;
}
.v-modal-title {
  font-size: 16px;
  font-weight: 700;
  line-height: 1.4;
  margin: 0 0 8px;
  color: #fff;
}
.v-modal-desc {
  font-size: 13px;
  line-height: 1.55;
  color: rgba(255,255,255,.75);
  margin: 0 0 12px;
}
.v-modal-card-cta {
  background: linear-gradient(135deg, rgba(67,34,47,.95), rgba(109,58,76,.95));
  border: 1px solid rgba(224,178,75,.45);
  border-radius: 10px;
  padding: 12px 14px;
  margin: 12px 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.v-modal-card-cta-txt b {
  display: block;
  font-size: 13.5px;
  color: var(--gold-lt);
  line-height: 1.35;
}
.v-modal-card-cta-txt span {
  display: block;
  font-size: 11.5px;
  color: #efe2e5;
  margin-top: 3px;
}
.v-modal-card-cta .btn {
  padding: 9px 15px;
  font-size: 13px;
  white-space: nowrap;
  flex-shrink: 0;
}
.v-modal-cta {
  display: block;
  text-align: center;
  background: var(--pink);
  color: #fff;
  font-weight: 700;
  font-size: 13.5px;
  padding: 10px 16px;
  border-radius: 8px;
  text-decoration: none;
  transition: background .2s;
  margin-top: 6px;
}
.v-modal-cta:hover {
  background: #b24d6d;
  color: #fff;
}
.v-modal-more-link {
  display: block;
  text-align: center;
  font-size: 12.5px;
  color: rgba(255,255,255,.65);
  margin-top: 10px;
  text-decoration: none;
  transition: color .2s;
}
.v-modal-more-link:hover {
  color: var(--gold-lt);
}

@media (max-width: 820px) {
  .home-video-grid {
    grid-template-columns: 1fr;
    max-width: 340px;
    gap: 20px;
  }
  .v-modal-card {
    width: min(92vw, 360px);
    max-height: 90vh;
  }
  .v-modal-player-wrap {
    max-height: 400px;
  }
  .v-modal-card-cta {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
    gap: 10px;
  }
  .home-video-actions {
    flex-direction: column;
    width: 100%;
  }
  .home-video-actions .btn {
    width: 100%;
  }
}
</style>`;

content = content.replace(oldStyleRegex, newStyle);

// 2. Fix the HTML structure in blog.html:
// Close .sec-head BEFORE .blog-videos-wrap so .blog-videos-wrap is directly inside .wrap (full width 1060px)!
const oldHtmlSectionRegex = /<section class="section section--cream"><div class="wrap">[\s\S]*?<section aria-labelledby="topic-clusters"/;

const newHtmlSection = `<section class="section section--cream"><div class="wrap">
  <div class="sec-head" style="margin-bottom:36px">
    <div class="eyebrow" style="color:var(--pink)">體態知識庫</div>
    <h1>挑你關心的主題，開始讀</h1>
    <p>從圓肩駝背、肩頸到日常久坐，一次一個小主題，慢慢把身體讀懂、練回來。</p>
  </div>

  <!-- 精選 Reels 短影音區塊：直接放在 .wrap 內，與首頁同寬同規格 -->
  <div class="blog-videos-wrap">
    <div class="sec-head" style="margin-bottom:24px">
      <div class="eyebrow" style="color:var(--pink)">熱門短影音 · 動作對錯解析</div>
      <h2 style="font-size:clamp(22px,2.6vw,30px)">看文字太抽象？<span class="keep-phrase">先看 10 秒短影音示範</span></h2>
      <p>點擊播放微型短影音，想看全部動作解析可直接點進影音庫：</p>
    </div>

    <div class="home-video-grid">
      <!-- 影片卡片 1: 坐下直接掉下去 (Reel 7) -->
      <div class="h-video-card"
           data-video="assets/reels/reel-7.mp4"
           data-poster="assets/reels/reel-cover-7.jpg"
           data-cat="日常動態 · 臀肌離心力"
           data-views="9.3 萬"
           data-title="妳不是坐下，是最後幾公分直接掉下去？"
           data-desc="接近椅面最後五公分身體突然失控掉下去？這不是骨頭問題，而是臀肌離心煞車能力失憶。教你在動作中找回接住自己的力量。"
           data-blog="blog-standing-low-back.html"
           role="button" tabindex="0" aria-label="影片：妳不是坐下，是最後幾公分直接掉下去？">
        <img src="assets/reels/reel-cover-7.jpg" alt="妳不是坐下是最後幾公分直接掉下去" loading="lazy" width="540" height="960">
        <div class="h-video-scrim"></div>
        <div class="h-video-top-badges">
          <span class="h-badge-views">👁️ 9.3 萬次觀看</span>
          <span class="h-badge-cat">日常動態</span>
        </div>
        <div class="h-video-play-btn" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </div>
        <div class="h-video-info">
          <h3 class="h-video-title">坐下最後幾公分直接掉？</h3>
          <p class="h-video-desc">坐下失控是臀肌離心失憶，教你找回接住自己的力量。</p>
          <span class="h-video-action-pill">點擊看 10 秒示範 ▶</span>
        </div>
      </div>

      <!-- 影片卡片 2: 練臀腿先燒大腿前側 (Reel 9) -->
      <div class="h-video-card"
           data-video="assets/reels/reel-9.mp4"
           data-poster="assets/reels/reel-cover-9.jpg"
           data-cat="椅子式對位 · 臀肌啟動"
           data-views="8.7 萬"
           data-title="以為在練臀腿，結果先燒的是大腿前側？"
           data-desc="做椅子式深蹲大腿前側痠爆、屁股沒感覺？壓力全堆在膝蓋！教你重心放腳跟，臀部後推發力。"
           data-blog="blog-wall-rope-anterior-pelvic-tilt.html"
           role="button" tabindex="0" aria-label="影片：以為在練臀腿，結果先燒的是大腿前側？">
        <img src="assets/reels/reel-cover-9.jpg" alt="以為在練臀腿結果先燒的是大腿前側" loading="lazy" width="540" height="960">
        <div class="h-video-scrim"></div>
        <div class="h-video-top-badges">
          <span class="h-badge-views">👁️ 8.7 萬次觀看</span>
          <span class="h-badge-cat">動作對位</span>
        </div>
        <div class="h-video-play-btn" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </div>
        <div class="h-video-info">
          <h3 class="h-video-title">練臀腿先燒大腿前側？</h3>
          <p class="h-video-desc">深蹲壓力全堆在膝關節？教你重心往後坐，喚醒臀肌。</p>
          <span class="h-video-action-pill">點擊看 10 秒示範 ▶</span>
        </div>
      </div>

      <!-- 影片卡片 3: 穿褲子抬腳東倒西歪 (Reel 3) -->
      <div class="h-video-card"
           data-video="assets/reels/reel-3.mp4"
           data-poster="assets/reels/reel-cover-3.jpg"
           data-cat="站姿平衡 · 防跌定錨"
           data-views="7.6 萬"
           data-title="穿褲子一抬腳，身體就東倒西歪？"
           data-desc="單腳站立視線一移就晃？先固定前方一個錨定點，立刻喚醒 70% 本體感覺神經！"
           data-blog="blog-balance-midlife.html"
           role="button" tabindex="0" aria-label="影片：穿褲子一抬腳，身體就東倒西歪？">
        <img src="assets/reels/reel-cover-3.jpg" alt="穿褲子一抬腳身體東倒西歪" loading="lazy" width="540" height="960">
        <div class="h-video-scrim"></div>
        <div class="h-video-top-badges">
          <span class="h-badge-views">👁️ 7.6 萬次觀看</span>
          <span class="h-badge-cat">熟齡防跌</span>
        </div>
        <div class="h-video-play-btn" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </div>
        <div class="h-video-info">
          <h3 class="h-video-title">穿褲子一抬腳東倒西歪？</h3>
          <p class="h-video-desc">視線一移身體就偏？固定視線錨點，喚醒本體平衡感。</p>
          <span class="h-video-action-pill">點擊看 10 秒示範 ▶</span>
        </div>
      </div>
    </div>

    <div class="home-video-actions">
      <a href="videos.html" class="btn btn--quiet" style="background:#fff;border:1px solid var(--line-lt);color:var(--ink);font-weight:700;box-shadow:0 4px 14px rgba(67,34,47,.08);padding:12px 28px;border-radius:24px">
        🎬 查看更多：前往「影音動作庫」看全部 9 部解析短片 →
      </a>
    </div>
  </div>

  <section aria-labelledby="topic-clusters"`;

content = content.replace(oldHtmlSectionRegex, newHtmlSection);

fs.writeFileSync('blog.html', content, 'utf8');
console.log('Successfully updated blog.html layout to full-width homepage style!');
