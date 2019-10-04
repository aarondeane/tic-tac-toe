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

let totalPlays = 0;

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

function checkWin(player, position) {
  let marks = 1;
  const winningCombos = {
    1: [[2,3], [4,7], [5,9]],
    2: [[1,3], [5,8]],
    3: [[1,2], [6,9], [5,7]],
    4: [[5,6], [1,7]],
    5: [[4,6], [2,8], [1,9], [3,7]],
    6: [[4,5], [3,9]],
    7: [[8,9], [1,4], [3,5]],
    8: [[7,9], [2,5]],
    9: [[1,5], [3,6], [7,8]],
  }
  for (let combo of winningCombos[position]) {
    for (let pos of combo) {
      if (board[pos] === player) {
        marks+=1
      }
    }
    if (marks === 3) return true;
    marks = 1;
  }  
}


function playTurn(player) {
  totalPlays+=1;
  readline.question(`Your turn ${player}, enter a position -> `, (position) => {
    if (validateTurn(position)) {
      markBoard(position, player);
    } else {
      console.log('Sorry that is not a valid play');
      playTurn(player);
    }

    if (totalPlays > 2 && checkWin(player, position) === true) {
      printBoard();
      console.log(`Congrats! Player ${player} has won!`);
      readline.close();
      return;
    }
    printBoard();
    player === 'X' ? playTurn('O') : playTurn('X');
  })

}

printBoard();
playTurn('X');