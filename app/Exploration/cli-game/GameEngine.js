import inquirer from "inquirer";
import { Scenario } from "./Scenario.js";

export class GameEngine {
    Story;
    constructor (Story) {
        this.Story = Story;
    }
    async presentScenario (scenario) {

        if(scenario.messageUpdater != "") {
            scenario.message = scenario.messageUpdater(this.Story);
        }

        // todo flexibel presentation, so not all scenarios needs 
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
        let currentScenario = scenarios[0];

        // Continue looping through scenarios as long as there's a current scenario
        scenarioLoop: while (currentScenario) {
            // Prepare PlayerChoice by updating CurrentScenario in Meaningfull way
            if(currentScenario.preparePlayerChoice != "") {
                currentScenario.preparePlayerChoice(this.Story);
            }
            // Present the current scenario to the player and get their choice
            let playerChoice = await this.presentScenario(currentScenario);
            
            if(currentScenario.playerChoiceHandler != "") {
                let result = currentScenario.playerChoiceHandler(this.Story, playerChoice);

                if (typeof result == "string") {

                }
                if(result instanceof Scenario) {
                    currentScenario = result;
                    continue scenarioLoop;
                }
            }
            if(currentScenario.storyUpdater != "") {
                currentScenario.storyUpdater;
            }
            currentScenario = scenarios.find(scenario => scenario.name === currentScenario.choices.find(choice => choice.name === playerChoice).nextScenario);
        }

        // Print a thank-you message when the game ends
        console.log('Thanks for playing! Goodbye.');

    }
}