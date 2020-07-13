module LudoModel exposing (Model, Msg(..), PlayerColor(..))


type alias Model =
    { diceNum : Int
    , position : Int
    , turn : PlayerColor
    }


type PlayerColor
    = Red
    | Green
    | Blue
    | Yellow


type Msg
    = GenerateRandomNumber
    | NewRandomNumber Int
    | MoveCoin Int
