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
            ( let
                movable =
                    List.filter (canMove model number) model.positions
              in
              case movable of
                [] ->
                    { model
                        | diceNum = 0
                        , turn = Ludo.nextTurn model.turn
                    }

                ( _, pos ) :: [] ->
                    moveAllPositions pos { model | diceNum = number }

                _ ->
                    { model
                        | diceNum =
                            number
                        , turn =
                            model.turn
                    }
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
