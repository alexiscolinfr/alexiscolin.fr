// ─── Google Analytics — GDPR Cookie Banner ────────────────────────────────────
// Shared between index.html and 404.html
(function () {
  var COOKIE = 'ga_consent';
  var GA_ID  = 'G-V3SCLH68WF';

  function setCookie(val) {
    var d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    document.cookie = COOKIE + '=' + val + ';expires=' + d.toUTCString() + ';path=/;SameSite=Lax';
  }

  function getCookie() {
    return document.cookie.split(';').some(function (c) {
      return c.trim().startsWith(COOKIE + '=accepted');
    });
  }

  function loadGA() {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  function hideBanner() {
    var b = document.getElementById('cookie-banner');
    if (!b) return;
    b.style.transition = 'transform 0.35s ease-in, opacity 0.35s ease-in';
    b.style.transform = 'translateX(-50%) translateY(calc(100% + 1.25rem))';
    b.style.opacity = '0';
    setTimeout(function () { b.remove(); }, 360);
  }

  function showBanner() {
    var banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.className = 'cookie-banner';
    banner.innerHTML =
      '<p class="cookie-banner__text" data-i18n="cookie.text">Ce site utilise des cookies pour mesurer son audience.</p>' +
      '<div class="cookie-banner__actions">' +
      '<button id="cookie-accept" class="cookie-banner__btn cookie-banner__btn--accept" data-i18n="cookie.accept">Accepter</button>' +
      '<button id="cookie-refuse" class="cookie-banner__btn cookie-banner__btn--refuse" data-i18n="cookie.refuse">Refuser</button>' +
      '</div>';
    banner.querySelector('#cookie-accept').addEventListener('click', function () {
      setCookie('accepted'); loadGA(); hideBanner();
    });
    banner.querySelector('#cookie-refuse').addEventListener('click', function () {
      setCookie('refused'); hideBanner();
    });
    document.body.appendChild(banner);
    if (typeof applyLang === 'function') applyLang(currentLang);
  }

  if (getCookie()) {
    loadGA();
  } else {
    document.addEventListener('DOMContentLoaded', showBanner);
  }
})();
