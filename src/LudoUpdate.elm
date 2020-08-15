module LudoUpdate exposing (update)

import Ludo exposing (canMove, moveAllType, nextTurn)
import LudoModel exposing (Model, Msg(..), Position(..))
import Ports


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NewRandomNumber number ->
            ( let
                movable =
                    List.filter (canMove { model | diceNum = number }) model.positions
              in
              case movable of
                [] ->
                    { model
                        | diceNum = 0
                        , turn = Ludo.nextTurn model.turn
                    }

                ( _, pos ) :: [] ->
                    moveAllType { model | diceNum = number } pos

                list ->
                    if
                        List.all
                            (\( _, pos ) ->
                                case pos of
                                    InStartBoxPosition _ ->
                                        True

                                    _ ->
                                        False
                            )
                            list
                    then
                        case List.head list of
                            Just ( _, pos ) ->
                                moveAllType model pos

                            Nothing ->
                                model

                    else
                        { model
                            | diceNum =
                                number
                            , turn =
                                model.turn
                        }
            , Cmd.none
            )

        MoveCoin clickedPosition ->
            ( moveAllType model clickedPosition
            , Cmd.none
            )

        RollDice ->
            ( model, Ports.rollDice () )
