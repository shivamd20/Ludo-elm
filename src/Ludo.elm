module Ludo exposing (Node, NodeType(..), ludoGraph, move, nextTurn)

import Dict exposing (Dict)
import LudoModel exposing (PlayerColor(..))


type NodeType
    = Regular
    | Star
    | Start PlayerColor


type alias Node =
    { nodeType : NodeType
    , next : Int
    }


regularNode : Node
regularNode =
    { next = 2, nodeType = Regular }


starNode : Node
starNode =
    { regularNode | nodeType = Star }


startNode : PlayerColor -> Node
startNode color =
    { regularNode | nodeType = Start color }


redStartNode : Node
redStartNode =
    startNode Red


blueStartNode : Node
blueStartNode =
    startNode Blue


greenStartNode : Node
greenStartNode =
    startNode Green


yellowStartNode : Node
yellowStartNode =
    startNode Yellow


ludoGraph : Dict Int Node
ludoGraph =
    Dict.fromList
        [ ( 1, { regularNode | next = 2 } )
        , ( 2, { redStartNode | next = 3 } )
        , ( 3, { regularNode | next = 4 } )
        , ( 4, { regularNode | next = 5 } )
        , ( 5, { regularNode | next = 6 } )
        , ( 6, { regularNode | next = 7 } )
        , ( 7, { regularNode | next = 8 } )
        , ( 8, { regularNode | next = 9 } )
        , ( 9, { regularNode | next = 10 } )
        , ( 10, { starNode | next = 11 } )
        , ( 11, { regularNode | next = 12 } )
        , ( 12, { regularNode | next = 13 } )
        , ( 13, { regularNode | next = 14 } )
        , ( 14, { regularNode | next = 15 } )
        , ( 15, { greenStartNode | next = 16 } )
        , ( 16, { regularNode | next = 17 } )
        , ( 17, { regularNode | next = 18 } )
        , ( 18, { regularNode | next = 19 } )
        , ( 19, { regularNode | next = 20 } )
        , ( 20, { regularNode | next = 21 } )
        , ( 21, { regularNode | next = 22 } )
        , ( 22, { regularNode | next = 23 } )
        , ( 23, { starNode | next = 24 } )
        , ( 24, { regularNode | next = 25 } )
        , ( 25, { regularNode | next = 26 } )
        , ( 26, { regularNode | next = 27 } )
        , ( 27, { regularNode | next = 28 } )
        , ( 28, { yellowStartNode | next = 29 } )
        , ( 29, { regularNode | next = 30 } )
        , ( 30, { regularNode | next = 31 } )
        , ( 31, { regularNode | next = 32 } )
        , ( 32, { regularNode | next = 33 } )
        , ( 33, { regularNode | next = 34 } )
        , ( 34, { regularNode | next = 35 } )
        , ( 35, { regularNode | next = 36 } )
        , ( 36, { starNode | next = 37 } )
        , ( 37, { regularNode | next = 38 } )
        , ( 38, { regularNode | next = 39 } )
        , ( 39, { regularNode | next = 40 } )
        , ( 40, { regularNode | next = 41 } )
        , ( 41, { blueStartNode | next = 42 } )
        , ( 42, { regularNode | next = 43 } )
        , ( 43, { regularNode | next = 44 } )
        , ( 44, { regularNode | next = 45 } )
        , ( 45, { regularNode | next = 46 } )
        , ( 46, { regularNode | next = 47 } )
        , ( 47, { regularNode | next = 48 } )
        , ( 48, { regularNode | next = 49 } )
        , ( 49, { starNode | next = 50 } )
        , ( 50, { regularNode | next = 51 } )
        , ( 51, { regularNode | next = 52 } )
        , ( 52, { regularNode | next = 1 } )
        ]


findInGraph : Int -> Maybe Node
findInGraph currentPosition =
    ludoGraph
        |> Dict.get currentPosition


move : Int -> Int -> Int
move currentPosition dice =
    if dice == 0 then
        currentPosition

    else
        let
            node =
                findInGraph currentPosition |> Maybe.withDefault { next = 1, nodeType = Regular }
        in
        move
            node.next
            (dice - 1)


nextTurn : PlayerColor -> PlayerColor
nextTurn color =
    case color of
        Red ->
            Green

        Green ->
            Yellow

        Blue ->
            Red

        Yellow ->
            Blue
