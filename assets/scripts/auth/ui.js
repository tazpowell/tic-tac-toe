'use strict'
const store = require('../store')

// SIGN UP success
const signUpSuccess = function (signUpResponse) {
  console.log('signUpResponse is ', signUpResponse)
  console.log('sign up success')
  $('#sign-up-form input[type=email]').val('')
  $('#sign-up-form input[type=password]').val('')
  $('#sign-up-msg').html('Signed up as ' + signUpResponse.user.email).css('color', 'green')
}

// SIGN UP error
const signUpError = function (error) {
  console.log('signUpError is ', error)
  console.log('sign up failed')
  $('#sign-up-msg').html('Sign up unsuccessful ').css('color', 'red')
}

// SIGN IN success
const signInSuccess = function (signInResponse) {
  console.log('signInResponse is ', signInResponse)
  store.user = signInResponse.user
  console.log('store.user is ', store.user)
  console.log('store is ', store)
  $('#sign-in-form input[type=email]').val('')
  $('#sign-in-form input[type=password]').val('')
  $('#sign-in-msg').html('Signed in as ' + signInResponse.user.email).css('color', 'green')
}

// SIGN IN error
const signInError = function (error) {
  console.log('signInError is ', error)
  $('#sign-in-msg').html('Sign in unsuccessful ').css('color', 'red')
}

// Change PW success
const changePWSuccess = function (changePWresponse) {
  console.log('changePWresponse is ', changePWresponse)
  $('#change-pw-msg').html('Password was successfully updated for: ' + store.user.email).css('color', 'green')
  $('#change-pw-form input[type=password]').val('')
}
// Change PW error
const changePWError = function (error) {
  console.log('changePWError is ', error)
  $('#change-pw-msg').html('Password change failed').css('color', 'red')
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
  store.over = true
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
  signUpSuccess,
  signUpError,
  signInSuccess,
  signInError,
  changePWSuccess,
  changePWError,
  makeMoveSuccess,
  weHaveAWinner,
  clearBoard
}
