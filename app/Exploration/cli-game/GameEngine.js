import inquirer from "inquirer";
import { getFighter, getReth } from "../Archetype.js";
export class GameEngine {
    Story;
    constructor (Story) {
        this.Story = Story;
    }
    async presentScenario (scenario) {
        const answers = await inquirer.prompt([
            {
                type: "list",
                name: "choice",

                // to do message handling
                message: scenario.message,

                choices: scenario.choices.map (choice => choice.name )

            }
        ]);
        return answers.choice;
    }
    async startGame() {
        let scenarios = this.Story.scenarios;
        let currentScenario = scenarios.find(scenario => scenario.name === 'beginn');

        // Continue looping through scenarios as long as there's a current scenario
        scenarioLoop: while (currentScenario) {
            // Present the current scenario to the player and get their choice
            let playerChoice = await this.presentScenario(currentScenario);
            
            if(currentScenario.playerChoiceHandler != "") {
                let result = currentScenario.playerChoiceHandler(this.Story, playerChoice);
                if (typeof result == "string") {
                    currentScenario = scenarios.find(scenario => scenario.name === result);
                    continue scenarioLoop;
                }
            }
            currentScenario = scenarios.find(scenario => scenario.name === currentScenario.choices.find(choice => choice.name === playerChoice).nextScenario);
        }

        // Print a thank-you message when the game ends
        console.log('Thanks for playing! Goodbye.');

    }
}