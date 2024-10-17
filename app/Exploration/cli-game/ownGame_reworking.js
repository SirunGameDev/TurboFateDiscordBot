import { GameEngine } from "./GameEngine.js";
import { Story } from "./Story.js";
import { beginn, charSelect, activitySelect, won, lost, parkour, duel } from "./ScenarioList.js";
let ownStory = new Story(
    "ownGame"
);

ownStory.scenarios = [
    beginn,
    charSelect,
    activitySelect,
    parkour,
    duel,
    won,
    lost,
];

let ownGame = new GameEngine(
    ownStory
)

ownGame.startGame();