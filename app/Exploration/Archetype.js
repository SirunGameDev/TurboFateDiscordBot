import { Character } from "./Character.js";
import { Approaches } from "./Approaches.js";
export function getFighter() {
    var char = new Character();

    char.setName("Fighter");
    char.setApproaches(
        new Approaches(2, 0, 1, 3, 2, 1)
    );
    
    return char;
}
