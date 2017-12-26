const FRICTION = 0.4;
const VELOCITY = 2.5;
const SCALE = 0.75;

export default class MainPlayer extends me.ComposableSpritePlugin.ComposableSprite
{

  constructor(x, y, settings)
  {
    console.log(x, y, settings);
    const image = me.loader.getImage('player_male_light');
    super(x, y, {
      image,
      width: 64,
      height: 64,
      name: 'MainPlayer'
    });

    me.game.viewport.follow(this, me.game.viewport.AXIS.BOTH);

    this.renderable.scale(SCALE, SCALE);
    this.body.setVelocity(VELOCITY, VELOCITY);
    this.body.setFriction(FRICTION, FRICTION);

    this.renderable.addAnimation('walk_up', [104,105,106,107,108,109,110,111,112], 150);
    this.renderable.addAnimation('walk_down', [130,131,132,133,134,135,136,137,138], 150);
    this.renderable.addAnimation('walk_left', [117,118,119,120,121,122,123,124,125], 150);
    this.renderable.addAnimation('walk_right', [143,144,145,146,147,148,149,150,151], 150);

    this.renderable.addAnimation('stand_up', [104,104], 150);
    this.renderable.addAnimation('stand_down', [130,130], 150);
    this.renderable.addAnimation('stand_left', [117,117], 150);
    this.renderable.addAnimation('stand_right', [143,143], 150);

    this.direction = 'up';

    this.renderable.setCurrentAnimation('stand_up');

    this.renderable.anchorPoint = new me.Vector2d(0.5,0.8);
    this.body.addShape(
      new me.Rect(0,16,26,16)
    );
    this.body.removeShapeAt(0);
  }

  update(time)
  {
    if (me.input.isKeyPressed('left')) {
      this.body.vel.x = -VELOCITY;
      this.direction = 'left';
      if (!this.renderable.isCurrentAnimation('walk_left')) {
        this.renderable.setCurrentAnimation('walk_left');
      }
    } else if (me.input.isKeyPressed('right')) {
      this.body.vel.x = VELOCITY;
      this.direction = 'right';
      if (!this.renderable.isCurrentAnimation('walk_right')) {
        this.renderable.setCurrentAnimation('walk_right');
      }
    } else if (me.input.isKeyPressed('up')) {
      this.body.vel.y = -VELOCITY;
      this.direction = 'up';
      if (!this.renderable.isCurrentAnimation('walk_up')) {
        this.renderable.setCurrentAnimation('walk_up');
      }
    } else if (me.input.isKeyPressed('down')) {
      this.body.vel.y = VELOCITY;
      this.direction = 'down';
      if (!this.renderable.isCurrentAnimation('walk_down')) {
        this.renderable.setCurrentAnimation('walk_down');
      }
    } else {
      this.body.vel.x = 0;
      this.body.vel.y = 0;
      if (!this.renderable.isCurrentAnimation(`stand_${this.direction}`)) {
        this.renderable.setCurrentAnimation(`stand_${this.direction}`);
      }
    }
    this.body.update(time);
    return (this._super(me.Entity, 'update', [time]) || (this.body.vel.x !== 0 || this.body.vel.y !== 0) );
  }

}