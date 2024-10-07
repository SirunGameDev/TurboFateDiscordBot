class Character {

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
}