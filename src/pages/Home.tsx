import { Circle } from '../components/Circle';
import { Slash } from '../components/Slash';

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section id="hero" className="hero">
        <div className="hero__top">
          <h1 className="hero__title">
            <span data-scramble="">Admission shouldn't</span>
            <span data-scramble="">depend on who</span>
            <span data-scramble="">you know.</span>
          </h1>
          <div className="hero__slashes">
            <Slash variant="tall" animated />
            <Slash variant="tall" animated />
            <Slash variant="tall" animated />
            <Slash variant="tall" animated />
          </div>
        </div>
        <div className="rule rule--mt" />
        <div className="hero__lead">
          <div className="label">Start here</div>
          <p className="hero__blurb">
            The college application, demystified. Where to apply, how to apply, and how to write the essays that get you
            in. Free, and built for the first in their family. Para todos.
          </p>
        </div>
        <div data-reveal="" className="hero__cta">
          <Circle to="/router">Get my plan</Circle>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="strip">
        <div className="rule" />
        <div className="strip__grid">
          <div className="label">Built around</div>
          <div className="strip__logos">
            <span>QuestBridge</span>
            <span>Common App</span>
            <span>UC Application</span>
            <span>Coalition</span>
            <span>ApplyTexas</span>
            <span>CBCA</span>
          </div>
        </div>
        <div className="rule" />
      </section>

      {/* MANIFESTO */}
      <section className="manifesto">
        <div className="manifesto__grid">
          <div className="label">Manifesto</div>
          <div className="vrule" />
          <div className="manifesto__lines">
            <div data-reveal="">Admission shouldn't depend on who you know.</div>
            <div data-reveal="">
              We're built for the first in their family. The students who navigate without a map.
            </div>
            <div data-reveal="">Every essay, every list, every deadline. Demystified.</div>
            <div data-reveal="">Not shortcuts. A system. Not luck. A plan.</div>
          </div>
          <div />
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="cta">
        <div className="rule" />
        <div className="cta__inner">
          <h2 data-reveal="" className="cta__head">
            Let's make admission possible.
          </h2>
          <Circle to="/router" reveal>
            Start
          </Circle>
        </div>
        <div className="rule" />
      </section>
    </main>
  );
}
