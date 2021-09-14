import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import City from './city';

describe('city Test', () => {
  it('initial render', () => {
    const view = render(<City />);
  });
});
