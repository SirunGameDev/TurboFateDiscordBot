import { Scenario } from "./Scenario.js";
import  *  as Archetypes from "../Archetype.js";

export let beginn = new Scenario(
    "beginn",
    "Beginn einer Abenteuerreise.",
    [
        {name: "Wähle einen Charakter", nextScenario: 'char-select'},
    ]
);

function getArchtypeArray() {
    let ArchtypeArray = [
    
    ];
    for(let Archetype in Archetypes) {
        ArchtypeArray.push({ 
            name: ""+Archetypes[Archetype]().getName(), 
            nextScenario: "activity-select", 
            char: Archetypes[Archetype]()
        });
    };

    return ArchtypeArray;
};

export let charSelect = new Scenario(
    "char-select", 
    "Whom you want to play?",
    getArchtypeArray(),
    (Story, playerChoice) => {
        let ArchtypeArray = getArchtypeArray();
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
        { name: "Kämpfen", nextScenario: 'duel'},
        { name: "Parkour", nextScenario: 'parkour'}
    ]
);


export let duel = new Scenario(
    "duel", 
    "You duel as against What do you do? ", 
    [
        { name: "Continue", nextScenario: "duel"},
        { name: "Flee!", nextScenario: ""},
    ],
    (Story) => {
        // risk of endless duels?
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
export let ArchetypeStoryIntro = new Scenario (
    "ArchetypeStoryIntro",
    "Dies ist ein kleines Solo-Abenteuer mit einem Beispielcharakter auf Basis von angepassten TurboFate-Regeln.",
    [
        // todo let choices be flexible depending on context
        {name: "Auf geht es", nextScenario: "RethBeginn" }
    ]
)
export let RethBeginn = new Scenario (
    "RethBeginn",
    "",
    [
        { name: "Oh no!", nextScenario: ""}
    ]
)