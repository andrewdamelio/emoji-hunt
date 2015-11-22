import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import emojiService from '../utils/emoji';


@Radium
export default class Tile extends Component {

  static propTypes = {
    game: PropTypes.object,
    emoji: PropTypes.object,
    addMiss: PropTypes.func,
    addHit: PropTypes.func,
  }


  _initalState = () => {
    return {
      selected: false,
      counted: false,
      emojis: (() => {
        return emojiService.getRandomEmojis({
          count: 1,
        })[0].character;
      })(),
    };
  };

  _resetState = () => {
    this.setState(this._initalState());
  }

  _toggleSelected = () => {
    this.setState({
      selected: !this.state.selected,
    });
  }

  _isPoint = () => {
    return this.props.emoji.get('targets').includes(this.state.emojis);
  }

  state = this._initalState();


  componentWillReceiveProps(nextProps) {
    const { state } = this;

    if (this.props.game.get('completed') && !nextProps.game.get('completed')) {
      this._resetState();
    }

    if (!state.counted && nextProps.game.get('completed')) {
      if (state.selected && this._isPoint()) {
        nextProps.addHit(state.emojis);
      }

      if (state.selected && !this._isPoint()) {
        nextProps.addMiss(state.emojis);
      }

      if (!state.selected && this._isPoint()) {
        nextProps.addMiss(state.emojis);
      }

      this.setState({
        counted: !state.counted,
      });
    }
  }

  render() {
    const { state, props } = this;
    const powerupActive = props.game.get('powerup').get('active');

    if (!state.emojis) {
      return null;
    }

    return (
      <div ref="tile"
           className="border center"
           onClick={ this._toggleSelected }
           style={ this._isPoint() && powerupActive
             ? [styles.title, styles.highlight]
             : styles.title } >

        { state.selected
          ? <div style={ styles.selected }>?</div>
          : state.emojis }
      </div>
    );
  }
}

const styles = {
  selected: {
    color: 'rgba(0,0,0,0)',
  },
  highlight: {
    background: '#555273',
  },
  title: {
    fontSize: '4vw',
    width: '1.4em',
    cursor: 'pointer',
    userSelect: 'none',
  },
};
