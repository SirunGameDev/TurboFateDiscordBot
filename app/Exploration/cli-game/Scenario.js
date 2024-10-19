export class Scenario {
    name;
    message;
    choices = [];
    aspects = [];
    factions = [];
    actingCharacter; // todo how about not solo games?
    constructor(name, message, choices, playerChoiceHandler = emptyReturn(), storyUpdater = emptyReturn(), messageUpdater = emptyReturn(), preparePlayerChoice = emptyReturn()) {
        this.choices = choices;
        this.message = message;
        this.name = name;
        this.playerChoiceHandler = playerChoiceHandler;
        this.storyUpdater = storyUpdater;
        this.messageUpdater = messageUpdater;
        this.preparePlayerChoice = preparePlayerChoice;
    }
    playerChoiceHandler;
    storyUpdater;
    messageUpdater;
    preparePlayerChoice;
}

export function emptyReturn () {
    return "";
}