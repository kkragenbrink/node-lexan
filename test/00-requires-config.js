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
});
