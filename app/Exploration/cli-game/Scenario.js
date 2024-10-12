export class Scenario {
    name;
    message;
    choices;
    constructor(name, message, choices) {
        this.choices = choices;
        this.message = message;
        this.name = name;
    }
    
}