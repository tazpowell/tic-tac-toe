'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const authEvents = require('./auth/events')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // $(`#someIdOfTheThingIWant`).on('action', callback)
  $('#start-btn').on('click', authEvents.onRestart)
  authEvents.onCreate()
  $('#sign-up-form').on('submit', authEvents.onSignUp)
  $('#gameBoard').on('click', authEvents.onSelectBox)
})
