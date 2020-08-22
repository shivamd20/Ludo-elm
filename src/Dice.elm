module Dice exposing (diceDiv)

import Html exposing (Html, button, img, text)
import Html.Attributes exposing (class, hidden)
import Html.Events exposing (onClick)
import LudoModel exposing (Msg(..), PlayerColor(..))
import Svg exposing (..)
import Svg.Attributes exposing (..)


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
    if model.diceNum == 0 then
        img
            [ Html.Attributes.src "dice.svg"
            , if model.diceNum == 0 && model.turn == model.selectedPlayer then
                onClick
                    RollDice

              else
                hidden False
            , Html.Attributes.class ("disabled:opacity-50  hover:bg-gray-600  col-span-2 row-span-2  animate__animated animate__bounce text-center " ++ positionClassWithAnimation)
            ]
            []

    else
        Html.button [ Html.Attributes.class ("disabled:opacity-50  border hover:bg-gray-600  col-span-2 row-span-2  animate__animated animate__bounce text-center " ++ positionClassWithAnimation) ] [ Html.text (String.fromInt model.diceNum) ]
