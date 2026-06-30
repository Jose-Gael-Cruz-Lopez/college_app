import { useEffect, useRef } from 'react';

// Swap these for real photos (drop files in /public/intro and update the paths).
const IMAGES = [
  '/intro/t1.svg',
  '/intro/t2.svg',
  '/intro/t3.svg',
  '/intro/t4.svg',
  '/intro/t5.svg',
  '/intro/t6.svg',
  '/intro/t7.svg',
  '/intro/t8.svg',
];

type Depth = 'far' | 'mid' | 'near';
type Vis = 'mobile' | 'tablet' | 'desktop'; // minimum breakpoint at which the tile shows

type Tile = {
  x: number; // % left  (50 = centre)
  y: number; // % top   (50 = centre)
  w: number; // px width
