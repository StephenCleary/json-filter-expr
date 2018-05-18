'use strict';
var expect = require('chai').expect;
var compile = require('../dist/index.js').compile;
describe('filter ""', () => {
    var filter = compile('');
    it('matches true', () => { expect(filter(true)).to.equal(true); });
    it('matches false', () => { expect(filter(false)).to.equal(true); });
    it('matches null', () => { expect(filter(null)).to.equal(true); });
    it('matches ""', () => { expect(filter("")).to.equal(true); });
    it('matches {}', () => { expect(filter({})).to.equal(true); });
    it('matches []', () => { expect(filter([])).to.equal(true); });
});
describe('filter "true"', () => {
    var filter = compile('true');
    it('matches true', () => { expect(filter(true)).to.equal(true); });
    it('does not match false', () => { expect(filter(false)).to.equal(false); });
    it('does not match null', () => { expect(filter(null)).to.equal(false); });
    it('does not match ""', () => { expect(filter("")).to.equal(false); });
    it('does not match {}', () => { expect(filter({})).to.equal(false); });
    it('does not match [true]', () => { expect(filter([true])).to.equal(false); });
});
describe('filter ">3 AND < 5"', () => {
    var filter = compile('>3 AND < 5');
    it('matches 4', () => { expect(filter(4)).to.equal(true); });
    it('does not match "4"', () => { expect(filter("4")).to.equal(false); });
    it('does not match 3', () => { expect(filter(3)).to.equal(false); });
    it('does not match 5', () => { expect(filter(5)).to.equal(false); });
    it('does not match true', () => { expect(filter(true)).to.equal(false); });
});
describe('filter ">3 AND < 5 OR true"', () => {
    it('is rejected', () => { expect(() => compile('>3 AND < 5 OR true')).to.throw(); });
});
describe('filter "(>3 AND < 5) OR true"', () => {
    var filter = compile('(>3 AND < 5) OR true');
    it('matches 4', () => { expect(filter(4)).to.equal(true); });
    it('does not match 3', () => { expect(filter(3)).to.equal(false); });
    it('does not match 5', () => { expect(filter(5)).to.equal(false); });
    it('matches true', () => { expect(filter(true)).to.equal(true); });
});
