'use strict'
const store = require('../store')

// SIGN UP success
const signUpSuccess = function (signUpResponse) {
  console.log('signUpResponse is ', signUpResponse)
}

// SIGN UP error
const signUpError = function (error) {
  console.log('signUpError is ', error)
}

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
  store.over = true
  console.log('store is ', store)
  $('#game-over-msg').toggleClass('hide')
  // $('#gameBoard').on('click', function () {
  //   console.log('game over, no more clicks')
  // })
  // $('.box').toggleClass('game-end')
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
  signUpSuccess,
  signUpError,
  makeMoveSuccess,
  weHaveAWinner,
  clearBoard
}
