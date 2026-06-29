import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Icon } from './Icon';

describe('Icon', () => {
  it('renders an SVG icon for a vector name', () => {
    const { container } = render(<Icon name="route" />);
    const wrapper = container.querySelector('.icon');
    expect(wrapper).not.toBeNull();
    expect(wrapper?.querySelector('svg')).not.toBeNull();
  });

  it('renders the supplied PNG for the write icon', () => {
    const { container } = render(<Icon name="write" />);
    const img = container.querySelector('img');
    expect(img?.getAttribute('src')).toBe('/icons/learn-write.png');
    expect(container.querySelector('svg')).toBeNull();
  });

  it('passes the wrapper className through', () => {
    const { container } = render(<Icon name="calendar" className="row-icon" />);
    expect(container.querySelector('.icon')?.classList.contains('row-icon')).toBe(true);
  });
});
