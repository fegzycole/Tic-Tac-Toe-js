import player from '../src/player';

const playerOne = player('Ferguson', 'X');
const playerTwo = player('Wilfried', 'O');

test ('should verify the player token', () => {
    expect(playerOne.token).toBe('X');
    expect(playerTwo.token).toBe('O');
});

test ('should increment the player score', () => {
    for (let index = 0; index < 5; index++) {
        playerOne.increaseScore();        
    }

    for (let index = 0; index < 7; index++) {
        playerTwo.increaseScore();        
    }
    expect(playerOne.getScore()).toBe(5);
    expect(playerTwo.getScore()).toBe(7);
});
