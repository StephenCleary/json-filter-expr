'use strict';
var expect = require('chai').expect;
var compile = require('../dist/index.js').compile;
describe('parsing numbers', () => {
    it('`0` does not match false', () => { expect(compile("0")(false)).to.equal(false); });
    it('`0` does not match 1', () => { expect(compile("0")(1)).to.equal(false); });
    it('`0` matches 0', () => { expect(compile("0")(0)).to.equal(true); });
    it('`3` matches 3', () => { expect(compile("3")(3)).to.equal(true); });
    it('`-13` matches -13', () => { expect(compile("-13")(-13)).to.equal(true); });
    it('`1024` matches 1024', () => { expect(compile("1024")(1024)).to.equal(true); });
    it('`1024.123` matches 1024.123', () => { expect(compile("1024.123")(1024.123)).to.equal(true); });
    it('`-1024.123` matches -1024.123', () => { expect(compile("-1024.123")(-1024.123)).to.equal(true); });
    it('`1024.123e02` matches 102412.3', () => { expect(compile("1024.123e02")(102412.3)).to.equal(true); });
    it('`1024.123e+02` matches 102412.3', () => { expect(compile("1024.123e+02")(102412.3)).to.equal(true); });
    it('`1024.123E02` matches 102412.3', () => { expect(compile("1024.123E02")(102412.3)).to.equal(true); });
    it('`1024.123E+02` matches 102412.3', () => { expect(compile("1024.123E+02")(102412.3)).to.equal(true); });
    it('`1024.123e-02` matches 10.24123', () => { expect(compile("1024.123e-02")(10.24123)).to.equal(true); });
    it('`1024.123e002` matches 102412.3', () => { expect(compile("1024.123e002")(102412.3)).to.equal(true); });
});
