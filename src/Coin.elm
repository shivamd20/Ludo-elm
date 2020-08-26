module Coin exposing (coin, coinSvg)

import Html exposing (Html)
import Svg
import Svg.Attributes


coin : String -> Int -> Html msg
coin class i =
    Svg.circle
        [ Svg.Attributes.cx (String.fromInt (50 + i * 10))
        , Svg.Attributes.cy "50"
        , Svg.Attributes.r (String.fromInt 45)
        , Svg.Attributes.stroke "black"
        , Svg.Attributes.strokeWidth "1"
        , Svg.Attributes.fill class
        ]
        []


coinSvg : String -> Html msg
coinSvg class =
    Svg.svg [ Svg.Attributes.viewBox "0 0 100 100", Svg.Attributes.class "w-full h-full text-red-700" ]
        [ coin class 0
        ]
