const USTATE = me.state.USER;
let stateIncrementer = 0;

const states = {};

export const addState = (state) => {
  stateIncrementer++;
  states[state] = USTATE + stateIncrementer;
};

addState('MAIN_MENU');
addState('CHARACTER_CREATE');

export default states;