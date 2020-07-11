module HomePage exposing (main)

import Html exposing (div, h1, p, strong, text)
import Html.Attributes exposing (class)


view _ =
    div [ class "jumbotron" ]
        [ h1 [] [ text "Welcome to My page!" ]
        , p []
            [ text "Dunder Mifflin Inc. (stock symbol "
            , strong [] [ text "DMI" ]
            , text <|
                """
                ) is a micro-cap regional paper and office
                supply distributor with an emphasis on servicing
                small-business clients.
                """
            ]
        ]


main =
    view "dummy model"
