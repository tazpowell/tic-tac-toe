'use strict'

const makeMoveSuccess = function (gameboard) {
  $('#gameBoard').html(gameboard)
  $('#player_x').toggleClass('hide')
  $('#player_o').toggleClass('hide')
}

module.exports = {
  makeMoveSuccess
}
