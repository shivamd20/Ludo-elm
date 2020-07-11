module LudoBoard exposing (main)

import Array
import Bitwise exposing (or)
import Browser
import Html exposing (Html, button, div, text)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)
import Ludo exposing (..)



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


type Orientation
    = Vertical
    | Horizontal
    | None


cell : Orientation -> Int -> Html msg
cell orientation n =
    let
        classNames =
            case orientation of
                Vertical ->
                    "w-full h-1/6"

                Horizontal ->
                    "inline-block w-1/6 h-full"

                None ->
                    "w-full h-full"
    in
    div [ class ("border text-white text-center m-auto" ++ " " ++ classNames) ] [ Html.text (String.fromInt n) ]


nodeToHorizontalCell : Orientation -> Node -> Html msg
nodeToHorizontalCell orientation node =
    let
        ( first, _, _ ) =
            node
    in
    cell orientation first


cellRow : Orientation -> Int -> Int -> List Node -> List (Html msg)
cellRow orientation start end nodeList =
    let
        slicedList =
            Array.toList (Array.slice start end (Array.fromList nodeList))
    in
    List.map
        (nodeToHorizontalCell
            orientation
        )
        slicedList



-- VIEW


gridHtml : Html msg
gridHtml =
    div [ class "grid grid-cols-15  grid-rows-15 sm:h-128 sm:w-128 gap-2  h-64 w-64 m-auto p-3 border border-red-700" ]
        [ div [ class "col-start-1 row-start-7 col-span-6 border" ] (cellRow Horizontal 0 6 ludoGraph)
        , div [ class "col-start-1 row-start-0 col-start-7 row-span-6 border" ] (List.reverse (cellRow Vertical 6 12 ludoGraph))
        , div [ class "col-start-8 row-start-1 border" ] (List.reverse (cellRow None 12 13 ludoGraph))
        , div [ class "col-start-9 row-start-1 row-span-6 border" ] (cellRow Vertical 13 19 ludoGraph)
        , div [ class "col-start-10 row-start-7 col-span-6 border" ] (cellRow Horizontal 19 25 ludoGraph)
        , div [ class "col-start-15 row-start-8 border" ] (cellRow None 25 26 ludoGraph)
        , div [ class "col-start-10 row-start-9 col-span-6 border" ] (List.reverse (cellRow Horizontal 26 32 ludoGraph))
        , div [ class "col-start-9 row-start-10 row-span-6 border" ] (cellRow Vertical 32 38 ludoGraph)
        , div [ class "col-start-8 row-start-15  border" ] (cellRow None 38 39 ludoGraph)
        , div [ class "col-start-7 row-start-10 row-span-6 border" ] (List.reverse (cellRow Vertical 39 45 ludoGraph))
        , div [ class "col-start-1 row-start-9 col-span-6 border" ] (List.reverse (cellRow Horizontal 45 51 ludoGraph))
        , div [ class "col-start-1 row-start-8  border" ] (cellRow None 51 52 ludoGraph)
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
