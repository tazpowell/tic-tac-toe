'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const authEvents = require('./auth/events')
const gameEvents = require('./game/events')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // $(`#someIdOfTheThingIWant`).on('action', callback)
  // create new board on load
  // gameEvents.onCreate()
  // clear board on click
  // $('#start-btn').on('click', gameEvents.onRestart)

  // create a new game on the server
  $('#new-game-btn').on('click', gameEvents.onCreateGame)

  // get all games from the server
  $('#show-all-games-btn').on('click', gameEvents.onShowAllGames)

  // get one game from the server
  $('#game-table-body').on('click', 'td.clickable', gameEvents.onShowClickedGame)

  // submit forms/button
  $('#sign-up-form').on('submit', authEvents.onSignUp)
  $('#sign-in-form').on('submit', authEvents.onSignIn)
  $('#change-pw-form').on('submit', authEvents.onChangePW)
  $('#sign-out-btn').on('click', authEvents.onSignOut)

  // add x or o on click
  $('#gameBoard').on('click', gameEvents.onSelectBox)
})
