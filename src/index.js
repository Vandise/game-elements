import Game from './client/game';
import PlayScreen from './client/screens/playScreen';

class Bootstrap
{

  constructor()
  {
    // Initialize the video.
    if (!me.video.init(600, 400, { wrapper : "screen", scale: 2.0 }))
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

    Object.keys(Game.references.entities).forEach((name) => {
      me.pool.register(name, Game.references.entities[name]);
    });

    me.state.change(me.state.PLAY);
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