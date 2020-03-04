const boardContainer = document.querySelector(".board-container");
const form = document.querySelector(".form");
const p1 = document.querySelector("#player-1");
const p2 = document.querySelector("#player-2");
const gameArea = document.querySelector(".game-area");

const gameBoard = (() => {
  let tttBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const updateBoard = (index, token) => {
    tttBoard[index] = token;
  };

  const emptySpace = () => {
    const space = tttBoard.find(elem => elem === " ");
    if (space) {
      return true;
    }
    return false;
  };

  const failValidation = index => {
    if (tttBoard[index] !== " ") {
      return true;
    }
    return false;
  };

  const renderBoard = () => {
    boardContainer.innerHTML = " ";

    tttBoard.forEach((cell, index) => {
      const boardCell = document.createElement("button");
      boardCell.classList.add("btn");
      boardCell.innerHTML = cell;
      boardCell.id = index;

      boardContainer.appendChild(boardCell);
    });
  };
  
  const restartGame = (firstPlayer, secondPlayer) => {
    tttBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    game.startGame(firstPlayer, secondPlayer)
  }

  const playerWon = () => {
    let response = false;
    winCombos.forEach(combo => {
      const first = combo[0];
      const second = combo[1];
      const third = combo[2];

      if (
        tttBoard[first] === tttBoard[second] &&
        tttBoard[first] === tttBoard[third] &&
        tttBoard[first] !== " "
      ) {
        response = true;
      }
    });
    return response;
  };

  const disableCells = () => {
    const cells = document.querySelectorAll(".btn");

    cells.forEach(cell => {
      cell.setAttribute("disabled", true);
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
    restartGame
  };
})();

const player = (name, token) => {
  let score = 0;
  const increaseScore = () => {score += 1};
  const getScore = () => score; 
  return {
    name,
    increaseScore,
    token,
    score,
    getScore
  };
};

const game = (() => {
  const updatePlayerScores = (
    firstPlayer,
    secondPlayer,
    playerOneScore,
    playerTwoScore
  ) => {
    playerOneScore.innerText = firstPlayer.getScore();
    playerTwoScore.innerText = secondPlayer.getScore();
  };

  const quitGame = () => {
    
    const form = document.querySelector(".form");
    const gameArea = document.querySelector(".game-area");
    form.removeAttribute('style');
    gameArea.setAttribute('style', 'display: none !important');
  };

  const startGame = (firstPlayer, secondPlayer) => {
    gameBoard.renderBoard();
    let currentPlayer = firstPlayer;

    const dialog = document.querySelector("#dialog");
    dialog.innerText = `${currentPlayer.name}'s turn`;

    const playerOneName = document.querySelector("#p1-name");
    playerOneName.innerText = firstPlayer.name;

    const playerTwoName = document.querySelector("#p2-name");
    playerTwoName.innerText = secondPlayer.name;

    const playerOneScore = document.querySelector("#p1-score");
    playerOneScore.innerText = firstPlayer.getScore();

    const playerTwoScore = document.querySelector("#p2-score");
    playerTwoScore.innerText = secondPlayer.getScore();

    const restartButton = document.querySelector("#restart");
    restartButton.addEventListener('click', () => gameBoard.restartGame(firstPlayer, secondPlayer));

    const quitButton = document.querySelector("#quit");
    quitButton.addEventListener('click', quitGame);

    const cells = document.querySelectorAll(".btn");

    cells.forEach((cell, index) => {
      const button = cell;
      cell.addEventListener("click", () => {
        if (gameBoard.failValidation(index)) {
          dialog.innerText = "Cell already selected";
        } else {
          gameBoard.updateBoard(index, currentPlayer.token);
          button.innerText = currentPlayer.token;

          if (gameBoard.playerWon()) {
            currentPlayer.increaseScore();
            dialog.innerText = `${currentPlayer.name} wins!!!`;
            gameBoard.disableCells();
            updatePlayerScores(
              firstPlayer,
              secondPlayer,
              playerOneScore,
              playerTwoScore
            );
            return;
          }

          if (!gameBoard.emptySpace()) {
            dialog.innerText = `It's a tie`;
            gameBoard.disableCells();
            return;
          }
          currentPlayer =
            currentPlayer === firstPlayer ? secondPlayer : firstPlayer;
            dialog.innerText = `${currentPlayer.name}'s turn`;
        }
      });
    });
  };

  return {
    startGame
  };
})();

const registerPlayers = e => {
  e.preventDefault();

  const firstPlayer = player(p1.value, "X");
  const secondPlayer = player(p2.value, "O");

  form.setAttribute("style", "display: none !important");

  gameArea.setAttribute("style", "display: block !important");

  game.startGame(firstPlayer, secondPlayer);
};

form.addEventListener("submit", registerPlayers);
