module Cell exposing (Orientation(..), cell)

import Html exposing (Html, button)
import Html.Attributes exposing (class, disabled)
import Html.Events exposing (onClick)
import Ludo exposing (NodeType(..), canMove, findCoinAtCoinPosition)
import LudoModel exposing (Model, Msg(..), PlayerColor(..), Position)


type Orientation
    = Vertical
    | Horizontal
    | None


cell : Orientation -> Position -> NodeType -> Model -> Html Msg
cell orientation coinPosition nodeType model =
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
                                    "   text-red-500 "

                                Blue ->
                                    "  text-blue-500  "

                                Yellow ->
                                    "  text-yellow-500 "

                                Green ->
                                    "  text-green-500 "

                        _ ->
                            " "
                   )

        maybePos =
            findCoinAtCoinPosition model.positions coinPosition

        clickable =
            case maybePos of
                Nothing ->
                    False

                Just posInfo ->
                    canMove model model.diceNum posInfo

        focusClass =
            colorClassName
                ++ "  "
                ++ (if clickable then
                        " border "

                    else
                        ""
                   )
    in
    button
        [ class ("focus:outline-none text-white text-center m-auto  " ++ " " ++ focusClass)
        , if clickable then
            onClick (MoveCoin coinPosition)

          else
            disabled True
        ]
        [ case maybePos of
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
