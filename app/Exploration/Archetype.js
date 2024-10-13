import { Character } from "./Character.js";
import { Approaches } from "./Approaches.js";
import {Stunt} from "./Stunt.js";
export function getFighter() {
    var char = new Character();

    char.setName("Fighter");
    char.setApproaches(
        new Approaches(2, 0, 1, 3, 2, 1)
    );
    
    return char;
}

export function getReth() {
    var char = new Character();

    char.setName("Reth");
    char.setDescription ("Reth ist 14 Jahre alt. Er hat dunkelbraune Haut und dunkle Haare, die er in dicken Dreadlocks trägt. ...");
    char.setApproaches(
        // (careful?: 2, clever?: 1, flashy?: 0, forceful?: 3, quick?: 2, sneaky?: 1)
        new Approaches( 2, 1, 0, 3, 2, 1)
    );

    char.setStunts (
        // name is used in text
         [new Stunt("Kata der Unbeugsamen Sonne", "defend", "forceful" )]
    )

    return char;
}