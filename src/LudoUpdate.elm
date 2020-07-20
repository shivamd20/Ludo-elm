module LudoUpdate exposing (update)

import Ludo exposing (canMove, moveAllPositions, moveStartBoxPosition, nextTurn)
import LudoModel exposing (Model, Msg(..))
import Random


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GenerateRandomNumber ->
            ( model, Random.generate NewRandomNumber (Random.int 1 6) )

        NewRandomNumber number ->
            ( if model.diceNum == 0 then
                let
                    movable =
                        List.any (canMove model number) model.positions
                in
                if movable then
                    { model
                        | diceNum =
                            number
                        , turn =
                            model.turn
                    }

                else
                    { model
                        | diceNum = 0
                        , turn = Ludo.nextTurn model.turn
                    }

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
