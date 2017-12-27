export default class OpacityEffect extends me.Entity
{

  constructor(x, y, settings)
  {
    super(x, y, {
      width: 32,
      height: 32,
      name: 'OpacityEffect'
    });

    this.configs = settings;
    this.fadeIn = true;
    this.intervalCounter = 0;
  }

  update(time)
  {
    if (this.renderable && this.renderable.alpha == 1)
    {
      this.renderable.alpha = 0;
    }
    if (this.intervalCounter == this.configs.interval_ms)
    {
      if (this.fadeIn)
      {
        if (this.renderable.alpha < this.configs.opacity_max)
        {
          this.renderable.alpha += this.configs.opacity_rate;
        }
        else
        {
          this.fadeIn = false;
        }
      }
      else
      {
        if (this.renderable.alpha > this.configs.opacity_min)
        {
          this.renderable.alpha -= this.configs.opacity_rate;
        }
        else
        {
          this.fadeIn = true;
        }
      }
      this.intervalCounter = 0;
    }
    else
    {
      this.intervalCounter++;
    }
    return true;
  }

}