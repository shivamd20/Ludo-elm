module LudoBoard exposing (main)

import Array
import Browser
import Cell exposing (Orientation(..), cell)
import Dict exposing (Dict)
import Html exposing (Html, button, div, text)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)
import Ludo exposing (Node, NodeType(..), PlayerColor(..), ludoGraph)
import LudoUpdate exposing (Model, Msg(..), update)



-- MAIN


main =
    Browser.element { init = init, update = update, view = view, subscriptions = \_ -> Sub.none }



-- MODEL


init : () -> ( Model, Cmd Msg )
init _ =
    ( { diceNum = 0, position = 2, turn = Red }, Cmd.none )



-- UPDATE


nodeToHorizontalCell : Orientation -> Int -> Dict Int Node -> Int -> Html Msg
nodeToHorizontalCell orientation diceNum nodeDict positionNumber =
    cell orientation positionNumber diceNum (Maybe.withDefault Regular (Maybe.map (\node -> node.nodeType) (Dict.get positionNumber nodeDict)))


cellRow : Int -> Orientation -> Int -> Int -> Dict Int Node -> List (Html Msg)
cellRow num orientation start end nodeDict =
    let
        slicedList =
            Array.fromList (Dict.keys nodeDict) |> Array.slice start end |> Array.toList
    in
    slicedList
        |> List.map
            (nodeToHorizontalCell
                orientation
                num
                nodeDict
            )



-- VIEW


diceDiv : Int -> PlayerColor -> Html Msg
diceDiv diceNum turn =
    let
        positionClass =
            case turn of
                Red ->
                    "col-start-3 row-start-3"

                Blue ->
                    "col-start-3 row-start-12"

                Green ->
                    "col-start-12 row-start-3"

                Yellow ->
                    "col-start-12 row-start-12"
    in
    button [ class ("rounded-full hover:bg-gray-600 focus:outline-none focus:shadow-outline col-span-2 row-span-2 border p-2 m-2 " ++ positionClass), onClick GenerateRandomNumber ]
        [ text <|
            if diceNum == 0 then
                "roll"

            else
                String.fromInt diceNum
        ]


gridHtml : Model -> Html Msg
gridHtml model =
    div [ class "grid grid-cols-15  grid-rows-15 sm:h-128 sm:w-128 gap-2  h-64 w-64 m-auto p-3 border border-gray-700" ]
        (commonPath model
            ++ colorHomeBoxes
            ++ redHomeCells
            ++ greenHomeCells
            ++ yellowHomeCells
            ++ blueHomeCells
            ++ [ diceDiv model.diceNum model.turn
               ]
        )


view : Model -> Html Msg
view model =
    div []
        [ div [ class "my-8 w-full text-center text-white" ]
            [ gridHtml model
            ]
        ]


commonPath : Model -> List (Html Msg)
commonPath model =
    let
        num =
            model.position
    in
    [ div [ class "col-start-1 row-start-7 col-span-6 " ] (cellRow num Horizontal 0 6 ludoGraph)
    , div [ class "col-start-1 row-start-0 col-start-7 row-span-6 " ] (List.reverse (cellRow num Vertical 6 12 ludoGraph))
    , div [ class "col-start-8 row-start-1 " ] (List.reverse (cellRow num None 12 13 ludoGraph))
    , div [ class "col-start-9 row-start-1 row-span-6 " ] (cellRow num Vertical 13 19 ludoGraph)
    , div [ class "col-start-10 row-start-7 col-span-6 " ] (cellRow num Horizontal 19 25 ludoGraph)
    , div [ class "col-start-15 row-start-8 " ] (cellRow num None 25 26 ludoGraph)
    , div [ class "col-start-10 row-start-9 col-span-6 " ] (List.reverse (cellRow num Horizontal 26 32 ludoGraph))
    , div [ class "col-start-9 row-start-10 row-span-6 " ] (cellRow num Vertical 32 38 ludoGraph)
    , div [ class "col-start-8 row-start-15  " ] (cellRow num None 38 39 ludoGraph)
    , div [ class "col-start-7 row-start-10 row-span-6 " ] (List.reverse (cellRow num Vertical 39 45 ludoGraph))
    , div [ class "col-start-1 row-start-9 col-span-6 " ] (List.reverse (cellRow num Horizontal 45 51 ludoGraph))
    , div [ class "col-start-1 row-start-8  " ] (cellRow num None 51 52 ludoGraph)
    ]


colorHomeBoxes : List (Html Msg)
colorHomeBoxes =
    [ div [ class "col-start-1 row-start-1 border row-span-6 border-red-500 col-span-6" ] []
    , div [ class "col-start-10 row-start-1 border row-span-6 border-green-500 col-span-6" ] []
    , div [ class "col-start-1 row-start-10 border row-span-6 border-blue-500 col-span-6" ] []
    , div [ class "col-start-10 row-start-10 border row-span-6 border-yellow-500  col-span-6" ] []
    , div [ class "col-start-7 row-start-7 border row-span-3 border-gray-500  col-span-3" ] []
    ]


redHomeCells : List (Html Msg)
redHomeCells =
    [ homeCell "col-start-1 row-start-1" Red
    , homeCell "col-start-4 row-start-1" Red
    , homeCell "col-start-1 row-start-4" Red
    , homeCell "col-start-4 row-start-4" Red
    ]


greenHomeCells : List (Html Msg)
greenHomeCells =
    [ homeCell "col-start-10 row-start-1" Green
    , homeCell "col-start-13 row-start-1" Green
    , homeCell "col-start-10 row-start-4" Green
    , homeCell "col-start-13 row-start-4" Green
    ]


yellowHomeCells : List (Html Msg)
yellowHomeCells =
    [ homeCell "col-start-10 row-start-10" Yellow
    , homeCell "col-start-13 row-start-10" Yellow
    , homeCell "col-start-10 row-start-13" Yellow
    , homeCell "col-start-13 row-start-13" Yellow
    ]


blueHomeCells : List (Html Msg)
blueHomeCells =
    [ homeCell "col-start-1 row-start-10" Blue
    , homeCell "col-start-4 row-start-10" Blue
    , homeCell "col-start-1 row-start-13" Blue
    , homeCell "col-start-4 row-start-13" Blue
    ]


homeCell : String -> Ludo.PlayerColor -> Html msg
homeCell className color =
    let
        computedClassName =
            (case color of
                Red ->
                    " border-red-700 "

                Green ->
                    " border-green-700 "

                Blue ->
                    " border-blue-700 "

                Yellow ->
                    " border-yellow-700 "
            )
                ++ className
    in
    div [ class ("col-span-3 row-span-3 m-5 rounded-full  border " ++ computedClassName) ] []
