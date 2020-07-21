module Cell exposing (Orientation(..), cell)

import Html exposing (Html, button, div)
import Html.Attributes exposing (class, disabled)
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
        [ class ("focus:outline-none text-white text-center m-auto " ++ " " ++ focusClass)
        , if clickable then
            onClick (MoveCoin coinPosition)

          else
            disabled True
        ]
        [ div [ class "grid grid-cols-2 grid-rows-2 grid-cols-2 w-full h-full" ]
            (case coinsAtPosition of
                [] ->
                    [ case nodeType of
                        Regular ->
                            Html.text "."

                        Star ->
                            Html.text "✫"

                        Start _ ->
                            Html.text "✫"
                    ]

                list ->
                    multipleCoins list
            )
        ]


multipleCoins : List ( PlayerColor, Position ) -> List (Html msg)
multipleCoins list =
    List.map
        (\pos ->
            div []
                [ let
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
                ]
        )
        list
