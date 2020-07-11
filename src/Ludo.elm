module Ludo exposing (ludoGraph)

import Html exposing (div, h1, p, strong, text)


type Coin
    = RED
    | GREEN
    | BLUE
    | YELLOW


type NodeType
    = Home Coin
    | Star
    | InsideHome
    | Regular
    | CommonPathEnd Coin Int


ludoGraph : List ( Int, Maybe Int, NodeType )
ludoGraph =
    [ ( 1, Just 2, Regular )
    , ( 2, Just 3, Regular )
    , ( 3, Just 4, Regular )
    , ( 4, Just 5, Regular )
    , ( 5, Just 6, Regular )
    , ( 6, Just 7, Regular )
    , ( 7, Just 8, Regular )
    , ( 8, Just 9, Regular )
    , ( 9, Just 10, Regular )
    , ( 10, Just 11, Regular )
    , ( 11, Just 12, Regular )
    , ( 12, Just 13, Regular )
    , ( 13, Just 14, Regular )
    , ( 14, Just 15, Regular )
    , ( 15, Just 16, Regular )
    , ( 16, Just 17, Regular )
    , ( 17, Just 18, Regular )
    , ( 18, Just 19, Regular )
    , ( 19, Just 20, Regular )
    , ( 20, Just 21, Regular )
    , ( 21, Just 22, Regular )
    , ( 22, Just 23, Regular )
    , ( 23, Just 24, Regular )
    , ( 24, Just 25, Regular )
    , ( 25, Just 26, Regular )
    , ( 26, Just 27, Regular )
    , ( 27, Just 28, Regular )
    , ( 28, Just 29, Regular )
    , ( 29, Just 30, Regular )
    , ( 30, Just 31, Regular )
    , ( 31, Just 32, Regular )
    , ( 32, Just 33, Regular )
    , ( 33, Just 34, Regular )
    , ( 34, Just 35, Regular )
    , ( 35, Just 36, Regular )
    , ( 36, Just 37, Regular )
    , ( 37, Just 38, Regular )
    , ( 38, Just 39, Regular )
    , ( 39, Just 40, Regular )
    , ( 40, Just 41, Regular )
    , ( 41, Just 42, Regular )
    , ( 42, Just 43, Regular )
    , ( 43, Just 44, Regular )
    , ( 44, Just 45, Regular )
    , ( 45, Just 46, Regular )
    , ( 46, Just 47, Regular )
    , ( 47, Just 48, Regular )
    , ( 48, Just 49, Regular )
    , ( 49, Just 50, Regular )
    , ( 50, Just 51, Regular )
    , ( 51, Just 52, Regular )
    , ( 52, Just 1, Regular )
    ]
