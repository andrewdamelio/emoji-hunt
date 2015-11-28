import React from 'react';

const Summary = ({ emoji, resetGame, setupGame, className = '' }) => {
  function handleReset() {
    resetGame();
    setupGame();
  }

  return (
    <section className={ `${className} fixed top-0 center overflow-scroll`}
             style={ styles.base }>
      <div className="p4" style={ styles.frontBig }>GAME OVER</div>

      <div className="p4" style={ styles.fontRegular }>

        - Hits -
        <div className="m2">{ emoji.get('hits').size > 0
          ? emoji.get('hits')
          : '0'  }
        </div>

        - Misses -
        <div className="m2">{ emoji.get('misses').size > 0
          ? emoji.get('misses')
          : 'Excellent work!'  }

        </div>
      </div>

      <button onClick={ handleReset }
              className="btn btn-outline">New Game</button>
    </section>
  );
};

export default Summary;

const styles = {
  base: {
    background: '#555273',
    color: '#B6D5E1',
    height: '100%',
    width: '100%',
  },
  fontRegular: {
    fontSize: '1.5em',
  },
  frontBig: {
    fontSize: '5em',
  },
};
