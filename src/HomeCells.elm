module HomeCells exposing (homeCells)

import Array exposing (Array)
import Html exposing (Attribute, Html, div)
import Html.Attributes exposing (class, hidden)
import Html.Events exposing (onClick)
import List.Extra exposing (find)
import LudoModel exposing (Model, Msg(..), PlayerColor(..), Position(..))


getPositions : Model -> LudoModel.PlayerColor -> Int -> Maybe ( LudoModel.PlayerColor, Position )
getPositions model colorToGet n =
    find
        (\posInfo ->
            let
                ( color, pos ) =
                    posInfo
            in
            colorToGet
                == color
                && (case pos of
                        InCommonPathPosition _ ->
                            False

                        InStartBoxPosition num ->
                            num == n
                   )
        )
        (model.positions
            |> Array.toList
        )


homeCells : Model -> List (Html Msg)
homeCells model =
    redHomeCells model ++ greenHomeCells model ++ blueHomeCells model ++ yellowHomeCells model


redHomeCells : Model -> List (Html Msg)
redHomeCells model =
    [ div [ class "rounded-full col-start-2 row-start-2 ", clickOrHiddenAttribute model Red 1 ] [ Html.text "🔴" ]
    , div [ class "rounded-full col-start-5 row-start-2 ", clickOrHiddenAttribute model Red 2 ] [ Html.text "🔴" ]
    , div [ class "rounded-full col-start-5 row-start-5 ", clickOrHiddenAttribute model Red 3 ] [ Html.text "🔴" ]
    , div [ class "rounded-full col-start-2 row-start-5 ", clickOrHiddenAttribute model Red 4 ] [ Html.text "🔴" ]
    ]


greenHomeCells : Model -> List (Html Msg)
greenHomeCells model =
    [ div [ class "rounded-full col-start-11 row-start-2 ", clickOrHiddenAttribute model Green 1 ] [ Html.text "\u{1F7E2}" ]
    , div [ class "rounded-full col-start-14 row-start-2 ", clickOrHiddenAttribute model Green 2 ] [ Html.text "\u{1F7E2}" ]
    , div [ class "rounded-full col-start-14 row-start-5 ", clickOrHiddenAttribute model Green 3 ] [ Html.text "\u{1F7E2}" ]
    , div [ class "rounded-full col-start-11 row-start-5 ", clickOrHiddenAttribute model Green 4 ] [ Html.text "\u{1F7E2}" ]
    ]


yellowHomeCells : Model -> List (Html Msg)
yellowHomeCells model =
    [ div [ class "rounded-full col-start-11 row-start-11 ", clickOrHiddenAttribute model Yellow 1 ] [ Html.text "\u{1F7E1}" ]
    , div [ class "rounded-full col-start-14 row-start-11 ", clickOrHiddenAttribute model Yellow 2 ] [ Html.text "\u{1F7E1}" ]
    , div [ class "rounded-full col-start-14 row-start-14 ", clickOrHiddenAttribute model Yellow 3 ] [ Html.text "\u{1F7E1}" ]
    , div [ class "rounded-full col-start-11 row-start-14 ", clickOrHiddenAttribute model Yellow 4 ] [ Html.text "\u{1F7E1}" ]
    ]


blueHomeCells : Model -> List (Html Msg)
blueHomeCells model =
    [ div [ class "rounded-full col-start-2 row-start-11  ", clickOrHiddenAttribute model Blue 1 ] [ Html.text "🔵" ]
    , div [ class "rounded-full col-start-5 row-start-11  ", clickOrHiddenAttribute model Blue 2 ] [ Html.text "🔵" ]
    , div [ class "rounded-full col-start-5 row-start-14  ", clickOrHiddenAttribute model Blue 3 ] [ Html.text "🔵" ]
    , div [ class "rounded-full col-start-2 row-start-14  ", clickOrHiddenAttribute model Blue 4 ] [ Html.text "🔵" ]
    ]


clickOrHiddenAttribute : Model -> PlayerColor -> Int -> Attribute Msg
clickOrHiddenAttribute model color num =
    if getPositions model color num == Nothing then
        hidden True

    else if model.diceNum == 6 then
        onClick (HomeCoinClicked color num)

    else
        hidden False
