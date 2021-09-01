import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import { Routes } from './Route';

const renderWithRouter = (ui: React.ReactElement, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)

  return render(ui, {wrapper: BrowserRouter})
}

describe('Route Test', () => {
  it('Validate render in the route "/"', () => {
    renderWithRouter(<Routes />, { route: '/' });
    expect(screen.getByLabelText(/Todo Text/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Todo Number/i)).toBeInTheDocument();
    expect(screen.getByTestId(/button-add-todo/i)).toBeInTheDocument();
  });
  it('Validate render in the route "/321654987"', () => {
    renderWithRouter(<Routes />, { route: '/321654987' });
    expect(screen.getByText(/404 not FOUND/i)).toBeInTheDocument();
  });
  it('Validate render in the route "/2"', () => {
    renderWithRouter(<Routes />, { route: '/2' });
    expect(screen.getByText(/other route/i)).toBeInTheDocument();
  });
});
