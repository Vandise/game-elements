me.input.bindKey(me.input.KEY.A, "attack", true);

export default class
{

  constructor(player)
  {
    this.player = player;
  }

  execute()
  {
    return new Promise((resolve) => {
      if (me.input.isKeyPressed('attack'))
      {
        this.player.state.animations.isAnimating = true;
        this.player.triggerAnimation('attack_up', false, () => {
          this.player.state.animations.isAnimating = false;
          return true;
        });
      }
      return resolve(true);
    });
  }

}