import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import emojiService from '../utils/emoji';


@Radium
export default class Tile extends Component {

  static propTypes = {
    game: PropTypes.object.isRequired,
    emoji: PropTypes.object.isRequired,
    addMiss: PropTypes.func.isRequired,
    addHit: PropTypes.func.isRequired,
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
             ? [styles.tile, styles.highlight]
             : styles.tile } >

        { state.selected
          ? <div style={ styles.selected }>X</div>
          : state.emojis }
      </div>
    );
  }
}

const styles = {
  selected: {
    background: '#555273',
    color: '#555273',
  },
  highlight: {
    background: 'tomato',
  },
  tile: {
    fontSize: '4vw',
    width: '1.4em',
    cursor: 'pointer',
    userSelect: 'none',
  },
};
