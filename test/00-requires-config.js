'use strict';

const assert = require('chai').assert;

describe ('A token describes its contents', () => {
    const Token  = require('../lib/Token');

    it ('should describe its value by name', () => {
        let instance = new Token('value', 'type');
        assert.equal(instance.value, 'value');
    });

    it ('should stringify to its value', () => {
        let instance = new Token('value', 'type');
        assert.equal(String(instance), 'value');
    });

    it ('should describe its own type by name', () => {
        let instance = new Token('value', 'type');
        assert.equal(instance.type, 'type');
    });

    it ('should require a type which must be a string.', () => {
        assert.throws(() => {
            new Token('value');
        }, 'Invalid type.');

        assert.throws(() => {
            new Token('value', {});
        }, 'Invalid type.');
    });

    it ('should serialize to JSON', () => {
        let instance = new Token('value', 'type');
        let json = JSON.stringify(instance);
        assert.equal(json, '{"value":"value","type":"type"}');
    });

    it ('should deserialize back to a proper Token', () => {
        let instance = new Token('{"value":"value","type":"type"}');
        assert.equal(instance.value, 'value');
        assert.equal(instance.type, 'type');
    });

    it ('should allow valid json as token values', () => {
        let instance = new Token('{"foo":"bar"}', 'foobar');
        assert.equal(instance.value, '{"foo":"bar"}');
        assert.equal(instance.type, 'foobar');
    });

    it ('should require a type even if a json string value is passed in', () => {
        assert.throws(() => {
            new Token('{"foo":"bar"}');
        }, 'Invalid type.');
    })
});
