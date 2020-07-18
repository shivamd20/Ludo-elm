module CommonPath exposing (commonPath)

import Array
import Cell exposing (Orientation(..), cell)
import Html exposing (Html, div)
import Html.Attributes exposing (class)
import Ludo exposing (commonPathList, getCommonPathNode)
import LudoModel exposing (Model, Msg, Position)


commonPath : Model -> List (Html LudoModel.Msg)
commonPath model =
    [ div [ class "col-start-1 row-start-7 col-span-6 " ] (cellRow Horizontal model 0 6)
    , div [ class "col-start-1 row-start-0 col-start-7 row-span-6 " ] (List.reverse (cellRow Vertical model 6 12))
    , div [ class "col-start-8 row-start-1 " ] (List.reverse (cellRow None model 12 13))
    , div [ class "col-start-9 row-start-1 row-span-6 " ] (cellRow Vertical model 13 19)
    , div [ class "col-start-10 row-start-7 col-span-6 " ] (cellRow Horizontal model 19 25)
    , div [ class "col-start-15 row-start-8 " ] (cellRow None model 25 26)
    , div [ class "col-start-10 row-start-9 col-span-6 " ] (List.reverse (cellRow Horizontal model 26 32))
    , div [ class "col-start-9 row-start-10 row-span-6 " ] (cellRow Vertical model 32 38)
    , div [ class "col-start-8 row-start-15  " ] (cellRow None model 38 39)
    , div [ class "col-start-7 row-start-10 row-span-6 " ] (List.reverse (cellRow Vertical model 39 45))
    , div [ class "col-start-1 row-start-9 col-span-6 " ] (List.reverse (cellRow Horizontal model 45 51))
    , div [ class "col-start-1 row-start-8  " ] (cellRow None model 51 52)
    ]


cellRow : Orientation -> Model -> Int -> Int -> List (Html Msg)
cellRow orientation model start end =
    let
        slicedList =
            Array.fromList commonPathList |> Array.slice start end |> Array.toList
    in
    slicedList
        |> List.map
            (nodeToHorizontalCell
                orientation
                model
            )


nodeToHorizontalCell : Orientation -> Model -> Position -> Html Msg
nodeToHorizontalCell orientation model coinPosition =
    cell orientation coinPosition (Maybe.withDefault Ludo.Regular (Maybe.map (\node -> node.nodeType) (getCommonPathNode coinPosition))) model
