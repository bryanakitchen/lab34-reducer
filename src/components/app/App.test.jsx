import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  afterEach(() => cleanup());
  it('Changes the background color and state of undo and redo', () => {
    render(<App />);

    const backgroundInput = screen.findByDisplayValue('#FF0000');

    const displayDiv = screen.findByTestId('display');

    fireEvent.change(backgroundInput, {
      target: {
        value: '#00FF00'
      }
    });
    
    expect(displayDiv).toHaveStyle({
      backgroundColor: '#00FF00'
    });
  });
});

// to have backgroundColor of current
// fireEvent for onClick undo
// fireEvent for onClick redo