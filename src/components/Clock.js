import React from 'react';
import Radium from 'radium';

const Menu = ({ game, className = '' }) => {
  return (
    <div className={ `${ className }` }>
      <div>Time left</div>
      <span style={ styles.fontSizeMd }>{ game.get('currentTime') }</span>
    </div>
  );
};

export default Radium(Menu);

const styles = {
  fontSizeMd: {
    fontSize: '2em',
  },
};
