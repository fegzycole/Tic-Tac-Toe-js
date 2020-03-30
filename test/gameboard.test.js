import gameBoard from '../src/gameboard';

const board = gameBoard;

test ('should successfully update a cell in the board', () => {
    board.updateBoard(1, 'X');
    expect(board.tttBoard).toStrictEqual([' ', 'X', ' ', ' ', ' ', ' ', ' ', ' ', ' ']);
});