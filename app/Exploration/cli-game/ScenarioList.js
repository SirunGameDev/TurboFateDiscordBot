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
    (Story, playerChoice) => {
        if(playerChoice == "Reth!") {
            charSelect.actingCharacter = getReth();
            Story.actingCharacter = getReth();

            charSelect.factions[0] = getFighter();
            Story.factions[0] = getFighter();

        }
        if(playerChoice == "Fighter!") {
            charSelect.actingCharacter = getFighter();
            Story.actingCharacter = getFighter();

            charSelect.factions[0] = getReth();
            Story.factions[0] = getReth();

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
    ],
    (Story) => {
        // risk of endless fights?
        let activeChar = Story.actingCharacter;
        let enemyChar = Story.factions[0];
        while (true) {
            let enemydmg = enemyChar.attack() - activeChar.defend();
            let activedmg = activeChar.attack() - enemyChar.defend();
    
            activeChar.soakDmg(enemydmg);
            enemyChar.soakDmg(activedmg);

            if(false == enemyChar.getAlive()) {
                return "won";
            }
            if(false == activeChar.getAlive()) {
                return "lost";
            }
        }

    }
);

export let parkour = new Scenario(
    "parkour",
    "You need to overcome more and more difficult obstacles",
    [
        { name: "Continue", nextScenario: 'parkour'},
        { name: "giveup", nextScenario: ""}
    ],
    (Story) => {
        let parkourCounter = 0;
        while(true) {
            let success = Story.actingCharacter.overcome(parkourCounter);
            if(success) {
                parkourCounter++;
                //console.log(parkourCounter);
                if(parkourCounter > 3) {
                    return "won";
                }
            }
            else {
                return "lost";
            }
        }
    },
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