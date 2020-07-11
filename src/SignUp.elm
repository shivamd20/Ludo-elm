module SignUp exposing (User)

import Html exposing (Attribute, Html, button, div, form, h1, input, text)
import Html.Attributes exposing (class, id, style, type_)


type alias User =
    { name : String
    , email : String
    , password : String
    , loggedIn : Bool
    }


type alias Model =
    User


intialModel : User
intialModel =
    { name = ""
    , email = ""
    , password = ""
    , loggedIn = False
    }


formStyle : List (Attribute msg)
formStyle =
    [ style "border-radius" "5px"
    , style "background-color" "#f2f2f2"
    , style "padding" "20px"
    , style "width" "300px"
    ]


inputStyle : List (Attribute msg)
inputStyle =
    [ style "display" "block"
    , style "width" "260px"
    , style "padding" "12px 20px"
    , style "margin" "8px 0"
    , style "border" "none"
    , style "border-radius" "4px"
    ]


buttonStyle : List (Attribute msg)
buttonStyle =
    [ style "width" "300px"
    , style "background-color" "#397cd5"
    , style "color" "white"
    , style "padding" "14px 20px"
    , style "margin-top" "10px"
    , style "border" "none"
    , style "border-radius" "4px"
    , style "font-size" "16px"
    ]


cells : List Int
cells =
    List.range 1 (15 * 15)


mapIntToCell : Int -> Html msg
mapIntToCell num =
    div [ class "bg-gray-700 w-full h-full" ] [ h1 [] [ text (Debug.toString num) ] ]


divCells : List (Html msg)
divCells =
    List.map mapIntToCell cells


grid =
    div [ class "grid  grid-cols-15 grid-rows-15 w-128 h-128" ] divCells


container =
    div [ class "" ]
        [ grid
        ]


view : Model -> Html msg
view _ =
    container



{--view : Model -> Html msg
view _ =
    div []
        [ h1 [ style "padding-left" "3cm" ] [ text "Sign up" ]
        , form formStyle
            [ div []
                [ text "Name"
                , input ([ type_ "text", id "name" ] ++ inputStyle) []
                ]
            , div [] [ text "Email", input ([ type_ "email", id "email" ] ++ inputStyle) [] ]
            , div [] [ text "Password", input ([ type_ "password", id "password" ] ++ inputStyle) [] ]
            , div []
                [ button
                    (type_ "submit"
                        :: buttonStyle
                    )
                    [ text "Create an account"
                    ]
                , grid
                ]
            ]
        ]

--}


main : Html msg
main =
    view intialModel
