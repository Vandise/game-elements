import { MOVEMENT_DIRECTIONS } from '../shared/constants';

let anim = {};
let battleAnim = {};

export const MOVEMENT_VELOCITY = 2.5;
export const MOVEMENT_FRAMES = 9;
export const MOVEMENT_FRAME_SPEED = 150;
export const ANIMATION_CONFIGS = {
  walk_up: { frameStart: 105, frames: MOVEMENT_FRAMES - 1, speed: MOVEMENT_FRAME_SPEED },
  walk_down: { frameStart: 131, frames: MOVEMENT_FRAMES - 1, speed: MOVEMENT_FRAME_SPEED },
  walk_left: { frameStart: 118, frames: MOVEMENT_FRAMES - 1, speed: MOVEMENT_FRAME_SPEED },
  walk_right: { frameStart: 144, frames: MOVEMENT_FRAMES - 1, speed: MOVEMENT_FRAME_SPEED }
};

export const BATTLE_ANIM = {
  attack_up: { frameStart: 156, frames: 6, speed: MOVEMENT_FRAME_SPEED }
};

MOVEMENT_DIRECTIONS.forEach((direction) => {
  let configs = ANIMATION_CONFIGS[`walk_${direction}`];
  anim[`walk_${direction}`] = {
    frames: Array((configs.frameStart + configs.frames) - configs.frameStart).fill().map((_, idx) => configs.frameStart  + idx),
    speed: configs.speed
  };
  anim[`stand_${direction}`] = {
    frames: [configs.frameStart - 1],
    speed: configs.speed
  };
});

Object.keys(BATTLE_ANIM).forEach((ani) => {
  let configs = BATTLE_ANIM[ani];
  battleAnim[ani] = {
    frames: Array((configs.frameStart + configs.frames) - configs.frameStart).fill().map((_, idx) => configs.frameStart  + idx),
    speed: configs.speed
  };
});

export const ANIMATIONS = anim;
export const BATTLE_ANIMATIONS = battleAnim;