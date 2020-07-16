module LudoModel exposing (Model, Msg(..), PlayerColor(..), Positions, defaultPositions)


type alias Model =
    { diceNum : Int
    , position : Int
    , turn : PlayerColor
    , positions : Positions
    }


type alias Positions =
    List ( PlayerColor, List Int )


defaultPositions : Positions
defaultPositions =
    [ ( Red, [ 2 ] ), ( Green, [] ), ( Blue, [] ), ( Yellow, [] ) ]


type PlayerColor
    = Red
    | Green
    | Blue
    | Yellow


type Msg
    = GenerateRandomNumber
    | NewRandomNumber Int
    | MoveCoin Int
