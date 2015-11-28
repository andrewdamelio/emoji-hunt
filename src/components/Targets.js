import React from 'react';
import Radium from 'radium';

const Menu = ({ emoji, game, className = '' }) => {
  return (
    <div className={ `${ className }` }>
      <div>Targets</div>
      <div className="flex flex-row"
           disabled={ game.get('powerup').get('used') }>
        { emoji.get('targets').map((target, idx) => {
          return (
            <span key={ idx }
                  style={ styles.zoom }>
              { target }
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Radium(Menu);

const styles = {
  zoom: {
    fontSize: '9px',
    cursor: 'zoom-in',
    ':hover': {
      fontSize: '43px',
    },
  },
};
