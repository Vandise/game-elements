
export default class
{

  constructor(player)
  {
    this.player = player;
  }

  execute()
  {
    this.player.body.vel.x = 0;
    this.player.body.vel.y = 0;
    if (!this.player.renderable.isCurrentAnimation(`stand_${this.player.currentHeading()}`))
    {
      this.player.renderable.setCurrentAnimation(`stand_${this.player.currentHeading()}`);
    }
  }

}