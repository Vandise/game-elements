import * as configs from '../../configs/player';

export default class PlayerStats
{

  constructor(settings)
  {
    const self = this;
    this.level = configs.DEFAULT_LEVEL;
    this.boon = '';
    this.bane = '';

    this.maxHP = 0;
    this.maxMP = 0;
    this.pAttack = 0;
    this.mAttack = 0;
    this.pDefense = 0;
    this.mDefense = 0;

    this.stats = Object.assign({}, configs.STATS);

    Object.keys(settings).forEach((k) => {
      if (self.hasOwnProperty(k))
      {
        if ( settings[k] instanceof Object )
        {
          self[k] = Object.assign({}, self[k], settings[k]);
        }
        else
        {
          self[k] = settings[k];
        }
      }
    });
    this.calculateMaxHP();
    this.calculateMaxMP();
    this.calculatePAttack();
    this.calculatePDefense();
    this.calculateMAttack();
    this.calculateMDefense();
  }

  // Sqrt( ( level * base_stat * 1.8 ) * (base_stat / 1.4) )
  calculateBaseStats()
  {
    this.stats = Object.assign({}, configs.STATS);
    if (this.boon != '')
    {
      this.stats[this.boon] += configs.BOON_BONUS;
    }
    if (this.bane != '')
    {
      this.stats[this.bane] -= configs.BANE_DECREMENT;
    }
    Object.keys(this.stats).forEach((stat) => {
      this.stats[stat] = Math.round(Math.sqrt(
        ((this.level * this.stats[stat] * 1.8) * ( this.stats[stat] / 1.3 ))
      ));
    });
    this.calculateMaxHP();
    this.calculateMaxMP();
    this.calculatePAttack();
    this.calculatePDefense();
    this.calculateMAttack();
    this.calculateMDefense();
  }

  setStatSetting(field, value)
  {
    const self = this;
    self[field] = value;
  }

  getStat(name)
  {
    return this.stats[name];
  }

  getMaxHP()
  {
    return this.maxHP;
  }

  getMaxMP()
  {
    return this.maxMP;
  }

  getpAttack()
  {
    return this.pAttack;
  }

  getpDefense()
  {
    return this.pDefense;
  }

  getmDefense()
  {
    return this.mDefense;
  }

  getmAttack()
  {
    return this.mAttack;
  }

  calculatePDefense()
  {
    this.pDefense = Math.round(Math.sqrt(
        ((this.level * ( (this.stats.strength * 0.75) + this.stats.agility) * 0.9)) * (this.stats.agility * 0.15)
    ));
  }

  calculateMDefense()
  {
    this.mDefense = Math.round(Math.sqrt(
        ((this.level * ( (this.stats.intelligence * 0.75) + this.stats.agility) * 0.9)) * (this.stats.agility * 0.15)
    ));
  }

  calculateMAttack()
  {
    this.mAttack = Math.round(Math.sqrt(
        ((this.level * (this.stats.intelligence + this.stats.agility) * 0.9)) * (this.stats.intelligence * 0.15)
    ));
  }

  calculatePAttack()
  {
    this.pAttack = Math.round(Math.sqrt(
        ((this.level * (this.stats.strength + this.stats.agility) * 0.9)) * (this.stats.strength * 0.15)
    ));
  }

  calculateMaxHP()
  {
    this.maxHP = Math.round(Math.sqrt(
        ((this.level * this.stats.vitality * 0.8) * ( this.stats.vitality / 1.2 )) + this.stats.vitality
    ) + (this.stats.vitality / 4.5 ));
  }

  calculateMaxMP()
  {
    this.maxMP = Math.round(Math.sqrt(
        ((this.level * this.stats.intelligence * 0.9) * ( this.stats.intelligence / 1.2 ))
    ) + this.stats.intelligence);
  }

}