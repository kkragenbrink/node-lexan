# Lexan
Lexical Analyzer

[![Build Status](https://travis-ci.org/kkragenbrink/node-lexan.svg?branch=master)](https://travis-ci.org/kkragenbrink/node-lexan)
[![Coverage Status](https://coveralls.io/repos/kkragenbrink/node-lexan/badge.svg?branch=master&service=github)](https://coveralls.io/github/kkragenbrink/node-lexan?branch=master)
[![Dependency Status](https://david-dm.org/kkragenbrink/node-lexan.svg)](https://david-dm.org/kkragenbrink/node-lexan)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/kkragenbrink/node-lexan/blob/master/LICENSE.txt)

[![NPM](https://nodei.co/npm/lexan.png?downloads=true)](https://nodei.co/npm/lexan/)

## Installation

```npm install lexan```

## Usage

```JavaScript
const Lexan = require('lexan');

let lexer = new Lexan({
    Repeat: /^\s*(\d+x)/i,
    Roll: /^\s*(\d+d\d+)/i,
    Subtract: /^\s*(-)/i,
    Add: /^\s*(\+)/,
    Number: /^\s*(\d+)/i,
    Target: /^\s*(>=|<=|<|>|=)/,
});

let tokens = lexer.analyze('1d20+6 (Stealth)');
lexer.addRule('Comment', /^\s*(\(.+?\))/);
let cTokens = lexer.analyze('1d20+6 (Stealth)');

tokens.forEach((token) => { 
    console.log('%s=%s', token.type, token.value); 
});
// Output: Roll=1d20
//         Add=+
//         Number=6
                                                                               
cTokens.forEach((token) => { 
    console.log('%s=%s', token.type, token.value); 
}); 
// Output: Roll=1d20
//         Add=+
//         Number=6
//         Comment=Stealth
```
