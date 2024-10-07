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
});