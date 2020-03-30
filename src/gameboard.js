import game from './game';

const boardContainer = document.querySelector('.board-container');

const gameBoard = (() => {
  let tttBoard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const updateBoard = (index, token) => {
    tttBoard[index] = token;
  };

  const emptySpace = () => {
    const space = tttBoard.find(elem => elem === ' ');
    if (space) {
      return true;
    }
    return false;
  };

  const failValidation = index => {
    if (tttBoard[index] !== ' ') {
      return true;
    }
    return false;
  };

  const renderBoard = () => {
    boardContainer.innerHTML = ' ';

    tttBoard.forEach((cell, index) => {
      const boardCell = document.createElement('button');
      boardCell.classList.add('btn');
      boardCell.innerHTML = cell;
      boardCell.id = index;

      boardContainer.appendChild(boardCell);
    });
  };

  const resetBoard = () => {
    tttBoard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
  };

  const restartGame = (firstPlayer, secondPlayer) => {
    resetBoard();
    game.startGame(firstPlayer, secondPlayer);
  };

  const playerWon = () => {
    let response = false;
    winCombos.forEach(combo => {
      const first = combo[0];
      const second = combo[1];
      const third = combo[2];

      if (
        tttBoard[first] === tttBoard[second]
        && tttBoard[first] === tttBoard[third]
        && tttBoard[first] !== ' '
      ) {
        response = true;
      }
    });
    return response;
  };

  const disableCells = () => {
    const cells = document.querySelectorAll('.btn');

    cells.forEach(cell => {
      cell.setAttribute('disabled', true);
    });
  };

  return {
    tttBoard,
    winCombos,
    failValidation,
    updateBoard,
    playerWon,
    emptySpace,
    renderBoard,
    disableCells,
    restartGame,
    resetBoard,
  };
})();

export default gameBoard;