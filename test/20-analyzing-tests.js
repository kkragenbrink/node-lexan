'use strict';

const assert = require('chai').assert;
const extend = require('extend');
const rules = {
    Repeat: /^\s*(\d+x)/i,
    Roll: /^\s*(\d+d\d+)/i,
    Subtract: /^\s*(-)/i,
    Add: /^\s*(\+)/,
    Number: /^\s*(\d+)/i,
    Target: /^\s*(>=|<=|<|>|=)/,
    Comment: /^\s*(\(.+?\))/
};


describe ('String analysis', () => {
    const Lexan = require('../');
    let instance = new Lexan(rules);

    it ('should parse a string into tokens', () => {
        let output = instance.analyze('1d20+5');

        assert.equal(output.length, 3);
        assert.equal(output[0].type, 'Roll');
        assert.equal(output[1].type, 'Add');
        assert.equal(output[2].type, 'Number');
    });

    it ('should be reusable', () => {
        let output1 = instance.analyze('1d20+5');

        assert.equal(output1.length, 3);
        assert.equal(output1[0].type, 'Roll');
        assert.equal(output1[1].type, 'Add');
        assert.equal(output1[2].type, 'Number');

        let output2 = instance.analyze('1d20-3');

        assert.equal(output2.length, 3);
        assert.equal(output2[0].type, 'Roll');
        assert.equal(output2[1].type, 'Subtract');
        assert.equal(output2[2].type, 'Number');
    });
});
