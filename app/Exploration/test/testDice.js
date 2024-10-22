import * as Dice from "../Dice.js";
import assert from 'node:assert/strict';
import { describe, it, test } from 'node:test';

describe('Dice' , (t) => {
    it ('should be between - 4 and 4', () => {
        assert.strictEqual(true, -4 <= Dice.getTurboFateRoll());
        assert.strictEqual(true, 4  >= Dice.getTurboFateRoll());
    });
    it("D6", () => {
        assert.strictEqual(true, 0 <= Dice.getD6());
        assert.strictEqual(true, 6 >= Dice.getD6());

    });
});
