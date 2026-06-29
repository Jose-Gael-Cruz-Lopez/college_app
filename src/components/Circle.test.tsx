import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Circle } from './Circle';
import { renderWithRouter } from '../test/utils';

describe('Circle', () => {
  it('renders as a link when given `to`', () => {
    renderWithRouter(<Circle to="/router">Get my plan</Circle>);
    const link = screen.getByRole('link', { name: 'Get my plan' });
    expect(link.getAttribute('href')).toBe('/router');
    expect(link.classList.contains('circle')).toBe(true);
  });

  it('renders as a button and fires onClick', async () => {
    const onClick = vi.fn();
    render(<Circle onClick={onClick}>Next</Circle>);
    await userEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('applies the size modifier and reveal attribute', () => {
    const { container } = render(
      <Circle onClick={() => {}} size="plan" reveal>
        Start
      </Circle>,
    );
    const btn = container.querySelector('.circle');
    expect(btn?.classList.contains('circle--plan')).toBe(true);
    expect(btn?.hasAttribute('data-reveal')).toBe(true);
  });
});
