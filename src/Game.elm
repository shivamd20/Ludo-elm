module Game exposing (main)

import Browser
import CommonPath exposing (commonPath)
import Dice exposing (diceDiv)
import HomeBoxes exposing (homeBoxes)
import HomeCells exposing (homeCells)
import Html exposing (Html, br, div, hr)
import Html.Attributes exposing (class)
import Ludo exposing (NodeType(..))
import LudoModel exposing (Model, Msg(..), PlayerColor(..), Position(..), defaultPositions)
import LudoUpdate exposing (update)


main : Program () Model Msg
main =
    Browser.element { init = init, update = update, view = view, subscriptions = \_ -> Sub.none }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { diceNum = 0, turn = Red, positions = defaultPositions }, Cmd.none )


gridHtml : Model -> Html Msg
gridHtml model =
    div [ class "grid text-xl text-center grid-cols-15  grid-rows-15 sm:h-128 sm:w-128 gap-2 h-64 w-64 m-auto p-3 border border-gray-700" ]
        (commonPath model
            ++ homeBoxes
            ++ diceDiv model.diceNum model.turn
            :: homeCells model
        )


view : Model -> Html Msg
view model =
    div []
        [ div [ class "my-8 w-full text-center text-white" ]
            [ gridHtml model
            , br [] []
            , br [] []
            , br [] []
            , hr [] []
            , Html.text (Debug.toString model)
            ]
        ]
