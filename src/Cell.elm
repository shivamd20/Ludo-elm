module Cell exposing (Orientation(..), cell)

import Html exposing (Html, button)
import Html.Attributes exposing (class, disabled, style)
import Html.Events exposing (onClick)
import Ludo exposing (canMove, findCoinsAtCoinPosition)
import LudoModel exposing (Model, Msg(..), PlayerColor(..), Position(..))


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
        [ class ("focus:outline-none  align-middle truncate text-center m-auto   break-words " ++ " " ++ focusClass)
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
                    [ class className
                    , style "letter-spacing" letterSpacingStyle
                    ]
                    [ multipleCoins list |> Html.text ]
        ]


multipleCoins : List ( PlayerColor, Position ) -> String
multipleCoins list =
    String.join
        ""
        (List.map
            (\pos ->
                let
                    ( color, _ ) =
                        pos
                in
                case color of
                    Red ->
                        "🔴"

                    Green ->
                        "\u{1F7E2}"

                    Blue ->
                        "🔵"

                    Yellow ->
                        "\u{1F7E1}"
            )
            list
        )
