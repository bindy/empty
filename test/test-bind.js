var test = require('tape');
var Empty = require('../.');

var EventEmitter = require('wolfy87-eventemitter');

Empty.configure({ events: EventEmitter });



test('Empty#bind', function (t) {
  t.plan(4);

  var array = [1, 2, 3];
  var __ = new Empty();

  var collection = __.bind(array);

  __.on('push', function (array, length) {
    t.ok(array, 'events fire');
  });

  var length = collection.push(4);

  t.equal(length, 4, 'method returns');
  t.equal(array[3], 4, 'method works');
  t.ok(collection.id(), 'Empty#id works on uninitialized objects');
});

test('Empty#wrap', function (t) {
  t.plan(4);

  var array = [1, 2, 3];
  var collection = Empty.wrap(array);

  collection.on('pop', function (array, last) {
    t.ok(array, 'events fire');
  });

  var last = collection.pop();

  t.equal(last, 3, 'method returns');
  t.equal(array.length, 2, 'method works');
  t.ok(collection.id(), 'Empty#id works on uninitialized objects');
});