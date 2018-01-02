import { ANIMATIONS } from '../../../entities/mainplayer/settings'; 
const animations = {
  walk_up: ANIMATIONS['walk_down'],
  stand_up: ANIMATIONS['stand_down']
};

export default {
  tattered_cape: {
    image: 'tattercape_black',
    width: 64,
    height: 64,
    slot: 'back',
    stats: {
      mDefense: 50
    },
    baseStats: {
      vitality: 15
    },
    animations
  },
  black_cape: {
    image: 'cape_black',
    width: 64,
    height: 64,
    slot: 'back',
    stats: {
      mDefense: 50
    },
    baseStats: {
      vitality: 15
    },
    animations
  }
};