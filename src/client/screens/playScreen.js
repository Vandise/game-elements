import game from '../game';

class PlayScreen extends me.ScreenObject {
  /**
  *  action to perform on state change
  */
  onResetEvent() {
    me.sys.pauseOnBlur = false;
    me.levelDirector.loadLevel("dev_01");
    me.game.world.addChild(new me.ColorLayer("background", "#000", 0), 0);
    me.input.bindKey(me.input.KEY.LEFT,  "left");
    me.input.bindKey(me.input.KEY.RIGHT, "right");
    me.input.bindKey(me.input.KEY.UP,    "up");
    me.input.bindKey(me.input.KEY.DOWN,  "down");
  }

  onDestroyEvent() {
    // save player POS when nextstate is battle
  }
};

export default PlayScreen;