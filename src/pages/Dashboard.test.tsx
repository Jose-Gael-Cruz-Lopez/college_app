import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import App from '../App';
import { computePlan } from '../data/plan';
import { saveIntake } from '../data/storage';
import { renderWithRouter } from '../test/utils';

describe('Dashboard', () => {
  beforeEach(() => sessionStorage.clear());

  it('redirects to the router when there is no intake', async () => {
    renderWithRouter(<App />, { route: '/dashboard' });
    expect(await screen.findByText('What grade are you in?')).toBeInTheDocument();
  });

  it('shows a scheduled session when the track is 1:1 coaching', () => {
    saveIntake({ answers: {}, plan: computePlan({}), trackOverride: '1:1 Coaching' });
    renderWithRouter(<App />, { route: '/dashboard' });
    expect(screen.getByText('Next session: Thu 4:00pm')).toBeInTheDocument();
  });

  it('prompts to get matched when the track is self-paced', () => {
    saveIntake({ answers: {}, plan: computePlan({}) });
    renderWithRouter(<App />, { route: '/dashboard' });
    expect(screen.getByText('Get matched with a coach')).toBeInTheDocument();
  });
});
