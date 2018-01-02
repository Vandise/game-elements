import { PLAYER_COMPOSITION_DISPLAY_PRIORITIES } from '../../../configs/player';

const DEFAULT_PRIORITY = 1;
const DEFAULT_PRIORITY_KEY = 'all';

class CompositionPriorityHeap
{

  constructor(heading)
  {
    this.heading = heading;
    this.displayPriorities = JSON.parse(JSON.stringify(PLAYER_COMPOSITION_DISPLAY_PRIORITIES));
    this.composition = [];
    this.sorted = [];
    this.heapLength = 0;
  }

  addItem(slot, name)
  {
    this.composition.push(name);
    this.displayPriorities[slot].compositionKey = name;
    this.bubbleUp(this.composition.length - 1);
  }

  bubbleUp(compositionIndex)
  {
    const compositionKey = this.composition[compositionIndex];
    const score = this.score(compositionKey);
    let n = this.composition.indexOf(compositionKey);

    while (n > 0)
    {
      let parentN = Math.floor((n + 1) / 2) - 1;
      let parent = this.composition[parentN];

      if (score <= this.score(parent))
      {
        // swap the two items
        this.composition[parentN] = compositionKey;
        this.composition[n] = parent;
  
        n = parentN;
      }
      else
      {
        break;
      }
    }
  }

  score(compositionKey)
  {
    let item = this.getItem(compositionKey);
    let score = DEFAULT_PRIORITY;

    // check if the priority is direction specific
    if (item.priority.hasOwnProperty(this.heading))
    {
      score = item.priority[this.heading];
    }
    else
    {
      score = item.priority[DEFAULT_PRIORITY_KEY];
    }

    return score;
  }

  getItem(compositionKey)
  {
    let item = null;
    Object.keys(this.displayPriorities).forEach((k) => {
      if ( this.displayPriorities[k].compositionKey == compositionKey)
      {
        item = this.displayPriorities[k];
      }
    });
    return item
  }

  swap(i, j)
  {
    const temp = this.composition[i];
    this.composition[i] = this.composition[j];
    this.composition[j] = temp;
  }

  heapify(index)
  {
    const leftIndex = 2 * index + 1;
    const rightIndex = leftIndex + 1;
    let max = index;

    if (leftIndex < this.heapLength && this.score(this.composition[leftIndex]) > this.score(this.composition[max]))
    {
      max = leftIndex;
    }

    if (rightIndex < this.heapLength && this.score(this.composition[rightIndex]) > this.score(this.composition[max]))
    {
      max = rightIndex;
    }

    if (max != index)
    {
      this.swap(index, max);
      this.heapify(max);
    }
  }

  sort()
  {
    this.heapLength = this.composition.length;
    for (let i = Math.floor(this.heapLength / 2); i >= 0; i -= 1)
    {
      this.heapify(i);
    }

    for(let i = this.heapLength - 1; i > 0; i--)
    {
      this.swap(0, i);
      this.heapLength--;
      this.heapify(0);
    }
  }

  compositionPriorities()
  {
    this.sort();
    return this.composition;
  }

}

export default class
{

  constructor(player)
  {
    this.player = player;
    this.currentAnimation = this.player.renderable.current.name;
  }

  execute(force = false)
  {
    return new Promise((resolve, reject) => {
      // reorder the sprite compostion
      if(!this.player.renderable.isCurrentAnimation(this.currentAnimation) || force)
      {
        const cp = new CompositionPriorityHeap( this.player.currentHeading() );
  
        this.currentAnimation = this.player.renderable.current.name;
        console.log('resort', this.player.renderable.composition);
        this.player.renderable.composition.forEach((item) => {
          let name = null;
          let slot = null;
  
          if (item == this.player.renderable.name)
          {
            name = item;
            slot = 'player';
          }
          else
          {
            const c = this.player.renderable.children[item].item;
            name = c.name;
            slot = c.slot;
          }
          cp.addItem(slot, name);
        });
  
        this.player.renderable.composition = cp.compositionPriorities();
        resolve(true);
      }
      else
      {
        resolve(true);
      }
    });
  }

}