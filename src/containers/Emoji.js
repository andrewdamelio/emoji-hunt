import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import emojiService from '../utils/emoji';
import Summary from '../components/Summary';
import Menu from '../components/Menu';
import Gameboard from '../components/Gameboard';

import { powerup, decrement, resetGame } from '../actions/game';
import { addHit, addMiss, setTargets } from '../actions/emoji';


const NUMBER_OF_TARGERS = 15;
let TIMER_EVENT;


function mapStateToProps(state) {
  return {
    game: state.game,
    emoji: state.emoji,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    powerup: () => dispatch(powerup()),
    decrement: () => dispatch(decrement()),
    resetGame: () => dispatch(resetGame()),
    addHit: (emoji) => dispatch(addHit(emoji)),
    addMiss: (emoji) => dispatch(addMiss(emoji)),
    setTargets: (emojis) => dispatch(setTargets(emojis)),
  };
}

class Emoji extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
    emoji: PropTypes.object.isRequired,
    powerup: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    resetGame: PropTypes.func.isRequired,
    addHit: PropTypes.func.isRequired,
    addMiss: PropTypes.func.isRequired,
    setTargets: PropTypes.func.isRequired,
  };


  _setupGame = () => {
    const { props } = this;

    props.setTargets(emojiService.getRandomEmojis({
      count: NUMBER_OF_TARGERS,
    }));

    TIMER_EVENT = setInterval(props.decrement, 1000);
  }

  componentDidMount() {
    this._setupGame();
  }

  componentDidUpdate() {
    if (this.props.game.get('completed')) {
      clearInterval(TIMER_EVENT);

      // when the game resets scroll all the tile columns back to the top
      const tileColumns = document.querySelectorAll('div.flex-column.overflow-scroll');
      Object.keys(tileColumns).map((index) => {
        tileColumns[index].scrollTop = 0;
      });
    }
  }

  render() {
    const { props } = this;

    return (
      <section style={ styles.base }>

        <Gameboard addHit={ props.addHit }
                   addMiss={ props.addMiss }
                   emoji={ props.emoji }
                   game={ props.game } />

        <Menu powerup={ props.powerup }
              emoji={ props.emoji }
              game={ props.game } />

        <Summary className={ !props.game.get('completed') ? 'hide' : '' }
                 emoji={ props.emoji }
                 resetGame={ props.resetGame }
                 setupGame={ this._setupGame } />

      </section>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Emoji);


const styles = {
  base: {
  },
};
