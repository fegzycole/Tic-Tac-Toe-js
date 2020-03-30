import gameBoard from "./gameboard";

const game = (() => {
  const updatePlayerScores = (firstPlayer, secondPlayer) => {
    const playerOneScore = document.querySelector('#p1-score');
    const playerTwoScore = document.querySelector('#p2-score');
    playerOneScore.innerText = firstPlayer.getScore();
    playerTwoScore.innerText = secondPlayer.getScore();
  };

  const quitGame = () => {
    gameBoard.resetBoard();
    const form = document.querySelector('.form');
    const gameArea = document.querySelector('.game-area');
    form.removeAttribute('style');
    gameArea.setAttribute('style', 'display: none !important');
  };

  const showPlayerInfo = (firstPlayer, secondPlayer) => {
    const playerOneName = document.querySelector('#p1-name');
    playerOneName.innerText = firstPlayer.name;

    const playerTwoName = document.querySelector('#p2-name');
    playerTwoName.innerText = secondPlayer.name;

    updatePlayerScores(firstPlayer, secondPlayer);

    const restartButton = document.querySelector('#restart');
    restartButton.addEventListener('click', () => gameBoard.restartGame(firstPlayer, secondPlayer));

    const quitButton = document.querySelector('#quit');
    quitButton.addEventListener('click', quitGame);
  };

  const gameEngine = (currentPlayer, firstPlayer, secondPlayer, dialog) => {
    const cells = document.querySelectorAll('.btn');

    cells.forEach((cell, index) => {
      const button = cell;

      cell.addEventListener('click', () => {
        if (gameBoard.failValidation(index)) {
          dialog.innerText = 'Cell already selected';
        } else {
          gameBoard.updateBoard(index, currentPlayer.token);
          button.innerText = currentPlayer.token;

          if (gameBoard.playerWon()) {
            currentPlayer.increaseScore();
            dialog.innerText = `${currentPlayer.name} wins!!!`;
            gameBoard.disableCells();
            updatePlayerScores(firstPlayer, secondPlayer);
            return;
          }

          if (!gameBoard.emptySpace()) {
            dialog.innerText = 'It\'s a tie';
            gameBoard.disableCells();
            return;
          }
          currentPlayer = currentPlayer === firstPlayer ? secondPlayer : firstPlayer;
          dialog.innerText = `${currentPlayer.name}'s turn`;
        }
      });
    });
  };

  const startGame = (firstPlayer, secondPlayer) => {
    gameBoard.renderBoard();
    const currentPlayer = firstPlayer;

    showPlayerInfo(firstPlayer, secondPlayer);

    const dialog = document.querySelector('#dialog');
    dialog.innerText = `${currentPlayer.name}'s turn`;

    gameEngine(currentPlayer, firstPlayer, secondPlayer, dialog);
  };

  return {
    startGame,
  };
})();


export default game;