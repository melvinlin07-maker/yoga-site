/* 鑫彥瑜珈 — 共用腳本
   只要改這一行，全站「加 LINE」按鈕就會全部連過去 */
var LINE_URL = "https://lin.ee/5rWzdNd";
var GA_MEASUREMENT_ID = "G-6X3PD7NMMG";
var META_PIXEL_ID = "1014795777662144";

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
  // 全站 LINE 按鈕
  document.querySelectorAll("a.js-line").forEach(function (a) {
    a.href = LINE_URL; a.target = "_blank"; a.rel = "noopener";
    a.addEventListener("click", function () {
      gtag("event", "line_reservation_click", {
        link_url: LINE_URL,
        link_text: a.textContent.trim(),
        page_path: window.location.pathname
      });
      fbq("track", "Lead", {
        content_name: "LINE AI posture assessment reservation",
        content_category: "AI posture assessment",
        value: 199,
        currency: "TWD"
      });
    });
  });
  // 手機版選單
  var t = document.querySelector(".nav-toggle"), m = document.getElementById("menu");
  if (t && m) {
    t.addEventListener("click", function () { m.classList.toggle("open"); });
    m.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { m.classList.remove("open"); }); });
  }
});
