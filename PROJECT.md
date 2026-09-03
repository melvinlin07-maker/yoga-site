# PROJECT.md — 鑫彥瑜珈網站 事實與系統地圖

> **更新基準:** git HEAD `3943a1b`(2026-08-08 盤點),與 `origin/main` 完全同步(0 ahead / 0 behind)。
> 本檔案只記錄「已確認事實」。無法確認的項目一律標示 **待確認 / 需外部查核**,不寫成事實。
>
> ⚠️ **本檔案的技術事實以 repo 實查為準;商業事實(價格、Offer、廣告投放狀態、課程方案)不以 repo 為準,詳見 `CLAUDE.md` 商業事實強制詢問規則。**

---

## 1. 專案基本資料

- **正式網域:** `sinyanyoga.com.tw`(見根目錄 `CNAME`)
- **部署方式:** GitHub Pages(repo: `melvinlin07-maker/yoga-site`)
- **Git 狀態基準:** branch `main`,HEAD `3943a1b`「docs: add project context and Claude working rules」
- **營運據點:** 高雄市左營區(實體教室)
- **需外部查核:** GitHub Pages 實際部署內容是否等於 HEAD `3943a1b`(本檔案基於「已 push + 同步」推論一致,未直接查驗 Pages 部署紀錄)

---

## 2. Production(已正式上線 / 可公開索引)

以下頁面為公開、可被索引的正式頁面(2026-08-31 實查,**116 個 HTML 檔案平鋪於根目錄,無子目錄**):

- `index.html`(首頁)
- `assessment.html`(AI 體態檢測,正式引流頁)
- `neck-release.html`(一對一肩頸調整正式頁,已整併取代舊實驗版,已接 n8n webhook)
- `about.html`、`about-poses.html`、`about-wall-rope.html`
- `classes.html`、`contact.html`、`know-yoga.html`、`practice-guide.html`
- `blog.html` + **66 篇** `blog-*.html` 文章
- **27 篇** `pose-*.html` 動作頁
- `reviews.html`、`resources.html`、`rental.html`
- `privacy.html`、`terms.html`、`disclaimer.html`

> **數量修正紀錄(2026-08-21,分兩批):** 依 `SEO_CONTENT_SOP.md` 流程,同一天內共新增 4 篇 blog。第一批 3 篇(`blog-first-time-ai-assessment.html`、`blog-wall-rope-anterior-pelvic-tilt.html`、`blog-choosing-first-class-format.html`,commit `1f1ef40`)56→59 篇;第二批 1 篇(`blog-ai-assessment-not-just-numbers.html`,commit `b1f506e`)59→60 篇 blog,總數 111→112 個 HTML。
> **數量修正紀錄(2026-08-26):** 發現 `blog-honest-limits-wall-rope.html` 已寫好但未上架。經使用者確認後補上架,60→61 篇 blog,總數 112→113 個 HTML。
> **數量修正紀錄(2026-08-27):** 依新流程(今天寫、隔天發布)新增 `blog-is-it-frozen-shoulder.html`(五十肩誠實分流文),61→62 篇 blog,總數 113→114 個 HTML。
> **數量修正紀錄(2026-08-29):** 上架 `blog-arm-flab-rounded-shoulders.html`(蝴蝶袖與姿勢的關係),62→63 篇 blog,總數 114→115 個 HTML。
> **數量修正紀錄(2026-08-31):** 上架 `blog-pelvic-floor-leaks.html`(骨盆底肌／漏尿,參考國外 Yoga Journal anatomy 分類選題),發布前已將文中佔位日期同步修正為實際發布日,加入 `blog.html` 骨盆・下半身分類 + `sitemap.xml`,63→**64 篇 blog**,總數 115→**116 個 HTML**。
> **數量修正紀錄(2026-09-03):** 依決策29排程補發 `blog-jaw-tmj-tension.html`(TMJ,原排9/2漏發)+ `blog-sprain-strain-comeback.html`(閃到腰/扭傷,原排9/3),兩篇皆加入 `blog.html` + `sitemap.xml`,64→**66 篇 blog**。
> ⚠️ **總 HTML 檔案數(116)本次未重新稽核,已知過時:** 實查根目錄現有 129 個 `.html`,期間至少新增了未記錄於本文件的 `shoulder-checkup-v1.html`(commit `e7239c2`,無對應決策紀錄)以及 10 篇仍未上架的 blog 草稿(見「未發佈的/index.html」)。**總數與 sitemap 收錄範圍(第58-62行)需要完整重新稽核,本次僅更新 blog 篇數與 sitemap 條數,不擅自回填總數,待你確認後再補稽核。**

**站上服務品項(依 `classes.html`):** AI 體態檢測、壁繩瑜伽、一對一指導、小團課。
**站上公開價格:** 僅出現 NT$199 與 NT$699。**壁繩瑜伽、小團課、一對一指導在網站上沒有標價**(實際方案價格屬商業狀態,見第 10 節)。

**共用檔案(Production,全站生效):**
- `site.js?v=5` — **110 頁引用**(2026-08-21 實查;隨新增文章數同步成長)
- `theme.css?v=10` — **107 頁引用**(2026-08-21 實查)
- `sitemap.xml`、`robots.txt`、`favicon.svg`
- `google0081f56f050ce756.html` — Google Search Console 驗證檔(不引用 site.js/theme.css,特例)

**未引用共用檔的頁面(2026-08-18 實查,影響範圍評估必讀):**

| 未引用 | 頁面 |
|---|---|
| 未引用 `site.js` | `google0081f56f050ce756.html`、`guide.html` |
| 未引用 `theme.css` | `assessment-v3.html`、`assessment-v4.html`、`neck-release-v3.html`、`google0081f56f050ce756.html` |

> ⚠️ **`assessment-v3.html`、`assessment-v4.html`、`neck-release-v3.html` 自帶內嵌樣式,不吃 `theme.css`。**(`assessment-v4.html` 為 2026-08-18 前新增,前次盤點時尚不存在此例外)。修改 `theme.css` **不會**影響這三個落地頁,評估影響範圍時不可寫成「全站」。

**Sitemap 收錄範圍(2026-09-03 更新,僅同步本次新增,未完整重新稽核):**
- 共 **110 條 `<loc>`**(實查 `grep -c "<loc>" sitemap.xml`);與「116 個 HTML − 8」的舊公式關係待重新稽核(見上方⚠️)
- 66 篇 blog + 27 篇 pose **全數在列**(2026-09-03 補發 `blog-jaw-tmj-tension.html`、`blog-sprain-strain-comeback.html` 後已同步)
- 正確排除(8 個):`assessment-v2.html`、`assessment-v3.html`、`assessment-v4.html`、`neck-release-v1.html`、`neck-release-v3.html`、`guide.html`、`google0081f56f050ce756.html`、**`yoga-beginner-v1.html`**(廣告用 LP,尚未部署/尚未決定是否索引,見 `DECISIONS.md` §17)
- **結論:收錄範圍完全正確,此項不再列為待確認**

`robots.txt` 內容:`User-agent: *` / `Allow: /` / `Sitemap: https://sinyanyoga.com.tw/sitemap.xml`

---

## 3. Working tree(本機狀態)

> ⚠️ **本節已過期(基準是舊 commit `3943a1b`)。以下記錄 2026-08-15 對話中新增的異動,尚未 commit / push / 部署,僅存在本機。**

**2026-08-15 新增的本機異動(未部署):**
- **全站 56 篇 blog 文章**新增「30秒重點」TL;DR 摘要區塊 + 「常見問題」FAQ 手風琴區塊 + 對應的 `FAQPage` JSON-LD schema。內容皆從各篇文章既有文字改寫,未新增未查證的說法,未加強醫療/療效宣稱。
- `index.html` 的 Organization(`HealthClub`)schema 新增 `employee` → 新的 `Person` 節點,登記阿美老師(黃淑美)的職稱與證照(取自 `about.html` 既有簡介文字,未新增新資訊)。
- 修正 `blog-stiff-neck-crick.html`、`blog-stiff-body-wall-rope.html` 的縮圖重複問題(原本共用 `art07.jpg`/`art05.jpg`),改用專屬圖 `blog-stiffneck.jpg`、`blog-wallropebody.jpg`,`blog.html` 索引縮圖同步更新。
- 清除 `blog-who-needs-ai-posture-assessment.html` 內殘留的內部草稿筆記(「CTA 建議：」「錨文字：」「Q1～Q4」裸文字段落),內容已保留在正式 FAQ 區塊中,未遺失資訊。

**已知仍待處理(低優先,未動):**
- `wall-rope-teacher.jpg` / `wall-rope-inversion.jpg` / `wall-rope-suspension.jpg` 這三張壁繩教學圖原本跨 9–14 個頁面共用(含非 blog 頁面)。**2026-09-03 部分處理:** 使用者主導的 A/B/C/D 分組換圖計畫(共24張),已完成 A組(7篇,取代 wall-rope-suspension.jpg)+ B組(7篇,取代 wall-rope-teacher.jpg),共14篇 blog 文章換上專屬 AI 生成圖(commit `1fe3684`)。`wall-rope-teacher.jpg`/`wall-rope-suspension.jpg` 現僅保留在各自真正歸屬頁(`blog-first-class-what-to-bring.html`、`blog-what-is-wall-rope.html`)+ 非 blog 頁面(`index.html`、`assessment.html`、`assessment-v2/v3.html`、`about-wall-rope.html`、`contact.html`、`neck-release-v1.html`、`shoulder-checkup-v1.html`、`yoga-beginner-v1.html`,這些不在本次清理範圍)。**C組(6篇)、D組(3篇)尚未處理**,`wall-rope-inversion.jpg` 完全未動。

**其餘網站程式碼:** 沒有其他 modified 或 staged 的 HTML/CSS/JS/sitemap/robots。

**working tree 並非完全空白** — 存在 untracked 檔案,詳見第 4 節。描述時應使用「網站程式碼無異動」而非籠統的「working tree 乾淨」(此描述現已不成立,見上方 2026-08-15 異動)。

---

## 4. Draft / Untracked(尚未進 git 歷史)

- `.claude/` — Claude Code 工具設定目錄(內含 `launch.json`),非網站內容
- `yoga-beginner-v1.html` — 2026-08-19 新增的零基礎入門廣告 LP,詳見第 6 節 Landing Page Registry 與 `DECISIONS.md` 第 17 條。**尚未 commit / push / 部署**
- `assets/ChatGPT Image 2026年8月5日 下午*.png` × 10 — 新圖片素材,**盤點時未被任何 HTML 檔案引用**,狀態為草稿,尚未套用到任何頁面
- `gcm-diagnose.log` — Git Credential Manager 診斷 log,位於根目錄。**未列入 `.gitignore`,因此會持續出現在 `git status`**。
  > **狀態:僅記錄現況。** 使用者已明確指示本次**不刪除、不加入 `.gitignore`、不做任何處理**。

**`.gitignore` 現況:** `請先讀我.md`、`.DS_Store`、`Thumbs.db`

> **狀態修正紀錄(2026-08-08):** 前一版本記載 `PROJECT.md`、`CLAUDE.md`、`DECISIONS.md` 為 untracked 草稿。**實際上這三份已於 commit `3943a1b` 提交並 push,現為 tracked 檔案。**

**`assets/` 現況:** 共 96 個檔案(83 個 jpg、13 個 png)。

---

## 5. Deprecated / Archived(已淘汰或待確認狀態)

> ⚠️ **重要規則:** 舊 Landing Page 是否可下線 / 刪除,**不得由 repo 狀態自行推論**。`noindex`、檔名帶版號、已有對應正式頁 — 這三者**都不構成**可下線的判斷依據。詳見 `DECISIONS.md` 與 `CLAUDE.md`。

| 項目 | 狀態 | 待確認事項 |
|---|---|---|
| `neck-release-v1.html` | commit `eb188e2` 訊息稱已被 `neck-release.html` 取代 | **需外部查核:** 是否仍有 Meta 廣告投放 → 以當下 Meta Ads 後台為準 |
| `neck-release-v3.html` | `noindex,nofollow`、canonical 指向自己(非 neck-release.html) | 同上;另此頁價格 NT$1,200 與正式頁 NT$1,500 不同 — 已確認屬**不同時期 / 不同測試線的 Offer**,非錯誤(見第 6 節與 `DECISIONS.md`)。canonical 指向自己是否為刻意設計,**待你決定** |
| `assessment-v2.html` | `noindex,nofollow`,測試版,無 `data-lead-*` / `data-line-message`(用 site.js 預設值) | **需外部查核:** 是否仍在投放;若是,詢問來源將無法從 LINE 訊息內容分辨版本 |
| `assessment-v3.html` | `noindex,nofollow`,測試版,已設定 `data-lead-*` 與 `data-line-message`(商業標記「V3」)。**不引用 `theme.css`** | **需外部查核:** 是否仍在投放 |
| `guide.html` | 純 meta-refresh 轉址到 `know-yoga.html`,不在 sitemap、無內部連結指向它。**全站唯一轉址樁** | 功能正常,判斷為舊網址結構遺留的轉址樁,非錯誤,可保留 |
| `styles.css`(根目錄,54KB) | **已實查確認:0 個 HTML 引用它** | 確認為 legacy 遺留檔。是否封存/刪除**待你決定**,本檔案不主動處理 |
| `請先讀我.md` | 已被 `.gitignore` 排除,內容為專案最初期(5 頁骨架)說明,與現況嚴重不符 | 僅供歷史參考,不作為現況依據 |

---

## 6. Landing Page Registry

> **「檔名版本」與「商業測試版本」是兩件不同的事,不可互相推論:**
> - 檔名版本(如 `-v1` `-v2` `-v3`)= 技術 / 檔案版本,反映建立順序
> - 商業版本(`data-line-message` 內文字如「V1」「V3」)= A/B 測試分組標記,由撰寫時刻意指定,兩者可能不一致,這是刻意設計,非錯誤

> ⚠️ **價格欄位重要但書:** 下表價格為**程式碼層級的事實**(檔案內確實寫著這些數字),**不代表現場目前唯一正式售價**。這些數字可能分屬不同時期 / 不同測試線的 Offer。涉及報價、ROI 試算、文案時,**須先向使用者確認當下正式方案**。

> ⚠️ **廣告投放狀態:** 本表**不記錄**各頁是否正在投放。該狀態變動頻繁,**一律以當下 Meta Ads 後台為準**,不在文件中寫死。

| 檔名 | 商業用途 | 程式碼內價格 | 檔名版本 | 商業版本標記 | 公開/隱藏 | Sitemap | Canonical | Robots | data-lead-* | LINE CTA 真機測試 |
|---|---|---|---|---|---|---|---|---|---|---|
| `assessment.html` | AI 體態檢測正式頁 | 原價 699 / 首次 199 | 無版號(正式頁) | 「V1」 | **公開正式頁** | ✅在 | 指向自己 | 可索引(無 robots meta) | 未設定(用預設 199) | **未驗證** |
| `assessment-v2.html` | 測試版 | 199 | v2 | 無 data-line-message | 廣告隱藏頁 | 不在 | 指向 assessment.html | noindex,nofollow | 無(用預設 199) | **未驗證** |
| `assessment-v3.html` | 測試版(敘事型) | 199 | v3 | 「V3」 | 廣告隱藏頁 | 不在 | 指向 assessment.html | noindex,nofollow | 199 / AI posture assessment | **未驗證** |
| `neck-release.html` | 肩頸調整正式頁(整併取代舊實驗版) | 1500 | 無版號(正式頁) | 無版號字樣 | **公開正式頁** | ✅在 | 指向自己 | 可索引(無 robots meta) | 1500 / 1-on-1 neck & shoulder release | **未驗證** |
| `neck-release-v1.html` | 舊實驗版 | 1500 | v1 | 無 data-line-message | 廣告隱藏頁(舊) | 不在 | 指向 neck-release.html | noindex,nofollow | 無 | **未驗證** |
| `neck-release-v3.html` | 舊實驗版(敘事型) | 1200 | v3 | 「V1」(刻意的商業版本標記,與檔名版本不同) | 廣告隱藏頁(舊) | 不在 | **指向自己(非 neck-release.html)** | noindex,nofollow | 1200 / 1-on-1 neck & shoulder release | **未驗證** |
| `yoga-beginner-v1.html` | 零基礎入門廣告 LP(2026-08-19 新增,見 `DECISIONS.md` 第 17 條) | 399(不綁後續方案,刻意不與其他資源做贈品式包裝) | v1 | 無版號字樣 | 廣告隱藏頁 | 不在 | 指向自己 | noindex,follow(使用者本次指定) | 399 / beginner yoga trial class | **未驗證**(本機用 DOM 層級驗證過 LINE 深連結與追蹤事件,未做手機真機測試) |

**`neck-release.html` 的 Offer 組成(程式碼層級):**
其 `data-lead-name` 為 `AI posture assessment + 1-on-1 neck release`,`data-line-message` 為「我想了解 AI 體態檢測＋一對一肩頸調整 NT$1,500」 — 即**程式碼層級為「檢測＋調整」的組合方案(bundle)**,而非單一肩頸服務。
> ⚠️ **此 bundle 是否為現行正式 Offer,未經確認。** 依商業事實強制詢問規則,涉及此方案的判斷須先問使用者。

---

## 7. LINE

- **LINE OA ID:** `@561wigip`(`site.js` 內 `LINE_OA_ID`)
- **LINE_URL(一般 fallback):** `https://lin.ee/5rWzdNd`
- **oaMessage 預填機制:** 已實作。頁面於 `<body>` 設定 `data-line-message` 時,點擊 LINE 按鈕會改開 `https://line.me/R/oaMessage/@561wigip/?<預填文字>`;未設定則走一般 `LINE_URL`
- **site.js 實際邏輯:**
  - 所有 `a.js-line` 按鈕統一攔截點擊
  - 讀取 `data-lead-value`(預設 199)、`data-lead-name`(預設「LINE AI posture assessment reservation」)、`data-lead-category`(預設「AI posture assessment」)
  - 讀取 `data-line-event`(預設「Lead」,可覆寫為「Contact」等)決定 Meta Pixel 事件類型
  - 先送 GA4 `line_reservation_click` + Meta Pixel 事件,**400ms 後**才開啟 LINE 連結
- **有 `data-line-message` 的頁面(4 頁):** `assessment.html`、`assessment-v3.html`、`neck-release.html`、`neck-release-v3.html`
- **有 `data-lead-value` 的頁面(3 頁):** `assessment-v3.html`、`neck-release.html`、`neck-release-v3.html`
- **有 `data-line-event` 的頁面(1 頁):** 僅 `neck-release.html`(值為 `Contact`)
- **走一般 `LINE_URL`(無預填)的頁面:** `assessment-v2.html`、`neck-release-v1.html`,以及其餘未設定此屬性的一般頁面

**現行預填訊息全文(實查):**
| 頁面 | data-line-message |
|---|---|
| `assessment.html` | 我想了解 AI 體態檢測 NT$199(V1) |
| `assessment-v3.html` | 我想了解 AI 體態檢測 NT$199(V3) |
| `neck-release.html` | 我想了解 AI 體態檢測＋一對一肩頸調整 NT$1,500 |
| `neck-release-v3.html` | 我想了解一對一肩頸調整 NT$1,200(V1) |

> **注意:** 預填訊息目前只能分辨「**哪一頁 / 哪個方案 / 哪個商業版本**」,**無法分辨「哪一則廣告」**。廣告層級歸因缺口見第 8 節。

- **✅ 2026-08-14 已驗證(手機實測,`neck-release.html`):** 點擊 LINE CTA 會正確開啟 `line.me/R/oaMessage/@561wigip/?...` 深連結,直接跳進「鑫彥瑜珈運動館」官方帳號(manager.line.biz 後台核對,300 位好友)聊天室,並成功帶入預填文字。
  > ⚠️ **桌機瀏覽器行為差異(非錯誤):** 同一連結在桌機瀏覽器(無 LINE 桌面 App)點擊會退回顯示 `line.me` 一般宣傳頁,不會開啟聊天室。這是 `oaMessage` 深連結在無 App 環境下的正常行為,**不代表帳號設定錯誤**,真實客群多為手機瀏覽器,以手機實測結果為準。
  > **尚待查核範圍:** 僅 `neck-release.html` 一頁完成手機實測;其餘頁面(`assessment.html` 等)LINE CTA 是否成功仍未驗證。

---

## 8. Tracking

- **GA4 Measurement ID:** `G-6X3PD7NMMG`
- **Meta Pixel ID:** `1594348069032790`

### 8.1 事件總表(2026-08-08 補齊)

| 事件 | 平台 | 觸發位置 | 參數 |
|---|---|---|---|
| `line_reservation_click` | GA4 | `site.js` — 所有 `a.js-line` 點擊 | `link_url` / `link_text` / `page_path` / `value` / `currency: TWD` |
| `Lead`(預設)或 `data-line-event` 覆寫值 | Meta Pixel | `site.js` — 所有 `a.js-line` 點擊 | `content_name` / `content_category` / `value` / `currency` |
| **`Lead`** | **Meta Pixel** | **`neck-release.html` 表單送出(正門)** | **`content_name: "neck v4 form reservation"` / `content_category: "1-on-1 neck & shoulder release"` / `value: 1500`** |
| **`generate_lead`** | **GA4** | **`neck-release.html` 表單送出(正門)** | **`value: 1500` / `currency: TWD` / `page_path`** |

> **補記說明(2026-08-08):** 上表後兩列為前一版本**遺漏**的事件。這是「表單正門」的轉換路徑,是廣告優化最重要的訊號之一。
> **內部代號「neck v4」** 首次出現於此事件的 `content_name`,代表 `neck-release.html` 在內部為第 4 次迭代 — 與「檔名無版號」「商業無版號」皆不衝突,但對照數據時需知道此標記存在。

- **Value / Currency 覆寫機制:** 透過 `<body data-lead-value>` `data-lead-name` `data-lead-category` 逐頁覆寫,未設定時 fallback 199 / "AI posture assessment"
- **實作範圍:** 僅 Browser 端(client-side)GA4 gtag.js 與 Meta Pixel(fbq)
- **GTM:** **已實查確認全站不存在 GTM 容器代碼**(此項不再列為待確認)
- **Meta CAPI(server-side):** HTML 端確認無。**但 n8n 端是否有伺服端轉發,無法從 repo 判定,需外部查核**

### 8.2 n8n 表單收單(正門)

- **Webhook:** `https://melvinlin07-n8n.zeabur.app/webhook/neck-release-lead`
- **僅 `neck-release.html` 有表單**,全站其他頁面皆無
- **表單欄位:** `name`(姓名)、`phone`(手機,驗證 `/^09\d{8}$/`)、`time`(時段偏好)、`note`(自述狀況)
- **送出 payload:** `{ name, phone, time, note, page: location.pathname, source: 'neck-release', ts }`
- **✅ n8n workflow 內部結構已實查(2026-08-09,經本機 `n8n-cli`):** 名稱「一對一肩頸表單收單 (Webhook→Google試算表→LINE通知)」,id `GqeLtfOfJCHeNNoJ`,狀態 **active**。節點鏈:`表單送出`(webhook)→ `整理驗證`(手機格式 `/^09\d{8}$/`,不合丟 `INVALID_INPUT`)→ 分兩路並行:
  1. `整理Sheet欄位` → `寫入Google試算表`(operation `append`、`autoMapInputData`、documentId `1x8cfCEMnyh4D1vDdIHXa1bYoHlpsCSzX3KDIscwMtd4`)
  2. `讀LINE白名單`(dataTable)→ `組LINE推播` → `LINE推播發送`(LINE multicast)
- **Sheet 實際寫入 7 欄:** 姓名 / 手機 / 方便聯絡時段 / 肩頸困擾備註 / **來源頁面** / **來源版本** / 送出時間。
  > ⚠️ 「來源頁面 / 來源版本」**已在收集**,故「頁面 / 商業版本」層級的歸因其實已具備;§8.3 缺的僅是「哪一則**廣告**」層級。
- 執行成功與 LINE 通知送達的驗證見 §13 item 2。⚠️ 註:`組LINE推播` 在白名單無啟用收件人時回傳空陣列、該次執行**仍記為 `success`**,故未來單看執行狀態不代表 LINE 必定送出。

### 8.3 ⚠️ 已知歸因缺口(實查結論)

> **全站沒有任何 UTM / query string / referrer 讀取邏輯。**
> 實查確認:`URLSearchParams`、`location.search`、`utm_`、`document.referrer` 在全部 96 個 HTML 與 `site.js` 中**皆不存在**。
> 表單 payload 的 `page` 僅為 `location.pathname`(**不含 query string**),`source` 為寫死字串 `'neck-release'`。
>
> **2026-08-14 部分緩解(僅 GA4 層級,未動網站程式碼):** 已在 Meta Ads Manager 中,對當下唯一在投的廣告(2026.08.11-新的開發潛在lead-38-58-(6心理)-鑫彥3KM-20萬,廣告 ID `120254482908190350`)的「網址參數」欄位設定 `utm_source=facebook&utm_medium=paid-social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.name}}`,GA4 可依此拆廣告活動/組合/廣告名稱看流量。
> **僅套用於這一則廣告,非帳戶層級預設**——之後新建廣告需另外設定或用「建立複本」延續。此舉**不解決** lead 層級歸因(見上方候選方案②,仍需改 `site.js`,尚未採用)。
>
> **新廣告要貼的網址參數(複製下面這串,貼到該廣告編輯畫面的「網址參數」欄位):**
> ```
> utm_source=facebook&utm_medium=paid-social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.name}}
> ```
> 從零建立的新廣告需手動貼;用「建立複本」複製已貼過的廣告則會自動延續,不用重貼。

**影響:** 漏斗第一層「廣告 → Lead」**目前完全無法歸因**。現況只能知道 lead 來自哪一頁,**無法知道來自哪一則廣告、哪一組受眾**。
對應的候選解法見第 11 節(尚未採用)。

---

## 9. 高影響共用檔案(改一次影響很多頁)

| 檔案 | 實際影響範圍 |
|---|---|
| `site.js` | **110 頁**(2026-08-21 實查)的 LINE 按鈕邏輯、GA4 載入、Meta Pixel 載入、行動選單。未引用者:`google0081f56f050ce756.html`、`guide.html` |
| `theme.css` | **107 頁**(2026-08-21 實查)視覺樣式。**不影響** `assessment-v3.html`、`assessment-v4.html`、`neck-release-v3.html`(自帶內嵌樣式)、`google0081f56f050ce756.html` |
| `sitemap.xml` / `robots.txt` | 全站 SEO 索引範圍(現況 100 條 `<loc>`,見第 2 節) |

---

## 10. Business Context(商業事實)

> ⚠️ **本節內容由使用者提供,repo 永久無法驗證。** 本節所有價格與方案**不是永久真相**,實際以當下營運設定為準。

### 10.1 真正的獲利引擎

```
體驗 / 檢測 / 一對一入口 → 到店建立信任 → 轉成持續上課會員
```

**網站上的 NT$199、NT$699、NT$1,500 不等於整個瑜伽館的營收模型。**
前端低價體驗、AI 體態檢測、個別體驗方案,本質上是**新客入口**,不是最終營收終點。

**會員主方案(依使用者陳述):**

| 方案 | 堂數 | 平均單堂 | 推算總價(參考值) |
|---|---|---|---|
| 3 個月 | 12 堂 | 約 NT$350 | 約 NT$4,200 |
| 6 個月 | 24 堂 | 約 NT$300 | 約 NT$7,200 |

> **「推算總價」為依平均單堂價格 × 堂數推算的參考值,不是唯一正式定價。** 正式方案價格屬商業狀態,需以當下營運設定為準。

**做 ROI / 廣告 / Landing Page / 轉換分析時,必須區分三層:**
1. 前端引流收入
2. 真正會員轉換
3. 後續續課 / 會員價值

**不能只看 Landing Page 上的 Lead value。** `data-lead-value` 是回傳給廣告平台的**訊號值**,與真實營收是兩件事。

### 10.2 產能限制(實體服務硬限制)

| 項目 | 現況 |
|---|---|
| 單間教室容納上限 | 約 16 人 |
| 現有會員數 | 約 60–65 人 |
| 每週堂數 | 約 13 堂 |
| 班級利用率 | **不同老師差異很大** — 有些班接近滿,有些班仍有明顯空位 |
| 一對一體驗每週上限 | **未固定寫死**,依老師時段與排課調整 |

> **⚠️ 優先順序更新(2026-08-09):** 使用者於本次對話明確表示,**現階段目標是「有沒有更多人找到我」,不擔心教室滿載、Lead 接不住的問題**。原本記錄於此的「現階段不是 Lead 越多越好」保守結論,**已由使用者當面推翻,以此次確認為準**。詳見 `DECISIONS.md` 第 14 條。
>
> 上方產能數字(教室 16 人、會員 60–65 人、每週 13 堂)**仍是事實**,保留供未來排課、時段媒合、新客能否轉成適合會員等判斷參考,**但不再作為「應限制廣告量 / 不宜衝 Lead」的推論依據**。

### 10.3 核心客群

**現階段最重要的核心客群:40–60 歲女性,近期廣告與服務溝通尤其聚焦約 43–55 歲。**

常見切入問題:
- 肩頸反覆緊
- 圓肩 / 駝背
- 久坐後身體卡
- 下背、髖部、骨盆與代償問題
- 身體開始出現「以前做得到、現在變困難」的感覺

**定位核心:** 不是吸引所有想學瑜伽的人,而是吸引**「已經感覺身體有問題,但不知道真正原因」**的人。

**現階段不優先(資源不分散至此):**
- 兒童 / 學生市場
- 純競技型或高難度瑜伽族群
- **把服務包裝成醫療、復健、治療**(定位與合規紅線)
- 為了追求流量而做完全不符合目前主要客群的內容

> **重要區分:** 網站 Blog **可以**涵蓋較廣題材(目前 46 篇涵蓋久坐、產後更年期、銀髮、學生書包等)。**但廣告與主要 Offer 不代表要平均服務所有文章客群。不得從 blog 主題反推廣告客群。**

### 10.4 成交路徑(人工為主)

```
廣告 / 網站
  → LINE 或表單
  → 確認需求(人工)
  → 說明適合的體驗(人工)
  → 約時間(人工)
  → 視方案要求訂金 / 付款
  → 到店體驗
  → 體驗後再決定是否轉正式會員或後續方案
```

- **目前主要成交仍是人工完成,不是網站自動成交。**
- LINE、Google Form / 表單、n8n 等工具僅協助**承接**,真正的需求確認、預約與成交仍有人工作業。
- **已驗證的營運教訓:** 完全不收訂金會出現「預約後不到店」的情況,因此**部分一對一 / 體驗方案採用預付訂金保留時段**。

### 10.5 真實漏斗(判斷商業成效的唯一依據)

```
廣告 → 點擊 → 詢問 / 表單 → 實際預約 → 到店 → 成交 / 轉會員
```

**判定瓶頸必須拆成四層分開看:**
1. 廣告是否帶來**對的人**
2. Lead 是否願意**進一步預約**
3. 預約後是否**真的到店**
4. 到店後是否**轉成會員**

**指標使用規範:**
- CTR、CPC、每則訊息成本 = **前端**判斷指標,可用
- **但不能單獨宣告商業版本勝出**
- **沒有**永久固定的「跑 X 天 / X 筆資料就一定判勝負」規則,依每次測試目的與樣本量判斷

> ⚠️ **不得看到 Lead 成本就直接判定漏斗好或壞。** 要判斷真正瓶頸,必須拿到實際 Lead → 預約 → 到店 → 成交 四層數據;拿不到時應標記「資料不足,無法判定」。

### 10.6 現況限制

**目前 Lead → 預約 → 到店 → 成交 四層數據尚未完整串起來,不存在於任何已知系統中。**
這是目前所有廣告與轉換判斷的根本限制。

### 10.7 在地搜尋 / Google 商家檔案

#### ⚠️ Google 評價 = Dynamic Business Fact(會隨時間變動,不得當成永久固定事實)

| 項目 | 目前值 |
|---|---|
| Google 評分 | **4.9★** |
| Google 評價數 | **88 則** |
| 最後人工查核日期 | **2026-08-17**(使用者提供 Google 商家搜尋結果截圖佐證) |
| 性質 | **Dynamic Business Fact** |
| Source of Truth | **Google 商家目前公開頁面 / 商家後台**(不是 repo、不是本文件) |

**變動證據:** 2026-08-09 查核為 87 則 → 2026-08-17 為 88 則。8 天內即變動,證明此數字必然持續變化。

**規則(強制):**

1. 未來若網站頁面、schema、Landing Page 之間出現**不同的評價數**,**不得自行判斷哪一個舊數字正確**,也不得取「多數決」。
2. 一律**重新查核 Google 商家的最新公開數字**,再以該數字**同步更新全站所有頁面與 schema**,並更新本表的查核日期。
3. 更新時需涵蓋**兩種寫法**,否則會漏改:
   - 純文字:`88 則真實好評`、`88 則評論`
   - 被標籤切開:`<b>88</b>則…`、`<b>88</b><span>則…</span>`
4. schema `reviewCount` 與頁面可見文字**必須一致**(不一致會讓 Google 收到與畫面不符的結構化資料)。

**2026-08-17 同步紀錄:** 全站 11 個檔案已統一為 88(schema 4 處:`index.html`、`about.html`、`contact.html`、`reviews.html`;可見文字:`index.html`、`about.html`、`classes.html`、`reviews.html`、`assessment.html`、`assessment-v2.html`、`assessment-v3.html`、`neck-release.html`、`neck-release-v1.html`、`neck-release-v3.html`)。修正前站上同時存在 **75 與 79 兩種數字**(`assessment.html` 內部即自相矛盾:hero 寫 79、trust band 寫 75)。
> ⚠️ 僅完成本機檔案修改,**尚未 commit / push / 部署**。

- **Google 商家檔案(Google Business Profile)狀態:已認領**(使用者 2026-08-09 口頭確認,並提供商家後台截圖佐證:「鑫彥瑜珈運動館」,4.9 星、87 則 Google 評論)。實際優化程度(照片、貼文頻率、分類是否正確)**未查核**。
- **✅ 2026-08-09 已修正:** 透過公開 Google 地圖搜尋比對地址(新庄仔路726號3樓)確認商家 CID 為 `3869696325150721929`。已將 `contact.html` 的地圖 iframe 由通用地址查詢改為此 CID 的直接嵌入,並在 `contact.html`(2 處)與 `index.html`(1 處)的 `sameAs` 陣列加入 `https://maps.google.com/?cid=3869696325150721929`(與原有 Facebook 連結並存,未取代)。詳見 `DECISIONS.md` 第 15 條。
  > ⚠️ **僅完成本機檔案修改,尚未 commit / push / 部署。** 依 `CLAUDE.md` 部署紀律,需使用者另行明確指示才會執行。

---

## 11. Capability Opportunities(候選方案 — **尚未採用**)

> ⚠️ **本節全部項目均為 Phase 3 Capability Discovery 找出的候選方案,狀態一律為「尚未採用」。**
> **這些不是已做出的決策,不得寫入 `DECISIONS.md`,也不得視為已排定的工作。**
> 只有使用者未來明確決定採用某一項時,才會新增進 `DECISIONS.md`。

### 高優先候選

**① 四層漏斗台帳(Lead → 預約 → 到店 → 成交 / 會員)**
- **做法:** 在既有 Google Sheet(n8n 已在寫入)加上 `是否預約` / `是否到店` / `是否成交` / `會員方案` 四個狀態欄,以資料驗證下拉選單人工回填
- **解決:** 第 10.6 節的根本限制 — 四層數據目前不存在
- **成本:** 極低。不動網站程式碼、不動 n8n 流程。真正成本是人工回填紀律
- **風險:** 依賴人工回填;表內含姓名＋手機屬個資,**Sheet 分享權限需收斂**;LINE 側門進來的 lead 不會自動進表,需人工補登或改用 LINE OA 原生標籤標記
- **付費:** 免費(使用既有工具)
- **狀態:** ✅ **已採用(2026-08-09)** — 已轉為決策,見 `DECISIONS.md` 第 13 條。實際建欄由使用者於 Google Sheet 端執行。

**② 廣告來源歸因(UTM / oaMessage / n8n)**
- **做法:** 讀取 URL 參數 → 附加至 LINE 預填訊息尾端(極短碼)+ 一併寫入 n8n payload
- **解決:** 第 8.3 節的歸因缺口 — 目前無法分辨 lead 來自哪一則廣告
- **成本:** 低但非零。⚠️ **需修改 `site.js`(高風險檔,94 頁引用)→ 依 `CLAUDE.md` 必須先出影響範圍報告並取得確認才能動手**
- **風險:** 預填訊息會被客人看到,參數需極短;客人手動刪除該段文字則此筆歸因失效
- **付費:** 免費
- **狀態:** **尚未採用**

**④ Google 商家檔案(GBP)連結強化**
- **做法:** 將 `contact.html` 的地圖改為連到已認證商家檔案的 Place ID 連結;結構化資料 `sameAs` 加入 Google 商家檔案網址
- **解決:** 第 10.7 節發現的缺口 — 目前網站與已認領的 Google 商家檔案之間**沒有明確的技術連結**,可能削弱在地搜尋(Google 地圖 / local pack)的訊號強度
- **成本:** 低,僅需商家檔案的公開連結網址,改動範圍限於 `contact.html` 與各頁共用 schema
- **狀態:** ✅ **已採用(2026-08-09)** — 已轉為決策並執行,見 `DECISIONS.md` 第 15 條與 `PROJECT.md` §10.7。**僅完成本機修改,尚未部署。**

### 中期候選

**③ Meta Custom Audience / Lookalike**
- **做法:** 排除現有會員不重複投放;以**真正成交轉會員者**(而非 Lead 名單)建立相似受眾
- **解決:** 對應第 10.2 節產能限制 — 要對的人而非更多人
- **依賴:** **需先有 ① 與 ② 建立乾淨的成交資料**,故列為中期候選,不宜現在啟動
- **樣本門檻:** ⚠️ **不記錄固定數字。Meta 的受眾樣本門檻需於實際使用時查閱當下官方規則**
- **風險:** ⚠️ 上傳客戶名單涉及個資,須先確認隱私政策涵蓋範圍與客戶同意 — **本項為三者中唯一具合規風險者**
- **付費:** Meta 原生功能免費(廣告費用另計)
- **需外部查核:** 目前是否已在使用 → 需查 Meta Ads 後台
- **狀態:** **尚未採用(中期候選)**

### 依賴關係

```
① 台帳(記錄「結果」)
   └─→ ② 來源碼(記錄「來源」)
          └─→ ①+② 合起來 = 每則廣告的真實到店率 / 成交率
                 └─→ ③ 以真實成交名單優化投放
```

> 只做 ② 不做 ① = 知來源但不知結果,無法判斷好壞。
> 只做 ① 不做 ② = 知結果但不知來源,無法優化廣告。

---

## 12. Existing Data Not Yet Used(已存在但尚未利用的資料)

| 項目 | 現況 |
|---|---|
| **表單時段偏好** | `neck-release.html` 表單的 `time` 欄位已在收集「上午(09–12)/ 下午(12–17)/ 晚上(17–20)/ 都可以」,並已隨 payload 送入 n8n。目前未見用於排課或產能媒合 |
| **10 張 ChatGPT 圖片素材** | 已存放於 `assets/`,未被任何 HTML 引用 |

> 本節僅記錄「已存在但未利用」的事實,不展開建議。

---

## 13. External Verification Needed(需外部查核 / 尚未驗證)

> 以下項目**無法由 repo 驗證**,需外部系統、後台或實測確認。
> 部分項目(如廣告投放狀態)為**常設查核項**,非一次性 TODO,不會被「結案」。

### 技術實測類
1. ~~GitHub Pages 部署是否等於 repo~~ → ✅ **2026-08-09 已驗證一致**(線上 `site.js?v=5`、GA4/Pixel、body `data-*`、表單四欄、webhook URL 全吻合)
2. ~~n8n webhook 是否實測跑通~~ → ✅ **2026-08-09 已驗證**:endpoint 回 `200 {"ok":true}`、CORS preflight 正確放行正式網域(`Access-Control-Allow-Origin: https://sinyanyoga.com.tw`)、表單送出後 Google 試算表新增列 + LINE 通知皆成功(使用者確認)
3. `neck-release.html` 表單送出的 Meta Pixel `Lead` 與 GA4 `generate_lead` — 程式碼已確認接線(`neck-release.html:900-901`),webhook 收單鏈已驗證;但**客戶端事件實際發射尚未直接觀測**(2026-08-09 瀏覽器實測被安全閘擋下)。⚠️ 結構性風險仍在:`done()` 於 fetch 失敗時仍會發射事件(`neck-release.html:912`),webhook 若曾故障會誤報成功
4. 全站 LINE CTA 真機測試狀態 → **`neck-release.html` 已於 2026-08-14 手機實測通過**(詳見第 7 節);**其餘頁面仍未驗證**

### 外部後台類(常設查核項)
5. **各 Landing Page 目前是否仍有 Meta 廣告投放 → 一律以當下 Meta Ads 後台為準,本文件不寫死**
6. Meta Custom Audience / Lookalike 是否已在使用
7. 是否存在伺服端 Meta CAPI(HTML 端確認無,n8n 端無法判定)

### 商業狀態類(依商業事實強制詢問規則,衝突時以使用者為準)
8. 目前現場的正式售價與 Offer 組合
9. `neck-release.html` 的組合方案(bundle)是否為現行正式 Offer
10. 各老師 / 各時段的實際利用率分布
11. Lead → 預約 → 到店 → 成交 四層實際數據(**目前不存在於任何系統**)
12. 會員方案推算值(約 NT$4,200 / NT$7,200)僅為參考值,非正式定價

### 歷史待釐清
13. commit `eb188e2` 訊息稱「取代原三個實驗版」,但 repo 中僅發現 `neck-release-v1.html`、`neck-release-v3.html` 兩個檔案,第三版是否曾存在後被刪除

### 待你決定
14. `neck-release-v3.html` canonical 指向自己是否為刻意設計,或需修正指回 `neck-release.html`
15. `styles.css`(0 引用的 legacy 檔)是否封存 / 刪除
16. 舊 Landing Page(`assessment-v2/v3`、`neck-release-v1/v3`)是否下線 — **須先確認廣告投放狀態,不得由 repo 推論**
17. Google 商家檔案的公開連結網址(供 ④ 候選方案使用,§11)
