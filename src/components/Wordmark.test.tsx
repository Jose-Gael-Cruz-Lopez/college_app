import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Wordmark } from './Wordmark';

describe('Wordmark', () => {
  it('renders the full wordmark with a blue (Ad) accent', () => {
    const { container } = render(<Wordmark />);
    expect(container.textContent).toBe('(Ad)mission Possible');
    expect(container.querySelector('.accent')?.textContent).toBe('(Ad)');
  });

  it('applies the white modifier', () => {
    const { container } = render(<Wordmark white />);
    expect(container.querySelector('.wordmark')?.classList.contains('wordmark--white')).toBe(true);
  });
});
