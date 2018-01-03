import { DEFAULT_HEADING } from '../../shared/constants';
import { ANIMATIONS, BATTLE_ANIMATIONS } from '../settings';

export default class
{

  constructor(player)
  {
    this.player = player;
  }

  execute()
  {
    return new Promise((resolve) => {
      this.player.setCurrentHeading(DEFAULT_HEADING);
      Object.keys(ANIMATIONS).forEach((k) => {
        let anim = ANIMATIONS[k];
        this.player.renderable.addAnimation(k, anim.frames, anim.speed);
      });
      Object.keys(BATTLE_ANIMATIONS).forEach((k) => {
        let anim = BATTLE_ANIMATIONS[k];
        this.player.renderable.addAnimation(k, anim.frames, anim.speed);
      });
      this.player.state['equipmentSlots'] = {};
      return resolve(true);
    });
  }

}