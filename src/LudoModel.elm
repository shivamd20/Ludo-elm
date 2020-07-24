module LudoModel exposing (Model, Msg(..), PlayerColor(..), Position(..), defaultPositions)


type alias Model =
    { diceNum : Int
    , positions : List ( PlayerColor, Position )
    , turn : PlayerColor
    }


defaultPositions : List ( PlayerColor, Position )
defaultPositions =
    [ ( Red, InCommonPathPosition 1 )
    , ( Red, InStartBoxPosition 2 )
    , ( Red, InStartBoxPosition 3 )
    , ( Red, InStartBoxPosition 4 )
    , ( Green, InCommonPathPosition 2 )
    , ( Green, InCommonPathPosition 3 )
    , ( Green, InCommonPathPosition 4 )
    , ( Green, InCommonPathPosition 5 )
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
    | HomeCoinClicked Int


type Position
    = InCommonPathPosition Int
    | InStartBoxPosition Int
