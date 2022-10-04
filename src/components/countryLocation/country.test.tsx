import React from 'react';
import { render, screen } from '@testing-library/react';
import { CountryComponent } from './country';

test('renders country component', () => {
  render(<CountryComponent name={'DE'} />);
  const linkElement = screen.getByText(/DE/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders country component DE', () => {
  render(<CountryComponent name={'DE'} />);
  const linkElement = screen.getByText(/DE/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders country component NW', () => {
  render(<CountryComponent name={'PK'} />);
  const linkElement = screen.getByText(/PK/i);
  expect(linkElement).toBeInTheDocument();
});
