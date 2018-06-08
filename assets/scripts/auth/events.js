'use strict'
const store = require('../store')
const authUi = require('./ui.js')
const authApi = require('./api.js')
// const authGame = require('./game.js')
const getFormFields = require('../../../lib/get-form-fields.js')

// on Sign Up
const onSignUp = function (event) {
  event.preventDefault()
  console.log('the sign up form was submitted')
  const data = getFormFields(event.target)
  console.log('data is', data)
  // api
  authApi.signUp(data)
    .then(authUi.signUpSuccess)
    .catch(authUi.signUpError)
}

// on Sign In
const onSignIn = function (event) {
  event.preventDefault()
  console.log('the sign in form was submitted')
  const data = getFormFields(event.target)
  console.log('data is', data)
  // api
  authApi.signIn(data)
    .then(authUi.signInSuccess)
    .catch(authUi.signInError)
}

// on Change PW
const onChangePW = function (event) {
  event.preventDefault()
  console.log('the pw change form was submitted')
  const data = getFormFields(event.target)
  console.log('onChangePW data is', data)
  // api
  authApi.changePW(data)
    .then(authUi.changePWSuccess)
    .catch(authUi.changePWError)
}

// SIGN OUT
const onSignOut = function (event) {
  event.preventDefault()
  console.log('sign out button was clicked')
  // api
  authApi.signOut()
    .then(authUi.signOutSuccess)
    .catch(authUi.signOutError)
}

// whatever comes after the equals is what's passed
module.exports = {
  onSignUp,
  onSignIn,
  onChangePW,
  onSignOut
}
