import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import emojiService from '../utils/emoji';
import Summary from '../components/Summary';
import Menu from '../components/Menu';
import Gameboard from '../components/Gameboard';
import * as gameActions from '../actions/game';
import * as emojiActions from '../actions/emoji';

const NUMBER_OF_TARGERS = 15;
let TIMER_EVENT;


function mapState(state) {
  return {
    game: state.game,
    emoji: state.emoji,
  };
}

@connect(mapState, {...gameActions, ...emojiActions})
class Emoji extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
    emoji: PropTypes.object.isRequired,
    addMiss: PropTypes.func.isRequired,
    addHit: PropTypes.func.isRequired,
    setTargets: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    powerup: PropTypes.func.isRequired,
    resetEmoji: PropTypes.func.isRequired,
    resetGame: PropTypes.func.isRequired,
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
                 resetEmoji={ props.resetEmoji }
                 resetGame={ props.resetGame }
                 setupGame={ this._setupGame } />

      </section>
    );
  }
}

export default Emoji;

const styles = {
  base: {
    background: '#E2EFF1',
    color: '#555273',
  },
};
