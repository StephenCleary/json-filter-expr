'use strict';
var expect = require('chai').expect;
var compile = require('../dist/index.js').compile;
describe('numeric =', () => {
    it('`=3` does not match 4', () => { expect(compile('=3')(4)).to.equal(false); });
    it('`=3` matches 3.0', () => { expect(compile('=3')(3.0)).to.equal(true); });
    it('`=3` matches 3', () => { expect(compile('=3')(3)).to.equal(true); });
    it('`=3` does not match "3"', () => { expect(compile('=3')("3")).to.equal(false); });
    it('`= 3` matches 3', () => { expect(compile('= 3')(3)).to.equal(true); });
    it('`=  3` matches 3', () => { expect(compile('=  3')(3)).to.equal(true); });
});
describe('string =', () => {
    it('`="3"` does not match "3.0"', () => { expect(compile('="3"')("3.0")).to.equal(false); });
    it('`="3"` matches "3"', () => { expect(compile('="3"')("3")).to.equal(true); });
    it('`="3"` does not match 3', () => { expect(compile('="3"')(3)).to.equal(false); });
    it('`= "3"` matches "3"', () => { expect(compile('= "3"')("3")).to.equal(true); });
    it('`=  "3"` matches "3"', () => { expect(compile('=  "3"')("3")).to.equal(true); });
});
describe('numeric <', () => {
    it('`<3` does not match 3', () => { expect(compile('<3')(3)).to.equal(false); });
    it('`<3` matches 2', () => { expect(compile('<3')(2)).to.equal(true); });
    it('`<3` does not match "2"', () => { expect(compile('<3')("2")).to.equal(false); });
    it('`< 3` matches 2', () => { expect(compile('< 3')(2)).to.equal(true); });
    it('`<  3` matches 2', () => { expect(compile('<  3')(2)).to.equal(true); });
});
describe('string <', () => {
    it('`<"bob"` does not match "bob"', () => { expect(compile('<"bob"')("bob")).to.equal(false); });
    it('`<"bob"` matches "boa"', () => { expect(compile('<"bob"')("boa")).to.equal(true); });
    it('`<"3"` does not match 2', () => { expect(compile('<"3"')(2)).to.equal(false); });
    it('`< "bob"` matches "boa"', () => { expect(compile('< "bob"')("boa")).to.equal(true); });
    it('`<  "bob"` matches "boa"', () => { expect(compile('<  "bob"')("boa")).to.equal(true); });
});
describe('numeric >', () => {
    it('`>3` does not match 3', () => { expect(compile('>3')(3)).to.equal(false); });
    it('`>3` matches 4', () => { expect(compile('>3')(4)).to.equal(true); });
    it('`>3` does not match "4"', () => { expect(compile('>3')("4")).to.equal(false); });
    it('`> 3` matches 4', () => { expect(compile('> 3')(4)).to.equal(true); });
    it('`>  3` matches 4', () => { expect(compile('>  3')(4)).to.equal(true); });
});
describe('string >', () => {
    it('`>"bob"` does not match "bob"', () => { expect(compile('>"bob"')("bob")).to.equal(false); });
    it('`>"bob"` matches "bobc"', () => { expect(compile('>"bob"')("bobc")).to.equal(true); });
    it('`>"3"` does not match 4', () => { expect(compile('>"3"')(4)).to.equal(false); });
    it('`> "bob"` matches "bod"', () => { expect(compile('> "bob"')("bod")).to.equal(true); });
    it('`>  "bob"` matches "bod"', () => { expect(compile('>  "bob"')("bod")).to.equal(true); });
});
describe('numeric <=', () => {
    it('`<=3` does not match 4', () => { expect(compile('<=3')(4)).to.equal(false); });
    it('`<=3` matches 3', () => { expect(compile('<=3')(3)).to.equal(true); });
    it('`<=3` matches 2', () => { expect(compile('<=3')(2)).to.equal(true); });
    it('`<=3` does not match "3"', () => { expect(compile('<=3')("3")).to.equal(false); });
    it('`<= 3` matches 3', () => { expect(compile('<= 3')(3)).to.equal(true); });
    it('`<=  3` matches 3', () => { expect(compile('<=  3')(3)).to.equal(true); });
});
describe('string <=', () => {
    it('`<="bob"` does not match "bobc"', () => { expect(compile('<="bob"')("bobc")).to.equal(false); });
    it('`<="bob"` matches "bob"', () => { expect(compile('<="bob"')("bob")).to.equal(true); });
    it('`<="bob"` matches "boa"', () => { expect(compile('<="bob"')("boa")).to.equal(true); });
    it('`<="3"` does not match 3', () => { expect(compile('<="3"')(3)).to.equal(false); });
    it('`<= "bob"` matches "bob"', () => { expect(compile('<= "bob"')("bob")).to.equal(true); });
    it('`<=  "bob"` matches "bob"', () => { expect(compile('<=  "bob"')("bob")).to.equal(true); });
});
describe('numeric >=', () => {
    it('`>=3` does not match 2', () => { expect(compile('>=3')(2)).to.equal(false); });
    it('`>=3` matches 3', () => { expect(compile('>=3')(3)).to.equal(true); });
    it('`>=3` matches 4', () => { expect(compile('>=3')(4)).to.equal(true); });
    it('`>=3` does not match "3"', () => { expect(compile('>=3')("3")).to.equal(false); });
    it('`>= 3` matches 3', () => { expect(compile('>= 3')(3)).to.equal(true); });
    it('`>=  3` matches 3', () => { expect(compile('>=  3')(3)).to.equal(true); });
});
describe('string >=', () => {
    it('`>="bob"` does not match "boa"', () => { expect(compile('>="bob"')("boa")).to.equal(false); });
    it('`>="bob"` matches "bob"', () => { expect(compile('>="bob"')("bob")).to.equal(true); });
    it('`>="bob"` matches "bobc"', () => { expect(compile('>="bob"')("bobc")).to.equal(true); });
    it('`>="3"` does not match 3', () => { expect(compile('>="3"')(3)).to.equal(false); });
    it('`>= "bob"` matches "bob"', () => { expect(compile('>= "bob"')("bob")).to.equal(true); });
    it('`>=  "bob"` matches "bob"', () => { expect(compile('>=  "bob"')("bob")).to.equal(true); });
});
describe('numeric (implicit)', () => {
    it('`3` does not match 4', () => { expect(compile('3')(4)).to.equal(false); });
    it('`3` matches 3.0', () => { expect(compile('3')(3.0)).to.equal(true); });
    it('`3` matches 3', () => { expect(compile('3')(3)).to.equal(true); });
    it('`3` does not match "3"', () => { expect(compile('3')("3")).to.equal(false); });
});
describe('string (implicit)', () => {
    it('`"3.0"` does not match "3"', () => { expect(compile('"3.0"')("3")).to.equal(false); });
    it('`"3"` matches "3"', () => { expect(compile('"3"')("3")).to.equal(true); });
    it('`"3"` does not match 3', () => { expect(compile('"3"')(3)).to.equal(false); });
    it('`"3"` does match "3.0"', () => { expect(compile('"3"')("3.0")).to.equal(true); });
    it('`"test"` does match "test"', () => { expect(compile('"test"')("test")).to.equal(true); });
    it('`"test"` does match "testing"', () => { expect(compile('"test"')("testing")).to.equal(true); });
    it('`"test"` does match "I love to test"', () => { expect(compile('"test"')("I love to test")).to.equal(true); });
    it('`"test"` does match "I love testing"', () => { expect(compile('"test"')("I love testing")).to.equal(true); });
    it('`"test"` does match "More TesTing"', () => { expect(compile('"test"')("More TesTing")).to.equal(true); });
});
describe('bare words (implicit)', () => {
    it('`bare` does not match "bar"', () => { expect(compile('bare')("bar")).to.equal(false); });
    it('`bare` matches "bare"', () => { expect(compile('bare')("bare")).to.equal(true); });
    it('`_3` does not match 3', () => { expect(compile('_3')(3)).to.equal(false); });
    it('`bare` does match "barely"', () => { expect(compile('bare')("barely")).to.equal(true); });
    it('`test` does match "test"', () => { expect(compile('test')("test")).to.equal(true); });
    it('`test` does match "testing"', () => { expect(compile('test')("testing")).to.equal(true); });
    it('`test` does match "I love to test"', () => { expect(compile('test')("I love to test")).to.equal(true); });
    it('`test` does match "I love testing"', () => { expect(compile('test')("I love testing")).to.equal(true); });
    it('`test` does match "More TesTing"', () => { expect(compile('test')("More TesTing")).to.equal(true); });
    it('`null` does match null', () => { expect(compile('null')(null)).to.equal(true); });
    it('`null` does match "null"', () => { expect(compile('null')("null")).to.equal(true); });
    it('`null` does match "nullification"', () => { expect(compile('null')("nullification")).to.equal(true); });
    it('`nul` does not match null', () => { expect(compile('nul')(null)).to.equal(false); });
    it('`true` does match true', () => { expect(compile('true')(true)).to.equal(true); });
    it('`true` does match "true"', () => { expect(compile('true')("true")).to.equal(true); });
    it('`true` does match "-true-"', () => { expect(compile('true')("-true-")).to.equal(true); });
    it('`tru` does not match true', () => { expect(compile('tru')(true)).to.equal(false); });
    it('`false` does match false', () => { expect(compile('false')(false)).to.equal(true); });
    it('`false` does match "false"', () => { expect(compile('false')("false")).to.equal(true); });
    it('`false` does match "falsey"', () => { expect(compile('false')("falsey")).to.equal(true); });
    it('`fal` does not match false', () => { expect(compile('fal')(false)).to.equal(false); });
});
