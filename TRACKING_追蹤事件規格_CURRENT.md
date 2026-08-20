# TRACKING_追蹤事件規格_CURRENT

更新日期：2026-08-20
狀態：CURRENT
Phase 1：已完成並正式部署
正式站：https://sinyanyoga.com.tw
Phase 1 commit：`e943fc9`

---

## 1. 目的

這份文件是鑫彥瑜珈網站 Meta / LINE 追蹤事件的唯一現行規格（Single Source of Truth）。

所有新 Landing Page、LINE CTA、Meta tracking 修改，在實作前都應先依本文件判斷事件語意，不要自行發明新的事件名稱或放寬既有定義。

核心原則：

> 事件名稱代表「使用者做了多深的承諾」，不是單純代表按鈕所在頁面或版本。

---

## 2. 現行事件語意

| 使用者行為 | Meta 事件 | 商業意義 |
|---|---|---|
| 看頁面 | `PageView` | 有到站 |
| 點任何 LINE CTA | `LineClick` | 願意從網站進一步到 LINE |
| 點「一般詢問 / 想了解」LINE CTA | `LineClick` + `cta_purpose=contact` | 有興趣，但尚未明確預約 |
| 點「明確預約」LINE CTA | `LineClick` + `ReservationIntent` | 已表達明確預約意圖 |
| 未分類的舊 LINE CTA | `LineClick` + `cta_purpose=unclassified` | 已點 LINE，但尚未完成人工分類 |
| 真正完成站內預約表單 | `Lead` | 真正留下預約資料 |
| 真正確認預約 | `Schedule` | Phase 3，尚未實作 |
| 真正付款 | `Purchase` | Phase 3，尚未實作 |

---

## 3. ReservationIntent 的嚴格定義

`ReservationIntent` 只能在 CTA 本身已清楚表達「我要預約」時觸發。

### 可以算 ReservationIntent

- 我要預約
- 立即預約
- 預約 AI 體態檢測
- 保留 NT$199 體驗
- 立即保留名額

### 不可以算 ReservationIntent

- 我想了解更多
- 加 LINE 聊聊
- 我想先問老師
- 我想看清楚自己的結果
- 我想了解 AI 體態檢測

原則：

> 「想了解」≠「想預約」。

不要為了增加事件數量而放寬 `ReservationIntent` 定義。

---

## 4. Phase 1 已部署頁面與事件對照

### assessment.html

目前 7 顆 LINE CTA 都屬於明確預約。

觸發：

- `LineClick`
- `ReservationIntent`
- Legacy `Lead`（Phase 1 過渡期暫時保留）

新事件參數包含：

- `cta_purpose=reservation`
- `cta_location`
- `offer=ai_assessment`
- `value=199`（ReservationIntent）
- `currency=TWD`（ReservationIntent）
- `page_path`

### assessment-v3.html

2 顆 CTA：final CTA / dock。

觸發：

- `LineClick`
- `ReservationIntent`
- Legacy `Lead`（暫時保留）

用途：AI assessment NT$199 明確預約。

### assessment-v4.html / assessment-v4.js

兩顆結果 CTA visible text：

> 我想看清楚自己的結果 →

LINE 預填訊息：

> 我想了解 AI 體態檢測 NT$199（V4）

判定：**contact，不是 reservation**。

觸發：

- `LineClick`（`cta_purpose=contact`）
- Legacy `V4LineClick`
- Legacy `Lead`
- **不觸發 `ReservationIntent`**

### neck-release.html —「加 LINE 聊聊」

判定：contact。

觸發：

- `LineClick`
- Legacy `Contact`
- **不觸發 `ReservationIntent`**

參數：

- `cta_purpose=contact`
- `cta_location=side_line_chat`

### neck-release.html — 真正送出預約表單

觸發：

- `Lead`

不觸發：

- `LineClick`
- `ReservationIntent`

現行 Lead 參數包含：

- `content_name=neck v4 form reservation`
- `value=1500`
- `currency=TWD`

---

## 5. 其他既有網站頁面

其他尚未逐頁分類的既有 `.js-line` CTA：

- 會送 `LineClick`
- `cta_purpose=unclassified`
- 不會自動觸發 `ReservationIntent`
- 原本的 legacy Lead / Contact 行為在 Phase 1 過渡期仍可能存在

這是刻意的 backward compatibility 設計。

舊頁面不必一次全部重做，但所有**新 Landing Page** 不得帶著 `unclassified` 正式投廣告。

---

## 6. 新 Landing Page 固定規則

任何新 LP 上線前，都必須先把每顆 LINE CTA 分類。

### 一般詢問 CTA

使用者語意：想問、想了解、想聊天。

追蹤：

- `LineClick`
- `cta_purpose=contact`

不得觸發：

- `ReservationIntent`

### 明確預約 CTA

使用者語意：已經準備預約、保留名額或體驗。

追蹤：

- `LineClick`
- `ReservationIntent`
- `cta_purpose=reservation`

若有明確 Offer，可帶：

- `offer`
- `value`
- `currency`

### 事件命名規則

新 LP 不得自行建立：

- `V5LineClick`
- `NeckLineClick`
- `SeniorLineClick`
- 其他按頁面版本命名的新 click event

統一沿用：

- `LineClick`
- `ReservationIntent`
- `Lead`

頁面、版本、CTA 位置、Offer 用 parameters 區分。

---

## 7. 建議參數規格

### LineClick

建議參數：

- `page_path`
- `cta_location`
- `cta_purpose`
- `offer`（適用時）

一般 LineClick 不應預設帶：

- `value=199`
- `content_name=LINE AI posture assessment reservation`

除非該 CTA 本身確實屬於該 Offer。

### ReservationIntent

建議參數：

- `page_path`
- `cta_location`
- `offer`
- `value`（有明確價格時）
- `currency`（有 value 時）

---

## 8. 新 LP Release Gate

新 Landing Page 正式投廣告前必須確認：

1. `PageView` 正常。
2. 所有 LINE CTA 都會送 `LineClick`。
3. 每顆 LINE CTA 已分類為 `contact` 或 `reservation`。
4. 新 LP 不允許 `cta_purpose=unclassified` 後直接投廣告。
5. `ReservationIntent` 只出現在明確預約 CTA。
6. `page_path`、`cta_location`、`offer` 等參數正確。
7. 沒有 duplicate firing。
8. 正式站 Meta request / Test Events 驗證通過後才開始投放。

---

## 9. Phase 1 正式驗證結果

日期：2026-08-20
Commit：`e943fc9`

正式站透過真實 Chrome 驗證 Meta `/tr` request：

### 情境 A — assessment.html 明確預約 CTA

- `PageView` ×1
- `Lead` ×1（legacy）
- `LineClick` ×1
- `ReservationIntent` ×1
- 無 duplicate

### 情境 B — assessment-v4 結果 CTA

- `PageView` ×1
- `V4LineClick` ×1（legacy）
- `Lead` ×1（legacy）
- `LineClick` ×1（contact）
- `ReservationIntent` = 0

### 情境 C — neck-release「加 LINE 聊聊」

- `PageView` ×1
- `Contact` ×1（legacy）
- `LineClick` ×1（contact）
- `ReservationIntent` = 0

### 情境 D — neck-release 表單完成

- `Lead` ×1
- `LineClick` = 0
- `ReservationIntent` = 0

Phase 1 正式狀態：**COMPLETE**。

---

## 10. 過渡期說明

Phase 1 採 Parallel Run / Shadow Tracking。

因此舊事件暫時保留：

- broad legacy `Lead`
- `Contact`
- `V4LineClick`

目的：避免直接改變目前使用 `Lead` 最佳化的 Meta 廣告組，並提供新舊事件並行比較基準。

不要把過渡期的 `Lead` 當成乾淨的「真正 Lead」。

---

## 11. Roadmap

### Phase 1 — COMPLETE

網站端事件語意整理：

- `LineClick`
- `ReservationIntent`
- CTA purpose / location / offer parameters

### Phase 2 — 尚未開始

目標：把網站 session / 廣告來源與 LINE 裡的真人串起來。

預計方向：

- RID（自有追蹤 ID）
- UTM
- LINE 預填訊息帶 RID
- 後續評估 `_fbp` / `_fbc`

進入條件：Phase 1 正式流量跑穩並完成 7–14 天驗證。

### Phase 3 — 尚未開始

目標：把真實商業結果送回 Meta。

預計方向：

- Google Sheet / 預約紀錄
- n8n
- Meta Conversions API
- `Schedule`
- `Purchase`

原則：

- `Schedule` = 雙方真的確認預約時間
- `Purchase` = 真正收到款項
- 不需要購物車才能回傳 Purchase

---

## 12. 不可破壞的核心規則

1. 不要把「想了解」算成 `ReservationIntent`。
2. 不要把所有 LINE click 都永久當成 `Lead`。
3. 不要為每個 LP 版本自行創新的 click event。
4. 新 LP 上線前必須完成 CTA 分類與 tracking QA。
5. 事件設計以「商業意圖深度」為準，不以頁面名稱為準。
6. Phase 2 / 3 在 Phase 1 驗證完成後再做，不一次全部重構。
