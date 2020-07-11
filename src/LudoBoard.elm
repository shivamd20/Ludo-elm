module LudoBoard exposing (main)

import Array
import Browser
import Html exposing (Html, button, div, text)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)
import Ludo exposing (Node, ludoGraph, move)
import Random



-- MAIN


main =
    Browser.element { init = init, update = update, view = view, subscriptions = \_ -> Sub.none }



-- MODEL


type alias Model =
    { diceNum : Int
    , position : Int
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { diceNum = 0, position = 1 }, Cmd.none )



-- UPDATE


type Msg
    = GenerateRandomNumber
    | NewRandomNumber Int


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GenerateRandomNumber ->
            ( model, Random.generate NewRandomNumber (Random.int 1 6) )

        NewRandomNumber number ->
            ( { diceNum = number, position = move model.position number }, Cmd.none )


type Orientation
    = Vertical
    | Horizontal
    | None


cell : Orientation -> Int -> Int -> Html msg
cell orientation n num =
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
    div [ class ("border text-white text-center m-auto" ++ " " ++ classNames) ]
        [ if num == n then
            Html.text "👹"

          else
            Html.text (String.fromInt n)
        ]


nodeToHorizontalCell : Orientation -> Int -> Node -> Html msg
nodeToHorizontalCell orientation num node =
    let
        ( first, _, _ ) =
            node
    in
    cell orientation first num


cellRow : Int -> Orientation -> Int -> Int -> List Node -> List (Html msg)
cellRow num orientation start end nodeList =
    let
        slicedList =
            Array.toList (Array.slice start end (Array.fromList nodeList))
    in
    List.map
        (nodeToHorizontalCell
            orientation
            num
        )
        slicedList



-- VIEW


gridHtml : Int -> Html msg
gridHtml num =
    div [ class "grid grid-cols-15  grid-rows-15 sm:h-128 sm:w-128 gap-2  h-64 w-64 m-auto p-3 border border-red-700" ]
        [ div [ class "col-start-1 row-start-7 col-span-6 border" ] (cellRow num Horizontal 0 6 ludoGraph)
        , div [ class "col-start-1 row-start-0 col-start-7 row-span-6 border" ] (List.reverse (cellRow num Vertical 6 12 ludoGraph))
        , div [ class "col-start-8 row-start-1 border" ] (List.reverse (cellRow num None 12 13 ludoGraph))
        , div [ class "col-start-9 row-start-1 row-span-6 border" ] (cellRow num Vertical 13 19 ludoGraph)
        , div [ class "col-start-10 row-start-7 col-span-6 border" ] (cellRow num Horizontal 19 25 ludoGraph)
        , div [ class "col-start-15 row-start-8 border" ] (cellRow num None 25 26 ludoGraph)
        , div [ class "col-start-10 row-start-9 col-span-6 border" ] (List.reverse (cellRow num Horizontal 26 32 ludoGraph))
        , div [ class "col-start-9 row-start-10 row-span-6 border" ] (cellRow num Vertical 32 38 ludoGraph)
        , div [ class "col-start-8 row-start-15  border" ] (cellRow num None 38 39 ludoGraph)
        , div [ class "col-start-7 row-start-10 row-span-6 border" ] (List.reverse (cellRow num Vertical 39 45 ludoGraph))
        , div [ class "col-start-1 row-start-9 col-span-6 border" ] (List.reverse (cellRow num Horizontal 45 51 ludoGraph))
        , div [ class "col-start-1 row-start-8  border" ] (cellRow num None 51 52 ludoGraph)
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
            [ button [ class "border p-2 m-2", onClick GenerateRandomNumber ] [ text "roll" ]
            , div [] [ text (String.fromInt model.diceNum) ]
            , gridHtml model.position
            ]
        ]
