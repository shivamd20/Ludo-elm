module LudoModel exposing (Model, Msg(..), PlayerColor(..), Position(..), defaultPositions)


type alias Model =
    { diceNum : Int
    , positions : List ( PlayerColor, List Position )
    , position : Position
    , turn : PlayerColor
    }


defaultPositions : List ( PlayerColor, List Position )
defaultPositions =
    [ ( Red, [ InCommonPathPosition 2 ] ), ( Green, [] ), ( Blue, [] ), ( Yellow, [] ) ]


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
