import React from 'react';
import ReactDOM from 'react-dom';
import game from '../game';
import MainMenu from '../ui/menus/mainMenu';
import { LARGE_MENU_DIV_ID } from '../ui/config';

const el = document.getElementById(LARGE_MENU_DIV_ID);

class MainMenuScreen extends me.ScreenObject
{

  onResetEvent()
  {
    me.sys.pauseOnBlur = false;
    me.game.world.addChild(new me.ColorLayer("background", "#000", 0), 0);
    ReactDOM.render(<MainMenu />, el);
  }

  onDestroyEvent()
  {
    ReactDOM.unmountComponentAtNode(el);
  }
};

export default MainMenuScreen;