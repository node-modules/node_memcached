"use strict";

var assert = require('assert');
var _ = require('lodash');
var should = require('should');
var config = require('./config');

var PORT = config.port;
var HOST = config.host;
var username = config.username;
var password = config.password;
var memcached = require("../index");

var client = memcached.createClient(PORT, HOST, {
  username: username,
  password: password
});

describe('#touch', function () {
  
  it('expiration should work', function (done) {
    var temp = (new Date).getTime();
    
    client.add(temp, 'add test value', 1, function (err, data) {
      should.not.exist(err);

      client.get(temp, function (err, data) {
        should.not.exist(err);
        should(data).eql("add test value");
      });

      setTimeout(function () {
        client.touch(temp, 5, function (err, data) {
          should.not.exist(err);
        });
      }, 500);

      setTimeout(function () {
        client.get(temp, function (err, data) {
          should.not.exist(err);
          should(data).eql("add test value");
          done();
        });
      }, 4000);        

    });

  });

});
