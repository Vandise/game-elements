import { MOVEMENT_DIRECTIONS, DEFAULT_HEADING } from '../shared/constants';
import BaseEntity from './baseEntity';

export default (Base = BaseEntity) => class extends Base
{

  constructor(x, y, settings)
  {
    super(x, y, settings);
  }

  setCurrentHeading(heading)
  {
    this.state['currentHeading'] = heading;
  }

  currentHeading()
  {
    return this.state.currentHeading;
  }

  aMoveKeyIsPressed()
  {
    return me.input.isKeyPressed('left') || me.input.isKeyPressed('right') || me.input.isKeyPressed('up') || me.input.isKeyPressed('down');
  }

}