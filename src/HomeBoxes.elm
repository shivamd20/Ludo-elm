module HomeBoxes exposing (homeBoxes)

import Html exposing (Html, div)
import Html.Attributes exposing (class)
import LudoModel exposing (Model, Msg, PlayerColor(..))


homeBoxes : Model -> List (Html Msg)
homeBoxes model =
    colorHomeBoxes model ++ redHomeBoxes ++ blueHomeBoxes ++ greenHomeBoxes ++ yellowHomeBoxes


colorHomeBoxes : Model -> List (Html Msg)
colorHomeBoxes model =
    [ div [ class ("col-start-1 row-start-1 border-4 row-span-6 border-red-800 col-span-6 rounded-lg " ++ mineClass model LudoModel.Red) ] []
    , div [ class ("col-start-10 row-start-1 border-4 row-span-6 border-green-800 col-span-6 rounded-lg" ++ mineClass model LudoModel.Green) ] []
    , div [ class ("col-start-1 row-start-10 border-4 row-span-6 border-blue-800 col-span-6 rounded-lg" ++ mineClass model LudoModel.Blue) ] []
    , div [ class ("col-start-10 row-start-10 border-4 row-span-6 border-yellow-800  col-span-6 rounded-lg" ++ mineClass model LudoModel.Yellow) ] []
    , div [ class "col-start-7 row-start-7  row-span-3  col-span-3 rounded-lg grid grid-cols-3  grid-rows-3" ]
        [ div [ class "  col-start-1 row-start-1 row-span-2 border-l-4 border-t-4 border-red-800  " ] []
        , div [ class "  col-start-2 row-start-1 col-span-2 border-t-4 border-r-4 border-green-800  " ] []
        , div [ class "  col-start-1 row-start-3 col-span-2 border-l-4 border-b-4 border-blue-800 " ] []
        , div [ class " col-start-3 row-start-2 row-span-2 border-r-4 border-b-4 border-yellow-800  " ] []
        ]
    ]


mineClass : LudoModel.Model -> PlayerColor -> String
mineClass model color =
    if model.selectedPlayer == color then
        " shadow-outline"

    else
        ""


redHomeBoxes : List (Html Msg)
redHomeBoxes =
    [ homeBox "col-start-1 row-start-1" Red
    , homeBox "col-start-4 row-start-1" Red
    , homeBox "col-start-1 row-start-4" Red
    , homeBox "col-start-4 row-start-4" Red
    ]


greenHomeBoxes : List (Html Msg)
greenHomeBoxes =
    [ homeBox "col-start-10 row-start-1" Green
    , homeBox "col-start-13 row-start-1" Green
    , homeBox "col-start-10 row-start-4" Green
    , homeBox "col-start-13 row-start-4" Green
    ]


yellowHomeBoxes : List (Html Msg)
yellowHomeBoxes =
    [ homeBox "col-start-10 row-start-10" Yellow
    , homeBox "col-start-13 row-start-10" Yellow
    , homeBox "col-start-10 row-start-13" Yellow
    , homeBox "col-start-13 row-start-13" Yellow
    ]


blueHomeBoxes : List (Html Msg)
blueHomeBoxes =
    [ homeBox "col-start-1 row-start-10" Blue
    , homeBox "col-start-4 row-start-10" Blue
    , homeBox "col-start-1 row-start-13" Blue
    , homeBox "col-start-4 row-start-13" Blue
    ]


homeBox : String -> PlayerColor -> Html msg
homeBox className color =
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
