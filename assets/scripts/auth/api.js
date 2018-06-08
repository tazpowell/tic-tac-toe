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

// SIGN IN
const signIn = function (data) {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/sign-in',
    data: data
  })
}

module.exports = {
  signUp,
  signIn
}
