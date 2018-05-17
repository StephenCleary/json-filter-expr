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
