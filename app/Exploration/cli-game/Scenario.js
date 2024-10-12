export class Scenario {
    name;
    message;
    choices;
    aspects;
    
    constructor(name, message, choices) {
        this.choices = choices;
        this.message = message;
        this.name = name;
    }
    
}