import { GameEngine } from "./GameEngine.js";
import { Story } from "./Story.js";
import { Scenario } from "./Scenario.js";
import { getFighter, getReth } from "../Archetype.js";
import { beginn, charnew } from "./ScenarioList.js";
let ownStory = new Story(
    "ownGame"
);

ownStory.scenarios = [
    beginn,
    charnew,
    new Scenario(
        "activity-select",
        "What you want to do?",
        [
            { name: "Kämpfen", nextScenario: 'fight'},
            { name: "Parkour", nextScenario: 'parkour'}
        ]
    ),
    new Scenario(
        "parkour",
        "You need to overcome more and more difficult obstacles",
        [
            { name: "Continue", nextScenario: 'parkour'},
            { name: "giveup", nextScenario: ""}
        ]

    ),
    new Scenario(
        "fight", 
        "You fight! What do you do? ", 
        [
            { name: "Continue", nextScenario: "fight"},
            { name: "Flee!", nextScenario: ""},
        ]
    ),
    new Scenario(
        "won",
        "You have won",
        [ { name: "Yeah", nextScenario: ""}]
    ),
    new Scenario(
        "lost",
        "You have lost",
        [
          { name: "Oh no!", nextScenario: ""}
        ]
    )
];

let ownGame = new GameEngine(
    ownStory
)

ownGame.startGame();