module Game exposing (main)

import Browser
import CommonPath exposing (commonPath)
import Dice exposing (diceDiv)
import HomeBoxes exposing (homeBoxes)
import Html exposing (Html, div)
import Html.Attributes exposing (class)
import Ludo exposing (NodeType(..))
import LudoModel exposing (Model, Msg(..), PlayerColor(..))
import LudoUpdate exposing (update)


main : Program () Model Msg
main =
    Browser.element { init = init, update = update, view = view, subscriptions = \_ -> Sub.none }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { diceNum = 0, position = 2, turn = Red }, Cmd.none )


gridHtml : Model -> Html Msg
gridHtml model =
    div [ class "grid grid-cols-15  grid-rows-15 sm:h-128 sm:w-128 gap-2 h-64 w-64 m-auto p-3 border border-gray-700" ]
        (commonPath model
            ++ homeBoxes
            ++ [ diceDiv model.diceNum model.turn
               ]
            ++ redHomeCells
            ++ greenHomeCells
            ++ yellowHomeCells
            ++ blueHomeCells
        )


view : Model -> Html Msg
view model =
    div []
        [ div [ class "my-8 w-full text-center text-white" ]
            [ gridHtml model
            ]
        ]


redHomeCells : List (Html Msg)
redHomeCells =
    [ div [ class "rounded-full col-start-2 row-start-2  bg-red-500" ] []
    , div [ class "rounded-full col-start-5 row-start-2  bg-red-500" ] []
    , div [ class "rounded-full col-start-5 row-start-5  bg-red-500" ] []
    , div [ class "rounded-full col-start-2 row-start-5  bg-red-500" ] []
    ]


greenHomeCells : List (Html Msg)
greenHomeCells =
    [ div [ class "rounded-full col-start-11 row-start-2  bg-green-500" ] []
    , div [ class "rounded-full col-start-14 row-start-2  bg-green-500" ] []
    , div [ class "rounded-full col-start-14 row-start-5  bg-green-500" ] []
    , div [ class "rounded-full col-start-11 row-start-5  bg-green-500" ] []
    ]


yellowHomeCells : List (Html Msg)
yellowHomeCells =
    [ div [ class "rounded-full col-start-11 row-start-11  bg-yellow-500" ] []
    , div [ class "rounded-full col-start-14 row-start-11  bg-yellow-500" ] []
    , div [ class "rounded-full col-start-14 row-start-14  bg-yellow-500" ] []
    , div [ class "rounded-full col-start-11 row-start-14  bg-yellow-500" ] []
    ]


blueHomeCells : List (Html Msg)
blueHomeCells =
    [ div [ class "rounded-full col-start-2 row-start-11  bg-blue-500" ] []
    , div [ class "rounded-full col-start-5 row-start-11  bg-blue-500" ] []
    , div [ class "rounded-full col-start-5 row-start-14  bg-blue-500" ] []
    , div [ class "rounded-full col-start-2 row-start-14  bg-blue-500" ] []
    ]
