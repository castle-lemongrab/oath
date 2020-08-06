
'use strict';

const chai = require('chai');
const Oath = require('../../src/oath');
const promises = require('chai-as-promised');

/**
 * @name oath:
 *   Unit tests for the Oath utilities library.
 */
describe('oath', () => {

  let should = chai.should();
  chai.use(promises);

  it('answers yea or nay', () => {

    let fn = (_x, _cb) => { return _cb(null, _x); };
    let err_fn = (_x, _cb) => { return _cb(new Error(_x)); };

    let pfn = Oath.promisify(fn);
    let err_pfn = Oath.promisify(err_fn);

    pfn(1).should.eventually.equal(1);
    err_pfn('oh no').should.be.rejectedWith(Error, 'oh no');
  });

  it('handles multiple results', async () => {

    let fn = (_a, _cb) => { return _cb(null, ..._a); };
    let pfn = Oath.promisify(fn);

    pfn([ 1 ]).should.eventually.equal(1);
    pfn([ 1, 2, 3 ]).should.eventually.deep.equal([ 1, 2, 3 ]);

    let [ x, y ] = await pfn([ 'x', 'y' ]);
    x.should.equal('x'); y.should.equal('y');
  });
});

