'use strict';

require('chai').should();

var encode = require('../lib/encode');

describe('encode()', function () {

  it('should encode URLs', function () {
    var encoded = encode('https://www.uribeacon.org/test');

    encoded[0].should.equal(0x01); // 'https://www.' prefix

    encoded[1].should.equal('u'.charCodeAt(0));
    encoded[2].should.equal('r'.charCodeAt(0));
    encoded[3].should.equal('i'.charCodeAt(0));

    encoded[10].should.equal(0x01); // '.org/' suffix

    encoded[11].should.equal('t'.charCodeAt(0));
    encoded[12].should.equal('e'.charCodeAt(0));
    encoded[13].should.equal('s'.charCodeAt(0));
    encoded[14].should.equal('t'.charCodeAt(0));

    encoded.length.should.equal(15);
  });

  it('should encode URLs and strip trailing slashes', function () {
    encode('https://www.uribeacon.org/')[10].should.equal(0x08); // '.org' suffix
    encode('http://1.at/').length.should.equal(1 + 4); // 1 prefix + 4 characters
  });

  it('should throw a TypeError if something other than a string is provided', function () {
    [123, {}, false].forEach(function (value) {
      encode.bind(encode, value).should.throw(TypeError);
    });
  });

  it('should throw an Error if the encoded URL is longer than 18 bytes', function () {
    encode.bind(encode, 'http://this.is.clearly.longer.than.18.bytes').should.throw(Error, 'Encoded URL (http://this.is.clearly.longer.than.18.bytes) is too long (max 18 bytes): 37 bytes');
  });

  it('should throw an Error if non-http/https URLs are being encoded', function () {
    encode.bind(encode, 'urn:uuid:b1e13d51-5fc9-4d5b-902b-ab668dd54981').should.throw(Error, 'Only "http://" and "https://" URLs can be encoded');
  });

});
