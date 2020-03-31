import gameBoard from '../src/gameboard';

const board = gameBoard;

test ('should successfully update a cell in the board', () => {
    board.updateBoard(1, 'X');
    expect(board.tttBoard).toStrictEqual([' ', 'X', ' ', ' ', ' ', ' ', ' ', ' ', ' ']);
    board.resetBoard();
});

test ('should check for empty space in the board', () => {
    [0, 5, 2, 3].forEach((element) => {
        board.updateBoard(element, 'X');
    });
    expect(board.emptySpace()).toBe(true);

    [1, 4, 6, 7, 8].forEach((element) => {
        board.updateBoard(element, 'O');
    });
    expect(board.emptySpace()).toBe(false);
    board.resetBoard();
});

test ('should check if a cell has been taken', () => {
    expect(board.failValidation(1)).toBe(false);
    board.updateBoard(1, 'X');
    expect(board.failValidation(1)).toBe(true);
    board.resetBoard();
});

test ('should reset the board', () => {
    [0, 5, 2, 3].forEach((element) => {
        board.updateBoard(element, 'X');
    });

    [1, 4, 6, 7, 8].forEach((element) => {
        board.updateBoard(element, 'O');
    });
    expect(board.emptySpace()).toBe(false);
    board.resetBoard();
    expect(board.emptySpace()).toBe(true);
});

test ('should check if player won', () => {
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

    winCombos.forEach((element) => {
        element.forEach((el) => {
            board.updateBoard(el, 'X');
        });
        expect(board.playerWon()).toBe(true);
        board.resetBoard();
    });

    [0, 1, 4, 5, 6].forEach((element) => {
        board.updateBoard(element, 'X');
    });
    expect(board.emptySpace()).toBe(true);

    [2, 3, 7, 8].forEach((element) => {
        board.updateBoard(element, 'O');
    });
    expect(board.playerWon()).toBe(false);
});