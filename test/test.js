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
describe('filter "#true"', () => {
    var filter = compile('#true');
    it('matches true', () => { expect(filter(true)).to.equal(true); });
    it('does not match false', () => { expect(filter(false)).to.equal(false); });
    it('does not match null', () => { expect(filter(null)).to.equal(false); });
    it('does not match ""', () => { expect(filter("")).to.equal(false); });
    it('does not match {}', () => { expect(filter({})).to.equal(false); });
    it('does not match [true]', () => { expect(filter([true])).to.equal(false); });
});
