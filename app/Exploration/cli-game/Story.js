export class Story {
    name;
    scenarios = [];
    aspects = [];
    factions = [];
    actingCharacter; // todo how about not solo games?

    constructor(name) {
        this.name = name;
    }
}