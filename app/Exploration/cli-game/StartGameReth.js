import { GameEngine } from "./GameEngine.js";
import { Story } from "./Story.js";
import * as SL from "./ScenarioList.js";
let ownStory = new Story(
    "StartGameReth"
);

ownStory.scenarios = [
    SL.ArchetypeStoryIntro,
    SL.RethBeginn,
];

let ownGame = new GameEngine(
    ownStory
)

ownGame.startGame();