import { MOVEMENT_VELOCITY } from '../settings';

export default class
{

  constructor(player)
  {
    this.player = player;
  }

  execute()
  {
    if (me.input.isKeyPressed('left'))
    {
      this.player.body.vel.x = -MOVEMENT_VELOCITY;
      this.player.setCurrentHeading('left');
      if (!this.player.renderable.isCurrentAnimation('walk_left'))
      {
        this.player.renderable.setCurrentAnimation('walk_left');
      }
    }
    else if (me.input.isKeyPressed('right'))
    {
      this.player.body.vel.x = MOVEMENT_VELOCITY;
      this.player.setCurrentHeading('right');
      if (!this.player.renderable.isCurrentAnimation('walk_right'))
      {
        this.player.renderable.setCurrentAnimation('walk_right');
      }
    }
    else if (me.input.isKeyPressed('up'))
    {
      this.player.body.vel.y = -MOVEMENT_VELOCITY;
      this.player.setCurrentHeading('up');
      if (!this.player.renderable.isCurrentAnimation('walk_up'))
      {
        this.player.renderable.setCurrentAnimation('walk_up');
      }
    }
    else if (me.input.isKeyPressed('down'))
    {
      this.player.body.vel.y = MOVEMENT_VELOCITY;
      this.player.setCurrentHeading('down');
      if (!this.player.renderable.isCurrentAnimation('walk_down'))
      {
        this.player.renderable.setCurrentAnimation('walk_down');
      }
    }
    else
    {
      throw new Exception('No input handler for a movement key specified in movable.aKeyIsPressed');
    }
  }

}