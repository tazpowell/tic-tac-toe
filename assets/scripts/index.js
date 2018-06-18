'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const authEvents = require('./auth/events')
const gameEvents = require('./game/events')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // $(`#someIdOfTheThingIWant`).on('action', callback)

  // show contents of store.js
  $('#show-store-btn').on('click', gameEvents.onShowStore)

  // create a new game on the server
  $('#new-game-btn').on('click', gameEvents.onCreateGame)

  // get all games from the server
  $('#show-all-games-btn').on('click', gameEvents.onShowAllGames)

  // get one game from the server
  $('#game-by-id-form').on('submit', gameEvents.onShowOneGame)
  $('#game-table-body').on('click', 'button.clickable', gameEvents.onShowClickedGame)

  // sign in as guest
  $('#guest-btn').on('click', authEvents.onSignInGuest)

  // submit forms/button
  $('#sign-up-form').on('submit', authEvents.onSignUp)
  $('#sign-in-form').on('submit', authEvents.onSignIn)
  $('#change-pw-form').on('submit', authEvents.onChangePW)
  $('#sign-out-btn').on('click', authEvents.onSignOut)

  // add x or o on click
  $('#gameBoard').on('click', gameEvents.onSelectBox)
})
