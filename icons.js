/* ============================================================
   (Ad)mission Possible — freehand icons
   Original hand-drawn-style line icons (not from any licensed
   library). Slightly wobbly single strokes to read as sketched.
   Auto-fills any element with [data-icon="name"].
   ============================================================ */
(function () {
  'use strict';

  var S = '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">';

  var ICONS = {
    // Route — a compass (navigation)
    route: S +
      '<circle cx="24" cy="24" r="17"/>' +
      '<path d="M31 17l-5 9-9 5 5-9z"/>' +
      '<circle cx="24" cy="24" r="1.3"/></svg>',

    // Learn & write — user-supplied freehand pencil PNG
    // (Edit-Pencil, Streamline Freehand set — provided by the project owner)
    write: '<img class="icon-img" src="icons/learn-write.png" alt="" />',

    // Build your list — a checklist
    list: S +
      '<path d="M20 13h19"/><path d="M20 24h19"/><path d="M20 35h19"/>' +
      '<path d="M8 11l2.5 3 4-5"/>' +
      '<path d="M8 22l2.5 3 4-5"/>' +
      '<path d="M8.5 34h4.5"/></svg>',

    // Apply — a paper plane (send)
    apply: S +
      '<path d="M44 5L4 19l18 7 7 18z"/>' +
      '<path d="M44 5L22 26"/></svg>',

    // Submit — a flag
    submit: S +
      '<path d="M13 6v37"/>' +
      '<path d="M13 8c7-4 14 4 23 0v15c-9 4-16-4-23 0z"/></svg>',

    // Course progress — an open book
    course: S +
      '<path d="M7 11c8-4 17 1 17 1s9-5 17-1v25c-8-4-17 1-17 1s-9-5-17-1z"/>' +
      '<path d="M24 13v25"/></svg>',

    // Your list — a bookmark
    bookmark: S +
      '<path d="M14 6h20c.6 0 1 .5 1 1v35l-11-9-11 9V7c0-.5.4-1 1-1z"/></svg>',

    // Deadlines — a calendar
    calendar: S +
      '<path d="M9 12h30c.6 0 1 .5 1 1v26c0 .6-.5 1-1 1H9c-.6 0-1-.4-1-1V13c0-.5.5-1 1-1z"/>' +
      '<path d="M8 20h32"/><path d="M16 8v8"/><path d="M32 8v8"/>' +
      '<path d="M16 28h5"/><path d="M27 28h5"/><path d="M16 34h5"/></svg>',

    // Coaching — a chat bubble
    coaching: S +
      '<path d="M8 12h32c.6 0 1 .5 1 1v18c0 .6-.5 1-1 1H21l-8 8v-8H8c-.6 0-1-.4-1-1V13c0-.5.5-1 1-1z"/>' +
      '<path d="M16 20h16"/><path d="M16 26h10"/></svg>',

    // Next step — an arrow in a circle
    next: S +
      '<path d="M24 6C14 6 6 14 6 24s8 18 18 18 18-8 18-18S34 6 24 6z"/>' +
      '<path d="M18 24h13"/><path d="M25 18l7 6-7 6"/></svg>',

    // Near-peer — two figures
    people: S +
      '<path d="M18 18a5 5 0 100-10 5 5 0 000 10z"/>' +
      '<path d="M9 38c0-6 4-11 9-11s9 5 9 11"/>' +
      '<path d="M31 14a4 4 0 11.5 8"/>' +
      '<path d="M30 28c5 0 9 5 9 10"/></svg>',

    // Access / money — a coin
    money: S +
      '<path d="M24 7C15 7 8 14 8 24s7 17 16 17 16-7 16-17S33 7 24 7z"/>' +
      '<path d="M24 14v20"/>' +
      '<path d="M29 19c-1-2-3-3-5-3-3 0-5 2-5 4s2 3 5 4 5 2 5 4-2 4-5 4c-2 0-4-1-5-3"/></svg>'
  };

  function fill() {
    document.querySelectorAll('[data-icon]').forEach(function (host) {
      var name = host.getAttribute('data-icon');
      if (ICONS[name]) {
        host.classList.add('icon');
        host.innerHTML = ICONS[name];
        host.setAttribute('aria-hidden', 'true');
      }
    });
  }

  window.AP_ICONS = ICONS;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fill);
  else fill();
})();
