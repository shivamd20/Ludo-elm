port module Ports exposing (diceRolledReceiver, rollDice)


port rollDice : () -> Cmd msg


port diceRolledReceiver : (Int -> msg) -> Sub msg
