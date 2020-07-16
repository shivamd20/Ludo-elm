module HomeCells exposing (homeCells)

import Html exposing (Html, div)
import Html.Attributes exposing (class)
import LudoModel exposing (Msg)


homeCells : List (Html Msg)
homeCells =
    redHomeCells ++ greenHomeCells ++ blueHomeCells ++ yellowHomeCells


redHomeCells : List (Html Msg)
redHomeCells =
    [ div [ class "rounded-full col-start-2 row-start-2  bg-red-500" ] []
    , div [ class "rounded-full col-start-5 row-start-2  bg-red-500" ] []
    , div [ class "rounded-full col-start-5 row-start-5  bg-red-500" ] []
    , div [ class "rounded-full col-start-2 row-start-5  bg-red-500" ] []
    ]


greenHomeCells : List (Html Msg)
greenHomeCells =
    [ div [ class "rounded-full col-start-11 row-start-2  bg-green-500" ] []
    , div [ class "rounded-full col-start-14 row-start-2  bg-green-500" ] []
    , div [ class "rounded-full col-start-14 row-start-5  bg-green-500" ] []
    , div [ class "rounded-full col-start-11 row-start-5  bg-green-500" ] []
    ]


yellowHomeCells : List (Html Msg)
yellowHomeCells =
    [ div [ class "rounded-full col-start-11 row-start-11  bg-yellow-500" ] []
    , div [ class "rounded-full col-start-14 row-start-11  bg-yellow-500" ] []
    , div [ class "rounded-full col-start-14 row-start-14  bg-yellow-500" ] []
    , div [ class "rounded-full col-start-11 row-start-14  bg-yellow-500" ] []
    ]


blueHomeCells : List (Html Msg)
blueHomeCells =
    [ div [ class "rounded-full col-start-2 row-start-11  bg-blue-500" ] []
    , div [ class "rounded-full col-start-5 row-start-11  bg-blue-500" ] []
    , div [ class "rounded-full col-start-5 row-start-14  bg-blue-500" ] []
    , div [ class "rounded-full col-start-2 row-start-14  bg-blue-500" ] []
    ]
