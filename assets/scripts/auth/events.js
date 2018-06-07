'use strict'
const getFormFields = require('../../../lib/get-form-fields.js')

let currentGame = []

const onCreate = function (event) {
  event.preventDefault()
  console.log('the start button was clicked')

  currentGame = ['', '', '', '', '', '', '', '', '']
  console.log('currentGame is ', currentGame)
  return currentGame
}

const onMakeAMove = function (event) {
  event.preventDefault()
  console.log('the form was submitted')

  const data = getFormFields(event.target)
  console.log(data)

  // if (player === 'x') {
  //   currentGame[box] = 'x'
  // } else if (player === 'o') {
  //   currentGame[box] = 'o'
  // } else { console.log('invalid move') }
  // console.log('currentGame is now ', currentGame)
  // return currentGame
}

// const onMakeAMove = function (box, player) {
//   if (player === 'x') {
//     currentGame[box] = 'x'
//   } else if (player === 'o') {
//     currentGame[box] = 'o'
//   } else { console.log('invalid move') }
//   console.log('currentGame is now ', currentGame)
//   return currentGame
// }
//
// createGame()
// makeAMove(5, 'x')
// makeAMove(0, 'o')

// whatever comes after the equals is what's passed
module.exports = {
  onCreate,
  onMakeAMove
}
