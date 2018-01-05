import React from 'react';
import styles from './styles/mainMenu';
import * as States from '../../screens/states';

const createCharacter = () => {
  return me.state.change(States.default.CHARACTER_CREATE);
};

const playLevel = () => {
  return me.state.change(me.state.PLAY);
};


export default () => {
  return (
    <div className='menu'>
      <div className='mainMenu'>
        <ul className='menuOptions'>
          <li onClick={ createCharacter }>Character Design</li>
          <li onClick={ playLevel }>Dev Area</li>
        </ul>
      </div>
    </div>
  );
};