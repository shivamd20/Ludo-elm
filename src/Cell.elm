module Cell exposing (..)

import Html exposing (Html, div)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)
import Ludo exposing (NodeType(..), PlayerColor(..))
import LudoUpdate exposing (Msg(..))


type Orientation
    = Vertical
    | Horizontal
    | None


cell : Orientation -> Int -> Int -> NodeType -> Html Msg
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
                    Html.text (String.fromInt positionNumber)

                Star ->
                    Html.text "✫"

                Start color ->
                    Html.text "✫"
        ]


homeCell : String -> Ludo.PlayerColor -> Html msg
homeCell className color =
    let
        computedClassName =
            (case color of
                Red ->
                    " border-red-700 "

                Green ->
                    " border-green-700 "

                Blue ->
                    " border-blue-700 "

                Yellow ->
                    " border-yellow-700 "
            )
                ++ className
    in
    div [ class ("col-span-3 row-span-3 m-5 rounded-full  border " ++ computedClassName) ] []


redHomeCells : List (Html Msg)
redHomeCells =
    [ homeCell "col-start-1 row-start-1" Red
    , homeCell "col-start-4 row-start-1" Red
    , homeCell "col-start-1 row-start-4" Red
    , homeCell "col-start-4 row-start-4" Red
    ]


greenHomeCells : List (Html Msg)
greenHomeCells =
    [ homeCell "col-start-10 row-start-1" Green
    , homeCell "col-start-13 row-start-1" Green
    , homeCell "col-start-10 row-start-4" Green
    , homeCell "col-start-13 row-start-4" Green
    ]


yellowHomeCells : List (Html Msg)
yellowHomeCells =
    [ homeCell "col-start-10 row-start-10" Yellow
    , homeCell "col-start-13 row-start-10" Yellow
    , homeCell "col-start-10 row-start-13" Yellow
    , homeCell "col-start-13 row-start-13" Yellow
    ]


blueHomeCells : List (Html Msg)
blueHomeCells =
    [ homeCell "col-start-1 row-start-10" Blue
    , homeCell "col-start-4 row-start-10" Blue
    , homeCell "col-start-1 row-start-13" Blue
    , homeCell "col-start-4 row-start-13" Blue
    ]
