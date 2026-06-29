import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { NAV } from '../data/nav';
import { useReveal } from '../hooks/useReveal';
import { Header } from './Header';
import { Menu } from './Menu';
import { Footer } from './Footer';

// Shared layout: header + full-screen menu + page outlet + footer.
// Owns the menu open state, scroll-reveal motion, and route-change resets.
export function Chrome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const current = NAV.find((n) => n.path === pathname)?.id ?? '';

  useReveal();

  // Lock body scroll while the full-screen menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  // Escape closes the menu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // On navigation: close the menu and jump to the top (legacy did full page loads).
  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <>
      <Header onMenu={() => setMenuOpen(true)} />
      <Outlet />
      <Footer />
      <Menu open={menuOpen} current={current} onClose={() => setMenuOpen(false)} />
    </>
  );
}
