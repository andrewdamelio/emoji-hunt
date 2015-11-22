import R from 'ramda';
import e from 'emojilib';

let validEmojis = [];

const problemEmojis = ['point_up', 'sunny', 'cloud', 'snowflake', 'heart',
  'phone',
  'email',
  'scissors', 'black_nib', 'pencil2', 'sparkle', 'eight_spoked_asterisk',
  'eight_pointed_black_star', 'arrow_forward', 'arrow_backward',
  'arrow_right',
  'arrow_upper_right', 'arrow_lower_right', 'arrow_lower_left',
  'arrow_upper_left', 'arrow_up_down', 'left_right_arrow', 'arrow_right_hook',
  'leftwards_arrow_with_hook', 'information_source', 'hash', 'zero', 'one',
  'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'information_source', 'heavy_multiplication_x', 'heavy_check_mark', 'tm',
  'copyright', 'registered', 'bangbang', 'interrobang', 'warning',
  'hotsprings',
  'recycle', 'spades', 'hearts', 'clubs', 'diamonds', 'ballot_box_with_check',
  'black_small_square', 'white_small_square', 'black_medium_square',
  'white_medium_square', 'octocat', 'shipit', 'bowtie', 'neckbeard', 'metal',
  'fu', 'trollface', 'godmode', 'goberserk', 'finnadie', 'feelsgood', 'rage1',
  'rage2', 'rage3', 'rage4', 'suspect', 'hurtrealbad', 'keys', 'relaxed', 'v',
  'airplane',
];

Object.keys(e).map(value => {
  if (problemEmojis.indexOf(value) === -1) {
    validEmojis = validEmojis.concat(value);
  }
});

const mapEmoji = R.curry(function mapEmoji(emoji) {
  const data = {
    character: e[emoji].char,
    name: emoji,
  };
  return data;
});

function shuffle(o) {
  for (let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i],
    o[i] = o[j], o[j] = x);
  return o;
}

function getRandomEmojis(options) {
  const shuffleEmojis = R.compose(
    R.take(options.count || 2),
    shuffle,
    R.map(mapEmoji));

  return shuffleEmojis(validEmojis);
}

export default {
  getRandomEmojis,
};
