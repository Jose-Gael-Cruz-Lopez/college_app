import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import App from './App';
import { renderWithRouter } from './test/utils';

describe('App routing', () => {
  it('renders Home at /', () => {
    renderWithRouter(<App />, { route: '/' });
    expect(screen.getByText('Impossible is')).toBeInTheDocument();
  });

  it('renders How it works at /how', () => {
    renderWithRouter(<App />, { route: '/how' });
    expect(screen.getByRole('heading', { level: 1, name: 'How it works' })).toBeInTheDocument();
  });

  it('renders the Join form at /join', () => {
    renderWithRouter(<App />, { route: '/join' });
    expect(screen.getByText('hello@admissionpossible.org')).toBeInTheDocument();
  });

  it('falls back to Home for unknown routes', () => {
    renderWithRouter(<App />, { route: '/does-not-exist' });
    expect(screen.getByText('Impossible is')).toBeInTheDocument();
  });
});
