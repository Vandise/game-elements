import * as configs from '../../configs/player';

const INITIAL_EQUIPMENT_STATS = {
  baseStats: {
    agility: 0,
    strength: 0,
    intelligence: 0,
    vitality: 0
  },
  stats: {
    pAttack: 0,
    mAttack: 0,
    pDefense: 0,
    mDefense: 0,
    maxHP: 0,
    maxMP: 0
  }
};

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

    this.stats = Object.assign(Object.create(Object.getPrototypeOf(configs.STATS)), configs.STATS);
    this.equipmentStats = {
      baseStats: {
        agility: 0,
        strength: 0,
        intelligence: 0,
        vitality: 0
      },
      stats: {
        pAttack: 0,
        mAttack: 0,
        pDefense: 0,
        mDefense: 0,
        maxHP: 0,
        maxMP: 0
      }
    };

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

  resetEquipmentStats()
  {
    this.equipmentStats = {
      baseStats: {
        agility: 0,
        strength: 0,
        intelligence: 0,
        vitality: 0
      },
      stats: {
        pAttack: 0,
        mAttack: 0,
        pDefense: 0,
        mDefense: 0,
        maxHP: 0,
        maxMP: 0
      }
    };
    this.calculateBaseStats();
  }

  equipItem(item)
  {
    if (item.stats)
    {
      Object.keys(item.stats).forEach((stat) => {
        this.equipmentStats.stats[stat] += item.stats[stat];
      });
    }
    if (item.baseStats)
    {
      Object.keys(item.baseStats).forEach((stat) => {
        this.equipmentStats.baseStats[stat] += item.baseStats[stat];
      });
    }
    this.calculateBaseStats();
  }

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
      )) + this.equipmentStats.baseStats[stat];
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
    )) + this.equipmentStats.stats.pDefense;
  }

  calculateMDefense()
  {
    this.mDefense = Math.round(Math.sqrt(
        ((this.level * ( (this.stats.intelligence * 0.75) + this.stats.agility) * 0.9)) * (this.stats.agility * 0.15)
    )) + this.equipmentStats.stats.mDefense;
  }

  calculateMAttack()
  {
    this.mAttack = Math.round(Math.sqrt(
        ((this.level * (this.stats.intelligence + this.stats.agility) * 0.9)) * (this.stats.intelligence * 0.15)
    )) + this.equipmentStats.stats.mAttack;
  }

  calculatePAttack()
  {
    this.pAttack = Math.round(Math.sqrt(
        ((this.level * (this.stats.strength + this.stats.agility) * 0.9)) * (this.stats.strength * 0.15)
    )) + this.equipmentStats.stats.pAttack;
  }

  calculateMaxHP()
  {
    this.maxHP = Math.round(Math.sqrt(
        ((this.level * this.stats.vitality * 0.8) * ( this.stats.vitality / 1.2 )) + this.stats.vitality
    ) + (this.stats.vitality / 4.5 )) + this.equipmentStats.stats.maxHP;
  }

  calculateMaxMP()
  {
    this.maxMP = Math.round(Math.sqrt(
        ((this.level * this.stats.intelligence * 0.9) * ( this.stats.intelligence / 1.2 ))
    ) + this.stats.intelligence) + this.equipmentStats.stats.maxMP;
  }

}