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


describe ('A Lexical Analyzer requires rules', () => {
    const Lexan = require('../');
    let instance;

    it ('should not require rules to create a new instance', () => {
        assert.doesNotThrow(() => {
            new Lexan;
        })
    });

    it ('should allow you to pass rules in during instantiation', () => {
        instance = new Lexan(rules);
        assert.deepEqual(instance.rules, rules);
    });

    it ('should allow rules to be removed', () => {
        let myRules = extend({}, rules);
        delete myRules.Comment;

        assert.notDeepEqual(myRules, rules);
        assert.deepEqual(instance.rules, rules);
        instance.removeRule('Comment');
        assert.deepEqual(instance.rules, myRules);
    });

    it ('should allow new rules to be added', () => {
        assert.notDeepEqual(instance.rules, rules);
        instance.addRule('Comment', rules.Comment);
        assert.deepEqual(instance.rules, rules);
    });
});