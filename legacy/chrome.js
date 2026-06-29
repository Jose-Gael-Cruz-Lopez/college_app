/* ============================================================
   (Ad)mission Possible — shared chrome
   Injects the header, full-screen menu, and footer into every
   page, and fills any [data-crumbs] inline-slash nav band.
   Each page sets <body data-page="home|how|offer|...">.
   ============================================================ */
(function () {
  'use strict';

  var NAV = window.AP_DATA.NAV;
  var esc = window.AP_DATA.esc;
  var current = document.body.getAttribute('data-page') || '';

  function wordmark(white) {
    return '<div class="wordmark' + (white ? ' wordmark--white' : '') + '">' +
      '<span class="accent">(Ad)</span>mission Possible</div>';
  }

  // ---- header ----
  function buildHeader() {
    var h = document.createElement('header');
    h.className = 'header';
    h.setAttribute('data-header', '');
    var hamburger =
      '<svg viewBox="0 0 36 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">' +
        '<path d="M3 5q4.5-3 9 0t9 0t9 0"/>' +
        '<path d="M3 13q4.5-3 9 0t9 0t9 0"/>' +
        '<path d="M3 21q4.5-3 9 0t9 0t9 0"/>' +
      '</svg>';
    h.innerHTML =
      '<div class="header__bar">' +
        '<button class="menu-toggle" data-menu-toggle aria-label="Open menu">' + hamburger + '</button>' +
        '<a class="wordmark-link" href="index.html" aria-label="Home">' + wordmark(false) + '</a>' +
      '</div>' +
      '<div class="rule"></div>';
    document.body.insertBefore(h, document.body.firstChild);
    return h;
  }

  // ---- full-screen menu ----
  function buildMenu() {
    var links = NAV.map(function (n) {
      var active = n.id === current ? ' is-current' : '';
      return '<a class="ov-menu__link' + active + '" href="' + n.href + '">' + esc(n.label) + '</a>';
    }).join('<span class="ov-menu__sep"> \\ </span>');

    var wrap = document.createElement('div');
    wrap.className = 'ov-menu';
    wrap.setAttribute('hidden', '');
    wrap.innerHTML =
      '<div class="ov-menu__top">' + wordmark(true) + '</div>' +
      '<nav class="ov-menu__links">' + links + '</nav>' +
      '<button class="ov-menu__close" data-menu-close aria-label="Close menu"><span></span><span></span></button>' +
      '<div class="ov-menu__rule"></div>';
    document.body.appendChild(wrap);
    return wrap;
  }

  // ---- footer ----
  function buildFooter() {
    var links = NAV.map(function (n) {
      return '<a href="' + n.href + '">' + esc(n.label) + '</a>';
    }).join('');
    var f = document.createElement('footer');
    f.className = 'footer';
    f.innerHTML =
      '<div class="rule"></div>' +
      '<div class="footer__grid">' +
        '<div class="footer__col--left">' + wordmark(false) +
          '<p class="footer__blurb">Built for the first in their family. The college application, demystified. Where to apply, how to apply, how to write the essays that get you in. Free.</p>' +
        '</div>' +
        '<div class="vrule vrule--center"></div>' +
        '<div class="footer__menu"><div class="label">Menu</div><div class="footer__links">' + links + '</div></div>' +
      '</div>' +
      '<div class="rule"></div>' +
      '<div class="footer__legal">' +
        '<div>© (Ad)mission Possible 2026. A nonprofit. Admission, made possible.</div>' +
        '<div class="footer__tag">● First-gen access</div>' +
      '</div>';
    document.body.appendChild(f);
  }

  // ---- inline-slash crumb band on interior pages ----
  function fillCrumbs() {
    var slash = '<span class="slash slash--nav"></span>';
    document.querySelectorAll('[data-crumbs]').forEach(function (host) {
      var items = NAV.map(function (n) {
        if (n.id === current) return '<span class="crumbs__current">' + esc(n.label) + '</span>';
        return '<a data-nav href="' + n.href + '">' + esc(n.label) + '</a>';
      });
      host.className = 'crumbs';
      // leading + interleaved + trailing slash, spread across the full width
      host.innerHTML = slash + items.join(slash) + slash;
    });
  }

  // ---- behaviour: menu open/close + scroll-hide header ----
  function wire(header, menu) {
    var toggle = header.querySelector('[data-menu-toggle]');
    var closeBtn = menu.querySelector('[data-menu-close]');
    function open() { menu.removeAttribute('hidden'); document.body.style.overflow = 'hidden'; }
    function close() { menu.setAttribute('hidden', ''); document.body.style.overflow = ''; }
    if (toggle) toggle.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

    var lastY = 0;
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      if (y > lastY && y > 140) header.style.transform = 'translateY(-100%)';
      else header.style.transform = 'translateY(0)';
      lastY = y;
    }, { passive: true });
  }

  function init() {
    var header = buildHeader();
    var menu = buildMenu();
    buildFooter();
    fillCrumbs();
    wire(header, menu);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
