import React from 'react';
import ReactDOM from 'react-dom';
import CharacterMenu from '../ui/menus/characterCreateMenu';
import game from '../game';

const PANEL_DIV = 'admin-debug';
const el = document.getElementById(PANEL_DIV);

class CharacterCreateScreen extends me.ScreenObject
{

  onResetEvent()
  {
    me.sys.pauseOnBlur = false;
    me.game.world.addChild(new me.ColorLayer("background", "#f1f1f1", 0), 0);
    ReactDOM.render(<CharacterMenu />, el);
  }

  onDestroyEvent()
  {
    ReactDOM.unmountComponentAtNode(el);
  }
};

export default CharacterCreateScreen;