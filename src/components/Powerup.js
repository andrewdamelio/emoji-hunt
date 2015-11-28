import React from 'react';
import Radium from 'radium';

const Powerup = ({ game, powerup, className = '' }) => {
  function sightBuff() {
    if (!game.get('powerup').get('used')) {
      powerup();
      setTimeout(() => {
        powerup();
      }, 5000);
    }
  }

  return (
    <div className={ `${ className }` }>

        <div>Powerup</div>
        <i style={  game.get('powerup').get('used')
            ? styles.disabled
            : styles.fontSizeLg }
           className="ion-eye"
           onClick={ sightBuff }></i>
    </div>
  );
};

export default Radium(Powerup);

const styles = {
  disabled: {
    fontSize: '3em',
    filter: 'url(#blur)',
  },
  fontSizeLg: {
    fontSize: '3em',
    cursor: 'pointer',
  },
};
