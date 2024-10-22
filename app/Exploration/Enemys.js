import { Character } from "./Character.js";
import { Approaches } from "./Approaches.js";
import { Stunt } from "./Stunt.js";
import { Aspect } from "./Aspect.js";
 
export function getSteelFighter() {
    var char = new Character();

    char.setName("Steel Fighter");
    char.setApproaches(
        new Approaches(2, 0, 1, 3, 2, 1)
    );
    char.setStunts(
        [
            new Stunt("Steel Shield", "defend", "forceful"),
            new Stunt("Trained to Hit hard", "attack", "forceful"),
            new Stunt("Smith", "createAdventage", "forceful")
        ]
    );
    let HighConcept = new Aspect("Fighter with Sword and Shield", "untilChanged", "HighConcept");
    char.setAspects(1, HighConcept);
    return char;
}

export function getSteelAssassin() {
    var char = new Character();

    char.setName("Steel Assassin");

    char.setApproaches(
        new Approaches(2, 2, 1, 0, 1, 3)
    );

    return char;
}

export function getSteelMage() {
    var char = new Character();

    char.setName("Steel Mage");

    char.setApproaches(
        new Approaches(3, 2, 2, 1, 1, 0)
    );

    return char;
}