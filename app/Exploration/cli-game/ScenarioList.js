import { Scenario } from "./Scenario.js";
import { getFighter, getReth } from "../Archetype.js";

export let beginn = new Scenario(
    "beginn",
    "Beginn einer Abenteuerreise.",
    [
        {name: "Wähle einen Charakter", nextScenario: 'char-select'},
    ]
);

export let charnew = new Scenario(
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