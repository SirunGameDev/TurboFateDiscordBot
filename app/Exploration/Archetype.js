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
    char.setDescription ("Reth is 14 years of age. He has dark brown skin and dark hair that he wears in thick dreadlocks. He wears light, loose-fitting clothing and sandals, and he’s a skilled martial artist. He’s the most powerful Suncaller to be born in generations; he can magically call forth the power of fire. Originally from a town in the vast Andral Desert, he and his friends took a stand against the invading Steel Empire and have been living on the run since.");
    
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
            new Stunt("Riposte", "defend", "sneaky"),
            new Stunt("Balance gelernt", "overcome", "quick"),

        ]
    );

    char.setDescription("Voltaire ist die Kapitänin der Wolkenhüpfer ... ");

    return char;
}

export function getAbigail() {
    var char = new Character();
    char.setName("Abigail Zhao");

    char.setAspects(1, new Aspect("Verzauberungs-Spezialistin aus dem Greifenhaus", "untilChanged", "HighConcept"));
    char.setAspects(2, new Aspect("Erst zaubern, dann fragen.", "untilChanged", "Troube"));
    char.setAspects(3, new Aspect("Ich hasse diese Typen aus dem Zyklopenhaus", "untilChanged", ""));
    char.setAspects(4, new Aspect("Sarah gibt mir Rückendeckung", "untilChanged", ""));
    char.setAspects(5, new Aspect("Dexter Fitzwilliam wird untergehen", "untilChanged", ""));

    char.setApproaches(
        new Approaches(0, 2, 1, 2, 1, 3)
    );

    // todo Stunt with no flat bonus
    char.setStunts(
        [
            new Stunt("Liebling der Lehrer", "", ""), //neeeds rework or maybe createAdventage and tückisch

            // own Stunts
            new Stunt("Stille Flüche", "attack", "sneaky"),
            new Stunt("Studium zahlt sich aus", "createAdvantage", "clever"),
            new Stunt("Kraft schützt", "defend", "forceful")
        ]
    );

    return char;
}

export function getBethesda() {
    let char = new Character();

    char.setName("Bethesda Flushing");

    char.setAspects(1, new Aspect("Chief Field Agent of IGEMA", "untilChanged", "HighConcept"));
    char.setAspects(2, new Aspect("I'll Get You, von Stendahl", "untilChanged", "Trouble"));
    char.setAspects(3, new Aspect("My Inventions Almost Always Work. Almost", "untilChanged", ""));
    char.setAspects(4, new Aspect("My Grad Students Come Through, Just Not How i Expect Them To", "untilChanged", ""));
    char.setAspects(5, new Aspect("I Turst Dr. Alemieda's Genius", "untilChanged", ""));
    
    char.setApproaches(
        new Approaches(2, 3, 1, 2, 1, 0)
    );

    char.setStunts([
        new Stunt("Experimental Helo Pack", "createAdvantage", "quick"),
        new Stunt("Gadgeteer", "", ""), // todo add different Stunt type - just eliminate one aspect 

        new Stunt("Exo-Skelett", "attack", "forceful"),
        new Stunt("Studien der Präventiven Maßnahmen", "defend", "clever"),
    ]);

    return char;
}