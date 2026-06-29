import { describe, it, expect, beforeEach } from 'vitest';
import { saveIntake, loadIntake } from './storage';
import { computePlan } from './plan';

describe('intake storage', () => {
  beforeEach(() => sessionStorage.clear());

  it('returns null when nothing is stored', () => {
    expect(loadIntake()).toBeNull();
  });

  it('round-trips an intake', () => {
    const intake = { answers: { track: 'With a coach' }, plan: computePlan({ track: 'With a coach' }) };
    saveIntake(intake);
    const loaded = loadIntake();
    expect(loaded?.plan.trackName).toBe('1:1 Coaching');
    expect(loaded?.answers.track).toBe('With a coach');
  });

  it('returns null on malformed JSON', () => {
    sessionStorage.setItem('ap.intake', '{not json');
    expect(loadIntake()).toBeNull();
  });
});
