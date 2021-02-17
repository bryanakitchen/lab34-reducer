/* eslint-disable max-len */
import React, { useReducer } from 'react';

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
        after: [current, ...after],
        current: before[before.length - 1],
        before: before.slice(0, -1)
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
      };
    default: 
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const undo = () => dispatch({ type: 'CLICK_UNDO' });
  const redo = () => dispatch({ type: 'CLICK_REDO' });

  return (
    <>
      <button disabled={!state.before.length} onClick={undo}>undo</button>
      <button disabled={!state.after.length} onClick={redo}>redo</button>

      <input id="RECORD" type="color" value={state.current} 
        onChange={({ target }) => dispatch({ type: target.id, payload: target.value })} />
      <label htmlFor="RECORD">Color Input</label>

      <div data-testid="display" style={{ backgroundColor: state.current, width: '10rem', height: '10rem' }}></div>
    </>
  );
}

export default App;
