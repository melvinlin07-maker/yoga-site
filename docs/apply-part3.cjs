const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// ============================================================
// 1. Update theme.css
// ============================================================
const themePath = path.join(rootDir, 'theme.css');
let themeCss = fs.readFileSync(themePath, 'utf8');

const part3Css = `

/* ============================================================
   CRO PART 3: 閱讀進度條、離開挽留彈窗、夜間暗黑模式、即時搜尋
   ============================================================ */

/* 8. 長文頂端金色閱讀進度條 */
.reading-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 0%;
  height: 3.5px;
  background: linear-gradient(90deg, #d98fa3, #e0b24b);
  z-index: 99999999;
  box-shadow: 0 1px 6px rgba(224, 178, 75, 0.45);
  pointer-events: none;
  transition: width 0.08s linear;
}

/* 7. 離開意圖溫柔挽留彈窗 */
.exit-modal {
  position: fixed;
  inset: 0;
  z-index: 9999999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.exit-modal.is-active {
  opacity: 1;
  pointer-events: auto;
}

.exit-modal__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(28, 16, 22, 0.72);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.exit-modal__dialog {
  position: relative;
  background: #ffffff;
  border: 1px solid var(--line-lt);
  border-radius: 22px;
  max-width: 520px;
  width: 100%;
  padding: 36px 32px 28px;
  box-shadow: 0 20px 50px rgba(67, 34, 47, 0.28);
  text-align: center;
  transform: translateY(24px) scale(0.96);
  transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1;
}

.exit-modal.is-active .exit-modal__dialog {
  transform: translateY(0) scale(1);
}

.exit-modal__close {
  position: absolute;
  top: 14px;
  right: 16px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid var(--line-lt);
  background: #faf4f5;
  color: var(--muted);
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.exit-modal__close:hover {
  background: var(--pink);
  color: #fff;
  border-color: var(--pink);
}

.exit-modal__badge {
  display: inline-block;
  background: linear-gradient(135deg, rgba(217,143,163,0.18), rgba(224,178,75,0.18));
  color: var(--green);
  border: 1px solid rgba(217,143,163,0.4);
  font-size: 12.5px;
  font-weight: 700;
  padding: 4px 14px;
  border-radius: 20px;
  margin-bottom: 12px;
}

.exit-modal__title {
  font-size: 21px;
  color: var(--ink);
  margin: 0 0 10px;
  line-height: 1.45;
}

.exit-modal__desc {
  font-size: 14px;
  color: #554148;
  line-height: 1.7;
  margin: 0 0 22px;
}

.exit-modal__actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.exit-modal__btn-primary {
  background: linear-gradient(135deg, var(--pink), #8f2c4b);
  color: #ffffff;
  font-weight: 700;
  padding: 13px 20px;
  border-radius: 30px;
  box-shadow: 0 6px 18px rgba(176,80,122,0.3);
  text-decoration: none;
  font-size: 15px;
}

.exit-modal__btn-secondary {
  background: #fbf7f8;
  color: var(--ink);
  border: 1px solid var(--line-lt);
  font-weight: 600;
  padding: 11px 20px;
  border-radius: 30px;
  text-decoration: none;
  font-size: 14px;
  box-shadow: none;
}

.exit-modal__btn-secondary:hover {
  border-color: var(--pink);
  color: var(--pink);
}

.exit-modal__dismiss {
  background: none;
  border: none;
  color: var(--muted);
  font-size: 12.5px;
  cursor: pointer;
  margin-top: 14px;
  text-decoration: underline;
  padding: 4px 8px;
}

/* 9. 夜間護眼模式 (Dark Mode) 切換鈕與色調 */
.theme-toggle-btn {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.22);
  color: #fff;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
  flex-shrink: 0;
}

.theme-toggle-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: scale(1.08);
}

/* 深色模式主題定義 */
[data-theme="dark"] {
  --paper: #1c1318;
  --cream: #261921;
  --ink: #f7edf1;
  --muted: #baa3ac;
  --line-lt: #3e2632;
  --green-dk: #28141d;
  --green: #8d4a63;
  --green2: #190c13;
  --gold: #dfba70;
  --gold-lt: #ecc880;
  --pink: #d9789c;
}

[data-theme="dark"] body {
  background-color: var(--paper);
  color: var(--ink);
}

[data-theme="dark"] .section--cream,
[data-theme="dark"] .section--paper,
[data-theme="dark"] .trust-strip {
  background-color: var(--cream);
  border-color: var(--line-lt);
}

[data-theme="dark"] .tile,
[data-theme="dark"] .card,
[data-theme="dark"] .concern,
[data-theme="dark"] .review,
[data-theme="dark"] .map-figure-box,
[data-theme="dark"] .ctrl-card,
[data-theme="dark"] .result-card,
[data-theme="dark"] .exit-modal__dialog,
[data-theme="dark"] .guide-card,
[data-theme="dark"] .h-video-card,
[data-theme="dark"] details {
  background-color: #261820;
  border-color: var(--line-lt);
  color: var(--ink);
}

[data-theme="dark"] .tile h3,
[data-theme="dark"] .tile b,
[data-theme="dark"] .review strong,
[data-theme="dark"] .faq-item summary {
  color: #fff;
}

[data-theme="dark"] .part-chip,
[data-theme="dark"] .habit-item,
[data-theme="dark"] .filter-btn,
[data-theme="dark"] .exit-modal__btn-secondary,
[data-theme="dark"] .share-bar-inline {
  background-color: #2e1d27;
  border-color: var(--line-lt);
  color: var(--ink);
}

[data-theme="dark"] .filter-btn.is-active,
[data-theme="dark"] .part-chip.is-active {
  background-color: var(--pink);
  color: #ffffff;
}

[data-theme="dark"] input[type="search"],
[data-theme="dark"] input[type="text"] {
  background-color: #2c1a24;
  border-color: var(--line-lt);
  color: #fff;
}

[data-theme="dark"] .exit-modal__title {
  color: #fff;
}

[data-theme="dark"] .exit-modal__desc {
  color: #d1bdc5;
}

[data-theme="dark"] .exit-modal__close {
  background-color: #2e1d27;
  color: #baa3ac;
}

/* 10. 部落格即時搜尋與標籤列樣式 */
.blog-search-box {
  max-width: 620px;
  margin: 0 auto 20px;
  position: relative;
}

.blog-search-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.blog-search-icon {
  position: absolute;
  left: 18px;
  font-size: 16px;
  color: var(--muted);
  pointer-events: none;
}

.blog-search-input {
  width: 100%;
  padding: 13px 44px 13px 48px;
  border-radius: 999px;
  border: 1.5px solid var(--line-lt);
  background: #ffffff;
  color: var(--ink);
  font-size: 14.5px;
  font-family: inherit;
  outline: none;
  box-shadow: 0 4px 18px rgba(67, 34, 47, 0.05);
  transition: all 0.25s ease;
}

.blog-search-input:focus {
  border-color: var(--pink);
  box-shadow: 0 6px 22px rgba(176, 80, 122, 0.18);
}

.blog-search-clear {
  position: absolute;
  right: 14px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #f0e6e8;
  border: none;
  color: var(--muted);
  font-size: 13px;
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
}

.blog-search-count {
  margin-top: 10px;
  font-size: 13px;
  color: var(--muted);
  text-align: center;
  display: none;
}
`;

if (!themeCss.includes('.reading-progress-bar')) {
  themeCss += part3Css;
  fs.writeFileSync(themePath, themeCss, 'utf8');
  console.log('Appended Part 3 styles to theme.css');
} else {
  console.log('theme.css already has Part 3 styles');
}
