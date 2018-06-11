'use strict'
const store = require('../store')
const gameApi = require('./api.js')

// HTML BOARD
// reset board div numbers
const clearBoard = function () {
  // $('.box').css('background-color', '$light-teal')
  for (let i = 0; i < 9; i++) {
    $('#box' + i).html('')
  }
  $('#game-over-msg').addClass('hide')
  $('#player_o').addClass('hide')
  $('#player_x').removeClass('hide')
  $('#game-win-msg').html('')
  console.log('visual game board has been reset')
}

// POPULATE game board with retrieved game data
const populateBoard = function (data) {
  console.log('data is', data)
  const info = data.game.cells
  for (let i = 0; i < info.length; i++) {
    $('#box' + i).html(info[i])
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
  console.log('createResponse is ', createResponse)
  store.game = createResponse.game
  console.log('new game successfully created')
  clearBoard()
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

// SHOW ALL success
const showAllSuccess = function (showAllResponse) {
  console.log('showAllResponse is ', showAllResponse)
  store.list = showAllResponse.games
  console.log('game data retrieved')
  console.log('store.list is ', store.list)
  $('#game-list').toggleClass('hide')
  $('#game-table-body').html(createTable(showAllResponse.games))
}

// SHOW ALL error
const showAllError = function (error) {
  console.log('showAllError is ', error)
  console.log('Failed to retrieve game data')
}

// SHOW ONE success
const showOneSuccess = function (showOneResponse) {
  console.log('showOneResponse is ', showOneResponse)
  console.log('game data retrieved')
  $('#game-by-id-form input[type=text]').val('')
  store.show = showOneResponse
  console.log('store.show is ', store.show)
  populateBoard(store.show)
}

// SHOW ONE error
const showOneError = function (error) {
  console.log('showOneError is ', error)
  console.log('Failed to retrieve game data')
}

// display message to sign in
const mustSignIn = function () {
  $('#game-win-msg').html('Please sign in to play')
}

// GAME PLAY
// make a move
// game = store.game
const makeMoveSuccess = function (box, game, num) {
  // $('#box' + num).html(game.cells[num])
  $('#player_x').toggleClass('hide')
  $('#player_o').toggleClass('hide')
  // add x or o img to div
  if ($('#player_x').hasClass('hide')) {
    $('#box' + num).prepend($('<img>', {src: 'assets/images/x.png', alt: ''}))
  } else {
    $('#box' + num).prepend($('<img>', {src: 'assets/images/o.png', alt: ''}))
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
  console.log('update is ', update)
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
