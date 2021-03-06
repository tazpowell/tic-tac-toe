'use strict'
const store = require('../store')
const gameApi = require('./api.js')
const config = require('../config.js')

// HTML BOARD
// reset board div numbers
const clearBoard = function () {
  // $('.box').css('background-color', '$light-teal')
  for (let i = 0; i < 9; i++) {
    $('#box' + i).html('').removeClass('winner')
  }
  $('#game-over-msg').addClass('hide')
  $('#player_o').addClass('hide')
  $('#player_x').removeClass('hide')
  $('#game-win-msg').html('')
  // console.log('visual game board has been reset')
}

// POPULATE game board with retrieved game data
const populateBoard = function (data) {
  // console.log('data is', data)
  clearBoard()
  const info = data.game.cells
  for (let i = 0; i < info.length; i++) {
    // $('#box' + i).html(info[i])
    $('#box' + i).html('').removeClass('winner')
    if (info[i] === 'x') {
      $('#box' + i).prepend($('<img>', {src: config.imgUrl + '/assets/images/X.png', alt: ''}))
    } else if (info[i] === 'o') {
      $('#box' + i).prepend($('<img>', {src: config.imgUrl + '/assets/images/O.png', alt: ''}))
    }
  }
}

// CREATE html table from JSON
const createTable = function (json) {
  // establish which keys to take data from
  let bodyRows = ''

  // loop through array to create rows
  for (let i = 0; i < json.length; i++) {
    bodyRows += '<tr>'
    bodyRows += '<td><button type="button" class="btn-line clickable">View</button></td>'
    bodyRows += '<td class="game-list-id" >' + json[i].id + '</td>'
    bodyRows += '<td>' + json[i].cells + '</td>'
    bodyRows += '<td>' + json[i].over + '</td>'
    bodyRows += '<td>' + json[i].player_x.email + '</td>'
    if (json[i].player_o === null) {
      bodyRows += '<td>' + json[i].player_o + '</td>'
    } else {
      bodyRows += '<td>' + json[i].player_o.email + '</td>'
    }
    bodyRows += '</tr>'
  }
  // json.map(function (row) {
  //   bodyRows += '<tr>'
  //   // loop over object properties and create cells
  //   cols.map(function (x) {
  //     bodyRows += '<td>' + row[x] + '</td>'
  //   })
  //   bodyRows += '</tr>'
  // })
  return bodyRows
}

// GAME server
// CREATE success
const createSuccess = function (createResponse) {
  // console.log('createResponse is ', createResponse)
  store.game = createResponse.game
  // console.log('new game successfully created')
  $('#current-game-display').html(store.game.id)
  $('#game-info-msg').html('New game has started')
  if ($('#current-player').hasClass('hide')) {
    $('#current-player').toggleClass('hide')
  }
  if ($('#game-info-msg').hasClass('hide')) {
    $('#game-info-msg').toggleClass('hide')
  }
  if ($('#gameBoard').hasClass('playable')) {
  } else {
    ($('#gameBoard').toggleClass('playable'))
  }
  if ($('#player_x').hasClass('hide')) {
    $('#player_x').toggleClass('hide')
    $('#player_o').toggleClass('hide')
  }
  clearBoard()
}

// CREATE error
const createError = function () {
  // console.log('createError is ', error)
  // console.log('Failed to create new game')
}

// UPDATE success
const updateSuccess = function (updateResponse) {
  // console.log('updateResponse is ', updateResponse)
  store.game = updateResponse.game
  // console.log('game successfully updated')
  // console.log('store.game after updateSuccess is ', store.game)
}

// UPDATE error
const updateError = function () {
  // console.log('updateError is ', error)
  // console.log('Failed to update game')
}

// SHOW ALL success
const showAllSuccess = function (showAllResponse) {
  // console.log('showAllResponse is ', showAllResponse)
  store.list = showAllResponse.games
  // console.log('game data retrieved')
  // console.log('store.list is ', store.list)
  // $('#game-list').toggleClass('hide')
  $('#game-table-body').html(createTable(showAllResponse.games))
  $('#modalGameList').modal('toggle')
}

// SHOW ALL error
const showAllError = function () {
  // console.log('showAllError is ', error)
  // console.log('Failed to retrieve game data')
}

// SHOW ONE success
const showOneSuccess = function (showOneResponse) {
  // console.log('showOneResponse is ', showOneResponse)
  // console.log('game data retrieved')
  // $('#game-by-id-form input[type=text]').val('')
  store.show = showOneResponse
  // console.log('store.show is ', store.show)
  populateBoard(store.show)
  $('#current-game-display').html(store.show.game.id)
  store.game = store.show
  if ($('#gameBoard').hasClass('playable')) {
    ($('#gameBoard').toggleClass('playable'))
  }
  $('#game-info-msg').html('Showing requested game')
}

// SHOW ONE error
const showOneError = function () {
  // console.log('showOneError is ', error)
  // console.log('Failed to retrieve game data')
}

// display message to sign in
const mustSignIn = function () {
  $('#game-win-msg').html('Please sign in to play')
}

// make a move
const makeMoveSuccess = function (box, game, num) {
  // $('#box' + num).html(game.cells[num])
  $('#player_x').toggleClass('hide')
  $('#player_o').toggleClass('hide')
  // add x or o img to div
  if ($('#player_x').hasClass('hide')) {
    $('#box' + num).prepend($('<img>', {src: config.imgUrl + '/assets/images/X.png', alt: ''}))
  } else {
    $('#box' + num).prepend($('<img>', {src: config.imgUrl + '/assets/images/O.png', alt: ''}))
  }

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

const weHaveAWinner = function (value, num1, num2, num3) {
  // console.log('value is ', value)
  $('#game-win-msg').html('Player ' + value + ' wins!')
  store.game.over = true
  // console.log('store.game.over is', store.game.over)
  store.update.game.over = true
  // gameApi.updateGame()
  //   .then(updateSuccess)
  //   .catch(updateError)
  // console.log('store is ', store)
  $('#game-over-msg').toggleClass('hide')
  $('#game-info-msg').toggleClass('hide')
  $('#box' + num1).toggleClass('winner')
  $('#box' + num2).toggleClass('winner')
  $('#box' + num3).toggleClass('winner')
  // console.log('end of weHaveAWinner')
}

const weHaveADraw = function () {
  $('#game-win-msg').html('We have a draw!')
  store.game.over = true
  store.update.game.over = true
  gameApi.updateGame()
    .then(updateSuccess)
    .catch(updateError)
  $('#game-over-msg').toggleClass('hide')
  $('#game-info-msg').toggleClass('hide')
}

module.exports = {
  makeMoveSuccess,
  weHaveAWinner,
  clearBoard,
  populateBoard,
  createSuccess,
  createError,
  updateSuccess,
  updateError,
  showAllSuccess,
  showAllError,
  showOneSuccess,
  showOneError,
  weHaveADraw,
  mustSignIn
}
