'use strict'
const store = require('../store')

// GAME server
// CREATE success
const createSuccess = function (createResponse) {
  console.log('createResponse is ', createResponse)
  store.game = createResponse.game
  console.log('new game successfully created')
  console.log('store.game is ', store.game)
  console.log('store.game.cells is ', store.game.cells)
}

// CREATE error
const createError = function (error) {
  console.log('createError is ', error)
  console.log('Failed to create new game')
}

// GAME PLAY
// make a move
const makeMoveSuccess = function (box, game, num) {
  // $('#gameBoard').html(gameboard)
  $('#player_x').toggleClass('hide')
  $('#player_o').toggleClass('hide')

  console.log('box is ', box)
  console.log('game is ', game)
  console.log('num is ', num)
  $('#box' + num).html(game[num])
}

const weHaveAWinner = function (value) {
  console.log('value is ', value)
  $('#game-win-msg').html('Player ' + value + ' wins!')
  // $('.box').css('background-color', '#565656')
  store.game.over = true
  console.log('store is ', store)
  $('#game-over-msg').toggleClass('hide')
}

// reset board div numbers
const clearBoard = function () {
  // $('.box').css('background-color', '$light-teal')
  for (let i = 0; i < 9; i++) {
    $('#box' + i).html(i)
  }
  $('#game-over-msg').addClass('hide')
  $('#player_o').addClass('hide')
  $('#player_x').removeClass('hide')
  $('#game-win-msg').html('')
}

module.exports = {
  makeMoveSuccess,
  weHaveAWinner,
  clearBoard,
  createSuccess,
  createError
}
