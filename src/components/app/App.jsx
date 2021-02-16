/* eslint-disable max-len */
import React, { useState, useReducer } from 'react';

const initialState = {
  before: [],
  current: '#FF0000',
  after: []
};

function reducer(state, action) {

  const { current, before, after } = state;
  
  switch(action.type) {
    case 'CLICK_UNDO':
      return { 
        ...state, 
        // after: after ? [current, ...after] : [current], 
        after: [current, ...after],
        current: before[before.length - 1],
        // pick from previous
        before: before.slice(0, -1)
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
        current: action.payload 
        // comes from target.value - line 83
      };
    default: 
      return state;
  }
}

// const useRecord = (init) => {
//   const [before, setBefore] = useState([]);
//   const [current, setCurrent] = useState(init);
//   const [after, setAfter] = useState([]);

//   const undo = () => {
//     setAfter(after => [current, ...after]);
//     setCurrent(before[before.length - 1]);
//     setBefore(before => before.slice(0, -1));
//   };

//   const redo = () => {
//     setBefore(before => [...before, current]);
//     setCurrent(after[0]);
//     setAfter(after => after.slice(1));
//   };

//   const record = val => {
//     setBefore(before => [...before, current]);
//     setCurrent(val);
//   };

//   return {
//     undo,
//     record,
//     redo,
//     current,
//   };
// };

function App() {
  // const { current, undo, redo, record } = useRecord('#FF0000');
  const [state, dispatch] = useReducer(reducer, initialState);

  const undo = () => dispatch({ type: 'CLICK_UNDO' });
  const redo = () => dispatch({ type: 'CLICK_REDO' });

  return (
    <>
      <button onClick={undo}>undo</button>
      <button onClick={redo}>redo</button>

      <input id="RECORD" type="color" value={state.current} 
        onChange={({ target }) => dispatch({ type: target.id, payload: target.value })} />
      <label htmlFor="RECORD">Color Input</label>

      <div data-testid="display" style={{ backgroundColor: state.current, width: '10rem', height: '10rem' }}></div>
    </>
  );
}

export default App;
