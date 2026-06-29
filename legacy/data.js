/* ============================================================
   (Ad)mission Possible — shared data + plan logic
   No DOM access. Used by pathways, router, plan, and dashboard.
   ============================================================ */
(function () {
  'use strict';

  // Top-level navigation (header menu + inline-slash crumb bands)
  var NAV = [
    { id: 'home',     label: 'Home',          href: 'index.html' },
    { id: 'how',      label: 'How it works',  href: 'how.html' },
    { id: 'offer',    label: 'What we offer',  href: 'offer.html' },
    { id: 'pathways', label: 'Pathways',      href: 'pathways.html' },
    { id: 'coaching', label: 'Coaching',      href: 'coaching.html' },
    { id: 'join',     label: 'Join',          href: 'join.html' }
  ];

  var QUESTIONS = [
    { key: 'grade',    q: 'What grade are you in?',             multi: false, options: ['9th grade', '10th grade', '11th grade', '12th grade', 'Gap year'] },
    { key: 'firstgen', q: 'First in your family to go?',        multi: false, options: ['Yes', 'No'] },
    { key: 'pell',     q: 'Pell- or fee-waiver-eligible?',      multi: false, options: ['Yes', 'Not sure', 'No'] },
    { key: 'gpa',      q: 'Your GPA + rigor',                   multi: false, options: ['3.8–4.0, lots of rigor', '3.5–3.8, some rigor', '3.0–3.5', 'Below 3.0'] },
    { key: 'colleges', q: "Kinds of colleges you're drawn to",  multi: true,  options: ['Large public', 'Small liberal arts', 'Highly selective', 'HBCU / HSI', 'In-state / commuter'] },
    { key: 'regions',  q: 'Where would you go?',                multi: true,  options: ['Northeast', 'South', 'Midwest', 'West', 'Anywhere'] },
    { key: 'track',    q: 'On your own, or with a coach?',      multi: false, options: ['Self-paced', 'With a coach', 'Not sure yet'] }
  ];

  var PATHWAYS = [
    { name: 'Common App',    bestFor: 'Most private + many public', fact: 'One essay, 1,000+ schools',           money: 'Fee waivers available' },
    { name: 'UC Application', bestFor: 'All UC campuses',           fact: 'Its own Personal Insight Qs',         money: 'No separate supplements' },
    { name: 'QuestBridge',   bestFor: 'High-achieving, low-income', fact: 'National Match = possible full ride', money: 'Free to apply' },
    { name: 'Coalition',     bestFor: 'Member schools',             fact: 'Alternative to Common App',           money: 'Fee waivers available' },
    { name: 'ApplyTexas',    bestFor: 'Texas publics',              fact: 'Standard Texas route',                money: 'Its own essays' },
    { name: 'CBCA',          bestFor: 'HBCUs',                      fact: 'One app, many schools',               money: 'One low fee' }
  ];

  // Map intake answers to a pathway, a starter list, and a track.
  function computePlan(answers) {
    var a = answers || {};
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

  // sessionStorage helpers for carrying state across pages
  var STORE = 'ap.intake';
  function saveIntake(data) {
    try { sessionStorage.setItem(STORE, JSON.stringify(data)); } catch (e) {}
  }
  function loadIntake() {
    try { return JSON.parse(sessionStorage.getItem(STORE)) || null; } catch (e) { return null; }
  }

  window.AP_DATA = {
    NAV: NAV, QUESTIONS: QUESTIONS, PATHWAYS: PATHWAYS,
    computePlan: computePlan, saveIntake: saveIntake, loadIntake: loadIntake,
    esc: function (s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); }
  };
})();
