export class Story {
    name;
    scenarios = [];
    aspects = [];
    factions = [];
    actingCharacter; // todo how about not solo games?
    currentScenario;
    // to do harmonized Scenario and Story?
    constructor(name) {
        this.name = name;
    }

    findScenariobyName(string) {
        return this.scenarios.find(scenario => scenario.name === string);
    }
}