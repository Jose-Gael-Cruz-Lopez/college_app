import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Slash } from './Slash';

describe('Slash', () => {
  it('renders a base slash', () => {
    const { container } = render(<Slash />);
    const el = container.querySelector('.slash');
    expect(el).not.toBeNull();
    expect(el?.classList.contains('slash--nav')).toBe(false);
  });

  it('applies a variant modifier', () => {
    const { container } = render(<Slash variant="how" />);
    expect(container.querySelector('.slash')?.classList.contains('slash--how')).toBe(true);
  });

  it('adds data-slash only when animated', () => {
    const plain = render(<Slash />).container.querySelector('.slash');
    expect(plain?.hasAttribute('data-slash')).toBe(false);
    const animated = render(<Slash animated />).container.querySelector('.slash');
    expect(animated?.hasAttribute('data-slash')).toBe(true);
  });
});
