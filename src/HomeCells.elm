module HomeCells exposing (homeCells)

import Html exposing (Attribute, Html, button, div)
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
                        InStartBoxPosition num ->
                            num == n

                        _ ->
                            False
                   )
        )
        model.positions


homeCells : Model -> List (Html Msg)
homeCells model =
    redHomeCells model ++ greenHomeCells model ++ blueHomeCells model ++ yellowHomeCells model


redHomeCells : Model -> List (Html Msg)
redHomeCells model =
    [ button (clickOrHiddenAttribute model Red 1 " col-start-2 row-start-2 align-middle text-center") [ Html.text "🔴" ]
    , button (clickOrHiddenAttribute model Red 2 " col-start-5 row-start-2 align-middle text-center") [ Html.text "🔴" ]
    , button (clickOrHiddenAttribute model Red 3 " col-start-5 row-start-5 align-middle text-center") [ Html.text "🔴" ]
    , button (clickOrHiddenAttribute model Red 4 " col-start-2 row-start-5 align-middle text-center") [ Html.text "🔴" ]
    ]


greenHomeCells : Model -> List (Html Msg)
greenHomeCells model =
    [ button (clickOrHiddenAttribute model Green 1 " col-start-11 row-start-2 align-middle") [ Html.text "\u{1F7E2}" ]
    , button (clickOrHiddenAttribute model Green 2 " col-start-14 row-start-2 align-middle") [ Html.text "\u{1F7E2}" ]
    , button (clickOrHiddenAttribute model Green 3 " col-start-14 row-start-5 align-middle") [ Html.text "\u{1F7E2}" ]
    , button (clickOrHiddenAttribute model Green 4 " col-start-11 row-start-5 align-middle") [ Html.text "\u{1F7E2}" ]
    ]


yellowHomeCells : Model -> List (Html Msg)
yellowHomeCells model =
    [ button (clickOrHiddenAttribute model Yellow 1 " col-start-11 row-start-11 align-middle") [ Html.text "\u{1F7E1}" ]
    , button (clickOrHiddenAttribute model Yellow 2 " col-start-14 row-start-11 align-middle") [ Html.text "\u{1F7E1}" ]
    , button (clickOrHiddenAttribute model Yellow 3 " col-start-14 row-start-14 align-middle") [ Html.text "\u{1F7E1}" ]
    , button (clickOrHiddenAttribute model Yellow 4 " col-start-11 row-start-14 align-middle") [ Html.text "\u{1F7E1}" ]
    ]


blueHomeCells : Model -> List (Html Msg)
blueHomeCells model =
    [ button (clickOrHiddenAttribute model Blue 1 " col-start-2 row-start-11  align-middle") [ Html.text "🔵" ]
    , button (clickOrHiddenAttribute model Blue 2 " col-start-5 row-start-11  align-middle") [ Html.text "🔵" ]
    , button (clickOrHiddenAttribute model Blue 3 " col-start-5 row-start-14  align-middle") [ Html.text "🔵" ]
    , button (clickOrHiddenAttribute model Blue 4 " col-start-2 row-start-14 align-middle ") [ Html.text "🔵" ]
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
                [ onClick (MoveCoin (InStartBoxPosition num)), class (classNames ++ " border") ]

            else
                [ class classNames ]
