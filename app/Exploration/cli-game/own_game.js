import inquirer from "inquirer";

import {getFighter, getReth} from "../Archetype.js";
import { Scenario } from "./Scenario.js";

const scenarios = [

    new Scenario(
        "intro", 
        "Beginn your adventure! Whom you want to play? As "+getFighter().getName()+" or "+getReth().getName(), 
        [
            { name: 'Fighter!', nextScenario: 'fight' },
            { name: 'Reth!', nextScenario: 'fight' }
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
]

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
    // Start with the 'intro' scenario
    let currentScenario = scenarios.find(scenario => scenario.name === 'intro');
    let activeChar = "";
    let enemyChar = "";
    // Continue looping through scenarios as long as there's a current scenario
    while (currentScenario) {
        
        // Present the current scenario to the player and get their choice
        let playerChoice = await presentScenario(currentScenario, activeChar, enemyChar);
        
        if(playerChoice == "Reth!") {
            activeChar = getReth();
            enemyChar = getFighter();
        }
        if(playerChoice == "Fighter!") {
            activeChar = getFighter();
            enemyChar = getReth();
        }
        if(playerChoice == "Continue") {
            let enemydmg = enemyChar.attack() - activeChar.defend();
            let activedmg = activeChar.attack() - enemyChar.defend();
            
            activeChar.soakDmg(enemydmg);
            enemyChar.soakDmg(activedmg);

            if (false === enemyChar.getAlive()) {
                playerChoice="won";
                currentScenario = scenarios.find(scenario => scenario.name === "won");
                continue;
            }
            if (false === activeChar.getAlive()) {
                currentScenario = scenarios.find(scenario => scenario.name === "lost");
                continue;
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