module Cell exposing (Orientation(..), cell)

import Html exposing (Html, div)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)
import Ludo exposing (NodeType(..), positionToString)
import LudoModel exposing (Msg(..), PlayerColor(..), Position)


type Orientation
    = Vertical
    | Horizontal
    | None


cell : Orientation -> Position -> Position -> NodeType -> Html Msg
cell orientation positionNumber coinPosition nodeType =
    let
        orientationClassName =
            case orientation of
                Vertical ->
                    "w-full h-1/6"

                Horizontal ->
                    "inline-block w-1/6 h-full"

                None ->
                    "w-full h-full"

        colorClassName =
            orientationClassName
                ++ (case nodeType of
                        Start color ->
                            case color of
                                Red ->
                                    "  rounded border-red-500 "

                                Blue ->
                                    " rounded border-blue-500  "

                                Yellow ->
                                    " rounded border-yellow-500 "

                                Green ->
                                    " rounded border-green-500 "

                        _ ->
                            " "
                   )
    in
    div [ class ("border text-white text-center m-auto" ++ " " ++ colorClassName), onClick (MoveCoin positionNumber) ]
        [ if coinPosition == positionNumber then
            Html.text "👹"

          else
            case nodeType of
                Regular ->
                    Html.text (positionToString positionNumber)

                Star ->
                    Html.text "✫"

                Start _ ->
                    Html.text "✫"
        ]
