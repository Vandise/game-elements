import { ANIMATIONS } from '../../../entities/mainplayer/settings'; 
const animations = {};


Object.keys(ANIMATIONS).forEach((a) => {
  animations[a] = {
    frames: [999], speed: 0
  };
});

animations['attack_up'] = {
  frames: [0,1,2,3,4,5],
  speed: 100
};

const anchorPoint = new me.Vector2d(0.5,0.6);

export default {
  long_sword: {
    name: 'longsword_male',
    image: 'longsword_male',
    width: 192,
    height: 192,
    slot: 'weapon',
    stats: {},
    baseStats: {},
    animations,
    anchorPoint
  }
};