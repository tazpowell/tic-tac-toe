'use strict'
const store = require('../store')
const gameUi = require('../game/ui.js')
// const gameEvents = require('../game/events.js')
const authApi = require('./api.js')

const clearForms = function () {
  $('#sign-in-form input[type=email]').val('')
  $('#sign-in-form input[type=password]').val('')
  $('#sign-up-form input[type=email]').val('')
  $('#sign-up-form input[type=password]').val('')
  $('#change-pw-form input[type=password]').val('')
}

const clearMessages = function () {
  $('#change-pw-msg').html('')
  $('#sign-out-msg').html('')
  $('#sign-up-msg').html('')
  $('#sign-in-msg').html('')
}

// SIGN UP error
const signUpError = function () {
  clearMessages()
  // console.log('signUpError is ', error)
  // console.log('sign up failed')
  $('#sign-up-msg').html('Sign up unsuccessful').css('color', '#DE3A0D')
  // $('#sign-up-form input[type=email]').val('')
  // $('#sign-up-form input[type=password]').val('')
  clearForms()
}

// PASSWORD do not match
const pwNotMatching = function () {
  clearMessages()
  $('#sign-up-msg').html('Passwords do not match').css('color', '#DE3A0D')
  // $('#sign-up-form input[type=email]').val('')
  // $('#sign-up-form input[type=password]').val('')
  clearForms()
}

// PASSWORD do not match
const pwMatching = function () {
  clearMessages()
  $('#change-pw-msg').html('New password must be different than old').css('color', '#DE3A0D')
  clearForms()
}

// SIGN IN success
const signInSuccess = function (signInResponse) {
  clearMessages()
  // console.log('signInResponse is ', signInResponse)
  store.user = signInResponse.user
  // console.log('store.user is ', store.user)
  // console.log('store is ', store)
  // $('#sign-in-form input[type=email]').val('')
  // $('#sign-in-form input[type=password]').val('')
  $('#sign-in-msg').html('Signed in as ' + signInResponse.user.email).css('color', '#005f19')
  $('#sign-in-user-display').html(signInResponse.user.email)
  $('#game-win-msg').html('')
  $('.on-sign-in').toggleClass('hide')
  $('#sign-out-msg').html('')
  clearForms()
}

// SIGN UP success
const signUpSuccess = function (signUpResponse) {
  clearMessages()
  // console.log('signUpResponse is ', signUpResponse)
  // console.log('sign up success')
  store.credentials.email = signUpResponse.user.email
  // $('#sign-up-form input[type=email]').val('')
  // $('#sign-up-form input[type=password]').val('')
  // $('#sign-up-msg').html('Signed up as ' + signUpResponse.user.email).css('color', 'black')
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
  clearForms()
}

// SIGN IN error
const signInError = function () {
  clearMessages()
  // console.log('signInError is ', error)
  $('#sign-in-msg').html('Sign in unsuccessful ').css('color', '#DE3A0D')
  // $('#sign-in-form input[type=email]').val('')
  // $('#sign-in-form input[type=password]').val('')
  clearForms()
}

// Change PW success
const changePWSuccess = function () {
  clearMessages()
  $('#change-pw-msg').html('Password was successfully updated for: ' + store.user.email).css('color', '#005f19')
  // $('#change-pw-form input[type=password]').val('')
  clearForms()
}
// Change PW error
const changePWError = function () {
  clearMessages()
  // console.log('changePWError is ', error)
  $('#change-pw-msg').html('Password change failed').css('color', '#DE3A0D')
  // $('#change-pw-form input[type=password]').val('')
  clearForms()
}

// SIGN OUT success
const signOutSuccess = function () {
  clearMessages()
  // console.log('sign out success ')
  $('#sign-out-msg').html('Successfully signed out as: ' + store.user.email).css('color', '#005f19')
  delete store.user
  gameUi.clearBoard()
  $('#game-table-body').html('')
  $('#sign-in-msg').html('')
  $('#sign-up-msg').html('')
  $('.on-sign-in').toggleClass('hide')
  $('#current-game-display').html('N/A')
  // if ($('game-list').hasClass('hide')) {
  // } else {
  //   $('game-list').toggleClass('hide')
  // }
  $('#game-info-msg').html('')
  // $('#sign-up-form input[type=email]').val('')
  // $('#sign-up-form input[type=password]').val('')
  clearForms()
  clearMessages()
}

// SIGN OUT error
const signOutError = function () {
  clearMessages()
  // console.log('signOutError is ', error)
  $('#sign-out-msg').html('Sign out failed').css('color', '#DE3A0D')
  clearForms()
}

module.exports = {
  signUpSuccess,
  pwNotMatching,
  pwMatching,
  signUpError,
  signInSuccess,
  signInError,
  changePWSuccess,
  changePWError,
  signOutSuccess,
  signOutError
}
