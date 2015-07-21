'use strict';

require('chai').should();

var encode = require('../lib/encode');
var decode = require('../lib/decode');

var URIS = require('./fixtures/uris.json');

describe('decode()', function () {

  it('should decode an Eddystone URL-encoded buffer to a URL (string)', function () {
    URIS.forEach(function (uri) {
      decode(encode(uri)).should.equal(uri);
    });
  });

  it('should throw a TypeError if something other than a Buffer is provided', function () {
    decode.bind(decode, 'this is not a Buffer').should.throw(TypeError, '"data" is expected to be an instance of Buffer');
  });

  it('should throw an Error if non-http/https URLs are being encoded', function () {
    decode.bind(encode, new Buffer([0xff])).should.throw(Error, '"data" does not seem to be an encoded Eddystone URL');
  });

});
