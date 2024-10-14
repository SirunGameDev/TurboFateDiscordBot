export class Scenario {
    name;
    message;
    choices = [];
    aspects = [];
    factions = [];
    actingCharacter; // todo how about not solo games?
    constructor(name, message, choices, playerChoiceHandler = "") {
        this.choices = choices;
        this.message = message;
        this.name = name;
        this.playerChoiceHandler = playerChoiceHandler;
    }
    playerChoiceHandler;
}