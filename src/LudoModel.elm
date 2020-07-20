module LudoModel exposing (Model, Msg(..), PlayerColor(..), Position(..), defaultPositions)

import Array exposing (Array)


type alias Model =
    { diceNum : Int
    , positions : Array ( PlayerColor, Position )
    , turn : PlayerColor
    }


defaultPositions : Array ( PlayerColor, Position )
defaultPositions =
    Array.fromList
        [ ( Red, InStartBoxPosition 1 )
        , ( Red, InStartBoxPosition 2 )
        , ( Red, InStartBoxPosition 3 )
        , ( Red, InStartBoxPosition 4 )
        , ( Green, InStartBoxPosition 1 )
        , ( Green, InStartBoxPosition 2 )
        , ( Green, InStartBoxPosition 3 )
        , ( Green, InStartBoxPosition 4 )
        , ( Yellow, InStartBoxPosition 1 )
        , ( Yellow, InStartBoxPosition 2 )
        , ( Yellow, InStartBoxPosition 3 )
        , ( Yellow, InStartBoxPosition 4 )
        , ( Blue, InStartBoxPosition 1 )
        , ( Blue, InStartBoxPosition 2 )
        , ( Blue, InStartBoxPosition 3 )
        , ( Blue, InStartBoxPosition 4 )
        ]


type PlayerColor
    = Red
    | Green
    | Blue
    | Yellow


type Msg
    = GenerateRandomNumber
    | NewRandomNumber Int
    | MoveCoin Position
    | HomeCoinClicked PlayerColor Int


type Position
    = InCommonPathPosition Int
    | InStartBoxPosition Int
