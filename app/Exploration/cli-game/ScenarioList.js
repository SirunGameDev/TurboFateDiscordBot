import { Scenario } from "./Scenario.js";
import { getFighter, getReth } from "../Archetype.js";

export let beginn = new Scenario(
    "beginn",
    "Beginn einer Abenteuerreise.",
    [
        {name: "Wähle einen Charakter", nextScenario: 'char-select'},
    ]
);

export let charSelect = new Scenario(
    "char-select", 
    "Whom you want to play? As "+getFighter().getName()+" or "+getReth().getName(), 
    [
        { name: 'Fighter!', nextScenario: 'activity-select' },
        { name: 'Reth!', nextScenario: 'activity-select' }
    ],
    (playerChoice) => {
        if(playerChoice == "Reth!") {
            charnew.actingCharacter = getReth();
            charnew.factions[0] = getFighter();
        }
        if(playerChoice == "Fighter!") {
            charnew.actingCharacter = getFighter();
            charnew.factions[0] = getReth();
        }
    },
);

export let activitySelect = new Scenario (
    "activity-select",
    "What you want to do?",
    [
        { name: "Kämpfen", nextScenario: 'fight'},
        { name: "Parkour", nextScenario: 'parkour'}
    ]
);


export let fight = new Scenario(
    "fight", 
    "You fight! What do you do? ", 
    [
        { name: "Continue", nextScenario: "fight"},
        { name: "Flee!", nextScenario: ""},
    ]
);

export let parkour = new Scenario(
    "parkour",
    "You need to overcome more and more difficult obstacles",
    [
        { name: "Continue", nextScenario: 'parkour'},
        { name: "giveup", nextScenario: ""}
    ]

);

export let won = new Scenario(
    "won",
    "You have won",
    [ { name: "Yeah", nextScenario: ""}]
);

export let lost = new Scenario(
    "lost",
    "You have lost",
    [
      { name: "Oh no!", nextScenario: ""}
    ]
)