import { Scenario, emptyReturn } from "./Scenario.js";
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
function charSelectbyPlayerChoice(Story, playerChoice) {
    let ArchtypeArray = getArchtypeArray();
    let activeCharN = ArchtypeArray.find(choise => choise.name === playerChoice).char;

    let enemy = ArchtypeArray.find(choise => choise.name != playerChoice).char;

    charSelect.actingCharacter = activeCharN;
    Story.actingCharacter = activeCharN;
    Story.factions.push(enemy);
    charSelect.factions.push(enemy);
}
export let charSelect = new Scenario(
    "char-select", 
    "Whom you want to play?",
    getArchtypeArray(),
    (Story, playerChoice) => {
        charSelectbyPlayerChoice(Story, playerChoice);
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
    ],
    emptyReturn,
    (Story) => {
        //really needed?
        Story.actingCharacter = this.actingCharacter;
    }
)
export let ArchetypeRuleIntro = new Scenario (
    "ArchetypeRuleIntro",
    "",
    [
        { name: ""}
    ],
    emptyReturn,
    emptyReturn,
    (Story) => {
        let text = "Ein Charakter hat sechs Methoden (Approaches), Stunts und Aspekte, die den Charakter auch regeltechnisch beschreibt. Diese nutzt er um bei den vier Aktionen Attackieren, Verteidigen, Vorteil erschaffen und Überwinden.";
        let char = Story.actingCharacter;
        text += "\n"+JSON.stringify(char.getApproaches().getArray());
        return text;
    },
    emptyReturn,
)
export let RethBeginn = new Scenario (
    "RethBeginn",
    "",
    [
        { name: "Oh no!", nextScenario: "ArchetypeRuleIntro"}
    ],
    emptyReturn,
    emptyReturn,
    (Story) => {
        let text = updateMessage(Story, RethBeginn);
        text += "\n"+Story.actingCharacter.getDescription();
        return text;
    },
    (Story) => {
        charSelectbyPlayerChoice(Story, Archetypes.getReth().getName());
        Story.factions = [];
    }
)

function updateMessage(Story, scenario) {

    if(Story.actingCharacter) {
        scenario.message = "Your Char: "+Story.actingCharacter.getName()+"\n"+scenario.message;
    }
    if(Story.factions[0]) {
        scenario.message = "Your Enemy: "+Story.factions[0].getName()+"\n"+scenario.message;
    }
    return scenario.message;
}