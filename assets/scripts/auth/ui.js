'use strict'
const store = require('../store')
const gameUi = require('../game/ui.js')
// const gameEvents = require('../game/events.js')
const authApi = require('./api.js')

// SIGN UP error
const signUpError = function () {
  // console.log('signUpError is ', error)
  // console.log('sign up failed')
  $('#sign-up-msg').html('Sign up unsuccessful ').css('color', 'red')
}

// PASSWORD do not match
const pwNotMatching = function () {
  $('#sign-up-msg').html('Passwords do not match').css('color', 'red')
}

// SIGN IN success
const signInSuccess = function (signInResponse) {
  // console.log('signInResponse is ', signInResponse)
  store.user = signInResponse.user
  // console.log('store.user is ', store.user)
  // console.log('store is ', store)
  $('#sign-in-form input[type=email]').val('')
  $('#sign-in-form input[type=password]').val('')
  $('#sign-in-msg').html('Signed in as ' + signInResponse.user.email).css('color', 'white')
  $('#sign-in-user-display').html(signInResponse.user.email)
  $('#game-win-msg').html('')
  $('.on-sign-in').toggleClass('hide')
  $('#sign-out-msg').html('')
  // gameEvents.onCreateGame()
}

// SIGN UP success
const signUpSuccess = function (signUpResponse) {
  // console.log('signUpResponse is ', signUpResponse)
  // console.log('sign up success')
  store.credentials.email = signUpResponse.user.email
  $('#sign-up-form input[type=email]').val('')
  $('#sign-up-form input[type=password]').val('')
  $('#sign-up-msg').html('Signed up as ' + signUpResponse.user.email).css('color', 'green')
  $('#sign-out-msg').html('')
  // on Sign In after a Sign Up
  const onSignInAfterUp = function () {
    // console.log('signing in after a sign up')
    // console.log('store.credentials is', store.credentials)
    authApi.signIn(store)
      .then(signInSuccess)
      .catch(signInError)
  }
  onSignInAfterUp()
}

// SIGN IN error
const signInError = function () {
  // console.log('signInError is ', error)
  $('#sign-in-msg').html('Sign in unsuccessful ').css('color', 'red')
}

// Change PW success
const changePWSuccess = function () {
  $('#change-pw-msg').html('Password was successfully updated for: ' + store.user.email).css('color', 'green')
  $('#change-pw-form input[type=password]').val('')
}
// Change PW error
const changePWError = function () {
  // console.log('changePWError is ', error)
  $('#change-pw-msg').html('Password change failed').css('color', 'red')
}

// SIGN OUT success
const signOutSuccess = function () {
  // console.log('sign out success ')
  $('#sign-out-msg').html('Successfully signed out as: ' + store.user.email)
  delete store.user
  gameUi.clearBoard()
  $('#game-table-body').html('')
  $('#sign-in-msg').html('')
  $('#sign-up-msg').html('')
  $('.on-sign-in').toggleClass('hide')
  // if ($('game-list').hasClass('hide')) {
  // } else {
  //   $('game-list').toggleClass('hide')
  // }
  $('#game-info-msg').html('')
}

// SIGN OUT error
const signOutError = function () {
  // console.log('signOutError is ', error)
  $('#v').html('Sign out failed').css('color', 'red')
}

module.exports = {
  signUpSuccess,
  pwNotMatching,
  signUpError,
  signInSuccess,
  signInError,
  changePWSuccess,
  changePWError,
  signOutSuccess,
  signOutError
}
