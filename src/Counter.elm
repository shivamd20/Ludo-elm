module Counter exposing (main)

import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)


type alias Model =
    Int


initialModel : Model
initialModel =
    0


view : Model -> Html Msg
view model =
    div []
        [ button [ onClick Incr ]
            [ text "-" ]
        , text
            (String.fromInt model)
        , button [ onClick Decr ]
            [ text "+"
            ]
        ]


type Msg
    = Incr
    | Decr


update : Msg -> Model -> Model
update msg model =
    case msg of
        Incr ->
            model + 1

        Decr ->
            model - 1


main : Program () Model Msg
main =
    Browser.sandbox { init = initialModel, view = view, update = update }
