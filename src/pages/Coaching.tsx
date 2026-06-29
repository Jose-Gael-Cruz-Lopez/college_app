import { Circle } from '../components/Circle';
import { Crumbs, navCrumbs } from '../components/Crumbs';
import { Icon } from '../components/Icon';

export default function Coaching() {
  return (
    <main className="interior">
      <div className="rule" />
      <Crumbs crumbs={navCrumbs('coaching')} />
      <div className="rule" />

      <h1 className="center-statement" data-reveal="">
        A coach who was a first-gen applicant two years ago.
      </h1>

      <div className="triband">
        <div className="triband__col">
          <Icon name="people" className="triband__icon" />
          <div className="triband__k">Near-peer</div>
          <div className="triband__v">They've just survived this exact climb.</div>
        </div>
        <div className="triband__slash" />
        <div className="triband__col">
          <Icon name="write" className="triband__icon" />
          <div className="triband__k">Draft review</div>
          <div className="triband__v">The human hour goes entirely to your essay.</div>
        </div>
        <div className="triband__slash" />
        <div className="triband__col">
          <Icon name="money" className="triband__icon" />
          <div className="triband__k">Access</div>
          <div className="triband__v">Free or sliding-scale, free if QuestBridge-eligible.</div>
        </div>
      </div>

      <p className="callout" data-reveal="">
        The course is the coach training. The students we help become the coaches who help the next ones.
      </p>

      <div className="section-cta">
        <Circle to="/join">Book a coach</Circle>
      </div>
    </main>
  );
}
