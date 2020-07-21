module Ludo exposing (Node, NodeType(..), canMove, commonPathList, findCoinsAtCoinPosition, getCommonPathNode, moveAllPositions, moveStartBoxPosition, nextTurn, positionToString)

import Dict exposing (Dict)
import List.Extra exposing (elemIndex, findIndex, getAt, updateAt)
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


redStartNodeInfo : ( Int, Node )
redStartNodeInfo =
    ( 2, { nodeType = Start Red, next = InCommonPathPosition 3 } )


blueStartNodeInfo : ( Int, Node )
blueStartNodeInfo =
    ( 41, { nodeType = Start Blue, next = InCommonPathPosition 42 } )


greenStartNodeInfo : ( Int, Node )
greenStartNodeInfo =
    ( 15, { nodeType = Start Green, next = InCommonPathPosition 16 } )


yellowStartNodeInfo : ( Int, Node )
yellowStartNodeInfo =
    ( 28, { nodeType = Start Yellow, next = InCommonPathPosition 29 } )


findCoinsAtCoinPosition : List ( PlayerColor, Position ) -> Position -> List ( PlayerColor, Position )
findCoinsAtCoinPosition positions indexPosition =
    List.filter
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
            ""


getCommonPathNode : LudoModel.Position -> Maybe Node
getCommonPathNode position =
    case position of
        InCommonPathPosition n ->
            Dict.get n ludoGraph

        InStartBoxPosition n ->
            Nothing


ludoGraph : Dict Int Node
ludoGraph =
    Dict.fromList
        [ ( 1, { regularNode | next = InCommonPathPosition 2 } )
        , redStartNodeInfo
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
        , greenStartNodeInfo
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
        , yellowStartNodeInfo
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
        , blueStartNodeInfo
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
        ( playerColor, pos ) =
            posInfo
    in
    model.diceNum
        /= 0
        && model.turn
        == playerColor
        && (case pos of
                InCommonPathPosition _ ->
                    model.diceNum /= 0

                InStartBoxPosition _ ->
                    model.diceNum == 6
           )


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


moveStartBoxPosition : Model -> PlayerColor -> Int -> Model
moveStartBoxPosition model colorClicked num =
    { model
        | positions =
            List.map
                (\posInfo ->
                    let
                        ( color, pos ) =
                            posInfo
                    in
                    if
                        colorClicked
                            == color
                            && (case pos of
                                    InCommonPathPosition _ ->
                                        False

                                    InStartBoxPosition n ->
                                        n == num
                               )
                    then
                        ( color, getStartPosition color )

                    else
                        posInfo
                )
                model.positions
        , diceNum = 0
    }


getStartPosition : PlayerColor -> Position
getStartPosition color =
    let
        ( num, _ ) =
            case color of
                Red ->
                    redStartNodeInfo

                Green ->
                    greenStartNodeInfo

                Blue ->
                    blueStartNodeInfo

                Yellow ->
                    yellowStartNodeInfo
    in
    InCommonPathPosition num


moveAllPositions : Position -> Model -> Model
moveAllPositions clickedPosition model =
    let
        maybeIndex =
            findIndex
                (\posInfo ->
                    let
                        ( color, currentPosition ) =
                            posInfo
                    in
                    currentPosition == clickedPosition && color == model.turn
                )
                model.positions

        updatedPos =
            case maybeIndex of
                Just index ->
                    updateAt index (\posInfo -> move posInfo model clickedPosition) model.positions

                Nothing ->
                    model.positions
    in
    { positions = updatedPos
    , diceNum =
        0
    , turn =
        if model.diceNum /= 6 then
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
