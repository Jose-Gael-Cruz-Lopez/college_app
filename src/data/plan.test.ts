import { describe, it, expect } from 'vitest';
import { computePlan } from './plan';
import type { Answers } from '../types';

describe('computePlan', () => {
  it('routes a first-gen, aid-eligible, top-GPA profile to QuestBridge', () => {
    const answers: Answers = {
      firstgen: 'Yes',
      pell: 'Yes',
      gpa: '3.8–4.0, lots of rigor',
    };
    const plan = computePlan(answers);
    expect(plan.pathway).toBe('QuestBridge + Common App');
    expect(plan.why).toMatch(/National Match/);
  });

  it('counts "Not sure" on aid as aid-eligible for the QuestBridge branch', () => {
    const plan = computePlan({ firstgen: 'Yes', pell: 'Not sure', gpa: '3.8–4.0, lots of rigor' });
    expect(plan.pathway).toBe('QuestBridge + Common App');
  });

  it('routes a West-region applicant to the UC pathway', () => {
    const plan = computePlan({ regions: ['West'] });
    expect(plan.pathway).toBe('UC Application + Common App');
  });

  it('routes an HBCU/HSI applicant to CBCA', () => {
    const plan = computePlan({ colleges: ['HBCU / HSI'] });
    expect(plan.pathway).toBe('CBCA + Common App');
  });

  it('routes a Southern large-public applicant to ApplyTexas', () => {
    const plan = computePlan({ regions: ['South'], colleges: ['Large public'] });
    expect(plan.pathway).toBe('ApplyTexas + Common App');
  });

  it('falls back to Common App for an unremarkable profile', () => {
    const plan = computePlan({ grade: '10th grade' });
    expect(plan.pathway).toBe('Common App');
  });

  it('gives a stronger reach list when GPA is top-band', () => {
    const top = computePlan({ firstgen: 'Yes', pell: 'Yes', gpa: '3.8–4.0, lots of rigor' });
    expect(top.reach.map((s) => s.name)).toContain('Pomona College');

    const lower = computePlan({ gpa: '3.0–3.5' });
    expect(lower.reach.map((s) => s.name)).toContain('Boston University');
  });

  it('always returns three schools in each bucket', () => {
    const plan = computePlan({});
    expect(plan.reach).toHaveLength(3);
    expect(plan.target).toHaveLength(3);
    expect(plan.likely).toHaveLength(3);
  });

  it('maps the track answer to a track name', () => {
    expect(computePlan({ track: 'With a coach' }).trackName).toBe('1:1 Coaching');
    expect(computePlan({ track: 'Self-paced' }).trackName).toBe('Self-paced course');
    expect(computePlan({}).trackName).toBe('Self-paced course');
  });

  it('tolerates empty answers without throwing', () => {
    expect(() => computePlan({} as Answers)).not.toThrow();
  });
});
