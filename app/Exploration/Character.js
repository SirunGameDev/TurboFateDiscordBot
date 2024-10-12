import { Approaches } from "./Approaches.js";
import * as Dice from "./Dice.js";
import { forceful } from "./translations.js";
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
        1 : 0,
        2 : 0,
        3 : 0,
    };
    #consequences = {
        2 : 0,
        4 : 0,
        6 : 0,
    };
    #alive = true;
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
    getAlive() {
        return this.#alive;
    }
    setAlive(bool) {
        this.#alive = bool;
    }
    checkAlive() {
        let stress = this.checkStress();
        let consq = this.checkConsequences();

        return this.#alive && stress && consq;
    }
    checkStress() {
        let obj = this.getStress();
        let sum = this.getSumofObj(obj);
        return sum < 7;
    }
    checkConsequences() {
        let obj = this.getConsequences();
        let sum = this.getSumofObj(obj);
        return sum < 13;
    }
    getSumofObj(obj) {
        let sum = 0;
        for (let prop in obj) {
            sum += obj[prop];
        }
        return sum;
    }

    soakDmg (dmg) {
        dmg = this.soakwithStress(dmg);
        if(dmg <= 0) return;
        dmg = this.soakwithConsq (dmg);
        if(dmg <= 0) return;
        this.setAlive(false);    
    }
    soakwithStress(dmg) {
        let stress = this.getStress();
        let stressfree = new Array();
        for (let key in stress){
            if(dmg <= 0) return 0;

            if (dmg <= key && stress[key] == 0) {
                this.#stress[key] = key;
                dmg = dmg-key;
                return dmg;
            }
            if (dmg > key && stress[key] == 0) {
                
                stressfree.push(key);
            }
        }
        if (stressfree.length > 0) {
            let lastkey = stressfree.pop();
            this.#stress[lastkey] = lastkey;
            return dmg-lastkey;
        }
        return dmg;
    }


    soakwithConsq(dmg) {
        let stress = this.getConsequences();
        let stressfree = new Array();
        for (let key in stress){
            if(dmg <= 0) return 0;

            if (dmg <= key && stress[key] == 0) {
                this.#consequences[key] = key;
                dmg = dmg-key;
                return dmg;
            }
            if (dmg > key && stress[key] == 0) {
                
                stressfree.push(key);
            }
        }
        if (stressfree.length > 0) {
            let lastkey = stressfree.pop();
            this.#consequences[lastkey] = lastkey;
            return dmg-lastkey;
        }
        return dmg;
    }

    soakWith (dmg,obj) {
        // to abstract stress and consqeuences
    }

    attack () {
        // always forceful, stunts
        return this.makeThrow()+this.getApproaches()["forceful"];
    }
    defend(){
        // always forceful, stunts
        return this.makeThrow()+this.getApproaches()["forceful"];
    }
    makeThrow (){
        return Dice.getTurboFateRoll();
    }
}