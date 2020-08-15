module Game exposing (main)

import Browser
import Cell exposing (Orientation(..), cell)
import CommonPath exposing (commonPath)
import Dice exposing (diceDiv)
import HomeBoxes exposing (homeBoxes)
import HomeCells exposing (homeCells)
import Html exposing (Html, br, div, hr)
import Html.Attributes exposing (class)
import LudoModel exposing (Model, Msg(..), PlayerColor(..), Position(..), defaultPositions)
import LudoUpdate exposing (update)
import Ports


main : Program () Model Msg
main =
    Browser.element { init = init, update = update, view = view, subscriptions = subscriptions }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { diceNum = 0, turn = Red, positions = defaultPositions }, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Ports.diceRolledReceiver (\num -> NewRandomNumber num)


gridHtml : Model -> Html Msg
gridHtml model =
    div
        [ class "grid text-4xl text-center grid-cols-15  grid-rows-15 m-auto p-3  h-wscreen w-screen lg:h-screen lg:w-hscreen"
        ]
        (commonPath model
            ++ homeBoxes
            ++ endPath model
            ++ diceDiv model.diceNum model.turn
            :: homeCells model
        )


view : Model -> Html Msg
view model =
    div []
        [ div [ class "my-8  text-center text-white" ]
            [ gridHtml model
            , br [] []
            , br [] []
            , br [] []
            , hr [] []
            , Html.text (Debug.toString model)
            ]
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
