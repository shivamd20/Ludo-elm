module Ludo exposing (Node, NodeType(..), canMove, commonPathList, findCoinAtCoinPosition, getCommonPathNode, moveAllPositions, nextTurn, positionToString)

import Dict exposing (Dict)
import List.Extra exposing (find)
import LudoModel exposing (Model, PlayerColor(..), Position(..))


type NodeType
    = Regular
    | Star
    | Start PlayerColor


type alias Node =
    { nodeType : NodeType
    , next : Position
    }


regularNode : Node
regularNode =
    { next = InCommonPathPosition 2, nodeType = Regular }


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


findCoinAtCoinPosition : List ( PlayerColor, Position ) -> Position -> Maybe ( PlayerColor, Position )
findCoinAtCoinPosition positions indexPosition =
    find
        (\pos ->
            let
                ( _, p ) =
                    pos
            in
            p == indexPosition
        )
        positions


commonPathList : List Position
commonPathList =
    List.map (\x -> InCommonPathPosition x) (Dict.keys ludoGraph)


positionToString : Position -> String
positionToString pos =
    case pos of
        InCommonPathPosition n ->
            String.fromInt n

        InStartBoxPosition n ->
            String.fromInt n


getCommonPathNode : LudoModel.Position -> Maybe Node
getCommonPathNode position =
    case position of
        InCommonPathPosition n ->
            Dict.get n ludoGraph

        InStartBoxPosition n ->
            Dict.get n ludoGraph


ludoGraph : Dict Int Node
ludoGraph =
    Dict.fromList
        [ ( 1, { regularNode | next = InCommonPathPosition 2 } )
        , ( 2, { redStartNode | next = InCommonPathPosition 3 } )
        , ( 3, { regularNode | next = InCommonPathPosition 4 } )
        , ( 4, { regularNode | next = InCommonPathPosition 5 } )
        , ( 5, { regularNode | next = InCommonPathPosition 6 } )
        , ( 6, { regularNode | next = InCommonPathPosition 7 } )
        , ( 7, { regularNode | next = InCommonPathPosition 8 } )
        , ( 8, { regularNode | next = InCommonPathPosition 9 } )
        , ( 9, { regularNode | next = InCommonPathPosition 10 } )
        , ( 10, { starNode | next = InCommonPathPosition 11 } )
        , ( 11, { regularNode | next = InCommonPathPosition 12 } )
        , ( 12, { regularNode | next = InCommonPathPosition 13 } )
        , ( 13, { regularNode | next = InCommonPathPosition 14 } )
        , ( 14, { regularNode | next = InCommonPathPosition 15 } )
        , ( 15, { greenStartNode | next = InCommonPathPosition 16 } )
        , ( 16, { regularNode | next = InCommonPathPosition 17 } )
        , ( 17, { regularNode | next = InCommonPathPosition 18 } )
        , ( 18, { regularNode | next = InCommonPathPosition 19 } )
        , ( 19, { regularNode | next = InCommonPathPosition 20 } )
        , ( 20, { regularNode | next = InCommonPathPosition 21 } )
        , ( 21, { regularNode | next = InCommonPathPosition 22 } )
        , ( 22, { regularNode | next = InCommonPathPosition 23 } )
        , ( 23, { starNode | next = InCommonPathPosition 24 } )
        , ( 24, { regularNode | next = InCommonPathPosition 25 } )
        , ( 25, { regularNode | next = InCommonPathPosition 26 } )
        , ( 26, { regularNode | next = InCommonPathPosition 27 } )
        , ( 27, { regularNode | next = InCommonPathPosition 28 } )
        , ( 28, { yellowStartNode | next = InCommonPathPosition 29 } )
        , ( 29, { regularNode | next = InCommonPathPosition 30 } )
        , ( 30, { regularNode | next = InCommonPathPosition 31 } )
        , ( 31, { regularNode | next = InCommonPathPosition 32 } )
        , ( 32, { regularNode | next = InCommonPathPosition 33 } )
        , ( 33, { regularNode | next = InCommonPathPosition 34 } )
        , ( 34, { regularNode | next = InCommonPathPosition 35 } )
        , ( 35, { regularNode | next = InCommonPathPosition 36 } )
        , ( 36, { starNode | next = InCommonPathPosition 37 } )
        , ( 37, { regularNode | next = InCommonPathPosition 38 } )
        , ( 38, { regularNode | next = InCommonPathPosition 39 } )
        , ( 39, { regularNode | next = InCommonPathPosition 40 } )
        , ( 40, { regularNode | next = InCommonPathPosition 41 } )
        , ( 41, { blueStartNode | next = InCommonPathPosition 42 } )
        , ( 42, { regularNode | next = InCommonPathPosition 43 } )
        , ( 43, { regularNode | next = InCommonPathPosition 44 } )
        , ( 44, { regularNode | next = InCommonPathPosition 45 } )
        , ( 45, { regularNode | next = InCommonPathPosition 46 } )
        , ( 46, { regularNode | next = InCommonPathPosition 47 } )
        , ( 47, { regularNode | next = InCommonPathPosition 48 } )
        , ( 48, { regularNode | next = InCommonPathPosition 49 } )
        , ( 49, { starNode | next = InCommonPathPosition 50 } )
        , ( 50, { regularNode | next = InCommonPathPosition 51 } )
        , ( 51, { regularNode | next = InCommonPathPosition 52 } )
        , ( 52, { regularNode | next = InCommonPathPosition 1 } )
        ]


canMove : Model -> ( PlayerColor, Position ) -> Bool
canMove model posInfo =
    let
        ( playerColor, _ ) =
            posInfo
    in
    model.turn == playerColor && model.diceNum /= 0


findInGraph : Position -> Maybe Node
findInGraph currentPosition =
    ludoGraph
        |> Dict.get
            (case currentPosition of
                InCommonPathPosition n ->
                    n

                InStartBoxPosition n ->
                    n
            )


moveAllPositions : Position -> Model -> Model
moveAllPositions clickedPosition model =
    let
        updatedPos =
            List.map
                (\posInfo ->
                    let
                        ( color, currentPosition ) =
                            posInfo
                    in
                    if model.turn /= color || currentPosition /= clickedPosition then
                        posInfo

                    else
                        move posInfo model clickedPosition
                )
                model.positions
    in
    { positions = updatedPos
    , diceNum =
        if updatedPos /= model.positions then
            0

        else
            model.diceNum
    , turn =
        if model.diceNum /= 6 && updatedPos /= model.positions then
            nextTurn model.turn

        else
            model.turn
    }


move : ( PlayerColor, Position ) -> Model -> Position -> ( PlayerColor, Position )
move posInfo model clickedPosition =
    let
        ( color, currentPosition ) =
            posInfo
    in
    if model.turn /= color || model.diceNum == 0 then
        posInfo

    else
        let
            node =
                findInGraph currentPosition |> Maybe.withDefault { next = InCommonPathPosition 1, nodeType = Regular }
        in
        move
            ( color, node.next )
            { model | diceNum = model.diceNum - 1 }
            clickedPosition


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
