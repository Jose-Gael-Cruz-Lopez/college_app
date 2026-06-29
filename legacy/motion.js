/* ============================================================
   (Ad)mission Possible — scroll motion
   Reveal/slash animation + hero scramble. Runs on every page.
   Honours prefers-reduced-motion.
   ============================================================ */
(function () {
  'use strict';

  var SLASH_ANGLE = 12;

  function run() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.documentElement.classList.add('is-animated');
    document.documentElement.style.setProperty('--slash-angle', SLASH_ANGLE + 'deg');

    var all = [].slice.call(document.querySelectorAll('[data-slash],[data-reveal]'));
    function show(node) { node.classList.add('shown'); node.dataset.shown = '1'; }

    function check() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var margin = vh * 0.12;
      all.forEach(function (node) {
        if (node.dataset.shown) return;
        var r = node.getBoundingClientRect();
        if (r.top < vh - margin && r.bottom > 0) show(node);
      });
    }

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { ticking = false; check(); });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    try {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting || e.target.dataset.shown) return;
          show(e.target);
          io.unobserve(e.target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      all.forEach(function (n) { io.observe(n); });
    } catch (e) { /* no IO */ }

    requestAnimationFrame(check);
    setTimeout(function () { all.forEach(show); }, 1600); // safety net

    scramble();
  }

  function scramble() {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\';
    document.querySelectorAll('[data-scramble]').forEach(function (node, i) {
      var text = node.textContent;
      var dur = 550 + i * 130;
      var start = performance.now();
      (function tick(now) {
        var p = Math.min(1, (now - start) / dur);
        var revealCount = Math.floor(p * text.length);
        var out = '';
        for (var j = 0; j < text.length; j++) {
          if (j < revealCount || text[j] === ' ') out += text[j];
          else out += chars[Math.floor(Math.random() * chars.length)];
        }
        node.textContent = out;
        if (p < 1) requestAnimationFrame(tick);
        else node.textContent = text;
      })(start);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
