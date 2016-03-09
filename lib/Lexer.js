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
            writable: true
        })
    }

    static get EOSTOKEN () {
        return EOS_TOKEN;
    }

    addRule (rule, definition) {
        this.rules[rule] = definition;
    }

    analyze (input) {
        this.prepare(input);

        let output = [];
        let nextToken;

        while ((nextToken = this.getNextToken()) !== EOS_TOKEN) {
            output.push(nextToken);
        }

        return output;
    }

    getNextToken () {
        if (this.stream.length === 0 || this.stream === null) {
            return EOS_TOKEN;
        }

        for (let rule in this.rules) {
            let expression = this.rules[rule];
            let matches = expression.exec(this.stream);

            if (matches) {
                let match = matches[1];
                this.stream = this.stream.substring(this.stream.indexOf(match) + match.length);

                return new Token(match, rule);
            }
        }

        throw new Error('No matches found.');
    }

    prepare (input) {
        this.stream = input;
    }

    removeRule (rule) {
        delete this.rules[rule];
    }
}

module.exports = LexicalAnalyzer;
