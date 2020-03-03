const gameBoard = (() => {
    const tttBoard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    const winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    const updateBoard = (index, token) => {
        tttBoard[index] = token;
    };
    const emptySpace = () => {
        const space = tttBoard.find((elem) => elem === ' ');
        if (space) {
            return true;
        }
        return false;
    };
    const failValidation = (index) => {
        if (tttBoard[index] !== ' ') {
            return true;
        }
        return false;
    };

    const playerWon = () => {
        let response = false;
        winCombos.forEach((combo) => {
            const first = combo[0];
            const second = combo[1];
            const third = combo[2];
            
            if (tttBoard[first] === tttBoard[second] && tttBoard[first] === tttBoard[third] && tttBoard[first] !== ' ') {
                response = true;
            }
        });
        return response;
    }
    return {tttBoard, winCombos, failValidation, updateBoard, playerWon, emptySpace};
})();

const player = (name, token) => {
    let score = 0;
    const increaseScore = () => score += 1;
    return {name, increaseScore, token};
};

const game = (() => {
    const startGame = (firstPlayer, secondPlayer) => {
        let currentPlayer = firstPlayer;
        const dialog = document.querySelector('#dialog');
        dialog.innerText = ' ';

        const playerOneName = document.querySelector('#p1-name');
        playerOneName.innerText = firstPlayer.name;
        const playerTwoName = document.querySelector('#p2-name');
        playerTwoName.innerText = secondPlayer.name;
        const playerOneScore = document.querySelector('#p1-score');
        playerOneScore.innerText = firstPlayer.score;
        const playerTwoScore = document.querySelector('#p2-score');
        playerTwoScore.innerText = secondPlayer.score;
        
        const cells = document.querySelectorAll('.btn');

        cells.forEach((cell, index) => {
            const button = cell; 
            cell.addEventListener('click', () => {
                if (gameBoard.failValidation(index)) {
                    dialog.innerText = 'Cell already selected';
                } else {
                    dialog.innerText = `${currentPlayer.name}'s turn`;
                    gameBoard.updateBoard(index, currentPlayer.token);
                    button.innerText = currentPlayer.token;
                    if (gameBoard.playerWon()) {
                        currentPlayer.increaseScore();
                        dialog.innerText = `${currentPlayer.name} wins!!!`;
                        gameBoard.resetBoard();
                        return;
                    }
                    if (!gameBoard.emptySpace()) {
                        dialog.innerText = `It's a tie`;
                        gameBoard.resetBoard();
                        return;
                    }
                }
            });
        });
    };
    const registerPlayers = (playerOne, playerTwo) => {
        const firstPlayer = player(playerOne, 'X');
        const secondPlayer = player(playerTwo, 'O');
        startGame(firstPlayer, secondPlayer);
    };
})();



