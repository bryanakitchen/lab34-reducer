import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  afterEach(() => cleanup());
  
  it('Changes the background color and state of undo and redo', async() => {
    render(<App />);

    const backgroundLabel = screen.getByLabelText('Color Input');

    const displayDiv = await screen.findByTestId('display');

    fireEvent.change(backgroundLabel, {
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