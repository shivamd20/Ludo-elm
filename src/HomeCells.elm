module HomeCells exposing (homeCells)

import Html exposing (Html, div)
import Html.Attributes exposing (class, hidden)
import List.Extra exposing (find)
import LudoModel exposing (Model, Msg, PlayerColor(..), Position(..))


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
        model.positions


homeCells : Model -> List (Html Msg)
homeCells model =
    redHomeCells model ++ greenHomeCells model ++ blueHomeCells model ++ yellowHomeCells model


redHomeCells : Model -> List (Html Msg)
redHomeCells model =
    [ div [ class "rounded-full col-start-2 row-start-2 ", hidden (getPositions model Red 1 == Nothing) ] [ Html.text "🔴" ]
    , div [ class "rounded-full col-start-5 row-start-2 ", hidden (getPositions model Red 2 == Nothing) ] [ Html.text "🔴" ]
    , div [ class "rounded-full col-start-5 row-start-5 ", hidden (getPositions model Red 3 == Nothing) ] [ Html.text "🔴" ]
    , div [ class "rounded-full col-start-2 row-start-5 ", hidden (getPositions model Red 4 == Nothing) ] [ Html.text "🔴" ]
    ]


greenHomeCells : Model -> List (Html Msg)
greenHomeCells model =
    [ div [ class "rounded-full col-start-11 row-start-2 ", hidden (getPositions model Green 1 == Nothing) ] [ Html.text "\u{1F7E2}" ]
    , div [ class "rounded-full col-start-14 row-start-2 ", hidden (getPositions model Green 2 == Nothing) ] [ Html.text "\u{1F7E2}" ]
    , div [ class "rounded-full col-start-14 row-start-5 ", hidden (getPositions model Green 3 == Nothing) ] [ Html.text "\u{1F7E2}" ]
    , div [ class "rounded-full col-start-11 row-start-5 ", hidden (getPositions model Green 4 == Nothing) ] [ Html.text "\u{1F7E2}" ]
    ]


yellowHomeCells : Model -> List (Html Msg)
yellowHomeCells model =
    [ div [ class "rounded-full col-start-11 row-start-11 ", hidden (getPositions model Yellow 1 == Nothing) ] [ Html.text "\u{1F7E1}" ]
    , div [ class "rounded-full col-start-14 row-start-11 ", hidden (getPositions model Yellow 2 == Nothing) ] [ Html.text "\u{1F7E1}" ]
    , div [ class "rounded-full col-start-14 row-start-14 ", hidden (getPositions model Yellow 3 == Nothing) ] [ Html.text "\u{1F7E1}" ]
    , div [ class "rounded-full col-start-11 row-start-14 ", hidden (getPositions model Yellow 4 == Nothing) ] [ Html.text "\u{1F7E1}" ]
    ]


blueHomeCells : Model -> List (Html Msg)
blueHomeCells model =
    [ div [ class "rounded-full col-start-2 row-start-11  ", hidden (getPositions model Blue 1 == Nothing) ] [ Html.text "🔵" ]
    , div [ class "rounded-full col-start-5 row-start-11  ", hidden (getPositions model Blue 2 == Nothing) ] [ Html.text "🔵" ]
    , div [ class "rounded-full col-start-5 row-start-14  ", hidden (getPositions model Blue 3 == Nothing) ] [ Html.text "🔵" ]
    , div [ class "rounded-full col-start-2 row-start-14  ", hidden (getPositions model Blue 4 == Nothing) ] [ Html.text "🔵" ]
    ]
