module Cell exposing (Orientation(..), cell)

import Html exposing (Html, button, div)
import Html.Attributes exposing (class, disabled, style)
import Html.Events exposing (onClick)
import Ludo exposing (NodeType(..), canMove, findCoinsAtCoinPosition)
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

        coinsAtPosition =
            findCoinsAtCoinPosition model.positions coinPosition

        clickable =
            List.any
                (canMove
                    model
                )
                coinsAtPosition

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
        [ class ("focus:outline-none text-white align-middle truncate text-center m-auto  rounded-full break-words " ++ " " ++ focusClass)
        , if clickable then
            onClick (MoveCoin coinPosition)

          else
            disabled True
        ]
        [ case coinsAtPosition of
            [] ->
                case nodeType of
                    Regular ->
                        Html.text "."

                    Star ->
                        Html.text "✫"

                    Start _ ->
                        Html.text "✫"

            list ->
                let
                    length =
                        List.length list

                    className =
                        " tracking-tighter truncate w-10 break-words "
                            ++ (if length == 1 then
                                    ""

                                else
                                    "text-left"
                               )

                    letterSpacingStyle =
                        if length == 1 then
                            "0.5em"

                        else if length < 5 then
                            "-0.6em"

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
