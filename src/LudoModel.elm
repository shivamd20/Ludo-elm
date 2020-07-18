module LudoModel exposing (Model, Msg(..), PlayerColor(..), Position(..), Positions, defaultPositions)


type alias Model =
    { diceNum : Int
    , positions : Positions
    , position : Position
    , turn : PlayerColor
    }


type alias Positions =
    List ( PlayerColor, List Position )


defaultPositions : Positions
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
