module Cell exposing (Orientation(..), cell)

import Html exposing (Html, div)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)
import Ludo exposing (NodeType(..), findCoinAtCoinPosition, positionToString)
import LudoModel exposing (Msg(..), PlayerColor(..), Position)


type Orientation
    = Vertical
    | Horizontal
    | None


cell : Orientation -> List ( PlayerColor, Position ) -> Position -> NodeType -> Html Msg
cell orientation positions coinPosition nodeType =
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
    div [ class (" text-white text-center m-auto" ++ " " ++ colorClassName), onClick (MoveCoin coinPosition) ]
        [ let
            maybePos =
                findCoinAtCoinPosition positions coinPosition
          in
          case maybePos of
            Just pos ->
                let
                    ( color, _ ) =
                        pos
                in
                case color of
                    Red ->
                        Html.text "🔴"

                    Green ->
                        Html.text "\u{1F7E2}"

                    Blue ->
                        Html.text "🔵"

                    Yellow ->
                        Html.text "\u{1F7E1}"

            Nothing ->
                case nodeType of
                    Regular ->
                        Html.text "."

                    Star ->
                        Html.text "✫"

                    Start _ ->
                        Html.text "✫"
        ]
