'use strict';

const Token = require('./Token');
const extend = require('extend');

const EOS_TOKEN = new Token(null, 'EOS');

class LexicalAnalyzer {
    constructor (rules) {

        rules = extend({}, rules || {});

        Object.defineProperty(this, 'rules', {
            configurable: false,
            enumerable: false,
            value: rules,
            writeable: false
        });

        Object.defineProperty(this, 'stream', {
            configurable: false,
            enumerable: false,
            value: null,
            writable: null
        })
    }

    static get EOSTOKEN () {
        return EOS_TOKEN;
    }

    addRule (rule, definition) {
        this.rules[rule] = definition;
    }

    removeRule (rule) {
        delete this.rules[rule];
    }
}

module.exports = LexicalAnalyzer;
