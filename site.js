/* Shared site scripts.
   Update LINE_URL to change all LINE reservation buttons. */
var LINE_URL = "https://lin.ee/5rWzdNd";
var LINE_OA_ID = "@561wigip";
var GA_MEASUREMENT_ID = "G-6X3PD7NMMG";
var META_PIXEL_ID = "1594348069032790";

window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); }

(function loadGoogleAnalytics() {
  var script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
  document.head.appendChild(script);

  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID);
})();

(function loadMetaPixel() {
  if (window.fbq) return;

  var fbq = window.fbq = function () {
    fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
  };
  if (!window._fbq) window._fbq = fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];

  var script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  fbq("init", META_PIXEL_ID);
  fbq("track", "PageView");
})();

document.addEventListener("DOMContentLoaded", function () {
  // LINE reservation buttons
  document.querySelectorAll("a.js-line").forEach(function (a) {
    a.href = LINE_URL;
    a.target = "_blank";
    a.rel = "noopener";
    a.addEventListener("click", function (event) {
      event.preventDefault();

      // 每頁可用 <body data-lead-value / data-lead-name / data-lead-category> 覆寫；
      // 未設定時沿用預設（AI 體態檢測、199），確保其他既有頁面行為不變。
      var body = document.body;
      var leadValue = Number(body.getAttribute("data-lead-value")) || 199;
      var leadName = body.getAttribute("data-lead-name") || "LINE AI posture assessment reservation";
      var leadCategory = body.getAttribute("data-lead-category") || "AI posture assessment";
      // 頁面可用 <body data-line-event="Contact"> 把 LINE 點擊降級成「詢問」事件，
      // 讓真正的轉換（如站內表單）保留 Lead 給廣告優化用。未設定時維持原行為（Lead），不影響其他既有頁面。
      var lineEventName = body.getAttribute("data-line-event") || "Lead";

      gtag("event", "line_reservation_click", {
        link_url: LINE_URL,
        link_text: a.textContent.trim(),
        page_path: window.location.pathname,
        value: leadValue,
        currency: "TWD"
      });
      fbq("track", lineEventName, {
        content_name: leadName,
        content_category: leadCategory,
        value: leadValue,
        currency: "TWD"
      });

      // ── Phase 1 shadow events (migration, does not replace legacy Lead/Contact above) ──
      // Button-level classification takes priority; unclassified buttons still get LineClick
      // (with no offer/value guessing) but never ReservationIntent.
      var linePurpose = a.getAttribute("data-line-purpose") || "";
      var ctaLocation = a.getAttribute("data-cta-location") || "unspecified";
      var offer = a.getAttribute("data-offer") || "";

      var lineClickParams = {
        page_path: window.location.pathname,
        cta_location: ctaLocation,
        cta_purpose: linePurpose || "unclassified"
      };
      if (offer) lineClickParams.offer = offer;
      fbq("trackCustom", "LineClick", lineClickParams);

      // ReservationIntent requires the button's own explicit reservation wording
      // (data-line-purpose="reservation"), never inferred from the offer/destination alone.
      if (linePurpose === "reservation") {
        var reservationParams = {
          page_path: window.location.pathname,
          cta_location: ctaLocation
        };
        if (offer) reservationParams.offer = offer;
        var offerValue = a.getAttribute("data-offer-value");
        if (offerValue) {
          reservationParams.value = Number(offerValue);
          reservationParams.currency = "TWD";
        }
        fbq("trackCustom", "ReservationIntent", reservationParams);
      }

      // 若頁面 <body> 設定 data-line-message，開啟 LINE 官方帳號聊天室並預填該文字；
      // 未設定時維持原行為（開啟 LINE_URL），不影響其他既有頁面。
      var lineMessage = body.getAttribute("data-line-message");
      var openUrl = lineMessage
        ? "https://line.me/R/oaMessage/" + encodeURIComponent(LINE_OA_ID) + "/?" + encodeURIComponent(lineMessage)
        : LINE_URL;

      window.setTimeout(function () {
        window.open(openUrl, "_blank", "noopener");
      }, 400);
    });
  });

  // Mobile menu
  var t = document.querySelector(".nav-toggle");
  var m = document.getElementById("menu");
  if (t && m) {
    t.addEventListener("click", function () { m.classList.toggle("open"); });
    m.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { m.classList.remove("open"); });
    });
  }
});
