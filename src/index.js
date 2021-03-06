import Game from './client/game';
import PlayScreen from './client/screens/playScreen';
import MainMenuScreen from './client/screens/mainMenuScreen';
import CharacterCreateScreen from './client/screens/characterCreateScreen';
import * as States from './client/screens/states';

if (process.env.NODE_ENV == 'development')
{
  require('./admin/index');
}

class Bootstrap
{

  constructor()
  {
    // Initialize the video.
    if (!me.video.init(600, 400, { wrapper : "screen", scale: 3.0 }))
    {
      alert("Your browser does not support HTML5 canvas.");
      return;
    }

    // add "#debug" to the URL to enable the debug Panel
    if (document.location.hash === "#debug")
    {
      window.onReady(() => {
        me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
      });
    }

    // Initialize the audio.
    me.audio.init("mp3,ogg");

    // Set a callback to run when loading is complete.
    me.loader.onload = this.loaded.bind(this);

    // Load the resources.
    me.loader.preload(Game.resources);
    me.sys.gravity = 0;
    // Initialize melonJS and display a loading screen.
    me.state.change(me.state.LOADING);

  }

  loaded()
  {
    me.state.set(me.state.PLAY, new PlayScreen());
    me.state.set(States.default.CHARACTER_CREATE, new CharacterCreateScreen());
    me.state.set(States.default.MAIN_MENU, new MainMenuScreen());

    Object.keys(Game.references.entities).forEach((name) => {
      me.pool.register(name, Game.references.entities[name]);
    });

    me.state.change(States.default.MAIN_MENU);
  }

  static boot()
  {
    const bootstrap = new Bootstrap();
    return bootstrap;
  }
}

window.onReady(() => {
    Bootstrap.boot();
});