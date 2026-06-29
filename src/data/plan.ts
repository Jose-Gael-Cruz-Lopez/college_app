import type { Answers, Plan, School, TrackName } from '../types';

// Map intake answers to a pathway, a starter list, and a track.
// Ported verbatim (logic-for-logic) from the legacy computePlan().
export function computePlan(answers: Answers): Plan {
  const a = answers ?? {};
  const firstgen = a.firstgen === 'Yes';
  const pellish = a.pell === 'Yes' || a.pell === 'Not sure';
  const gpaTop = typeof a.gpa === 'string' && a.gpa.indexOf('3.8') === 0;
  const regions = (a.regions as string[]) ?? [];
  const colleges = (a.colleges as string[]) ?? [];

  let pathway: string;
  let why: string;

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

  const reach: School[] = gpaTop
    ? [
        { name: 'Pomona College', tag: 'QuestBridge · no-loan aid' },
        { name: 'Rice University', tag: 'Common App · strong aid' },
        { name: 'UCLA', tag: 'UC App · Blue + Gold' },
      ]
    : [
        { name: 'Boston University', tag: 'Common App · merit + need' },
        { name: 'UC San Diego', tag: 'UC App · in-state aid' },
        { name: 'Tulane University', tag: 'Common App · merit' },
      ];
  const target: School[] = [
    { name: 'UC Davis', tag: 'UC App · in-state aid' },
    { name: 'Fordham University', tag: 'Common App · merit + need' },
    { name: 'Howard University', tag: 'CBCA · HBCU' },
  ];
  const likely: School[] = [
    { name: 'Cal State Fullerton', tag: 'CSU · low cost' },
    { name: 'Arizona State', tag: 'Common App · merit likely' },
    { name: 'UT Arlington', tag: 'ApplyTexas · affordable' },
  ];
  const trackName: TrackName = a.track === 'With a coach' ? '1:1 Coaching' : 'Self-paced course';

  return { pathway, why, reach, target, likely, trackName };
}
