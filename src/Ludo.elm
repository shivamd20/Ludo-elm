module Ludo exposing (Node, canMove, commonPathList, findCoinsAtCoinPosition, getCommonPathNode, moveAllType, nextTurn)

import Dict exposing (Dict)
import List.Extra exposing (findIndex, getAt, updateAt, updateIfIndex)
import LudoModel exposing (CommonPathPosition(..), Model, PlayerColor(..), Position(..))


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
    { next = InCommonPathPosition 2 None, nodeType = Regular }


redStartNodeInfo : Position
redStartNodeInfo =
    InCommonPathPosition 2 (PathStart Red)


blueStartNodeInfo : Position
blueStartNodeInfo =
    InCommonPathPosition 42 (PathStart Blue)


greenStartNodeInfo : Position
greenStartNodeInfo =
    InCommonPathPosition 15 (LudoModel.PathStart Green)


yellowStartNodeInfo : Position
yellowStartNodeInfo =
    InCommonPathPosition 28 (PathStart Yellow)


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
    List.map
        (\x ->
            case Dict.get (x - 1) ludoGraph of
                Nothing ->
                    InCommonPathPosition 0 None

                Just node ->
                    node.next
        )
        (Dict.keys ludoGraph)


getCommonPathNode : LudoModel.Position -> Maybe Node
getCommonPathNode position =
    case position of
        InCommonPathPosition n _ ->
            Dict.get n ludoGraph

        InStartBoxPosition _ ->
            Nothing

        InHomePathPosition _ _ ->
            Nothing


ludoGraph : Dict Int Node
ludoGraph =
    Dict.fromList
        [ ( 1, { regularNode | next = redStartNodeInfo } )
        , ( 2, { nodeType = Start Red, next = InCommonPathPosition 3 None } )
        , ( 3, { regularNode | next = InCommonPathPosition 4 None } )
        , ( 4, { regularNode | next = InCommonPathPosition 5 None } )
        , ( 5, { regularNode | next = InCommonPathPosition 6 None } )
        , ( 6, { regularNode | next = InCommonPathPosition 7 None } )
        , ( 7, { regularNode | next = InCommonPathPosition 8 None } )
        , ( 8, { regularNode | next = InCommonPathPosition 9 None } )
        , ( 9, { regularNode | next = InCommonPathPosition 10 PathStar } )
        , ( 10, { nodeType = Star, next = InCommonPathPosition 11 None } )
        , ( 11, { regularNode | next = InCommonPathPosition 12 None } )
        , ( 12, { regularNode | next = InCommonPathPosition 13 None } )
        , ( 13, { regularNode | next = InCommonPathPosition 14 None } )
        , ( 14, { regularNode | next = greenStartNodeInfo } )
        , ( 15, { nodeType = Start Green, next = InCommonPathPosition 16 None } )
        , ( 16, { regularNode | next = InCommonPathPosition 17 None } )
        , ( 17, { regularNode | next = InCommonPathPosition 18 None } )
        , ( 18, { regularNode | next = InCommonPathPosition 19 None } )
        , ( 19, { regularNode | next = InCommonPathPosition 20 None } )
        , ( 20, { regularNode | next = InCommonPathPosition 21 None } )
        , ( 21, { regularNode | next = InCommonPathPosition 22 None } )
        , ( 22, { regularNode | next = InCommonPathPosition 23 PathStar } )
        , ( 23, { nodeType = Star, next = InCommonPathPosition 24 None } )
        , ( 24, { regularNode | next = InCommonPathPosition 25 None } )
        , ( 25, { regularNode | next = InCommonPathPosition 26 None } )
        , ( 26, { regularNode | next = InCommonPathPosition 27 None } )
        , ( 27, { regularNode | next = yellowStartNodeInfo } )
        , ( 28, { nodeType = Start Yellow, next = InCommonPathPosition 29 None } )
        , ( 29, { regularNode | next = InCommonPathPosition 30 None } )
        , ( 30, { regularNode | next = InCommonPathPosition 31 None } )
        , ( 31, { regularNode | next = InCommonPathPosition 32 None } )
        , ( 32, { regularNode | next = InCommonPathPosition 33 None } )
        , ( 33, { regularNode | next = InCommonPathPosition 34 None } )
        , ( 34, { regularNode | next = InCommonPathPosition 35 None } )
        , ( 35, { regularNode | next = InCommonPathPosition 36 PathStar } )
        , ( 36, { nodeType = Star, next = InCommonPathPosition 37 None } )
        , ( 37, { regularNode | next = InCommonPathPosition 38 None } )
        , ( 38, { regularNode | next = InCommonPathPosition 39 None } )
        , ( 39, { regularNode | next = InCommonPathPosition 40 None } )
        , ( 40, { regularNode | next = blueStartNodeInfo } )
        , ( 41, { nodeType = Start Blue, next = InCommonPathPosition 42 None } )
        , ( 42, { regularNode | next = InCommonPathPosition 43 None } )
        , ( 43, { regularNode | next = InCommonPathPosition 44 None } )
        , ( 44, { regularNode | next = InCommonPathPosition 45 None } )
        , ( 45, { regularNode | next = InCommonPathPosition 46 None } )
        , ( 46, { regularNode | next = InCommonPathPosition 47 None } )
        , ( 47, { regularNode | next = InCommonPathPosition 48 None } )
        , ( 48, { regularNode | next = InCommonPathPosition 49 PathStar } )
        , ( 49, { nodeType = Star, next = InCommonPathPosition 50 None } )
        , ( 50, { regularNode | next = InCommonPathPosition 51 None } )
        , ( 51, { regularNode | next = InCommonPathPosition 52 None } )
        , ( 52, { regularNode | next = InCommonPathPosition 1 None } )
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
                InStartBoxPosition _ ->
                    model.diceNum == 6

                _ ->
                    model.diceNum /= 0
           )


findInGraph : Position -> Maybe Node
findInGraph currentPosition =
    ludoGraph
        |> Dict.get
            (case currentPosition of
                InCommonPathPosition n _ ->
                    n

                _ ->
                    0
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
                                    InStartBoxPosition n ->
                                        n == num

                                    _ ->
                                        False
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
    case color of
        Red ->
            redStartNodeInfo

        Green ->
            greenStartNodeInfo

        Blue ->
            blueStartNodeInfo

        Yellow ->
            yellowStartNodeInfo


moveAllType : Model -> Position -> Model
moveAllType model clickedPosition =
    case clickedPosition of
        InStartBoxPosition n ->
            moveStartBoxPosition model model.turn n

        InCommonPathPosition _ _ ->
            moveInCommonPath clickedPosition model

        -- TODO
        InHomePathPosition _ _ ->
            model


killAll : Model -> Maybe Position -> List ( PlayerColor, Position )
killAll model maybePos =
    case maybePos of
        Just pos ->
            case pos of
                InCommonPathPosition _ _ ->
                    kill (List.filter (\( color, p ) -> p == pos && color /= model.turn) model.positions) model

                _ ->
                    model.positions

        Nothing ->
            model.positions


kill : List ( PlayerColor, Position ) -> Model -> List ( PlayerColor, Position )
kill toBeKilledList model =
    case toBeKilledList of
        [] ->
            model.positions

        posInfo :: restOfTheList ->
            let
                positionsAfterKilling =
                    case findIndex (\pInfo -> pInfo == posInfo) model.positions of
                        Nothing ->
                            model.positions

                        Just index ->
                            updateIfIndex ((==) index) (\( color, _ ) -> ( color, InStartBoxPosition (getEmptyHomePosition model.positions color) )) model.positions
            in
            kill restOfTheList { model | positions = positionsAfterKilling }


getEmptyHomePosition : List ( PlayerColor, Position ) -> PlayerColor -> Int
getEmptyHomePosition positions color =
    case List.filter (\num -> isHomePositionOccupied positions color num |> not) [ 1, 2, 3, 4 ] of
        [] ->
            0

        x :: _ ->
            x


isHomePositionOccupied : List ( PlayerColor, Position ) -> PlayerColor -> Int -> Bool
isHomePositionOccupied positions color homePosNumber =
    let
        list =
            List.filter
                (\( c, pos ) ->
                    if c /= color then
                        False

                    else
                        case pos of
                            InStartBoxPosition n ->
                                n == homePosNumber

                            _ ->
                                False
                )
                positions
    in
    case list of
        [] ->
            False

        ( _, pos ) :: _ ->
            case pos of
                InStartBoxPosition _ ->
                    True

                _ ->
                    False


moveInCommonPath : Position -> Model -> Model
moveInCommonPath clickedPosition model =
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
                    let
                        updatedPositions =
                            updateAt index (\posInfo -> move posInfo model clickedPosition) model.positions

                        maybePos =
                            getAt index updatedPositions |> Maybe.map (\( _, p ) -> p)
                    in
                    killAll { model | positions = updatedPositions } maybePos

                Nothing ->
                    model.positions
    in
    { positions = updatedPos
    , diceNum =
        0
    , turn =
        if model.diceNum == 6 || killHappened model.turn model.positions updatedPos then
            model.turn

        else
            nextTurn model.turn
    }


killHappened : PlayerColor -> List ( PlayerColor, Position ) -> List ( PlayerColor, Position ) -> Bool
killHappened color initialPos updatedPos =
    List.filter (\( c, _ ) -> c /= color) initialPos /= List.filter (\( c, _ ) -> c /= color) updatedPos


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
                findInGraph currentPosition |> Maybe.withDefault { next = InCommonPathPosition 1 None, nodeType = Regular }
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
