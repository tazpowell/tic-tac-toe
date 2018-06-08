'use strict'
const store = require('../store')

const isGameOver = function () {
  if (store.over === true) {
    return true
  } return false
}

module.exports = {
  isGameOver
}
