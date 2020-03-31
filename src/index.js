/* eslint-disable no-use-before-define */
import game from './game';
import player from './player';

const form = document.querySelector('.form');
const p1 = document.querySelector('#player-1');
const p2 = document.querySelector('#player-2');
const gameArea = document.querySelector('.game-area');

const registerPlayers = e => {
  e.preventDefault();

  const firstPlayer = player(p1.value, 'X');
  const secondPlayer = player(p2.value, 'O');

  form.setAttribute('style', 'display: none !important');

  gameArea.setAttribute('style', 'display: block !important');

  game.startGame(firstPlayer, secondPlayer);
};

form.addEventListener('submit', registerPlayers);
