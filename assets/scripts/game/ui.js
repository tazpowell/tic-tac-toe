'use strict'
const store = require('../store')
const gameApi = require('./api.js')

// GAME server
// CREATE success
const createSuccess = function (createResponse) {
  console.log('createResponse is ', createResponse)
  store.game = createResponse.game
  console.log('new game successfully created')
  console.log('store.game is ', store.game)
  console.log('store.game.cells is ', store.game.cells)
}

// CREATE error
const createError = function (error) {
  console.log('createError is ', error)
  console.log('Failed to create new game')
}

// UPDATE success
const updateSuccess = function (updateResponse) {
  console.log('updateResponse is ', updateResponse)
  store.game = updateResponse.game
  console.log('game successfully updated')
  console.log('store.game is ', store.game)
}

// UPDATE error
const updateError = function (error) {
  console.log('updateError is ', error)
  console.log('Failed to update game')
}

// GAME PLAY
// make a move
// game = store.game
const makeMoveSuccess = function (box, game, num) {
  $('#box' + num).html(game.cells[num])
  $('#player_x').toggleClass('hide')
  $('#player_o').toggleClass('hide')
  // store into store.update
  const update = {
    game: {
      cell: {
        index: num,
        value: game.cells[num]
      },
      over: game.over
    }
  }
  store.update = update
  // console.log('update is ', update)
  // console.log('box is ', box)
  // console.log('game is ', game)
  // console.log('num is ', num)

  gameApi.updateGame()
    .then(updateSuccess)
    .catch(updateError)
}

const weHaveAWinner = function (value) {
  console.log('value is ', value)
  $('#game-win-msg').html('Player ' + value + ' wins!')
  // $('.box').css('background-color', '#565656')
  store.game.over = true
  store.update.game.over = true
  gameApi.updateGame()
    .then(updateSuccess)
    .catch(updateError)
  console.log('store is ', store)
  $('#game-over-msg').toggleClass('hide')
}

const weHaveADraw = function () {
  $('#game-win-msg').html('We have a draw!')
  store.game.over = true
  store.update.game.over = true
  gameApi.updateGame()
    .then(updateSuccess)
    .catch(updateError)
  $('#game-over-msg').toggleClass('hide')
}

// reset board div numbers
const clearBoard = function () {
  // $('.box').css('background-color', '$light-teal')
  for (let i = 0; i < 9; i++) {
    $('#box' + i).html(i)
  }
  $('#game-over-msg').addClass('hide')
  $('#player_o').addClass('hide')
  $('#player_x').removeClass('hide')
  $('#game-win-msg').html('')
}

module.exports = {
  makeMoveSuccess,
  weHaveAWinner,
  clearBoard,
  createSuccess,
  createError,
  updateSuccess,
  updateError,
  weHaveADraw
}
