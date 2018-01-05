import ActionFactory from './actions/factory';
import Stats from './stats';
import Moveable from '../base/moveable';
import Animateable from '../base/animateable';
import Game from '../../game';

const FRICTION = 0.4;
const VELOCITY = 2.5;
const SCALE = 0.75;

export default class MainPlayer extends Moveable(Animateable(me.ComposableSpritePlugin.ComposableSprite))
{

  constructor(x, y, settings)
  {
    const { image, composition } = Game.playerConfig;
    const loadedImage = me.loader.getImage(image || settings.image || 'male_light2');
    super(x, y, {
      image: loadedImage,
      width: 64,
      height: 64,
      name: 'MainPlayer'
    });

    this.renderable.animationspeed = 150;

    this.state = this.state || {};
    this.state['debugAnimations'] = false;

    this.actions = new ActionFactory(this);
    this.stats = new Stats({});

    this.actions.create('initialize').execute();//.then(() => {
      me.game.viewport.follow(this, me.game.viewport.AXIS.BOTH);
  
      this.renderable.scale(SCALE, SCALE);
      this.body.setVelocity(VELOCITY, VELOCITY);
      this.body.setFriction(FRICTION, FRICTION);
  
      this.renderable.anchorPoint = new me.Vector2d(0.5,0.8);
      this.body.addShape(
        new me.Rect(0,16,26,16)
      );
      this.body.removeShapeAt(0);
  
      composition.forEach((c) => {
        this.addCompositionItem(c);
      });
  
      if (process.env.NODE_ENV == 'development')
      {
        window.mainPlayer = this;
      }

    //});
  }

  addCompositionItem(item)
  {
    console.log('add item', item);
    super.addCompositionItem(item);
    if (this.actions)
    {
      this.actions.create('sortComposition').execute(true);
      this.actions.create('idle').execute();
    }
    if (this.stats)
    {
      this.stats.equipItem(item);
      this.state.equipmentSlots[item.slot] = item;
    }
  }

  removeCompositionItem(slot)
  {
    const itemName = (this.state.equipmentSlots[slot])['name'];
    this.state.equipmentSlots[slot] = null;
    super.removeCompositionItem(itemName);
    if (this.actions)
    {
      this.actions.create('sortComposition').execute(true);
      this.actions.create('idle').execute();
    }
    this.stats.resetEquipmentStats();
    Object.keys(this.state.equipmentSlots).forEach((k) => {
      if (this.state.equipmentSlots[k] != null)
      {
        this.stats.equipItem(this.state.equipmentSlots[k]);
      }
    });
  }

  update(time)
  {
    return this.actions.create('sortComposition').execute().then(() => {
      if (this.aMoveKeyIsPressed())
      {
        this.actions.create('move').execute();
      }
      else
      {
        this.actions.create('userInput').execute().then(() => {
          if (!this.state.animations.isAnimating)
          {
            this.actions.create('idle').execute();
          }
        });
      }
   
      this.body.update(time);
      return super.update(time);
    });
  }

  onCollision(response, other) {
    return true;
  }

}