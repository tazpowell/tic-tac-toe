#!/bin/bash

curl "https://tic-tac-toe-wdi.herokuapp.com/games/?over=false" \
  --include \
  --request GET \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-Type: application/json" \
  --data ''

echo
