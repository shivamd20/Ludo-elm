module Dice exposing (diceDiv)

import Html exposing (Html, button, text)
import Html.Attributes exposing (class, hidden)
import Html.Events exposing (onClick)
import LudoModel exposing (Msg(..), PlayerColor(..))


diceDiv : LudoModel.Model -> Html Msg
diceDiv model =
    let
        positionClass =
            case model.turn of
                Red ->
                    "col-start-3 row-start-3"

                Blue ->
                    "col-start-3 row-start-12"

                Green ->
                    "col-start-12 row-start-3"

                Yellow ->
                    "col-start-12 row-start-12"

        positionClassWithAnimation =
            positionClass
                ++ (if model.diceNum == 0 then
                        " animate__animated animate__bounce animate__infinite  "

                    else
                        " animate__animated animate__wobble  "
                   )
    in
    button
        [ class ("disabled:opacity-50 rounded-full hover:bg-gray-600 focus:outline-none focus:shadow-outline col-span-2 row-span-2 border p-2 m-2 animate__animated animate__bounce " ++ positionClassWithAnimation)
        , if model.diceNum == 0 && model.turn == model.selectedPlayer then
            onClick
                RollDice

          else
            hidden False
        ]
        [ text <|
            if model.diceNum == 0 then
                "roll"

            else
                String.fromInt model.diceNum
        ]
