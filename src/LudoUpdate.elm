module LudoUpdate exposing (Model, Msg(..), update)

import Ludo exposing (PlayerColor, move)
import Random


type Msg
    = GenerateRandomNumber
    | NewRandomNumber Int
    | MoveCoin Int


type alias Model =
    { diceNum : Int
    , position : Int
    , turn : PlayerColor
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GenerateRandomNumber ->
            ( model, Random.generate NewRandomNumber (Random.int 1 6) )

        NewRandomNumber number ->
            ( if model.diceNum == 0 then
                { model | diceNum = number }

              else
                model
            , Cmd.none
            )

        MoveCoin position ->
            if position == model.position && model.diceNum /= 0 then
                ( { diceNum = 0
                  , position = move model.position model.diceNum
                  , turn =
                        if model.diceNum /= 6 then
                            Ludo.nextTurn model.turn

                        else
                            model.turn
                  }
                , Cmd.none
                )

            else
                ( model, Cmd.none )
