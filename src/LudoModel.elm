module LudoModel exposing (Model, Msg(..), PlayerColor(..), Position(..), Positions, defaultPositions)


type alias Model =
    { diceNum : Int
    , position : Position
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
    | MoveCoin Position


type Position
    = InCommonPathPosition Int
    | InStartBoxPosition Int
