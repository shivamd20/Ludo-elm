module LudoModel exposing (Model, Msg(..), PlayerColor(..), Position(..), defaultPositions)


type alias Model =
    { diceNum : Int
    , positions : List ( PlayerColor, Position )
    , turn : PlayerColor
    }


defaultPositions : List ( PlayerColor, Position )
defaultPositions =
    [ ( Red, InCommonPathPosition 2 )
    , ( Green, InCommonPathPosition 15 )
    , ( Yellow, InCommonPathPosition 28 )
    , ( Blue, InCommonPathPosition 41 )
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


type Position
    = InCommonPathPosition Int
    | InStartBoxPosition Int
