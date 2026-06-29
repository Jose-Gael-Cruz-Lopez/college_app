import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { NAV } from '../data/nav';
import { Slash } from './Slash';

export interface Crumb {
  label: string;
  /** A link target; omit for the current page (rendered large). */
  to?: string;
}

// Build the full-nav crumb set for a top-level page, current item enlarged.
export function navCrumbs(currentId: string): Crumb[] {
  return NAV.map((n) => (n.id === currentId ? { label: n.label } : { label: n.label, to: n.path }));
}

// The inline-slash nav band: items spread full width with tall leaning
// slashes between, plus leading and trailing slashes.
export function Crumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <div className="crumbs">
      <Slash variant="nav" />
      {crumbs.map((c, i) => (
        <Fragment key={i}>
          {c.to ? (
            <Link to={c.to} data-nav="">
              {c.label}
            </Link>
          ) : (
            <span className="crumbs__current">{c.label}</span>
          )}
          <Slash variant="nav" />
        </Fragment>
      ))}
    </div>
  );
}
