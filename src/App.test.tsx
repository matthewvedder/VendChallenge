import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Parking Sessions header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Parking Sessions/i);
  expect(linkElement).toBeInTheDocument();
});
