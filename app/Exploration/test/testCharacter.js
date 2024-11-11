import assert from 'node:assert/strict';
import { describe, it, test } from 'node:test';

import { getReth } from "../Archetype.js";
import {Character} from "../Character.js";
import { Aspect } from "../Aspect.js";
import { Approaches } from "../Approaches.js";

describe('Character' , (t) => {
    it ('assign String as name', () => {
        var CharObj = new Character();

        assert.doesNotThrow(() => CharObj.setName("test"));

    });

    it ('assign String as name equals getName', () => {
        var CharObj = new Character();
        var name = "test";
        CharObj.setName(name);
        assert.strictEqual(name, CharObj.getName());

    });
    it ('assign int as name', () => {
        var CharObj = new Character();

        assert.throws(() => CharObj.setName(123));

    });

    it ('get Stress status', () => {
        var CharObj = new Character();

        assert.strictEqual(true, CharObj.checkAlive());
    });
    it ('test soak with stress', () => {
        var CharObj = new Character();

        assert.strictEqual(0, CharObj.soakwithStress(1));
        assert.strictEqual(0, CharObj.soakwithStress(2));
        assert.strictEqual(0, CharObj.soakwithStress(3));

        assert.strictEqual(4, CharObj.soakwithStress(4));
        assert.strictEqual(1, CharObj.soakwithStress(1));

        var CharObj2 = new Character ();

        assert.strictEqual(1, CharObj2.soakwithStress(4));
    });
    it ('test soak with consequences', () => {
        var CharObj = new Character();

        assert.strictEqual(0, CharObj.soakwithConsq(2));

        assert.strictEqual(-2, CharObj.soakwithConsq(2));
        assert.strictEqual(0, CharObj.soakwithConsq(6));

        assert.strictEqual(7, CharObj.soakwithConsq(7));

    });

    it('test Stunt finding', () => {
        var char = getReth();

        assert.strictEqual("Kata der Unbeugsamen Sonne", char.findfittingStuntsbyAction("defend")[0].name);
        assert.strictEqual("Kata der Unbeugsamen Sonne", char.findfittingStuntsbyApproach("forceful")[0].name);
        assert.strictEqual("Kata der Unbeugsamen Sonne", char.findfittingStuntsbyActionApproach("defend", "forceful")[0].name);


    });
    it("test pronouns handling", () => {
        var charObj = new Character();
        charObj.setPronouns("They");
        assert.strictEqual("They", charObj.getPronouns());

        assert.throws(() => {
            charObj.setPronouns(1234);
        });
    });
    it("test description handling", () => {
        var charObj = new Character();
        charObj.setDescription("They");
        assert.strictEqual("They", charObj.getDescription());
    });
    it("test refresh getter and setter", () => {
        var charObj = new Character();
        charObj.setRefresh(5);
        assert.strictEqual(5, charObj.getRefresh());
    });
    it("test fate points  getter and setter", () => {
        var charObj = new Character();
        charObj.setFatePoints(5);
        assert.strictEqual(5, charObj.getFatePoints());
    });

    it("test aspects getter and setter", () => {
        var charObj = new Character();

        assert.deepEqual("", charObj.getAspects(1));

        charObj.setAspects(1, new Aspect("", "", ""));
        assert.deepEqual(new Aspect("", "", ""), charObj.getAspects(1));

    });
    it("test getter setter approaches", () => {
        let charObj = new Character();

        assert.deepEqual(charObj.getApproaches(), new Approaches(
            0,
            0,
            0,
            0,
            0,
            0
        ));
        let approaches = new Approaches (2,2,2,2,2,2);
        charObj.setApproaches(approaches);

        assert.strictEqual(approaches, charObj.getApproaches());
    });

    it ("test stress setter and getter", () => {
        var charObj = new Character();

        assert.deepEqual(charObj.getStress(), {
            1 : 0,
            2 : 0,
            3 : 0
        });

        let newStress = {
            1 : 1,
            2 : 2,
            3 : 3
        };
        charObj.setStress(newStress);
        assert.strictEqual(charObj.getStress(), newStress);
    });

    it("test consequenses getter and setter", () => {
        var charObj = new Character();

        assert.deepEqual({
            2 : 0,
            4 : 0,
            6 : 0,
        }, charObj.getConsequences());

        let con = {2: 2, 4: 4, 6:6};

        charObj.setConsequences(con);

        assert.strictEqual(con, charObj.getConsequences());
    });

    it("test alive getter and setter", () => {
        let charObj = new Character();

        assert.deepEqual(true, charObj.getAlive());

        charObj.setAlive(false);

        assert.deepEqual(false, charObj.getAlive());
    });

    it("test soak dmg", () => {
        let charObj = new Character();

        charObj.soakDmg(10);

        assert.deepEqual(false, charObj.getAlive());
    });

    it ("test attack", () => {
        let charObj = new Character();

        assert.strictEqual(true, -4 <= charObj.attack());
    });

    it ("test defend", () => {
        let charObj = new Character();

        assert.strictEqual(true, -4 <= charObj.defend());
    });
    it ("test overcome", () => {
        let charObj = new Character();

        assert.strictEqual(true, charObj.overcome(-4));

        assert.strictEqual(true, charObj.overcome(-4, 4));

    });
    it ("test action a bit with Reth", () => {
        let reth = getReth();

        assert.strictEqual(true, -4 <= reth.overcome(-4,4));
        assert.strictEqual(true, -4 <= reth.overcome(-4,4, "quick"));

    });
});