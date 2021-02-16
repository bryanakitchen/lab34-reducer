import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  afterEach(() => cleanup());
  it('renders App', () => {
    render(<App />);

  });
});

// to have backgroundColor of current
// fireEvent for onClick undo
// fireEvent for onClick redo