module CommonPath exposing (commonPath)

import Array
import Cell exposing (Orientation(..), cell)
import Html exposing (Html, div)
import Html.Attributes exposing (class)
import Ludo exposing (commonPathList, getCommonPathNode)
import LudoModel exposing (Model, Msg, PlayerColor, Position)


commonPath : Model -> List (Html LudoModel.Msg)
commonPath model =
    [ div [ class "col-start-1 row-start-7 col-span-6 " ] (cellRow Horizontal model.positions 0 6)
    , div [ class "col-start-1 row-start-0 col-start-7 row-span-6 " ] (List.reverse (cellRow Vertical model.positions 6 12))
    , div [ class "col-start-8 row-start-1 " ] (List.reverse (cellRow None model.positions 12 13))
    , div [ class "col-start-9 row-start-1 row-span-6 " ] (cellRow Vertical model.positions 13 19)
    , div [ class "col-start-10 row-start-7 col-span-6 " ] (cellRow Horizontal model.positions 19 25)
    , div [ class "col-start-15 row-start-8 " ] (cellRow None model.positions 25 26)
    , div [ class "col-start-10 row-start-9 col-span-6 " ] (List.reverse (cellRow Horizontal model.positions 26 32))
    , div [ class "col-start-9 row-start-10 row-span-6 " ] (cellRow Vertical model.positions 32 38)
    , div [ class "col-start-8 row-start-15  " ] (cellRow None model.positions 38 39)
    , div [ class "col-start-7 row-start-10 row-span-6 " ] (List.reverse (cellRow Vertical model.positions 39 45))
    , div [ class "col-start-1 row-start-9 col-span-6 " ] (List.reverse (cellRow Horizontal model.positions 45 51))
    , div [ class "col-start-1 row-start-8  " ] (cellRow None model.positions 51 52)
    ]


cellRow : Orientation -> List ( PlayerColor, Position ) -> Int -> Int -> List (Html Msg)
cellRow orientation positions start end =
    let
        slicedList =
            Array.fromList commonPathList |> Array.slice start end |> Array.toList
    in
    slicedList
        |> List.map
            (nodeToHorizontalCell
                orientation
                positions
            )


nodeToHorizontalCell : Orientation -> List ( PlayerColor, Position ) -> Position -> Html Msg
nodeToHorizontalCell orientation positions coinPosition =
    cell orientation positions coinPosition (Maybe.withDefault Ludo.Regular (Maybe.map (\node -> node.nodeType) (getCommonPathNode coinPosition)))
