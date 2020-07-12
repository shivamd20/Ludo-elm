module LudoBoard exposing (main)

import Array
import Browser
import Debug
import Dict exposing (Dict)
import Html exposing (Html, button, div, text)
import Html.Attributes exposing (class, disabled, hidden)
import Html.Events exposing (onClick)
import Ludo exposing (Node, ludoGraph, move)
import Random



-- MAIN


main =
    Browser.element { init = init, update = update, view = view, subscriptions = \_ -> Sub.none }



-- MODEL


type Color
    = Red
    | Greeen
    | Blue
    | Yellow


type alias GameState =
    { turn : Color
    , diceNum : Int
    , redPos : List Int
    , bluePos : List Int
    , greenPos : List Int
    , yellowPos : List Int
    }


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
    | MoveCoin Int


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GenerateRandomNumber ->
            ( model, Random.generate NewRandomNumber (Random.int 1 6) )

        NewRandomNumber number ->
            ( { diceNum = number, position = model.position }, Cmd.none )

        MoveCoin position ->
            if position == model.position then
                ( { diceNum = 0, position = move model.position model.diceNum }, Cmd.none )

            else
                ( model, Cmd.none )


type Orientation
    = Vertical
    | Horizontal
    | None


cell : Orientation -> Int -> Int -> Html Msg
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
    div [ class ("border text-white text-center m-auto" ++ " " ++ classNames), onClick (MoveCoin n) ]
        [ if num == n then
            Html.text "👹"

          else
            Html.text (String.fromInt n)
        ]


nodeToHorizontalCell : Orientation -> Int -> Int -> Html Msg
nodeToHorizontalCell orientation num node =
    cell orientation node num


cellRow : Int -> Orientation -> Int -> Int -> Dict Int Node -> List (Html Msg)
cellRow num orientation start end nodeList =
    let
        slicedList =
            Array.fromList (Dict.keys nodeList) |> Array.slice start end |> Array.toList
    in
    slicedList
        |> List.map
            (num
                |> nodeToHorizontalCell
                    orientation
            )



-- VIEW


gridHtml : Model -> Html Msg
gridHtml model =
    let
        num =
            model.position
    in
    div [ class "grid grid-cols-15  grid-rows-15 sm:h-128 sm:w-128 gap-2  h-64 w-64 m-auto p-3 border border-gray-700" ]
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
        , button [ class "col-start-3 row-start-3 col-span-2 row-span-2 border p-2 m-2", onClick GenerateRandomNumber ]
            [ text <|
                if model.diceNum == 0 then
                    "roll"

                else
                    String.fromInt model.diceNum
            ]
        ]


view : Model -> Html Msg
view model =
    div []
        [ div [ class "my-8 w-full text-center text-white" ]
            [ gridHtml model
            ]
        ]
