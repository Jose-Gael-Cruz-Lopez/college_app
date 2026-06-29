import { Circle } from '../components/Circle';
import { Crumbs, navCrumbs } from '../components/Crumbs';
import { PATHWAYS } from '../data/pathways';

export default function Pathways() {
  return (
    <main className="interior">
      <div className="rule" />
      <Crumbs crumbs={navCrumbs('pathways')} />
      <div className="rule" />

      <div className="page-intro">
        <h1 className="page-intro__title" data-reveal="">
          Application pathways
        </h1>
        <p className="page-intro__lede" data-reveal="">
          Every front door, side by side. We route you to the right ones based on your plan.
        </p>
      </div>

      <div className="pathways__table">
        {PATHWAYS.map((row) => (
          <div className="pathways__row" key={row.name}>
            <div className="pathways__name">{row.name}</div>
            <div className="pathways__cell">{row.bestFor}</div>
            <div className="pathways__cell">{row.fact}</div>
            <div className="pathways__cell pathways__cell--muted">{row.money}</div>
          </div>
        ))}
      </div>
      <div className="pathways__note">
        Deadlines and mechanics change yearly. We pull current details at build time.
      </div>

      <div className="section-cta">
        <Circle to="/router">See my pathway</Circle>
      </div>
    </main>
  );
}
