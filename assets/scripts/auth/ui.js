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
const changePWSuccess = function () {
  $('#change-pw-msg').html('Password was successfully updated for: ' + store.user.email).css('color', 'green')
  $('#change-pw-form input[type=password]').val('')
}
// Change PW error
const changePWError = function (error) {
  console.log('changePWError is ', error)
  $('#change-pw-msg').html('Password change failed').css('color', 'red')
}

// SIGN OUT success
const signOutSuccess = function () {
  console.log('sign out success ')
  $('#sign-out-msg').html('Successfully signed out as: ' + store.user.email).css('color', 'green')
  delete store.user
}

// SIGN OUT error
const signOutError = function (error) {
  console.log('signOutError is ', error)
  $('#v').html('Sign out failed').css('color', 'red')
}

module.exports = {
  signUpSuccess,
  signUpError,
  signInSuccess,
  signInError,
  changePWSuccess,
  changePWError,
  signOutSuccess,
  signOutError
}
