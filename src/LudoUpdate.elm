module LudoUpdate exposing (update)

import Ludo exposing (moveAllPositions, moveStartBoxPosition)
import LudoModel exposing (Model, Msg(..))
import Random


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

        MoveCoin clickedPosition ->
            ( moveAllPositions clickedPosition model
            , Cmd.none
            )

        HomeCoinClicked color num ->
            ( moveStartBoxPosition model color num
            , Cmd.none
            )
