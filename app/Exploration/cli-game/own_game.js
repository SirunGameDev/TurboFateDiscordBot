import inquirer from "inquirer";

import {getFighter, getReth} from "../Archetype.js";
import { Scenario } from "./Scenario.js";

const scenarios = [

    new Scenario(
        "intro", 
        "Beginn your adventure! Whom you want to play? As "+getFighter().getName()+" or "+getReth().getName(), 
        [
            { name: 'Fighter!', char: getFighter(), nextScenario: 'fight' },
            { name: 'Reth!', char: getReth(), nextScenario: 'fight' }
        ]
    ),
    /*{
        name: 'intro',
        message: "Beginn your adventure! Whom you want to play? As "+getFighter().getName()+" or "+getReth().getName(),
        choices: [
            { name: 'Fighter!', char: getFighter(), nextScenario: 'fight' },
            { name: 'Reth!', char: getReth(), nextScenario: 'fight' }
        ],
    },
    {
        name: "fight",
        message: "You fight! What do you do? ",
        choices: [
            { name: "Continue", nextScenario: "fight"},
            { name: "Flee!", nextScenario: ""},

        ]
    }*/
    new Scenario(
        "fight", 
        "You fight! What do you do? ", 
        [
            { name: "Continue", nextScenario: "fight"},
            { name: "Flee!", nextScenario: ""},
        ]
    ),
]

const presentScenario = async (scenario, char) => {

    let messageReturn = getMessage(scenario, char);

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
function getMessage(scenario, char) {
    let string = "";
    if (char != "") {
        string += "Your character: "+char.getName()+JSON.stringify(char.getStress())+"\n";
    }
    string += scenario.message;
    return string;
}
// Function to start the game
const startGame = async () => {
    // Start with the 'intro' scenario
    let currentScenario = scenarios.find(scenario => scenario.name === 'intro');
    let activeChar = "";
    // Continue looping through scenarios as long as there's a current scenario
    while (currentScenario) {
        
        // Present the current scenario to the player and get their choice
        const playerChoice = await presentScenario(currentScenario, activeChar);

        if(playerChoice == "Reth!") {
            activeChar = getReth();
        }
        if(playerChoice == "Fighter!") {
            activeChar = getFighter();
        }
        // Find the next scenario based on the player's choice and update the current scenario
        currentScenario = scenarios.find(scenario => scenario.name === currentScenario.choices.find(choice => choice.name === playerChoice).nextScenario);
    }

    // Print a thank-you message when the game ends
    console.log('Thanks for playing! Goodbye.');
};

// Start the game by calling the startGame function
startGame();