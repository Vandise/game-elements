import BaseEntity from './baseEntity';

const ANIMATION_RESOLVE = 'Animation complete.';
const ANIMATION_RESOLVE_ANIMATING = 'Specified animation is currently running.';

export default (Base = BaseEntity) => class extends Base
{

  constructor(x, y, settings)
  {
    super(x, y, settings);
    this.state = this.state || {};
    this.state['animations'] = {};
  }

  triggerAnimation(animationName, returnFirstFrame = true)
  {
    const cb = (() => {
      return returnFirstFrame;        
    }).bind(this);

    if (!this.renderable.isCurrentAnimation(animationName))
    {
      return this.renderable.setCurrentAnimation(animationName, cb);
    }
  }

}