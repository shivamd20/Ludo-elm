module Dice exposing (diceDiv)

import Html exposing (Html, button, text)
import Html.Attributes exposing (class, hidden)
import Html.Events exposing (onClick)
import LudoModel exposing (Msg(..), PlayerColor(..))


diceDiv : Int -> PlayerColor -> Html Msg
diceDiv diceNum turn =
    let
        positionClass =
            case turn of
                Red ->
                    "col-start-3 row-start-3"

                Blue ->
                    "col-start-3 row-start-12"

                Green ->
                    "col-start-12 row-start-3"

                Yellow ->
                    "col-start-12 row-start-12"
    in
    button
        [ class ("rounded-full hover:bg-gray-600 focus:outline-none focus:shadow-outline col-span-2 row-span-2 border p-2 m-2 " ++ positionClass)
        , if diceNum == 0 then
            onClick
                GenerateRandomNumber

          else
            hidden False
        ]
        [ text <|
            if diceNum == 0 then
                "roll"

            else
                String.fromInt diceNum
        ]
