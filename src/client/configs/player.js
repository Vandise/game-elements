export const BASE_STAT = 7;
export const BOON_BONUS = 5;
export const BANE_DECREMENT = 4;
export const DEFAULT_LEVEL = 1;

export const STATS = {
  strength: BASE_STAT,
  agility: BASE_STAT,
  intelligence: BASE_STAT,
  vitality: BASE_STAT
};

//
// Priority in which things will be rendered
// IE the player body will be first,
//   boots overlap part of the player,
//   pants can overlap boots, etc.
//  back a back item, ie cape, gets overlapped by the player
//  when heading in the "down" direction.
//
export const PLAYER_COMPOSITION_DISPLAY_PRIORITIES = {
  weapon: {
    compositionKey: null,
    priority: {
      all: 0.4
    }
  },
  player: {
    compositionKey: null,
    priority: {
      all: 0.5
    }
  },
  boots: {
    compositionKey: null,
    priority: {
      all: 1
    }
  },
  pants: {
    compositionKey: null,
    priority: {
      all: 2
    }
  },
  arms: {
    compositionKey: null,
    priority: {
      all: 3
    }
  },
  gloves: {
    compositionKey: null,
    priority: {
      all: 4
    }
  },
  body: {
    compositionKey: null,
    priority: {
      all: 5
    }
  },
  back: {
    compositionKey: null,
    priority: {
      all: 6,
      down: 0.1,
      left: 0.1,
      right: 0.1,
    }
  },
  head: {
    compositionKey: null,
    priority: {
      all: 7
    }
  }
};
