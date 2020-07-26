module Ludo exposing (canMove, commonPathList, findCoinsAtCoinPosition, moveAllType, nextTurn)

import Dict exposing (Dict)
import List.Extra exposing (findIndex, getAt, updateAt, updateIfIndex)
import LudoModel exposing (CommonPathPosition(..), Model, PlayerColor(..), Position(..))


redStartPosition : Position
redStartPosition =
    InCommonPathPosition 2 (PathStart Red)


blueStartPosition : Position
blueStartPosition =
    InCommonPathPosition 42 (PathStart Blue)


greenStartPosition : Position
greenStartPosition =
    InCommonPathPosition 15 (LudoModel.PathStart Green)


yellowStartPosition : Position
yellowStartPosition =
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
                    node
        )
        (Dict.keys ludoGraph)


ludoGraph : Dict Int Position
ludoGraph =
    Dict.fromList
        [ ( 1, redStartPosition )
        , ( 2, InCommonPathPosition 3 None )
        , ( 3, InCommonPathPosition 4 None )
        , ( 4, InCommonPathPosition 5 None )
        , ( 5, InCommonPathPosition 6 None )
        , ( 6, InCommonPathPosition 7 None )
        , ( 7, InCommonPathPosition 8 None )
        , ( 8, InCommonPathPosition 9 None )
        , ( 9, InCommonPathPosition 10 PathStar )
        , ( 10, InCommonPathPosition 11 None )
        , ( 11, InCommonPathPosition 12 None )
        , ( 12, InCommonPathPosition 13 None )
        , ( 13, InCommonPathPosition 14 None )
        , ( 14, greenStartPosition )
        , ( 15, InCommonPathPosition 16 None )
        , ( 16, InCommonPathPosition 17 None )
        , ( 17, InCommonPathPosition 18 None )
        , ( 18, InCommonPathPosition 19 None )
        , ( 19, InCommonPathPosition 20 None )
        , ( 20, InCommonPathPosition 21 None )
        , ( 21, InCommonPathPosition 22 None )
        , ( 22, InCommonPathPosition 23 PathStar )
        , ( 23, InCommonPathPosition 24 None )
        , ( 24, InCommonPathPosition 25 None )
        , ( 25, InCommonPathPosition 26 None )
        , ( 26, InCommonPathPosition 27 None )
        , ( 27, yellowStartPosition )
        , ( 28, InCommonPathPosition 29 None )
        , ( 29, InCommonPathPosition 30 None )
        , ( 30, InCommonPathPosition 31 None )
        , ( 31, InCommonPathPosition 32 None )
        , ( 32, InCommonPathPosition 33 None )
        , ( 33, InCommonPathPosition 34 None )
        , ( 34, InCommonPathPosition 35 None )
        , ( 35, InCommonPathPosition 36 PathStar )
        , ( 36, InCommonPathPosition 37 None )
        , ( 37, InCommonPathPosition 38 None )
        , ( 38, InCommonPathPosition 39 None )
        , ( 39, InCommonPathPosition 40 None )
        , ( 40, blueStartPosition )
        , ( 41, InCommonPathPosition 42 None )
        , ( 42, InCommonPathPosition 43 None )
        , ( 43, InCommonPathPosition 44 None )
        , ( 44, InCommonPathPosition 45 None )
        , ( 45, InCommonPathPosition 46 None )
        , ( 46, InCommonPathPosition 47 None )
        , ( 47, InCommonPathPosition 48 None )
        , ( 48, InCommonPathPosition 49 PathStar )
        , ( 49, InCommonPathPosition 50 None )
        , ( 50, InCommonPathPosition 51 None )
        , ( 51, InCommonPathPosition 52 None )
        , ( 52, InCommonPathPosition 1 None )
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


findInGraph : Position -> Maybe Position
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
            redStartPosition

        Green ->
            greenStartPosition

        Blue ->
            blueStartPosition

        Yellow ->
            yellowStartPosition


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
                findInGraph currentPosition |> Maybe.withDefault (InCommonPathPosition 1 None)
        in
        move
            ( color, node )
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
