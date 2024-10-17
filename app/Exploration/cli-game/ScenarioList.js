import { Scenario } from "./Scenario.js";
import  *  as Archetypes from "../Archetype.js";

export let beginn = new Scenario(
    "beginn",
    "Beginn einer Abenteuerreise.",
    [
        {name: "Wähle einen Charakter", nextScenario: 'char-select'},
    ]
);

let ArchtypeArray = [
    
];
for(let Archetype in Archetypes) {
    ArchtypeArray.push({ 
        name: ""+Archetypes[Archetype]().getName(), 
        nextScenario: "activity-select", 
        char: Archetypes[Archetype]()
    });
};
export let charSelect = new Scenario(
    "char-select", 
    "Whom you want to play?",
    ArchtypeArray,
    (Story, playerChoice) => {
        let activeCharN = ArchtypeArray.find(choise => choise.name === playerChoice).char;

        let enemy = ArchtypeArray.find(choise => choise.name != playerChoice).char;

        charSelect.actingCharacter = activeCharN;
        Story.actingCharacter = activeCharN;
        Story.factions.push(enemy);
        charSelect.factions.push(enemy);
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
                return Story.findScenariobyName("won");
            }
            if(false == activeChar.getAlive()) {
                return Story.findScenariobyName("lost");
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
                   return Story.findScenariobyName("won");
                }
            }
            else {
                return Story.findScenariobyName("lost");
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