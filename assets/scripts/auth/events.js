'use strict'
// const getFormFields = require('../../../lib/get-form-fields.js')
const store = require('../store')
const authUi = require('./ui.js')
const authApi = require('./api.js')
const getFormFields = require('../../../lib/get-form-fields.js')

// on Sign Up
const onSignUp = function () {
  event.preventDefault()
  console.log('the form was submitted')
  const data = getFormFields(event.target)
  console.log('data is', data)
  // api
  authApi.signUp(data)
    .then(authUi.signUpSuccess)
    .catch(authUi.signUpError)
}

// define blank game array
let currentGame = []

// prep game array with strings
const onCreate = function (event) {
  console.log('new game board was created')

  currentGame = ['', '', '', '', '', '', '', '', '']
  console.log('currentGame is ', currentGame)
  store.cells = currentGame
  store.over = false
  return currentGame
}

const onRestart = function (event) {
  console.log('new game board was created')
  currentGame = ['', '', '', '', '', '', '', '', '']
  store.over = false
  store.cells = currentGame
  authUi.clearBoard()
  console.log('currentGame is ', currentGame)
  console.log('store is ', store)
}

// when box is clicked
const onSelectBox = function (event) {
  // stop if game is over
  if (store.over === true) {
    return
  }

  // store the box number that is clicked
  const num = event.target.getAttribute('data-id')
  console.log('num is ', num)

  // check if number has been used
  if (store.cells[num] !== '') {
    console.log('number is already used, pick again')
    return
  }

  // push x or o to array
  if ($('#player_o').hasClass('hide')) {
    currentGame[num] = 'x'
  } else {
    currentGame[num] = 'o'
  }
  console.log('currentGame is now ', currentGame)
  authUi.makeMoveSuccess(event.target, currentGame, num)
  store.cells = currentGame
  console.log('store is ', store)
  // console.log(store.cells[0], store.cells[1], store.cells[2])

  // win conditions
  const c = store.cells
  console.log('c[0] is ', c[0])

  // win in rows
  if (c[0] !== '' && c[0] === c[1] && c[0] === c[2]) {
    console.log('Player', c[0], 'wins!')
    authUi.weHaveAWinner(c[0])
  } else if (c[3] !== '' && c[3] === c[4] && c[3] === c[5]) {
    console.log('Player ', c[3], 'wins!')
    authUi.weHaveAWinner(c[3])
  } else if (c[6] !== '' && c[6] === c[7] && c[6] === c[8]) {
    console.log('Player ', c[6], 'wins!')
    authUi.weHaveAWinner(c[6])
  }
  // win in columns
  if (c[0] !== '' && c[0] === c[3] && c[0] === c[6]) {
    console.log('Player', c[0], 'wins!')
    authUi.weHaveAWinner(c[0])
  } else if (c[1] !== '' && c[1] === c[4] && c[1] === c[7]) {
    console.log('Player ', c[1], 'wins!')
    authUi.weHaveAWinner(c[3])
  } else if (c[2] !== '' && c[2] === c[5] && c[2] === c[8]) {
    console.log('Player ', c[2], 'wins!')
    authUi.weHaveAWinner(c[2])
  }

  // win in diagonals
  if (c[0] !== '' && c[0] === c[4] && c[0] === c[8]) {
    console.log('Player', c[0], 'wins!')
    authUi.weHaveAWinner(c[0])
  } else if (c[2] !== '' && c[2] === c[4] && c[2] === c[6]) {
    console.log('Player ', c[2], 'wins!')
    authUi.weHaveAWinner(c[2])
  }
} // end of onSelectBox

// whatever comes after the equals is what's passed
module.exports = {
  onCreate,
  onSelectBox,
  onRestart,
  onSignUp
}
