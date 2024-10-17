import { Character } from "./Character.js";
import { Approaches } from "./Approaches.js";
import { Stunt } from "./Stunt.js";
import { Aspect } from "./Aspect.js";
export function getFighter() {
    var char = new Character();

    char.setName("Fighter");
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
    let HighConcept = new Aspect("Fighter with Sword and Shield", "untilChanged", "HighConcept")
    char.setAspects(1, HighConcept);
    return char;
}

export function getReth() {
    var char = new Character();

    char.setName("Reth vom Andrali-Widerstand");
    char.setDescription ("Reth ist 14 Jahre alt. Er hat dunkelbraune Haut und dunkle Haare, die er in dicken Dreadlocks trägt. ...");
    
    char.setApproaches(
        // (careful?: 2, clever?: 1, flashy?: 0, forceful?: 3, quick?: 2, sneaky?: 1)
        new Approaches(2, 1, 0, 3, 2, 1)
    );

    char.setStunts (
        // name is used in text
         [
            new Stunt("Kata der Unbeugsamen Sonne", "defend", "forceful" ),
            // add own Stunt compared to Fate Accelerated
            new Stunt("Kata der Durchdringenden Strahlen", "overcome", "quick"),
            new Stunt("Kata des Scharfen Augens", "attack", "careful")
        ]
    );
    char.setAspects(1, new Aspect("Sonnensänger aus der Andralwüste", "untilChanged", "HighConcept"));
    char.setAspects(2, new Aspect("Die Stählernen Meuchler wollen mich töten", "untilChanged", "Trouble" ));
    char.setAspects(3, new Aspect("Mein Kung-Fu ist stärker!", "untilChanged", ""));
    char.setAspects(4, new Aspect("Verliebt in Avasa", "untilChanged", ""));
    char.setAspects(5, new Aspect("Ich kann aus Serios Erfahrungen lernen", "untilChanged", ""));

    return char;
}

export function getVoltaire() {
    var char = new Character();
    char.setName ("Voltaire");

    char.setAspects(1, new Aspect("Katzenmenschen-Kapitänin der Wolkenhüpfer", "untilChanged", "HighConcept"));
    char.setAspects(2, new Aspect("*Gähn*", "untilChanged", "Trouble"));
    char.setAspects(3, new Aspect("Das? Das ist eine Ablenkung?", "untilChanged", ""));
    char.setAspects(4, new Aspect("Martin ist ein großer Schwindler", "untilChanged", ""));
    char.setAspects(5, new Aspect("Sanchez ist der beste erste Maat, den ein Schiff nur haben kann.", "untilChanged", ""));

    char.setApproaches (
        new Approaches(1, 1, 3, 0, 2, 2)
    );

    char.setStunts(
        [
            new Stunt("Verwegener Fechtkünstler", "attack", "flashy"),

            //own Stunts:
            new Stunt(),
            new Stunt(),

        ]
    );

    char.setDescription("Voltaire ist die Kapitänin der Wolkenhüpfer ... ");

    return char;
}