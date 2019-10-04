const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const board = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
}

function printBoard() {
  console.log(`
    ${board[1]} | ${board[2]} | ${board[3]}
   -----------
    ${board[4]} | ${board[5]} | ${board[6]}
   -----------
    ${board[7]} | ${board[8]} | ${board[9]}
  `)
}

function markBoard(position, player) {
  board[position] = player.toUpperCase();
}

function validateTurn(position) {
  return (board[position] !== 'X' && board[position] !=='O');
}

function playTurn(player) {
  readline.question(`Your turn ${player}, enter a position -> `, (position) => {
    if (validateTurn(position)) {
      markBoard(position, player);
    } else {
      console.log('Sorry that is not a valid play, please try again');
      playTurn(player);
    }
    // Check for a win or game over
    // call for the other players turn

    // readline.close();
    printBoard();
    player === 'X' ? playTurn('O') : playTurn('X');
  })

}

printBoard();
playTurn('X');