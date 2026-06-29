/* ============================================================
   (Ad)mission Possible — interactive flow
   Renders the overlay screens: full-screen menu, the router quiz,
   the computed plan, and the dashboard. Ported from the DCLogic
   router/computePlan logic. Depends on window.AP from app.js.
   ============================================================ */
(function () {
  'use strict';

  function start(AP) {
    var state = AP.state, esc = AP.esc, overlay = AP.overlay;

    var QUESTIONS = [
      { key: 'grade',    q: 'What grade are you in?',             multi: false, options: ['9th grade', '10th grade', '11th grade', '12th grade', 'Gap year'] },
      { key: 'firstgen', q: 'First in your family to go?',        multi: false, options: ['Yes', 'No'] },
      { key: 'pell',     q: 'Pell- or fee-waiver-eligible?',      multi: false, options: ['Yes', 'Not sure', 'No'] },
      { key: 'gpa',      q: 'Your GPA + rigor',                   multi: false, options: ['3.8–4.0, lots of rigor', '3.5–3.8, some rigor', '3.0–3.5', 'Below 3.0'] },
      { key: 'colleges', q: "Kinds of colleges you're drawn to",  multi: true,  options: ['Large public', 'Small liberal arts', 'Highly selective', 'HBCU / HSI', 'In-state / commuter'] },
      { key: 'regions',  q: 'Where would you go?',                multi: true,  options: ['Northeast', 'South', 'Midwest', 'West', 'Anywhere'] },
      { key: 'track',    q: 'On your own, or with a coach?',      multi: false, options: ['Self-paced', 'With a coach', 'Not sure yet'] }
    ];

    var MENU_ITEMS = [
      { id: 'hero', label: 'Home' }, { id: 'how', label: 'How it works' },
      { id: 'offer', label: 'What we offer' }, { id: 'pathways', label: 'Pathways' },
      { id: 'coaching', label: 'Coaching' }, { id: 'join', label: 'Join' }
    ];

    // ---------- plan computation (ported verbatim from DCLogic) ----------
    function computePlan() {
      var a = state.answers;
      var firstgen = a.firstgen === 'Yes';
      var pellish = a.pell === 'Yes' || a.pell === 'Not sure';
      var gpaTop = (a.gpa || '').indexOf('3.8') === 0;
      var regions = a.regions || [];
      var colleges = a.colleges || [];
      var pathway, why;

      if (firstgen && pellish && gpaTop) {
        pathway = 'QuestBridge + Common App';
        why = 'Your profile fits the National Match. Pair it with Common App so you keep every door open while you wait on Match results.';
      } else if (regions.indexOf('West') >= 0) {
        pathway = 'UC Application + Common App';
        why = 'The UC system needs its own application and essays. Common App covers everything else in one place.';
      } else if (colleges.indexOf('HBCU / HSI') >= 0) {
        pathway = 'CBCA + Common App';
        why = 'One CBCA application reaches dozens of HBCUs. Common App opens up the rest of your list.';
      } else if (regions.indexOf('South') >= 0 && colleges.indexOf('Large public') >= 0) {
        pathway = 'ApplyTexas + Common App';
        why = 'Texas publics run through ApplyTexas. Common App handles your out-of-state and private picks.';
      } else {
        pathway = 'Common App';
        why = 'One essay, a thousand-plus schools. The widest, simplest front door for the list you described.';
      }

      var reach = gpaTop
        ? [{ name: 'Pomona College', tag: 'QuestBridge · no-loan aid' }, { name: 'Rice University', tag: 'Common App · strong aid' }, { name: 'UCLA', tag: 'UC App · Blue + Gold' }]
        : [{ name: 'Boston University', tag: 'Common App · merit + need' }, { name: 'UC San Diego', tag: 'UC App · in-state aid' }, { name: 'Tulane University', tag: 'Common App · merit' }];
      var target = [{ name: 'UC Davis', tag: 'UC App · in-state aid' }, { name: 'Fordham University', tag: 'Common App · merit + need' }, { name: 'Howard University', tag: 'CBCA · HBCU' }];
      var likely = [{ name: 'Cal State Fullerton', tag: 'CSU · low cost' }, { name: 'Arizona State', tag: 'Common App · merit likely' }, { name: 'UT Arlington', tag: 'ApplyTexas · affordable' }];
      var trackName = a.track === 'With a coach' ? '1:1 Coaching' : 'Self-paced course';
      return { pathway: pathway, why: why, reach: reach, target: target, likely: likely, trackName: trackName };
    }

    function activeTrack() {
      if (state.trackOverride) return state.trackOverride;
      return (state.plan && state.plan.trackName) || 'Self-paced course';
    }

    // ---------- state transitions ----------
    function openRouter() {
      state.screen = 'router'; state.step = 0; state.answers = {}; state.plan = null; state.menuOpen = false;
      render(); window.scrollTo({ top: 0 });
    }
    function closeRouter() { state.screen = 'site'; render(); }
    function closeAllScreens() { state.menuOpen = false; state.screen = 'site'; render(); }

    function select(key, opt, multi) {
      var a = state.answers;
      if (multi) {
        var cur = Array.isArray(a[key]) ? a[key].slice() : [];
        var i = cur.indexOf(opt);
        if (i >= 0) cur.splice(i, 1); else cur.push(opt);
        a[key] = cur;
      } else { a[key] = opt; }
      render();
    }

    function canAdvance() {
      var q = QUESTIONS[state.step];
      var sel = state.answers[q.key];
      return q.multi ? (Array.isArray(sel) && sel.length > 0) : !!sel;
    }

    function next() {
      if (!canAdvance()) return;
      if (state.step < QUESTIONS.length - 1) { state.step++; render(); }
      else { state.plan = computePlan(); state.screen = 'plan'; state.trackOverride = null; render(); window.scrollTo({ top: 0 }); }
    }
    function back() {
      if (state.step > 0) { state.step--; render(); }
      else closeRouter();
    }
    function toggleTrack() {
      state.trackOverride = activeTrack() === 'Self-paced course' ? '1:1 Coaching' : 'Self-paced course';
      render();
    }
    function goDashboard() { state.screen = 'dashboard'; render(); window.scrollTo({ top: 0 }); }

    // ---------- overlay rendering ----------
    function wordmark() { return '<div class="wordmark"><span class="accent">(Ad)</span>mission Possible</div>'; }

    function menuMarkup() {
      var links = MENU_ITEMS.map(function (m) {
        return '<span data-go="' + m.id + '">' + esc(m.label) + '</span>';
      }).join('<span class="ov-menu__sep"> \\ </span>');
      return '<div class="ov-menu">' +
        '<div class="ov-menu__top">' + wordmark() + '</div>' +
        '<div class="ov-menu__links">' + links + '</div>' +
        '<button class="ov-menu__close" data-close-menu aria-label="Close menu"><span></span><span></span></button>' +
        '<div class="ov-menu__rule"></div>' +
      '</div>';
    }

    function routerMarkup() {
      var total = QUESTIONS.length, step = state.step, q = QUESTIONS[step];
      var sel = state.answers[q.key];
      var isLast = step === total - 1;
      var canNext = canAdvance();

      var segs = QUESTIONS.map(function (_, i) {
        return '<div class="ov-seg" style="background:' + (i <= step ? 'var(--accent)' : 'var(--hairline)') + '"></div>';
      }).join('');

      var rows = q.options.map(function (opt) {
        var selected = q.multi ? (Array.isArray(sel) && sel.indexOf(opt) >= 0) : sel === opt;
        return '<div class="ov-ans" data-pick="' + esc(opt) + '">' +
          '<div class="ov-ans__mark' + (selected ? ' is-on' : '') + '"></div>' +
          '<div class="ov-ans__label' + (selected ? ' is-on' : '') + '">' + esc(opt) + '</div>' +
        '</div>';
      }).join('');

      var nextBtn = isLast
        ? '<button class="circle circle--router" data-next style="opacity:' + (canNext ? 1 : 0.35) + '">See my plan</button>'
        : '<button class="ov-next" data-next style="opacity:' + (canNext ? 1 : 0.35) + '">Next<span class="slash slash--inline"></span></button>';

      return '<div class="ov-screen">' +
        '<div class="ov-screen__bar"><button class="ov-x" data-close-router aria-label="Close"><span></span><span></span></button>' + wordmark() + '</div>' +
        '<div class="ov-progress">' + segs + '</div>' +
        '<div class="ov-router">' +
          '<div class="ov-router__meta">' + (step + 1) + ' / ' + total + (q.multi ? '<span class="ov-router__hint">Select all that apply</span>' : '') + '</div>' +
          '<h2 class="ov-router__q">' + esc(q.q) + '</h2>' +
          '<div class="ov-ans__list">' + rows + '</div>' +
          '<div class="ov-router__foot">' +
            '<button class="ov-back" data-back>' + (step === 0 ? 'Cancel' : 'Back') + '</button>' +
            nextBtn +
          '</div>' +
        '</div>' +
      '</div>';
    }

    function schoolCol(title, list) {
      var items = list.map(function (s) {
        return '<div class="ov-school"><div class="ov-school__name">' + esc(s.name) + '</div><div class="ov-school__tag">' + esc(s.tag) + '</div></div>';
      }).join('');
      return '<div><div class="ov-school__head">' + esc(title) + '</div>' + items + '</div>';
    }

    function planMarkup() {
      var p = state.plan || {};
      var track = activeTrack();
      var other = track === 'Self-paced course' ? 'Switch to 1:1 coaching' : 'Switch to self-paced course';
      var cta = track === 'Self-paced course' ? 'Start my course' : 'Match me with a coach';

      return '<div class="ov-screen">' +
        '<div class="ov-screen__bar"><div class="ov-link" data-back-site>← Back to site</div>' + wordmark() + '</div>' +
        '<div class="rule ov-screen__rule"></div>' +
        '<div class="ov-plan">' +
          '<h1 class="ov-plan__title">Your plan</h1>' +
          '<p class="ov-plan__lede">Here\'s where to start.</p>' +
          '<div class="ov-plan__sec">' +
            '<div class="label">A — Your pathway</div>' +
            '<div class="ov-plan__pathway">' + esc(p.pathway || '') + '</div>' +
            '<p class="ov-plan__why">' + esc(p.why || '') + '</p>' +
          '</div>' +
          '<div class="ov-plan__sec">' +
            '<div class="label ov-plan__sublabel">B — Your starter list</div>' +
            '<div class="ov-plan__cols">' +
              schoolCol('Reach', p.reach || []) + schoolCol('Target', p.target || []) + schoolCol('Likely', p.likely || []) +
            '</div>' +
            '<div class="ov-plan__hint">Refine this in the List Builder.</div>' +
          '</div>' +
          '<div class="ov-plan__track">' +
            '<div><div class="label">C — Your track</div><div class="ov-plan__trackname">' + esc(track) + '</div></div>' +
            '<button class="ov-plan__switch" data-toggle-track>' + esc(other) + '</button>' +
          '</div>' +
          '<div class="ov-plan__cta"><button class="circle circle--plan" data-go-dash>' + esc(cta) + '</button></div>' +
        '</div>' +
      '</div>';
    }

    function dashboardMarkup() {
      var track = activeTrack();
      var deadlines = [{ sys: 'QuestBridge', date: 'Sep 26' }, { sys: 'Common App (EA)', date: 'Nov 1' }, { sys: 'UC Application', date: 'Nov 30' }];
      var dl = deadlines.map(function (d) {
        return '<div class="ov-dl"><span>' + esc(d.sys) + '</span><span class="ov-dl__date">' + esc(d.date) + '</span></div>';
      }).join('');
      var coaching = track === '1:1 Coaching' ? 'Next session: Thu 4:00pm' : 'Get matched with a coach';

      return '<div class="ov-screen">' +
        '<div class="ov-screen__bar"><div class="ov-link" data-back-site>← Back to site</div>' + wordmark() + '</div>' +
        '<div class="rule ov-screen__rule"></div>' +
        '<div class="ov-dash">' +
          '<div class="label">Your dashboard</div>' +
          '<h1 class="ov-dash__title">Buenos días. Let\'s keep moving.</h1>' +
          '<div class="ov-dash__next">' +
            '<div><div class="label">Next step</div><div class="ov-dash__step">Finish Lesson 2</div></div>' +
            '<button class="circle circle--dash">Continue</button>' +
          '</div>' +
          '<div class="ov-dash__rows">' +
            '<div class="ov-dash__row"><div class="ov-dash__k">Course progress</div><div><div class="ov-dash__sub">Module 2 of 8</div><div class="ov-bar"><div class="ov-bar__fill" style="width:25%"></div></div></div></div>' +
            '<div class="ov-dash__row"><div class="ov-dash__k">Your list</div><div class="ov-dash__v">3 reach · 3 target · 3 likely</div></div>' +
            '<div class="ov-dash__row"><div class="ov-dash__k">Deadlines</div><div class="ov-dash__deadlines">' + dl + '</div></div>' +
            '<div class="ov-dash__row"><div class="ov-dash__k">Coaching</div><div class="ov-dash__v">' + esc(coaching) + '</div></div>' +
          '</div>' +
        '</div>' +
      '</div>';
    }

    function render() {
      var html = '';
      if (state.screen === 'router') html = routerMarkup();
      else if (state.screen === 'plan') html = planMarkup();
      else if (state.screen === 'dashboard') html = dashboardMarkup();
      if (state.menuOpen) html += menuMarkup();

      overlay.innerHTML = html;
      overlay.style.pointerEvents = html ? 'auto' : 'none';
      bindOverlay();
    }

    function bindOverlay() {
      var q = QUESTIONS[state.step];
      overlay.querySelectorAll('[data-pick]').forEach(function (n) {
        n.addEventListener('click', function () { select(q.key, n.getAttribute('data-pick'), q.multi); });
      });
      bind('[data-next]', next);
      bind('[data-back]', back);
      bind('[data-close-router]', closeRouter);
      bind('[data-toggle-track]', toggleTrack);
      bind('[data-go-dash]', goDashboard);
      bind('[data-back-site]', closeAllScreens);
      bind('[data-close-menu]', function () { state.menuOpen = false; render(); });
      overlay.querySelectorAll('[data-go]').forEach(function (n) {
        n.addEventListener('click', function () {
          state.menuOpen = false; state.screen = 'site'; render();
          var id = n.getAttribute('data-go');
          setTimeout(function () {
            var t = document.getElementById(id);
            if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 70, behavior: AP.reduced ? 'auto' : 'smooth' });
          }, 40);
        });
      });
    }
    function bind(sel, fn) {
      var n = overlay.querySelector(sel);
      if (n) n.addEventListener('click', fn);
    }

    // hand the hooks back to the landing module
    AP.setHooks({ openRouter: openRouter, renderOverlay: render, closeAllScreens: closeAllScreens });
  }

  function boot() {
    if (window.AP) start(window.AP);
    else setTimeout(boot, 30);
  }
  boot();
})();
