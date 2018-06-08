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

module.exports = {
  createGame
}
