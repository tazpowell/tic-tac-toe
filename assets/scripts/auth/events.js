'use strict'
const getFormFields = require('../../../lib/get-form-fields.js')
const store = require('../store')
const authUi = require('./ui.js')

// define blank game array
let currentGame = []

// prep game array with strings
const onCreate = function (event) {
  // event.preventDefault()
  console.log('new game board was created')

  currentGame = ['', '', '', '', '', '', '', '', '']
  console.log('currentGame is ', currentGame)
  store.cells = currentGame
  return currentGame
}

// when box is clicked
const onSelectBox = function (event) {
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
  console.log(store.cells[0], store.cells[1], store.cells[2])

  // win conditions
  if (store.cells[0] === store.cells[1] && store.cells[0] === store.cells[2]) {
    console.log('Player', store.cells[0], 'wins!')
    authUi.weHaveAWinner(store.cells[0])
  }
  // else if (store.cells[3] === store.cells[4] === store.cells[5]) {
  //   console.log('Player ', store.cells[3], 'wins!')
  // }
}

// // make a move
// const onMakeAMove = function (event) {
//   event.preventDefault()
//   // console.log('the form was submitted')
//
//   const data = getFormFields(event.target)
//   console.log('data is ', data)
//
//   // check if number is 0-8
//   if (data.box <= 8 && data.box >= 0) {
//   } else {
//     console.log('number is invalid, please use 0-8')
//     return
//   }
//
//   // check if number has been used
//   if (store.cells[data.box] !== '') {
//     console.log('number is already used, pick again')
//     return
//   }
//
//   // push x or o to array
//   if ($('#player_o').hasClass('hide')) {
//     currentGame[data.box] = 'x'
//   } else {
//     currentGame[data.box] = 'o'
//   }
//   console.log('currentGame is now ', currentGame)
//   authUi.makeMoveSuccess(currentGame)
//   store.cells = currentGame
//   // console.log('store is ', store)
//
// }

// whatever comes after the equals is what's passed
module.exports = {
  onCreate,
  onSelectBox
}
