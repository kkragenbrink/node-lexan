'use strict';

class Token {
    constructor (value, type) {
        let jvalue = value;
        try { jvalue = JSON.parse(value); }
        catch (e) {
            // Probably not a serialized token, then.
        }

        // Serialized token
        if (jvalue !== value && !type) {
            if (jvalue.value && jvalue.type) {
                value = jvalue.value;
                type = jvalue.type;
            }
            // Just kidding
        }

        if (!type || typeof type !== 'string') { throw new TypeError('Invalid type.'); }

        Object.defineProperty(this, 'type', {
            configurable: false,
            enumerable: false,
            value: type,
            writable: false
        });

        Object.defineProperty(this, 'value', {
            configurable: false,
            enumerable: false,
            value: value,
            writable: false
        });
    }

    toString () {
        return this.value;
    }

    toJSON () {
        return {
            value: this.value,
            type: this.type
        }
    }
}

module.exports = Token;
