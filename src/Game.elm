module Game exposing (main)

import Browser
import Cell exposing (Orientation(..), cell)
import CommonPath exposing (commonPath)
import Dice exposing (diceDiv)
import HomeBoxes exposing (homeBoxes)
import HomeCells exposing (homeCells)
import Html exposing (Html, br, button, div, input)
import Html.Attributes exposing (class, disabled, placeholder, type_, value)
import Html.Events exposing (onClick, onInput)
import LudoModel exposing (Model, Msg(..), PlayerColor(..), Position(..), defaultPositions)
import LudoUpdate exposing (update)
import Ports


main : Program () Model Msg
main =
    Browser.element { init = init, update = update, view = view, subscriptions = subscriptions }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { diceNum = 0
      , turn = Red
      , positions = defaultPositions
      , maxPlayers = Just 2
      , room = Nothing
      , roomToJoin = ""
      , messageToDisplay = ""
      , selectedPlayer = Red
      , participants = [ Red, Green, Yellow, Blue ]
      }
    , Cmd.none
    )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Ports.diceRolledReceiver (\num -> NewRandomNumber num)
        , Ports.moveCoinsPosReceiver (\pos -> MoveCoin pos)
        , Ports.errorReceiver (\m -> UpdateMessage m)
        , Ports.joinGameReceiver (\( room, order, maxPlayers ) -> UpdateRoom room order maxPlayers)
        , Ports.newGameReceiver (\room -> UpdateRoom room 1 (Maybe.withDefault 2 model.maxPlayers))
        ]


gridHtml : Model -> Html Msg
gridHtml model =
    div
        [ class "grid  text-center  grid-cols-15  grid-rows-15 m-auto p-3  h-wscreen w-screen lg:h-screen lg:w-hscreen"
        ]
        (commonPath model
            ++ homeBoxes
            ++ endPath model
            ++ diceDiv model
            :: homeCells model
        )


view : Model -> Html Msg
view model =
    div []
        [ div [] [ Html.text model.messageToDisplay ]
        , case model.room of
            Just _ ->
                div []
                    [ div [ class "my-8  text-center text-white" ]
                        [ gridHtml model
                        , Html.text ("Room:  " ++ Maybe.withDefault "" model.room)
                        , br [] []
                        , Html.text ("turn: " ++ turnToString model.turn)
                        , br [] []
                        , Html.text ("me :" ++ turnToString model.selectedPlayer)
                        ]
                    ]

            Nothing ->
                gameStartView model
        ]


turnToString : PlayerColor -> String
turnToString color =
    case color of
        Red ->
            "Red"

        Green ->
            "Green"

        Blue ->
            "Blue"

        Yellow ->
            "Yellow"


gameStartView : Model -> Html Msg
gameStartView model =
    div [ class " w-10 w-full text-xs " ]
        [ input
            [ class "mx-10 my-3 mt-10 shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            , type_ "number"
            , onInput MaxPlayersChanged
            , placeholder "Number of Players"
            , value
                (case model.maxPlayers of
                    Nothing ->
                        ""

                    Just str ->
                        String.fromInt str
                )
            ]
            []
        , button
            [ disabled (model.maxPlayers == Nothing)
            , onClick LudoModel.OnStartGameClicked
            , class "disabled:opacity-75 mx-10 my-3 mb-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            ]
            [ Html.text "Start New Game" ]
        , br [] []
        , input
            [ class "mx-10 my-3 p-5  shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            , placeholder "Room Name To Join"
            , onInput RoomToBeJoinedChanged
            , value model.roomToJoin
            ]
            []
        , button
            [ class " disabled:opacity-75 mx-10 my-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            , onClick OnRoomJoinClicked
            , disabled (model.roomToJoin == "")
            ]
            [ Html.text "Join Game" ]
        ]


endPath : Model -> List (Html Msg)
endPath model =
    [ div [ class " rounded-lg col-start-2 row-start-8 col-span-6 border-red-500 border-t border-b" ]
        ([ 1, 2, 3, 4, 5, 6 ]
            |> List.map (\b -> cell Horizontal (InHomePathPosition Red b) model)
        )
    , div [ class " rounded-lg col-start-8 row-start-2 row-span-6  border-green-500 border-l border-r" ]
        ([ 1, 2, 3, 4, 5, 6 ]
            |> List.map (\b -> cell Vertical (InHomePathPosition Green b) model)
        )
    , div [ class " rounded-lg col-start-9 row-start-8 col-span-6 border-yellow-500 border-t border-b" ]
        ([ 6, 5, 4, 3, 2, 1 ]
            |> List.map (\b -> cell Horizontal (InHomePathPosition Yellow b) model)
        )
    , div [ class " rounded-lg col-start-8 row-start-9 row-span-6 border-blue-500 border-l border-r" ]
        ([ 6, 5, 4, 3, 2, 1 ]
            |> List.map (\b -> cell Vertical (InHomePathPosition Blue b) model)
        )
    ]
