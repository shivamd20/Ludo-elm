module CommonPath exposing (commonPath)

import Array
import Cell exposing (Orientation(..), cell)
import Dict exposing (Dict)
import Html exposing (Html, div)
import Html.Attributes exposing (class)
import Ludo exposing (Node, ludoGraph)
import LudoModel exposing (Model, Msg)


commonPath : Model -> List (Html LudoModel.Msg)
commonPath model =
    let
        num =
            model.position
    in
    [ div [ class "col-start-1 row-start-7 col-span-6 " ] (cellRow num Horizontal 0 6 ludoGraph)
    , div [ class "col-start-1 row-start-0 col-start-7 row-span-6 " ] (List.reverse (cellRow num Vertical 6 12 ludoGraph))
    , div [ class "col-start-8 row-start-1 " ] (List.reverse (cellRow num None 12 13 ludoGraph))
    , div [ class "col-start-9 row-start-1 row-span-6 " ] (cellRow num Vertical 13 19 ludoGraph)
    , div [ class "col-start-10 row-start-7 col-span-6 " ] (cellRow num Horizontal 19 25 ludoGraph)
    , div [ class "col-start-15 row-start-8 " ] (cellRow num None 25 26 ludoGraph)
    , div [ class "col-start-10 row-start-9 col-span-6 " ] (List.reverse (cellRow num Horizontal 26 32 ludoGraph))
    , div [ class "col-start-9 row-start-10 row-span-6 " ] (cellRow num Vertical 32 38 ludoGraph)
    , div [ class "col-start-8 row-start-15  " ] (cellRow num None 38 39 ludoGraph)
    , div [ class "col-start-7 row-start-10 row-span-6 " ] (List.reverse (cellRow num Vertical 39 45 ludoGraph))
    , div [ class "col-start-1 row-start-9 col-span-6 " ] (List.reverse (cellRow num Horizontal 45 51 ludoGraph))
    , div [ class "col-start-1 row-start-8  " ] (cellRow num None 51 52 ludoGraph)
    ]


cellRow : Int -> Orientation -> Int -> Int -> Dict Int Node -> List (Html Msg)
cellRow num orientation start end nodeDict =
    let
        slicedList =
            Array.fromList (Dict.keys nodeDict) |> Array.slice start end |> Array.toList
    in
    slicedList
        |> List.map
            (nodeToHorizontalCell
                orientation
                num
                nodeDict
            )


nodeToHorizontalCell : Orientation -> Int -> Dict Int Node -> Int -> Html Msg
nodeToHorizontalCell orientation diceNum nodeDict positionNumber =
    cell orientation positionNumber diceNum (Maybe.withDefault Ludo.Regular (Maybe.map (\node -> node.nodeType) (Dict.get positionNumber nodeDict)))
