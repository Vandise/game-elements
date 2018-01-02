import move from './move';
import idle from './idle';
import initialize from './initialize';
import sortComposition from './compositionIndex';

const ACTIONS = {
  move,
  initialize,
  idle,
  sortComposition
};

export default class
{

  constructor(player)
  {
    this.player = player;
    this.staticActions = {
      sortComposition: (new sortComposition(this.player))
    };
  }

  create(actionName)
  {
    if (Object.keys(ACTIONS).indexOf(actionName) > -1)
    {
      const klass = ACTIONS[actionName];
      return this.staticActions[actionName] || (new klass(this.player));
    }
    return false;
  }

};