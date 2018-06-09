'use strict'
const store = require('../store')
const gameUi = require('./ui.js')
const gameApi = require('./api.js')

// CREATE GAME on server
const onCreateGame = function (event) {
  console.log('create a new game was clicked')
  // api
  gameApi.createGame()
    .then(gameUi.createSuccess)
    .catch(gameUi.createError)
}

// SHOW ALL GAMES from server
const onShowAllGames = function (event) {
  console.log('show all games was clicked')
  gameApi.showAllGames()
    .then(gameUi.showSuccess)
    .catch(gameUi.showError)
}

// GAME PLAY
// when box is clicked
const onSelectBox = function (event) {
  // stop if game is over
  if (store.game.over === true) {
    return
  }

  // store the box number that is clicked
  const num = event.target.getAttribute('data-id')
  console.log('num is ', num)

  // check if number has been used
  if (store.game.cells[num] !== '') {
    console.log('number is already used, pick again')
    return
  }

  // push x or o to array
  if ($('#player_o').hasClass('hide')) {
    store.game.cells[num] = 'x'
  } else {
    store.game.cells[num] = 'o'
  }
  // console.log('currentGame is now ', store.game.cells)
  gameUi.makeMoveSuccess(event.target, store.game, num)
  // store.game.cells = currentGame
  console.log('store is ', store)

  // win conditions
  const c = store.game.cells
  // console.log('c[0] is ', c[0])

  // win in rows
  if (c[0] !== '' && c[0] === c[1] && c[0] === c[2]) {
    console.log('Player', c[0], 'wins!')
    gameUi.weHaveAWinner(c[0])
  } else if (c[3] !== '' && c[3] === c[4] && c[3] === c[5]) {
    console.log('Player ', c[3], 'wins!')
    gameUi.weHaveAWinner(c[3])
  } else if (c[6] !== '' && c[6] === c[7] && c[6] === c[8]) {
    console.log('Player ', c[6], 'wins!')
    gameUi.weHaveAWinner(c[6])
  }
  // win in columns
  if (c[0] !== '' && c[0] === c[3] && c[0] === c[6]) {
    console.log('Player', c[0], 'wins!')
    gameUi.weHaveAWinner(c[0])
  } else if (c[1] !== '' && c[1] === c[4] && c[1] === c[7]) {
    console.log('Player ', c[1], 'wins!')
    gameUi.weHaveAWinner(c[3])
  } else if (c[2] !== '' && c[2] === c[5] && c[2] === c[8]) {
    console.log('Player ', c[2], 'wins!')
    gameUi.weHaveAWinner(c[2])
  }

  // win in diagonals
  if (c[0] !== '' && c[0] === c[4] && c[0] === c[8]) {
    console.log('Player', c[0], 'wins!')
    gameUi.weHaveAWinner(c[0])
  } else if (c[2] !== '' && c[2] === c[4] && c[2] === c[6]) {
    console.log('Player ', c[2], 'wins!')
    gameUi.weHaveAWinner(c[2])
  }

  // draw conditions
  const arrayFull = function (value) {
    return value !== ''
  }
  if (c.every(arrayFull)) {
    console.log('The game is a draw')
    gameUi.weHaveADraw()
  }
} // end of onSelectBox

module.exports = {
  onCreateGame,
  onShowAllGames,
  onSelectBox
}
