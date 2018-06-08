'use strict'
const config = require('../config.js')

// SIGN UP
const signUp = function (data) {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/sign-up',
    data: data
  })
}

module.exports = {
  signUp
}
