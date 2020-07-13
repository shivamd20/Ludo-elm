module HomeBoxes exposing (homeBoxes)

import Html exposing (Html, div)
import Html.Attributes exposing (class)
import LudoModel exposing (Msg, PlayerColor(..))


homeBoxes : List (Html Msg)
homeBoxes =
    colorHomeBoxes ++ redHomeCells ++ blueHomeCells ++ greenHomeCells ++ yellowHomeCells


colorHomeBoxes : List (Html Msg)
colorHomeBoxes =
    [ div [ class "col-start-1 row-start-1 border row-span-6 border-red-500 col-span-6" ] []
    , div [ class "col-start-10 row-start-1 border row-span-6 border-green-500 col-span-6" ] []
    , div [ class "col-start-1 row-start-10 border row-span-6 border-blue-500 col-span-6" ] []
    , div [ class "col-start-10 row-start-10 border row-span-6 border-yellow-500  col-span-6" ] []
    , div [ class "col-start-7 row-start-7 border row-span-3 border-gray-500  col-span-3" ] []
    ]


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


homeCell : String -> PlayerColor -> Html msg
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
