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
                this.value = jvalue.value;
                this.type = jvalue.type;
                return;
            }
            // Just kidding
        }

        if (!type || typeof type !== 'string') {
            throw new TypeError('Invalid type.');
        }

        this.value = value;
        this.type = type;
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