import { ANIMATIONS, MOVEMENT_FRAME_SPEED } from '../../../entities/mainplayer/settings'; 
const animations = {};


Object.keys(ANIMATIONS).forEach((a) => {
  animations[a] = {
    frames: [0,0,0,0,0,0], speed: MOVEMENT_FRAME_SPEED
  };
});

animations['attack_up'] = {
  frames: [0,1,2,3,4,5],
  speed: MOVEMENT_FRAME_SPEED
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