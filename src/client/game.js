import resources from './resources';
import Entities from './entities/';
class Game
{

  constructor()
  {
    this.resources = resources;
    this.references = {
      entities: Entities
    };
    this.instances = {
      entities: {}
    };
  }

}

const game = new Game();

export default game;