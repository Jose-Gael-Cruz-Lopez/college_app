import { Fragment, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { NAV } from '../data/nav';
import { Wordmark } from './Wordmark';

interface MenuProps {
  open: boolean;
  current: string;
  onClose: () => void;
}

// Full-screen overlay menu: huge mono-caps links separated by backslashes.
export function Menu({ open, current, onClose }: MenuProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // Move focus into the dialog when it opens.
  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  if (!open) return null;
  return (
    <div className="ov-menu" role="dialog" aria-modal="true" aria-label="Site menu">
      <div className="ov-menu__top">
        <Wordmark white />
      </div>
      <nav className="ov-menu__links">
        {NAV.map((n, i) => (
          <Fragment key={n.id}>
            {i > 0 && <span className="ov-menu__sep"> \ </span>}
            <Link className={'ov-menu__link' + (n.id === current ? ' is-current' : '')} to={n.path} onClick={onClose}>
              {n.label}
            </Link>
          </Fragment>
        ))}
      </nav>
      <button className="ov-menu__close" aria-label="Close menu" onClick={onClose} ref={closeRef}>
        <span />
        <span />
      </button>
      <div className="ov-menu__rule" />
    </div>
  );
}
