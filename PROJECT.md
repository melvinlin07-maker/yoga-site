# PROJECT.md — 鑫彥瑜珈網站 事實與系統地圖

> 建立基準:git HEAD `155a93b`(2026-08-07),盤點時 working tree 乾淨、與 `origin/main` 完全同步(0 ahead / 0 behind)。
> 本檔案只記錄「已確認事實」。無法確認的項目一律標示 **TODO / 待確認**,不寫成事實。

---

## 1. 專案基本資料

- **正式網域:** `sinyanyoga.com.tw`(見根目錄 `CNAME`)
- **部署方式:** GitHub Pages(repo: `melvinlin07-maker/yoga-site`)
- **Git 狀態基準:** branch `main`,HEAD `155a93b`「接上 n8n 表單收單，並分離 LINE 側門與表單正門的 Meta Pixel 事件」
- **TODO / 待確認:** GitHub Pages 實際部署內容是否等於 HEAD `155a93b`(本檔案基於「working tree 乾淨 + 已 push」推論一致,未直接查驗 Pages 部署紀錄)

---

## 2. Production(已正式上線 / 可公開索引)

以下頁面為公開、可被索引的正式頁面(HEAD `155a93b` 版本,96 個 HTML 檔案平鋪於根目錄,無子目錄):

- `index.html`(首頁)
- `assessment.html`(AI 體態檢測,正式引流頁)
- `neck-release.html`(一對一肩頸調整,正式頁,已整併取代舊實驗版,已接 n8n webhook)
- `about.html`、`about-poses.html`、`about-wall-rope.html`
- `classes.html`、`contact.html`、`know-yoga.html`、`practice-guide.html`
- `blog.html` + 50 篇 `blog-*.html` 文章
- 25 篇 `pose-*.html` 動作頁
- `reviews.html`、`resources.html`、`rental.html`
- `privacy.html`、`terms.html`、`disclaimer.html`

**共用檔案(Production,全站生效):**
- `site.js?v=5` — 94 頁引用(88 一般 + 6 defer),版本號一致
- `theme.css?v=10` — 93 頁引用,版本號一致
- `sitemap.xml`、`robots.txt`、`favicon.svg`
- `google0081f56f050ce756.html` — Google Search Console 驗證檔(不引用 site.js/theme.css,特例)

**Sitemap 收錄範圍(TODO:完整清單未逐條核對,以下為盤點時確認在內的關鍵頁):**
- `assessment.html`、`neck-release.html` 皆在 sitemap 內
- `assessment-v2/v3.html`、`neck-release-v1/v3.html` **不在** sitemap 內

---

## 3. Working tree(本機已修改、尚未 commit)

**現況:無修改中的網站程式碼。**

> 範圍澄清:此節的「乾淨」是指**盤點當下(HEAD `155a93b`)的網站程式碼**(HTML/CSS/JS/sitemap/robots 等),沒有 modified 或 staged 的檔案。**不包含**本次 checkpoint 產生的 `PROJECT.md`、`CLAUDE.md`、`DECISIONS.md` 本身——這三份文件建立後為 untracked 狀態,屬於文件層級的新增,不是「網站程式碼被修改」,詳見下方第 4 節。

---

## 4. Draft / Untracked(草稿,尚未進 git 歷史)

- `.claude/` — Claude Code 工具設定目錄,非網站內容
- `assets/ChatGPT Image 2026年8月5日 下午*.png` × 10 — 新圖片素材,**盤點時未被任何 HTML 檔案引用**,狀態為草稿,尚未套用到任何頁面
- `PROJECT.md`、`CLAUDE.md`、`DECISIONS.md` — 本次 checkpoint 新建立的三份文件本身,目前為 untracked,尚未 commit(不屬於網站程式碼,是專案治理文件)

---

## 5. Deprecated / Archived(已淘汰或待確認狀態)

| 項目 | 狀態 | 待確認事項 |
|---|---|---|
| `neck-release-v1.html` | commit eb188e2 訊息稱已被 `neck-release.html` 取代 | **TODO:** 是否仍有廣告流量 / 外部連結 / 使用者可直接開啟到此頁 |
| `neck-release-v3.html` | 同上,`noindex,nofollow`、canonical 指向自己(非 neck-release.html) | **TODO:** 同上;另外此頁定價 NT$1,200,與正式頁 NT$1,500 不同 — 可能代表不同時期或不同 Offer 的實驗版本,**非直接視為錯誤**,但需確認是否仍在使用中,若否應評估是否修正 canonical 或下線 |
| `assessment-v2.html` | `noindex,nofollow`,測試版,無 `data-lead-*` / `data-line-message` 設定(用 site.js 預設值) | **TODO:** 是否仍在使用;若是,詢問來源將無法從 LINE 訊息內容分辨版本 |
| `assessment-v3.html` | `noindex,nofollow`,測試版,已設定 `data-lead-*` 與 `data-line-message`(商業標記「V3」) | 使用狀態:TODO 待確認 |
| `guide.html` | 純 meta-refresh 轉址到 `know-yoga.html`,不在 sitemap、無內部連結指向它 | 功能正常,判斷為舊網址結構遺留的轉址樁,非錯誤,可保留 |
| `styles.css`(根目錄,54KB) | 盤點時**沒有任何 HTML 引用它** | **TODO:** 確認是否為遺留檔(可封存/刪除)或仍有隱藏用途 |
| `請先讀我.md` | 已被 `.gitignore` 排除,內容為專案最初期(5 頁骨架)說明,與現況嚴重不符 | 僅供歷史參考,不作為現況依據 |

---

## 6. Landing Page Registry

> 「檔名版本」與「商業測試版本」是兩件不同的事,**不可互相推論**:
> - 檔名版本(如 `-v1` `-v2` `-v3`)= 技術 / 檔案版本,反映建立順序
> - 商業版本(`data-line-message` 內文字如「V1」「V3」)= A/B 測試分組標記,由撰寫時刻意指定,兩者可能不一致,這是刻意設計,非錯誤

| 檔名 | 商業用途 | 價格 | 檔名版本 | 商業版本標記(data-line-message 內文字) | 公開/隱藏 | Sitemap | Canonical | Robots | data-lead-value/name/category | Git 狀態 | LINE CTA 真機測試 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `assessment.html` | AI體態檢測正式頁 | 原價699/首次199 | 無版號(正式頁) | 「V1」 | **公開正式頁** | ✅在 | 指向自己 | 可索引 | 未設定(用預設199) | 已commit已push | TODO 待確認 |
| `assessment-v2.html` | 測試版 | 199 | v2 | 無 data-line-message | 廣告隱藏頁 | 不在 | 指向 assessment.html | noindex,nofollow | 無(用預設199) | 已commit已push | TODO 待確認 |
| `assessment-v3.html` | 測試版(敘事型) | 199 | v3 | 「V3」 | 廣告隱藏頁 | 不在 | 指向 assessment.html | noindex,nofollow | 199 / AI posture assessment | 已commit已push | TODO 待確認 |
| `neck-release.html` | 一對一肩頸調整正式頁(整併取代舊實驗版) | 1500 | 無版號(正式頁) | 無版號字樣 | **公開正式頁** | ✅在 | 指向自己 | 可索引 | 1500 / 1-on-1 neck & shoulder release | 已commit已push,已接n8n webhook | TODO 待確認 |
| `neck-release-v1.html` | 舊實驗版 | 1500 | v1 | 無 data-line-message | 廣告隱藏頁(舊) | 不在 | 指向 neck-release.html | noindex,nofollow | 無 | 已commit已push | TODO 待確認 |
| `neck-release-v3.html` | 舊實驗版(敘事型) | 1200 | v3 | 「V1」(刻意的商業版本標記,與檔名版本不同) | 廣告隱藏頁(舊) | 不在 | 指向自己(非 neck-release.html) | noindex,nofollow | 1200 / 1-on-1 neck & shoulder release | 已commit已push | TODO 待確認 |

**TODO / 待確認(全部 landing page 共通):**
- 每一頁目前是否仍有廣告流量投放中
- 是否仍有外部連結(廣告後台、社群貼文等)指向舊版頁面
- LINE CTA 在正式頁上的真機測試是否已完成
- `neck-release-v3.html` canonical 指向自己是否為刻意設計,或需修正指回 neck-release.html(待你決定,見 DECISIONS.md)

---

## 7. LINE

- **LINE OA ID:** `@561wigip`(`site.js` 內 `LINE_OA_ID`)
- **LINE_URL(一般 fallback):** `https://lin.ee/5rWzdNd`
- **oaMessage 預填機制:** 已實作。頁面於 `<body>` 設定 `data-line-message` 時,點擊 LINE 按鈕會改開 `https://line.me/R/oaMessage/@561wigip/?<預填文字>`;未設定則走一般 `LINE_URL`
- **site.js 實際邏輯:**
  - 所有 `a.js-line` 按鈕統一攔截點擊
  - 讀取 `data-lead-value`(預設199)、`data-lead-name`(預設「LINE AI posture assessment reservation」)、`data-lead-category`(預設「AI posture assessment」)
  - 讀取 `data-line-event`(預設「Lead」,可覆寫為「Contact」等)決定 Meta Pixel 事件類型
  - 先送 GA4 `line_reservation_click` + Meta Pixel 事件,400ms 後才開啟 LINE 連結
- **有 `data-line-message` 的頁面:** `assessment.html`、`assessment-v3.html`、`neck-release.html`、`neck-release-v3.html`
- **走一般 `LINE_URL`(無預填)的頁面:** `assessment-v2.html`、`neck-release-v1.html`,以及其餘未設定此屬性的一般頁面
- **TODO / 待確認:** 哪些頁面已完成真機測試確認 LINE CTA 可正常開啟並預填成功;目前盤點範圍內**沒有找到任何測試紀錄或標記**,一律視為未驗證

---

## 8. Tracking

- **GA4 Measurement ID:** `G-6X3PD7NMMG`
- **Meta Pixel ID:** `1594348069032790`
- **事件:**
  - `line_reservation_click`(GA4,自訂事件,帶 `value` / `currency: TWD`)
  - Meta Pixel:`Lead`(預設)或頁面覆寫的 `data-line-event`(目前僅 `neck-release.html` 用「Contact」)
- **Value / Currency 覆寫機制:** 透過 `<body data-lead-value>` `data-lead-name` `data-lead-category` 逐頁覆寫,未設定時 fallback 199 / "AI posture assessment"
- **實作範圍:** 僅發現 Browser 端(client-side)GA4 gtag.js 與 Meta Pixel(fbq)。**沒有在 site.js 或各頁 `<head>` 中找到 GTM 容器代碼或 server-side CAPI 呼叫**
- **n8n:** `neck-release.html` 表單已接上 webhook `https://melvinlin07-n8n.zeabur.app/webhook/neck-release-lead`,依 commit 說明會寫入 Google 試算表並發送 LINE 通知
- **TODO / 待確認:**
  - 是否存在 GTM(本次掃描未發現,但不代表不存在於其他未掃描位置)
  - 是否存在 Meta CAPI(server-side)— 本次掃描未發現
  - n8n webhook 在正式環境是否已實測跑通(寫入試算表 + LINE 通知皆成功)

---

## 9. 高影響共用檔案(改一次影響很多頁)

| 檔案 | 影響範圍 |
|---|---|
| `site.js` | 全站 94 頁的 LINE 按鈕邏輯、GA4 載入、Meta Pixel 載入、行動選單 |
| `theme.css` | 全站 93 頁視覺樣式 |
| `sitemap.xml` / `robots.txt` | 全站 SEO 索引範圍 |

---

## 10. 全部 TODO / 待確認 清單(彙整)

> 上次盤點回報遺漏 2 項(見第 2 節 sitemap caveat、DECISIONS.md §7 的「三個實驗版」用詞矛盾),本次 consistency review 已補回,共 **11 項**。

1. GitHub Pages 實際部署內容是否等於 HEAD `155a93b`
2. Sitemap 完整清單未逐條核對,僅驗證了 `assessment*`、`neck-release*` 等關鍵頁是否在列(見第 2 節)
3. `neck-release-v1.html`、`neck-release-v3.html` 是否仍有廣告流量 / 外部連結 / 可被使用者直接開啟
4. `neck-release-v3.html` 的 NT$1,200 與正式頁 NT$1,500 差異是否代表刻意的不同時期 Offer(需你確認,非視為錯誤)
5. `neck-release-v3.html` canonical 指向自己是否為刻意設計
6. `assessment-v2.html`、`assessment-v3.html` 是否仍在使用中
7. `styles.css` 是否為遺留檔,可否封存/刪除
8. 全部 landing page 的 LINE CTA 真機測試狀態(目前全部未驗證)
9. n8n webhook 是否已在正式環境實測成功(寫入試算表 + LINE 通知皆成功)
10. 是否存在 GTM / Meta CAPI(本次掃描未發現,不代表不存在)
11. commit `eb188e2` 訊息稱「取代原三個實驗版」,但 repo 中僅發現 `neck-release-v1.html`、`neck-release-v3.html` 兩個檔案,第三版是否曾存在後被刪除(對應 DECISIONS.md §7)
