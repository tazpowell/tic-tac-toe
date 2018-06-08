'use strict'
const config = require('../config.js')
const store = require('../store')

// CREATE GAME
const createGame = function () {
  console.log('token is', store.user.token)
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/games',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: ''
  })
}

// UPDATE GAME
const updateGame = function () {
  console.log('token is', store.user.token)
  return $.ajax({
    method: 'PATCH',
    url: config.apiUrl + '/games/' + store.game.id,
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: store.update
  })
}

module.exports = {
  createGame,
  updateGame
}
