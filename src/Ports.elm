port module Ports exposing (createNewGame, diceRolledReceiver, errorReceiver, joinGame, joinGameReceiver, moveCoinsPosReceiver, movePosCoins, newGameReceiver, rollDice)

import LudoModel exposing (CommonPathPosition(..), Msg(..), PlayerColor(..), Position(..))


port rollDice : () -> Cmd msg


port diceRolledReceiver : (Int -> msg) -> Sub msg


port moveCoins : ( Int, Int, Int ) -> Cmd msg


port moveCoinsReceiver : (( Int, Int, Int ) -> msg) -> Sub msg


port joinGame : String -> Cmd msg


port joinGameReceiver : (( String, Int, Int ) -> msg) -> Sub msg


port createNewGame : Int -> Cmd msg


port newGameReceiver : (String -> msg) -> Sub msg


port errorReceiver : (String -> msg) -> Sub msg


moveCoinsPosReceiver : (Position -> msg) -> Sub msg
moveCoinsPosReceiver fn =
    moveCoinsReceiver (\tuple -> fn (tupleToPosition tuple))


movePosCoins : Position -> Cmd msg
movePosCoins pos =
    moveCoins (positionToTuple pos)


positionToTuple : Position -> ( Int, Int, Int )
positionToTuple pos =
    case pos of
        InCommonPathPosition n cPath ->
            ( 1, n, commonPathToInteger cPath )

        InStartBoxPosition n ->
            ( 2, n, 0 )

        InHomePathPosition playercolor n ->
            ( 3
            , case playercolor of
                Red ->
                    1

                Blue ->
                    2

                Green ->
                    3

                Yellow ->
                    4
            , n
            )


commonPathToInteger : CommonPathPosition -> Basics.Int
commonPathToInteger commonPath =
    case commonPath of
        PathStar ->
            1

        PathStart color ->
            case color of
                Red ->
                    2

                Green ->
                    3

                Blue ->
                    4

                Yellow ->
                    5

        PathEnd color ->
            case color of
                Red ->
                    6

                Green ->
                    7

                Blue ->
                    8

                Yellow ->
                    9

        None ->
            10


tupleToPosition : ( Int, Int, Int ) -> Position
tupleToPosition ( x, y, z ) =
    case x of
        1 ->
            InCommonPathPosition y (integerToCommonPath z)

        2 ->
            InStartBoxPosition y

        3 ->
            InHomePathPosition
                (case y of
                    1 ->
                        Red

                    2 ->
                        Blue

                    3 ->
                        Green

                    4 ->
                        Yellow

                    _ ->
                        Red
                )
                z

        _ ->
            InStartBoxPosition 5


integerToCommonPath : Int -> CommonPathPosition
integerToCommonPath n =
    case n of
        1 ->
            PathStar

        2 ->
            PathStart Red

        3 ->
            PathStart Green

        4 ->
            PathStart Blue

        5 ->
            PathStart Yellow

        6 ->
            PathEnd Red

        7 ->
            PathEnd Green

        8 ->
            PathEnd Blue

        9 ->
            PathEnd Yellow

        10 ->
            None

        _ ->
            None
