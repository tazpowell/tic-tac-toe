'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const authEvents = require('./auth/events')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // $(`#someIdOfTheThingIWant`).on('action', callback)
  // create new board on load
  authEvents.onCreate()
  // clear board on click
  $('#start-btn').on('click', authEvents.onRestart)

  // submit forms
  $('#sign-up-form').on('submit', authEvents.onSignUp)
  $('#sign-in-form').on('submit', authEvents.onSignIn)
  $('#change-pw-form').on('submit', authEvents.onChangePW)

  // add x or o on click
  $('#gameBoard').on('click', authEvents.onSelectBox)
})
