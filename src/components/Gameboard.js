import React from 'react';
import { Range } from 'immutable';
import Tiles from './Tiles';

const COLUMNS = 6;
const ITEMS_PER_COLUMN = 30;

const Gameboard = ({ addHit, addMiss, emoji, game}) => {
  const rows = Range(0, COLUMNS).map((idx) => {
    const tiles = Range(0, ITEMS_PER_COLUMN).map((index) => {
      return (
        <Tiles key={ index }
               className="flex flex-row"
               addHit={ addHit }
               addMiss={ addMiss }
               emoji={ emoji }
               game={ game } />
      );
    });

    return (
      <div key={ idx }
           style={ styles.container }
           className="flex flex-column overflow-scroll">
        { tiles }
      </div>
    );
  });

  return (
    <div style={ styles.boardHeight } className="flex border">
      { rows }
    </div>
  );
};

export default Gameboard;

const styles = {
  boardHeight: {
    height: '89vh',
  },
};
