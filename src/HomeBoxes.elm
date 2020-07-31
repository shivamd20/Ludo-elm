module HomeBoxes exposing (homeBoxes)

import Html exposing (Html, div)
import Html.Attributes exposing (class)
import LudoModel exposing (Msg, PlayerColor(..))


homeBoxes : List (Html Msg)
homeBoxes =
    colorHomeBoxes ++ redHomeBoxes ++ blueHomeBoxes ++ greenHomeBoxes ++ yellowHomeBoxes


colorHomeBoxes : List (Html Msg)
colorHomeBoxes =
    [ div [ class "col-start-1 row-start-1 border row-span-6 border-red-500 col-span-6 rounded-lg" ] []
    , div [ class "col-start-10 row-start-1 border row-span-6 border-green-500 col-span-6 rounded-lg" ] []
    , div [ class "col-start-1 row-start-10 border row-span-6 border-blue-500 col-span-6 rounded-lg" ] []
    , div [ class "col-start-10 row-start-10 border row-span-6 border-yellow-500  col-span-6 rounded-lg" ] []
    , div [ class "col-start-7 row-start-7 border row-span-3 border-gray-500  col-span-3 rounded-full" ] []
    ]


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
