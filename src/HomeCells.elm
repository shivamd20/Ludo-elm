module HomeCells exposing (homeCells)

import Html exposing (Html, div)
import Html.Attributes exposing (class)
import LudoModel exposing (Model, Msg)


homeCells : Model -> List (Html Msg)
homeCells model =
    redHomeCells ++ greenHomeCells ++ blueHomeCells ++ yellowHomeCells


redHomeCells : List (Html Msg)
redHomeCells =
    [ div [ class "rounded-full col-start-2 row-start-2 " ] [ Html.text "🔴" ]
    , div [ class "rounded-full col-start-5 row-start-2 " ] [ Html.text "🔴" ]
    , div [ class "rounded-full col-start-5 row-start-5 " ] [ Html.text "🔴" ]
    , div [ class "rounded-full col-start-2 row-start-5 " ] [ Html.text "🔴" ]
    ]


greenHomeCells : List (Html Msg)
greenHomeCells =
    [ div [ class "rounded-full col-start-11 row-start-2 " ] [ Html.text "\u{1F7E2}" ]
    , div [ class "rounded-full col-start-14 row-start-2 " ] [ Html.text "\u{1F7E2}" ]
    , div [ class "rounded-full col-start-14 row-start-5 " ] [ Html.text "\u{1F7E2}" ]
    , div [ class "rounded-full col-start-11 row-start-5 " ] [ Html.text "\u{1F7E2}" ]
    ]


yellowHomeCells : List (Html Msg)
yellowHomeCells =
    [ div [ class "rounded-full col-start-11 row-start-11 " ] [ Html.text "\u{1F7E1}" ]
    , div [ class "rounded-full col-start-14 row-start-11 " ] [ Html.text "\u{1F7E1}" ]
    , div [ class "rounded-full col-start-14 row-start-14 " ] [ Html.text "\u{1F7E1}" ]
    , div [ class "rounded-full col-start-11 row-start-14 " ] [ Html.text "\u{1F7E1}" ]
    ]


blueHomeCells : List (Html Msg)
blueHomeCells =
    [ div [ class "rounded-full col-start-2 row-start-11  " ] [ Html.text "🔵" ]
    , div [ class "rounded-full col-start-5 row-start-11  " ] [ Html.text "🔵" ]
    , div [ class "rounded-full col-start-5 row-start-14  " ] [ Html.text "🔵" ]
    , div [ class "rounded-full col-start-2 row-start-14  " ] [ Html.text "🔵" ]
    ]
