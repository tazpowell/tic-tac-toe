'use strict'

let apiUrl
const apiUrls = {
  production: 'https://aqueous-atoll-85096.herokuapp.com',
  development: 'https://tic-tac-toe-wdi.herokuapp.com'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

let imgUrl
const imgUrls = {
  production: 'https://github.com/tazpowell/tic-tac-toe/blob/master/',
  development: ''
}

if (window.location.hostname === 'localhost') {
  imgUrl = imgUrls.development
} else {
  imgUrl = imgUrls.production
}

module.exports = {
  apiUrl,
  imgUrl
}
