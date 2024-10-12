import {Character} from "../Character.js";
import assert from 'node:assert/strict';
import { describe, it, test } from 'node:test';

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



    });
});