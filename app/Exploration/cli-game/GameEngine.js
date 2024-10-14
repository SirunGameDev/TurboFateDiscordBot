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

        let activeChar = this.Story.actingCharacter?? null;
        //todo factions[0] for enemy is bad
        let enemyChar = this.Story.factions[0]?? null;
        // Continue looping through scenarios as long as there's a current scenario
        scenarioLoop: while (currentScenario) {
            // todo how to abstract function without clear result
            //this.Story.actingCharacter;
            //this.Story.factions[0];
            activeChar = currentScenario.actingCharacter ? currentScenario.actingCharacter : activeChar;
            enemyChar = currentScenario.factions[0] ? currentScenario.factions[0] : enemyChar;
            // Present the current scenario to the player and get their choice
            let playerChoice = await this.presentScenario(currentScenario, activeChar, enemyChar);
            // todo Move scenario handling to an extra function 
            if(currentScenario.playerChoiceHandler != "") {
                currentScenario.playerChoiceHandler(playerChoice);
            }

            // make memory of choices better!
            activeChar = currentScenario.actingCharacter ? currentScenario.actingCharacter : activeChar;
            enemyChar = currentScenario.factions[0] ? currentScenario.factions[0] : enemyChar;

            fightLoop: while(currentScenario.name == "fight" && playerChoice == "Continue" && enemyChar && (enemyChar.getAlive() == activeChar.getAlive())){

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
            if (currentScenario) {
                currentScenario.actingCharacter = activeChar;
                currentScenario.factions[0] = enemyChar;
            }

            this.Story.actingCharacter = activeChar;
            this.Story.factions[0] = enemyChar;
        }

        // Print a thank-you message when the game ends
        console.log('Thanks for playing! Goodbye.');

    }
}