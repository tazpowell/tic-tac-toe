'use strict'

const makeMoveSuccess = function (gameboard) {
  // $('#gameBoard').html(gameboard)
  $('#player_x').toggleClass('hide')
  $('#player_o').toggleClass('hide')
  // console.log('gameboard is ', gameboard)

  $('#box0').html(gameboard[0])
  $('#box1').html(gameboard[1])
  $('#box2').html(gameboard[2])
  $('#box3').html(gameboard[3])
  $('#box4').html(gameboard[4])
  $('#box5').html(gameboard[5])
  $('#box6').html(gameboard[6])
  $('#box7').html(gameboard[7])
  $('#box8').html(gameboard[8])

}

module.exports = {
  makeMoveSuccess
}
