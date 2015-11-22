import React from 'react';
import Radium from 'radium';
import Powerup from './Powerup';
import Targets from './Targets';
import Clock from './Clock';

const Menu = ({ emoji, game, powerup }) => {
  return (
    <footer className="p1 flex flex-justify"
            style={ styles.base }>

      <Powerup className="flex flex-column center"
               game={ game }
               powerup={ powerup } />

      <Targets className="flex flex-column center"
               game={ game }
               emoji={ emoji } />

      <Clock className="flex flex-column center"
             game={ game } />

    </footer>
  );
};

export default Radium(Menu);

const styles = {
  base: {
    userSelect: 'none',
    cursor: 'default',
  },
};
