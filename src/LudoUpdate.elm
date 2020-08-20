module LudoUpdate exposing (update)

import List.Extra exposing (getAt)
import Ludo exposing (canMove, moveAllType, nextTurn)
import LudoModel exposing (Model, Msg(..), PlayerColor(..), Position(..))
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
                        , turn = Ludo.nextTurn model model.turn
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

        MakeMove clickedPosition ->
            ( model, Ports.movePosCoins clickedPosition )

        RollDice ->
            ( model, Ports.rollDice () )

        RoomToBeJoinedChanged string ->
            ( { model | roomToJoin = string }, Cmd.none )

        MaxPlayersChanged string ->
            ( { model
                | maxPlayers =
                    let
                        maybeNum =
                            String.toInt string
                    in
                    case maybeNum of
                        Nothing ->
                            Nothing

                        Just num ->
                            if num > 1 && num < 5 then
                                Just num

                            else
                                Nothing
              }
            , Cmd.none
            )

        OnRoomJoinClicked ->
            ( model, Ports.joinGame model.roomToJoin )

        OnStartGameClicked ->
            ( model, Ports.createNewGame (Maybe.withDefault 2 model.maxPlayers) )

        UpdateMessage m ->
            ( { model | messageToDisplay = m }, Cmd.none )

        UpdateRoom room order maxPlayers ->
            let
                modelWithUpdatedParticipants =
                    { model | participants = getParticipantsByMaxPlayers maxPlayers }

                updatedModel =
                    { modelWithUpdatedParticipants | room = Just room, selectedPlayer = orderToPlayerColor modelWithUpdatedParticipants (order - 1) }
            in
            ( { updatedModel
                | positions =
                    List.filter
                        (\( color, _ ) ->
                            List.filter (\c -> c == color) updatedModel.participants /= []
                        )
                        updatedModel.positions
              }
            , Cmd.none
            )


getParticipantsByMaxPlayers : Int -> List PlayerColor
getParticipantsByMaxPlayers maxPlayers =
    case maxPlayers of
        2 ->
            [ Red, Yellow ]

        3 ->
            [ Red, Green, Yellow ]

        _ ->
            [ Red, Green, Yellow, Blue ]


orderToPlayerColor : Model -> Int -> PlayerColor
orderToPlayerColor model order =
    Maybe.withDefault Red (getAt order model.participants)
