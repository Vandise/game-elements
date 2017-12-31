import ActionFactory from './actions/factory';
import Stats from './stats';
import Moveable from '../base/moveable';
import Animateable from '../base/animateable';

const FRICTION = 0.4;
const VELOCITY = 2.5;
const SCALE = 0.75;

export default class MainPlayer extends Moveable(Animateable(me.ComposableSpritePlugin.ComposableSprite))
{

  constructor(x, y, settings)
  {
    const image = me.loader.getImage('player_male_light');
    super(x, y, {
      image,
      width: 64,
      height: 64,
      name: 'MainPlayer'
    });

    this.state = this.state || {};
    this.actions = new ActionFactory(this);
    this.stats = new Stats({});

    this.actions.create('initialize').execute();

    me.game.viewport.follow(this, me.game.viewport.AXIS.BOTH);

    this.renderable.scale(SCALE, SCALE);
    this.body.setVelocity(VELOCITY, VELOCITY);
    this.body.setFriction(FRICTION, FRICTION);

    this.renderable.anchorPoint = new me.Vector2d(0.5,0.8);
    this.body.addShape(
      new me.Rect(0,16,26,16)
    );
    this.body.removeShapeAt(0);

    if (process.env.NODE_ENV == 'development')
    {
      window.mainPlayer = this;
    }

  }

  addCompositionItem(item)
  {
    super.addCompositionItem(item);
    console.log('overriden', item);
    if (this.stats)
    {
      this.stats.equipItem(item);
    }
  }

  update(time)
  {
    if (this.aMoveKeyIsPressed())
    {
      this.actions.create('move').execute();
    }
    else
    {
      this.actions.create('idle').execute();
    }
 
    this.body.update(time);
    return (this._super(me.Entity, 'update', [time]) || (this.body.vel.x !== 0 || this.body.vel.y !== 0) );
  }

}