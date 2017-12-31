import { DEFAULT_HEADING } from '../../shared/constants';
import { ANIMATIONS } from '../settings';

export default class
{

  constructor(player)
  {
    this.player = player;
  }

  execute()
  {
    this.player.setCurrentHeading(DEFAULT_HEADING);
    Object.keys(ANIMATIONS).forEach((k) => {
      let anim = ANIMATIONS[k];
      this.player.renderable.addAnimation(k, anim.frames, anim.speed);
    });
    this.player.state['equipmentSlots'] = {};
  }

}