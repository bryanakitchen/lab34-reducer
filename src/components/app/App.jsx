/* eslint-disable max-len */
import React, { useState } from 'react';

const initialState = {
  before: [],
  current: '#FF0000',
  after: []
};

function reducer(state, action) {
  switch(action.type) {
    case 'CLICK_UNDO':
      return { 
        ...state, 
        after: [current, ...after], 
        current: before[before.length - 1],
        // pick from previous
        before: before.slice(0, -1), 
        // removes last one
      };
    case 'CLICK_REDO':
      return { 
        ...state, 
        before: [...before, current],
        current: after[0],
        after: after.slice(1)
      };
    case 'RECORD':
      return {
        ...state,
        before: [...before, current],
        current: state
        // is current supposed to be state?
      };
    default: 
      return state;
  }
}

const useRecord = (init) => {
  const [before, setBefore] = useState([]);
  const [current, setCurrent] = useState(init);
  const [after, setAfter] = useState([]);

  const undo = () => {
    setAfter(after => [current, ...after]);
    setCurrent(before[before.length - 1]);
    setBefore(before => before.slice(0, -1));
  };

  const redo = () => {
    setBefore(before => [...before, current]);
    setCurrent(after[0]);
    setAfter(after => after.slice(1));
  };

  const record = val => {
    setBefore(before => [...before, current]);
    setCurrent(val);
  };

  return {
    undo,
    record,
    redo,
    current,
  };
};

function App() {
  const { current, undo, redo, record } = useRecord('#FF0000');

  return (
    <>
      <button onClick={undo}>undo</button>
      <button onClick={redo}>redo</button>

      <input id="color-input" type="color" value={current} onChange={({ target }) => record(target.value)} />
      <label htmlFor="color-input">Color Input</label>

      <div data-testid="display" style={{ backgroundColor: current, width: '10rem', height: '10rem' }}></div>
    </>
  );
}

export default App;
