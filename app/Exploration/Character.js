export class Character {

    #name;
    #pronouns;
    #description;

    #refresh;
    #fatepoints;

    #aspects = {
        '1': "", // High Concept
        '2': "", // Trouble
        '3': "",
        '4': "",
        '5': ""
    };
    #approaches = {
        "careful" : 0,
        "clever"  : 0,
        "flashy"  : 0,
        "forceful": 0,
        "quick"   : 0,
        "sneaky"  : 0
    };
    #stunts;
    #stress =  {
        "1" : "",
        "2" : "",
        "3" : "",
    };
    #consequences = {
        "2" : "",
        "4" : "",
        "6" : "",
    };

    constructor() {

    }

    getName() {
        return this.#name;
    }
    setName (name)  {
        console.log(typeof name);
        if (typeof name == "string") {
            this.#name = name;
        }
        if (typeof name != "string") {
            throw new Error('No String provided');
        }
    }
}