import type { Question } from '../types';

// The 7-step router intake.
export const QUESTIONS: Question[] = [
  { key: 'grade',    q: 'What grade are you in?',             multi: false, options: ['9th grade', '10th grade', '11th grade', '12th grade', 'Gap year'] },
  { key: 'firstgen', q: 'First in your family to go?',        multi: false, options: ['Yes', 'No'] },
  { key: 'pell',     q: 'Pell- or fee-waiver-eligible?',      multi: false, options: ['Yes', 'Not sure', 'No'] },
  { key: 'gpa',      q: 'Your GPA + rigor',                   multi: false, options: ['3.8–4.0, lots of rigor', '3.5–3.8, some rigor', '3.0–3.5', 'Below 3.0'] },
  { key: 'colleges', q: "Kinds of colleges you're drawn to",  multi: true,  options: ['Large public', 'Small liberal arts', 'Highly selective', 'HBCU / HSI', 'In-state / commuter'] },
  { key: 'regions',  q: 'Where would you go?',                multi: true,  options: ['Northeast', 'South', 'Midwest', 'West', 'Anywhere'] },
  { key: 'track',    q: 'On your own, or with a coach?',      multi: false, options: ['Self-paced', 'With a coach', 'Not sure yet'] },
];
