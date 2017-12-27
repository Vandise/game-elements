import React from 'react';
import ReactDOM from 'react-dom';
import PlayerPanel from './panels/player';
import Styles from './styles/panels';

const PANEL_DIV = 'admin-debug';
const el = document.getElementById(PANEL_DIV);

const panels = {
  player: {
    rendered: false,
    view: PlayerPanel
  }
};

const PLAYER_PANEL_KEY = me.input.KEY.P;

window.onReady(() => {

  me.event.subscribe(me.event.KEYDOWN, function (action, keyCode) {
    if (keyCode === PLAYER_PANEL_KEY) {
      const panel = (panels['player']);
      if (panel.rendered)
      {
        ReactDOM.unmountComponentAtNode(el);
        panel.rendered = false;
      }
      else
      {
        const View = panel.view;
        ReactDOM.render(<View player={window.mainPlayer} />, el);
        panel.rendered = true;
      }
    }
  });

});