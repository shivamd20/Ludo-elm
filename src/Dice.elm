module Dice exposing (diceDiv)

import Html exposing (Html, button, img, text)
import Html.Attributes exposing (class, hidden)
import Html.Events exposing (onClick)
import LudoModel exposing (Msg(..), PlayerColor(..))
import Svg exposing (..)
import Svg.Attributes exposing (..)


diceDiv : LudoModel.Model -> Html Msg
diceDiv model =
    let
        positionClass =
            case model.turn of
                Red ->
                    "col-start-3 row-start-3"

                Blue ->
                    "col-start-3 row-start-12"

                Green ->
                    "col-start-12 row-start-3"

                Yellow ->
                    "col-start-12 row-start-12"

        positionClassWithAnimation =
            positionClass
                ++ (if model.diceNum == 0 then
                        " animate__animated animate__bounce animate__infinite  "

                    else
                        " animate__animated animate__wobble  "
                   )
    in
    if model.diceNum == 0 then
        svg
            [ if model.diceNum == 0 && model.turn == model.selectedPlayer then
                onClick
                    RollDice

              else
                hidden False
            , viewBox "0 0 512 512"
            , Svg.Attributes.class ("disabled:opacity-50   hover:bg-gray-600  col-span-2 row-span-2  animate__animated animate__bounce text-center " ++ positionClassWithAnimation)
            ]
            [ Svg.path [ d "M0 0h512v512H0z", fill "#000", fillOpacity "0.1" ] [], g [ Svg.Attributes.class "", transform "translate(0,0)", Svg.Attributes.style "touch-action: none;" ] [ Svg.path [ d "M255.703 44.764c-6.176 0-12.353 1.384-17.137 4.152l-152.752 88.36c-9.57 5.535-9.57 14.29 0 19.826l152.752 88.359c9.57 5.536 24.703 5.536 34.272 0l152.754-88.36c9.57-5.534 9.57-14.289 0-19.824L272.838 48.916c-4.785-2.77-10.96-4.152-17.135-4.152zm-14.887 48.478c12.954.21 24.983 3.786 36.088 10.727 6.85 4.28 11.7 9.21 14.555 14.787 2.798 5.542 4.201 14.398 4.209 26.566l.059 28.848 48.441-29.065L368 160l-80 48-23.832-14.895-.32-49.425c-.117-4.47-1.084-8.326-2.9-11.569-1.817-3.242-4.634-6.057-8.452-8.443-5.895-3.684-12.384-5.602-19.467-5.754-7.034-.181-13.426 1.454-19.177 4.904-4.424 2.655-8.17 6.244-11.24 10.768-3.127 4.489-5.556 9.868-7.286 16.133l-27.62-17.264a101.484 101.484 0 0 1 13.476-14.79c4.951-4.554 10.425-8.63 16.422-12.228 13.173-7.904 26.71-11.968 40.609-12.193a75.55 75.55 0 0 1 2.603-.002zm195.051 80.572c-1.938.074-4.218.858-6.955 2.413l-146.935 84.847c-9.57 5.527-17.14 18.638-17.14 29.69v157.699c0 11.05 7.57 15.419 17.14 9.89l146.937-84.843c9.57-5.527 17.137-18.636 17.137-29.688v-157.7c-2.497-8.048-5.23-12.495-10.184-12.308zm-359.763.48c-6.227 0-10.033 5.325-10.155 11.825v157.697c0 11.052 7.57 24.163 17.14 29.69l146.93 84.848c9.57 5.526 17.141 1.156 17.141-9.895v-157.7c0-11.051-7.57-24.159-17.14-29.687L83.09 176.225c-2.567-1.338-4.911-1.93-6.986-1.93zM112 230.56l26.363 9.26 27.807 16.683v111.77L192 383.77V408l-79.316-47.59v-24.23l25.832 15.498v-87.903L112 254.424v-23.865zm271.182 9.203c.441-.013.874-.01 1.295.006.962.037 1.869.151 2.722.341 6.874 1.437 10.313 7.774 10.313 19.012 0 7.668-1.637 14.941-4.908 21.82-3.272 6.821-8.106 13.147-14.506 18.977 7.158-2.012 12.587-1.29 16.285 2.17 3.745 3.372 5.617 9.417 5.617 18.139 0 12.994-4.03 25.304-12.09 36.93-8.06 11.566-19.815 21.986-35.27 31.259-5.451 3.271-10.928 6-16.427 8.188-5.452 2.217-10.856 3.85-16.213 4.898v-26.076a53.81 53.81 0 0 0 15.219-1.93c5.072-1.463 10.048-3.66 14.931-6.59 7.254-4.352 12.801-9.23 16.641-14.636 3.887-5.435 5.832-11.051 5.832-16.846 0-5.97-1.992-9.281-5.975-9.936-3.934-.741-9.764 1.206-17.492 5.842l-10.95 6.57v-21.773l11.519-6.912c6.874-4.125 11.993-8.513 15.359-13.166 3.366-4.712 5.049-9.791 5.049-15.235 0-5.033-1.635-7.944-4.906-8.732-3.272-.788-7.894.61-13.868 4.193-4.409 2.646-8.865 5.934-13.369 9.866-4.503 3.931-8.983 8.434-13.44 13.507v-24.76c5.405-5.115 10.763-9.734 16.073-13.857 5.31-4.122 10.525-7.719 15.645-10.79 11.316-6.79 20.287-10.284 26.914-10.48z", fill "#fff", fillOpacity "1" ] [] ] ]

    else
        Html.button [ Html.Attributes.class ("disabled:opacity-50  border hover:bg-gray-600  col-span-2 row-span-2  animate__animated animate__bounce text-center " ++ positionClassWithAnimation) ] [ Html.text (String.fromInt model.diceNum) ]
