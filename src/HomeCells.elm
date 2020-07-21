module HomeCells exposing (homeCells)

import Html exposing (Attribute, Html, div)
import Html.Attributes exposing (class, hidden)
import Html.Events exposing (onClick)
import List.Extra exposing (find)
import Ludo exposing (canMove)
import LudoModel exposing (Model, Msg(..), PlayerColor(..), Position(..))


getPositionsInStartBox : Model -> LudoModel.PlayerColor -> Int -> Maybe ( LudoModel.PlayerColor, Position )
getPositionsInStartBox model colorToGet n =
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
        model.positions


homeCells : Model -> List (Html Msg)
homeCells model =
    redHomeCells model ++ greenHomeCells model ++ blueHomeCells model ++ yellowHomeCells model


redHomeCells : Model -> List (Html Msg)
redHomeCells model =
    [ div (clickOrHiddenAttribute model Red 1 " col-start-2 row-start-2 ") [ Html.text "🔴" ]
    , div (clickOrHiddenAttribute model Red 2 " col-start-5 row-start-2 ") [ Html.text "🔴" ]
    , div (clickOrHiddenAttribute model Red 3 " col-start-5 row-start-5 ") [ Html.text "🔴" ]
    , div (clickOrHiddenAttribute model Red 4 " col-start-2 row-start-5 ") [ Html.text "🔴" ]
    ]


greenHomeCells : Model -> List (Html Msg)
greenHomeCells model =
    [ div (clickOrHiddenAttribute model Green 1 " col-start-11 row-start-2 ") [ Html.text "\u{1F7E2}" ]
    , div (clickOrHiddenAttribute model Green 2 " col-start-14 row-start-2 ") [ Html.text "\u{1F7E2}" ]
    , div (clickOrHiddenAttribute model Green 3 " col-start-14 row-start-5 ") [ Html.text "\u{1F7E2}" ]
    , div (clickOrHiddenAttribute model Green 4 " col-start-11 row-start-5 ") [ Html.text "\u{1F7E2}" ]
    ]


yellowHomeCells : Model -> List (Html Msg)
yellowHomeCells model =
    [ div (clickOrHiddenAttribute model Yellow 1 " col-start-11 row-start-11 ") [ Html.text "\u{1F7E1}" ]
    , div (clickOrHiddenAttribute model Yellow 2 " col-start-14 row-start-11 ") [ Html.text "\u{1F7E1}" ]
    , div (clickOrHiddenAttribute model Yellow 3 " col-start-14 row-start-14 ") [ Html.text "\u{1F7E1}" ]
    , div (clickOrHiddenAttribute model Yellow 4 " col-start-11 row-start-14 ") [ Html.text "\u{1F7E1}" ]
    ]


blueHomeCells : Model -> List (Html Msg)
blueHomeCells model =
    [ div (clickOrHiddenAttribute model Blue 1 " col-start-2 row-start-11  ") [ Html.text "🔵" ]
    , div (clickOrHiddenAttribute model Blue 2 " col-start-5 row-start-11  ") [ Html.text "🔵" ]
    , div (clickOrHiddenAttribute model Blue 3 " col-start-5 row-start-14  ") [ Html.text "🔵" ]
    , div (clickOrHiddenAttribute model Blue 4 " col-start-2 row-start-14  ") [ Html.text "🔵" ]
    ]


clickOrHiddenAttribute : Model -> PlayerColor -> Int -> String -> List (Attribute Msg)
clickOrHiddenAttribute model color num classNames =
    case getPositionsInStartBox model color num of
        Nothing ->
            [ hidden True, class classNames ]

        Just posInfo ->
            if
                canMove model
                    posInfo
            then
                [ onClick (HomeCoinClicked color num), class (classNames ++ " border") ]

            else
                [ class classNames ]
