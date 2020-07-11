module Ludo exposing (Node, NodeType, ludoGraph, move)

import List.Extra exposing (find)


type NodeType
    = Regular


type alias Node =
    ( Int, Int, NodeType )


ludoGraph : List Node
ludoGraph =
    [ ( 1, 2, Regular )
    , ( 2, 3, Regular )
    , ( 3, 4, Regular )
    , ( 4, 5, Regular )
    , ( 5, 6, Regular )
    , ( 6, 7, Regular )
    , ( 7, 8, Regular )
    , ( 8, 9, Regular )
    , ( 9, 10, Regular )
    , ( 10, 11, Regular )
    , ( 11, 12, Regular )
    , ( 12, 13, Regular )
    , ( 13, 14, Regular )
    , ( 14, 15, Regular )
    , ( 15, 16, Regular )
    , ( 16, 17, Regular )
    , ( 17, 18, Regular )
    , ( 18, 19, Regular )
    , ( 19, 20, Regular )
    , ( 20, 21, Regular )
    , ( 21, 22, Regular )
    , ( 22, 23, Regular )
    , ( 23, 24, Regular )
    , ( 24, 25, Regular )
    , ( 25, 26, Regular )
    , ( 26, 27, Regular )
    , ( 27, 28, Regular )
    , ( 28, 29, Regular )
    , ( 29, 30, Regular )
    , ( 30, 31, Regular )
    , ( 31, 32, Regular )
    , ( 32, 33, Regular )
    , ( 33, 34, Regular )
    , ( 34, 35, Regular )
    , ( 35, 36, Regular )
    , ( 36, 37, Regular )
    , ( 37, 38, Regular )
    , ( 38, 39, Regular )
    , ( 39, 40, Regular )
    , ( 40, 41, Regular )
    , ( 41, 42, Regular )
    , ( 42, 43, Regular )
    , ( 43, 44, Regular )
    , ( 44, 45, Regular )
    , ( 45, 46, Regular )
    , ( 46, 47, Regular )
    , ( 47, 48, Regular )
    , ( 48, 49, Regular )
    , ( 49, 50, Regular )
    , ( 50, 51, Regular )
    , ( 51, 52, Regular )
    , ( 52, 1, Regular )
    ]


findInGraph : Int -> Maybe Node
findInGraph currentPosition =
    find
        (\node ->
            let
                ( pos, _, _ ) =
                    node
            in
            pos == currentPosition
        )
        ludoGraph


move : Int -> Int -> Int
move currentPosition dice =
    if dice == 0 then
        currentPosition

    else
        let
            ( _, next, _ ) =
                Maybe.withDefault ( 1, 2, Regular ) (findInGraph currentPosition)
        in
        move
            next
            (dice - 1)



{--function move(currentPosition: number, dice: number) {
  if (dice === 0) return currentPosition;
  else return move(GRAPH[currentPosition][0], dice - 1);
--}
