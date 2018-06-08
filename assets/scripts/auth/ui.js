'use strict'

const makeMoveSuccess = function (box, game, num) {
  // $('#gameBoard').html(gameboard)
  $('#player_x').toggleClass('hide')
  $('#player_o').toggleClass('hide')

  console.log('box is ', box)
  console.log('game is ', game)
  console.log('num is ', num)
  $('#box' + num).html(game[num])
}

const weHaveAWinner = function (value) {
  $('#gameStatus').html('Player ' + value + ' wins!')
}

module.exports = {
  makeMoveSuccess,
  weHaveAWinner
}
