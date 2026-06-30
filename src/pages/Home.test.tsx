import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import Home from './Home';
import { renderWithRouter } from '../test/utils';

describe('Home', () => {
  it('renders the hero headline and CTAs', () => {
    renderWithRouter(<Home />);
    expect(screen.getByText('Impossible is')).toBeInTheDocument();

    const cta = screen.getByRole('link', { name: 'Get my plan' });
    expect(cta.getAttribute('href')).toBe('/router');
    expect(screen.getByRole('link', { name: 'Start' }).getAttribute('href')).toBe('/router');
  });

  it('lists the application systems in the trust strip', () => {
    renderWithRouter(<Home />);
    expect(screen.getByText('QuestBridge')).toBeInTheDocument();
    expect(screen.getByText('Common App')).toBeInTheDocument();
  });
});
