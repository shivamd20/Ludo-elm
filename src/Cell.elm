module Cell exposing (Orientation(..), cell)

import Coin exposing (coin)
import Html exposing (Html, button)
import Html.Attributes exposing (class, disabled, style)
import Html.Events exposing (onClick)
import Ludo exposing (canMove, findCoinsAtCoinPosition)
import LudoModel exposing (Model, Msg(..), PlayerColor(..), Position(..))
import Svg exposing (..)
import Svg.Attributes exposing (..)


type Orientation
    = Vertical
    | Horizontal
    | None


cell : Orientation -> Position -> Model -> Html Msg
cell orientation coinPosition model =
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
                ++ (case coinPosition of
                        InCommonPathPosition n cPath ->
                            case cPath of
                                LudoModel.PathStart color ->
                                    case color of
                                        Red ->
                                            "   text-red-500 bg-red-800  "

                                        Blue ->
                                            "  text-blue-500 bg-blue-800  "

                                        Yellow ->
                                            "  text-yellow-500 bg-yellow-800  "

                                        Green ->
                                            "  text-green-500 bg-green-800  "

                                _ ->
                                    " text-gray-700  "

                        _ ->
                            " text-gray-700 "
                   )

        coinsAtPosition =
            findCoinsAtCoinPosition model.positions coinPosition

        clickable =
            model.turn
                == model.selectedPlayer
                && List.any
                    (canMove
                        model
                    )
                    coinsAtPosition

        focusClass =
            colorClassName
                ++ "  "
                ++ (if clickable then
                        " animate__animated animate__heartBeat animate__infinite "

                    else
                        ""
                   )
    in
    button
        [ Html.Attributes.class ("focus:outline-none  align-middle truncate text-center m-auto   break-words " ++ " " ++ focusClass)
        , if clickable then
            onClick (MakeMove coinPosition)

          else
            disabled True
        ]
        [ case coinsAtPosition of
            [] ->
                case coinPosition of
                    InCommonPathPosition n cPath ->
                        case cPath of
                            LudoModel.None ->
                                Html.text "."

                            LudoModel.PathStar ->
                                Html.text "✫"

                            LudoModel.PathStart _ ->
                                Html.text "✫"

                            LudoModel.PathEnd color ->
                                Html.text
                                    (case color of
                                        Red ->
                                            "👉"

                                        Blue ->
                                            "👆"

                                        Green ->
                                            "👇"

                                        Yellow ->
                                            "👈"
                                    )

                    _ ->
                        Html.text "."

            list ->
                let
                    length =
                        List.length list

                    className =
                        " tracking-tighter break-words "
                            ++ (if length == 1 then
                                    " text-right "

                                else
                                    "text-left"
                               )

                    letterSpacingStyle =
                        if length == 1 then
                            ""

                        else if length < 8 then
                            "-0.8em"

                        else
                            "-0.9em"
                in
                Html.button
                    [ Html.Attributes.class className
                    , Html.Attributes.style "letter-spacing" letterSpacingStyle
                    ]
                    [ multipleCoins
                        list
                    ]
        ]


multipleCoins : List ( PlayerColor, Position ) -> Html msg
multipleCoins list =
    svg [ viewBox "0 0 100 100", Svg.Attributes.class "w-full h-full text-red-700" ]
        (List.indexedMap
            (\i pos ->
                let
                    ( color, _ ) =
                        pos
                in
                case color of
                    Red ->
                        coin "red" i

                    Green ->
                        coin "green" i

                    Blue ->
                        coin "blue" i

                    Yellow ->
                        coin "yellow" i
            )
            list
        )
