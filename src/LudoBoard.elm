module LudoBoard exposing (main)

import Browser
import Html exposing (Html, button, div, text)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)



-- MAIN


main =
    Browser.sandbox { init = init, update = update, view = view }



-- MODEL


type alias Model =
    Int


init : Model
init =
    0



-- UPDATE


type Msg
    = Increment
    | Decrement


update : Msg -> Model -> Model
update msg model =
    case msg of
        Increment ->
            model + 1

        Decrement ->
            model - 1



-- VIEW


gridHtml : Html msg
gridHtml =
    div [ class "grid grid-cols-15  grid-rows-15 sm:h-128 sm:w-128 gap-2  h-64 w-64 m-auto p-3 border border-red-700" ]
        [ div [ class "col-start-1 row-start-7 col-span-6 border" ] []
        , div [ class "col-start-1 row-start-0 col-start-7 row-span-6 border" ] []
        , div [ class "col-start-1 row-start-7 col-span-6 border" ] []
        , div [ class "col-start-8 row-start-1 border" ] []
        , div [ class "col-start-9 row-start-1 row-span-6 border" ] []
        , div [ class "col-start-10 row-start-7 col-span-6 border" ] []
        , div [ class "col-start-15 row-start-8 border" ] []
        , div [ class "col-start-10 row-start-9 col-span-6 border" ] []
        , div [ class "col-start-9 row-start-10 row-span-6 border" ] []
        , div [ class "col-start-8 row-start-15  border" ] []
        , div [ class "col-start-7 row-start-10 row-span-6 border" ] []
        , div [ class "col-start-1 row-start-9 col-span-6 border" ] []
        , div [ class "col-start-1 row-start-1 border row-span-6 border-red-500 col-span-6" ] []
        , div [ class "col-start-10 row-start-1 border row-span-6 border-green-500 col-span-6" ] []
        , div [ class "col-start-1 row-start-10 border row-span-6 border-blue-500 col-span-6" ] []
        , div [ class "col-start-10 row-start-10 border row-span-6 border-yellow-500  col-span-6" ] []
        , div [ class "col-start-7 row-start-7 border row-span-3 border-gray-500  col-span-3" ] []
        ]


view : Model -> Html Msg
view model =
    div []
        [ div [ class "w-full text-center text-white" ]
            [ button [ class "border p-2 m-2", onClick Decrement ] [ text "-" ]
            , div [] [ text (String.fromInt model) ]
            , button [ onClick Increment ] [ text "+" ]
            , gridHtml
            ]
        ]
