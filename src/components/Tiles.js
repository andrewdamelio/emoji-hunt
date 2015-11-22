import React from 'react';
import Tile from './Tile';
import { Range } from 'immutable';

const Tiles = ({ addHit, addMiss, emoji, game, className = '' }) => {
  const tiles = Range(0, 3).map((idx) => {
    return (
      <Tile key={ idx }
            addHit={ addHit }
            addMiss={ addMiss}
            emoji={ emoji }
            game={ game } />
    );
  });

  return (
    <div className={ `${ className }` }>
      { tiles }
    </div>
  );
};

export default Tiles;
