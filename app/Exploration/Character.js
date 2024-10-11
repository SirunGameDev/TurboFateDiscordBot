import { Approaches } from "./Approaches.js";
//import {typeChecker} from "libs.js";
export class Character {

    #name;
    #pronouns;
    #description;

    #refresh;
    #fatepoints;

    #aspects = {
        1: "", // High Concept
        2: "", // Trouble
        3: "",
        4: "",
        5: ""
    };
    #approaches = {
        careful : 0,
        clever  : 0,
        flashy  : 0,
        forceful: 0,
        quick  : 0,
        sneaky  : 0
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

    //@typeChecker("string")
    setName (name)  {
        if (typeof name == "string") {
            this.#name = name;
        }
        if (typeof name != "string") {
            throw new Error('No String provided');
        }
    }
    getPronouns() {
        return this.#pronouns;
    }
    setPronouns(pronoun) {
        if(typeof pronoun == "string") {
            this.#pronouns = pronoun;
        }
        if (typeof pronoun != "string") {
            throw new Error('No String provided');
        }
    }
    getDescription() {
        return this.#description;
    }
    setDescription(desc) {
        this.#description=desc;
    }
    getRefresh() {
        return this.#refresh;
    }
    setRefresh(rate) {
        this.#refresh = rate;
    }
    getFatePoints () {
        return this.#fatepoints;
    } 
    setFatePoints(number) {
        this.#fatepoints = number;
    }
    getAspects() {
        return this.#aspects;
    }
    setAspects(Obj) {
        this.#aspects = Obj;
    }
    getApproaches () {
        return this.#approaches;
    }
    setApproaches(Obj) {
        this.#approaches = Obj;
    }
    getStunts () {
        return this.#stunts;
    }
    setStunts (stunts) {
        this.#stunts = stunts;
    }
    getStress() {
        return this.#stress;
    }
    setStress(stress) {
        this.#stress = stress;
    }
    getConsequences() {
        return this.#consequences;
    }
    setConsequences(consequences) {
        this.#consequences = consequences;
    }

    checkAlive() {
        let stress = checkStress();
        let consq = checkConsequences();
    }
    checkStress () {
        let sum = 0;
        for (let stress of this.getStress()) {
            sum += stress;
        }
        return stress < 7;
    }
    checkConsequences() {
        let sum = 0;
        for (let con of this.getConsequences()) {
            sum += con;
        }
        return con < 13;
    }
}