// ─── Google Analytics — GDPR Cookie Banner ────────────────────────────────────
// Shared between index.html, 403.html, 404.html and privacy.html
(function () {
  var COOKIE = 'ga_consent';
  var GA_ID  = 'G-V3SCLH68WF';

  function setCookie(val) {
    var d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    document.cookie = COOKIE + '=' + val + ';expires=' + d.toUTCString() + ';path=/;SameSite=Lax';
  }

  // 'accepted' | 'refused' | null (no choice made yet)
  function getConsent() {
    var m = document.cookie.match(/(?:^|;\s*)ga_consent=(accepted|refused)/);
    return m ? m[1] : null;
  }

  // Remove GA cookies (_ga, _ga_*) when consent is refused or withdrawn
  function deleteGACookies() {
    var expire = ';expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (name === '_ga' || name.indexOf('_ga_') === 0) {
        document.cookie = name + '=' + expire;
        document.cookie = name + '=' + expire + ';domain=.' + location.hostname;
      }
    });
  }

  function loadGA() {
    window['ga-disable-' + GA_ID] = false;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  // Stop an already-loaded gtag.js from tracking and recreating cookies,
  // then remove the existing GA cookies
  function disableGA() {
    window['ga-disable-' + GA_ID] = true;
    if (typeof window.gtag === 'function') {
      gtag('consent', 'update', { analytics_storage: 'denied' });
    }
    deleteGACookies();
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
    if (document.getElementById('cookie-banner')) return;
    var banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.className = 'cookie-banner';
    banner.innerHTML =
      '<p class="cookie-banner__text"><span data-i18n="cookie.text">Ce site utilise des cookies pour mesurer son audience.</span> ' +
      '<a class="cookie-banner__link" href="/privacy.html" data-i18n="cookie.more">En savoir plus</a></p>' +
      '<div class="cookie-banner__actions">' +
      '<button id="cookie-accept" class="cookie-banner__btn cookie-banner__btn--accept" data-i18n="cookie.accept">Accepter</button>' +
      '<button id="cookie-refuse" class="cookie-banner__btn cookie-banner__btn--refuse" data-i18n="cookie.refuse">Refuser</button>' +
      '</div>';
    banner.querySelector('#cookie-accept').addEventListener('click', function () {
      setCookie('accepted'); loadGA(); hideBanner();
    });
    banner.querySelector('#cookie-refuse').addEventListener('click', function () {
      setCookie('refused'); disableGA(); hideBanner();
    });
    document.body.appendChild(banner);
    if (typeof applyLang === 'function') applyLang(currentLang);
  }

  var consent = getConsent();
  if (consent === 'accepted') {
    loadGA();
  } else if (consent === null) {
    document.addEventListener('DOMContentLoaded', showBanner);
  }

  // "Manage cookies" (footer & privacy page): clear the stored choice and re-ask
  document.addEventListener('DOMContentLoaded', function () {
    var manage = document.getElementById('cookieManage');
    if (manage) manage.addEventListener('click', function () {
      disableGA();
      document.cookie = COOKIE + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
      showBanner();
    });
  });
})();
