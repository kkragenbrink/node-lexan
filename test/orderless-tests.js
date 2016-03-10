'use strict';

const assert = require('chai').assert;
const rules = {
    openGroup: /(\()/,
    closeGroup: /(\))/,
    number: /(\d+)/
};

describe ('lexical analysis is unordered', () => {
    const Lexan = require('../');
    const lexer = new Lexan(rules);

    it ('it should always select the next token available regardless of rule order', () => {
        let results = lexer.analyze('(12)');

        assert.equal(results.length, 3);
        assert.equal(results[0].type, 'openGroup');
        assert.equal(results[1].type, 'number');
        assert.equal(results[2].type, 'closeGroup');
    });

    it ('it should always select the next token available regardless of rule order', () => {
        let results = lexer.analyze('()12');

        assert.equal(results.length, 3);
        assert.equal(results[0].type, 'openGroup');
        assert.equal(results[1].type, 'closeGroup');
        assert.equal(results[2].type, 'number');
    });
});