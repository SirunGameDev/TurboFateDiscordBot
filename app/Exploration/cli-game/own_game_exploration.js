import inquirer from "inquirer";

import {getFighter, getReth} from "../Archetype.js";
import { Scenario } from "./Scenario.js";

// todo let vs var vs const
let scenarios = [
    new Scenario(
        "beginn",
        "Beginn einer Abenteuerreise.",
        [
            {name: "Wähle einen Charakter", nextScenario: 'char-select'},
        ]
    ),
    new Scenario(
        "char-select", 
        "Whom you want to play? As "+getFighter().getName()+" or "+getReth().getName(), 
        [
            { name: 'Fighter!', nextScenario: 'activity-select' },
            { name: 'Reth!', nextScenario: 'activity-select' }
        ]
    ),
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

const presentScenario = async (scenario, char, enemy) => {

    let messageReturn = getMessage(scenario, char, enemy);

    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: messageReturn,
            choices: scenario.choices.map(choice => choice.name),
        }
    ]);

    return answers.choice;
};
function getMessage(scenario, char, enemy) {
    let string = "";
    if (char != "") {
        string += "Your character: "+char.getName()+JSON.stringify(char.getStress())+"\n";
    }
    if (enemy != "") {
        string += "Your Enemy: "+enemy.getName()+JSON.stringify(enemy.getStress())+"\n";
    }
    string += scenario.message;
    return string;
}
// Function to start the game
const startGame = async () => {
    let currentScenario = scenarios.find(scenario => scenario.name === 'beginn');
    let activeChar = "";
    let enemyChar = "";
    // Continue looping through scenarios as long as there's a current scenario
    scenarioLoop: while (currentScenario) {
        
        // Present the current scenario to the player and get their choice
        let playerChoice = await presentScenario(currentScenario, activeChar, enemyChar);
        // todo Move scenario handling to an extra function 
        if(playerChoice == "Reth!") {
            activeChar = getReth();
            enemyChar = getFighter();
        }
        if(playerChoice == "Fighter!") {
            activeChar = getFighter();
            enemyChar = getReth();
        }
        
        fightLoop: while(currentScenario.name == "fight" && playerChoice == "Continue" && (enemyChar.getAlive() == activeChar.getAlive())){

            let enemydmg = enemyChar.attack() - activeChar.defend();
            let activedmg = activeChar.attack() - enemyChar.defend();

            activeChar.soakDmg(enemydmg);
            enemyChar.soakDmg(activedmg);

            if (false === enemyChar.getAlive()) {
                currentScenario = scenarios.find(scenario => scenario.name === "won");
                continue scenarioLoop;
            }
            if (false === activeChar.getAlive()) {
                currentScenario = scenarios.find(scenario => scenario.name === "lost");
                continue scenarioLoop;
            }
        }
        let parkourCounter = 0;
        parkourLoop: while (currentScenario.name == "parkour" && playerChoice == "Continue") {
            let success = activeChar.overcome(parkourCounter);
            
            if(success) {
                parkourCounter++;

                if(parkourCounter > 3) {
                    currentScenario = scenarios.find(scenario => scenario.name === "won");
                    continue scenarioLoop;
                }
            }
            else {
                currentScenario = scenarios.find(scenario => scenario.name === "lost");
                continue scenarioLoop;
            }
        }
        // Find the next scenario based on the player's choice and update the current scenario
        currentScenario = scenarios.find(scenario => scenario.name === currentScenario.choices.find(choice => choice.name === playerChoice).nextScenario);
    }

    // Print a thank-you message when the game ends
    console.log('Thanks for playing! Goodbye.');
};

// Start the game by calling the startGame function
startGame();