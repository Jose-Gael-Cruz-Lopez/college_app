import type { Pathway } from '../types';

// Application systems shown in the Pathways table.
export const PATHWAYS: Pathway[] = [
  {
    name: 'Common App',
    bestFor: 'Most private + many public',
    fact: 'One essay, 1,000+ schools',
    money: 'Fee waivers available',
  },
  {
    name: 'UC Application',
    bestFor: 'All UC campuses',
    fact: 'Its own Personal Insight Qs',
    money: 'No separate supplements',
  },
  {
    name: 'QuestBridge',
    bestFor: 'High-achieving, low-income',
    fact: 'National Match = possible full ride',
    money: 'Free to apply',
  },
  { name: 'Coalition', bestFor: 'Member schools', fact: 'Alternative to Common App', money: 'Fee waivers available' },
  { name: 'ApplyTexas', bestFor: 'Texas publics', fact: 'Standard Texas route', money: 'Its own essays' },
  { name: 'CBCA', bestFor: 'HBCUs', fact: 'One app, many schools', money: 'One low fee' },
];
