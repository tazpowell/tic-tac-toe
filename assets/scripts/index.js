'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  let currentGame = []
  const createGame = function () {
    currentGame = ['', '', '', '', '', '', '', '', '']
    console.log('currentGame is ', currentGame)
    return currentGame
  }

  const makeAMove = function (box, player) {
    if (player === 'x') {
      currentGame[box] = 'x'
    } else { console.log('invalid move') }
    console.log('currentGame is now ', currentGame)
    return currentGame
  }

  createGame()
  makeAMove(5, 'x')

})
