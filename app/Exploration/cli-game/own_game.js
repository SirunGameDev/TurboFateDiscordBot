import inquirer from "inquirer";

import {getFighter, getReth} from "../Archetype.js";


const scenarios = [
    {
        name: 'intro',
        message: "Beginn your adventure! Whom you want to play? As "+getFighter().getName()+" or "+getReth().getName(),
        choices: [
            { name: 'Fighter!', char: getFighter(), nextScenario: 'fight' },
            { name: 'Reth!', char: getReth(), nextScenario: 'fight' }
        ],
    },
    {
        name: "fight",
        message: "You fight! As... ",
        choices: [
            { name: "Attack!", nextScenario: "fight"},
            { name: "Flee!", nextScenario: ""},

        ]
    }
]

const presentScenario = async (scenario, char) => {
    let addition = "";
    if (char != "" ) {
        addition += char.getName()+JSON.stringify(char.getStress());
    }
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: scenario.message + addition,
            choices: scenario.choices.map(choice => choice.name),
        }
    ]);

    return answers.choice;
};

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