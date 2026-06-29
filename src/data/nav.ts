import type { NavItem } from '../types';

// Top-level navigation: header menu + inline-slash crumb bands.
export const NAV: NavItem[] = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'how', label: 'How it works', path: '/how' },
  { id: 'offer', label: 'What we offer', path: '/offer' },
  { id: 'pathways', label: 'Pathways', path: '/pathways' },
  { id: 'coaching', label: 'Coaching', path: '/coaching' },
  { id: 'join', label: 'Join', path: '/join' },
];
