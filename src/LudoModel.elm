module LudoModel exposing (CommonPathPosition(..), Model, Msg(..), PlayerColor(..), Position(..), defaultPositions)


type alias Model =
    { diceNum : Int
    , positions : List ( PlayerColor, Position )
    , turn : PlayerColor
    , maxPlayers : Maybe Int
    , room : Maybe String
    , roomToJoin : String
    , messageToDisplay : String
    , selectedPlayer : PlayerColor
    , participants : List PlayerColor
    }


defaultPositions : List ( PlayerColor, Position )
defaultPositions =
    [ ( Red, InStartBoxPosition 1 )
    , ( Red, InStartBoxPosition 2 )
    , ( Red, InStartBoxPosition 3 )
    , ( Red, InStartBoxPosition 4 )
    , ( Green, InStartBoxPosition 1 )
    , ( Green, InStartBoxPosition 2 )
    , ( Green, InStartBoxPosition 3 )
    , ( Green, InStartBoxPosition 4 )
    , ( Yellow, InStartBoxPosition 1 )
    , ( Yellow, InStartBoxPosition 2 )
    , ( Yellow, InStartBoxPosition 3 )
    , ( Yellow, InStartBoxPosition 4 )
    , ( Blue, InStartBoxPosition 1 )
    , ( Blue, InStartBoxPosition 2 )
    , ( Blue, InStartBoxPosition 3 )
    , ( Blue, InStartBoxPosition 4 )
    ]


type PlayerColor
    = Red
    | Green
    | Blue
    | Yellow


type Msg
    = NewRandomNumber Int
    | MoveCoin Position
    | RollDice
    | MakeMove Position
    | RoomToBeJoinedChanged String
    | MaxPlayersChanged String
    | OnRoomJoinClicked
    | OnStartGameClicked
    | UpdateMessage String
    | UpdateRoom String Int Int


type Position
    = InCommonPathPosition Int CommonPathPosition
    | InStartBoxPosition Int
    | InHomePathPosition PlayerColor Int


type CommonPathPosition
    = PathStar
    | PathStart PlayerColor
    | PathEnd PlayerColor
    | None
