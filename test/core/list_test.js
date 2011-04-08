/**
 * The {List} unit tests
 *
 * Copyright (C) 2011 Nikolay Nemshilov
 */
require('../test_helper');

var List  = LeftJS.List;
var array = [1,2,3,4,5];
var list  = new List(array);

describe("List", {
  'constructor': {
    topic: list,

    'should link the original iterable by a reference': function(list) {
      assert.same (list._, array);
    }
  },

  '#first': {
    '\b()': {
      topic: list.first(),

      'should return the first item on the list': function(item) {
        assert.same(item, list._[0]);
      }
    },

    '\b(callback)': {
      topic: function() {
        return list.first(function(item) { return item % 2 == 0; });
      },

      'should return the first item that match the callback': function(item) {
        assert.same(item, 2);
      }
    }
  },

  '#last': {
    '\b()': {
      topic: list.last(),

      'should return the last item on the list': function(item) {
        assert.same(item, list._[list._.length - 1]);
      }
    },

    '\b(callback)': {
      topic: function() {
        return list.last(function(item) { return item % 2 == 0; });
      },

      'should return the last matching item': function(item) {
        assert.same(item, 4);
      }
    }
  },

  '#size()': {
    topic: list.size(),

    'should return the list size': function(size) {
      assert.same(size, list._.length);
    }
  },

  '#item()': {
    topic: list.item(2),

    'should return an item at that index': function(item) {
      assert.same(item, list._[2]);
    }
  },

  '#indexOf': {
    topic: list.indexOf(2),

    'should return left index for the item': function(index) {
      assert.equal(index, list._.indexOf(2));
    }
  },

  '#lastIndexOf': {
    topic: list.lastIndexOf(2),

    'should return the right index for the item': function(index) {
      assert.equal(index, list._.lastIndexOf(2));
    }
  },

  '#each(callback)': {
    topic: function() {
      this.items   = [];
      this.indexes = [];

      return list.each(function(item, index) {
        this.items.push(item);
        this.indexes.push(index);
      }, this);
    },

    'should get through all the items on the list': function(items) {
      assert.deepEqual (this.items, [1,2,3,4,5]);
    },

    'should send the index into the callback': function(items) {
      assert.deepEqual (this.indexes, [0,1,2,3,4]);
    },

    'should return the list object back': function(result) {
      assert.same (result, list);
    }
  },

  '#map(callback)': {
    topic: list.map(function(item) {
      return item * 2;
    }),

    'should make a new list': ensure_new_list,

    'should pack all the mapping results': function(list) {
      assert.deepEqual (list._, [2,4,6,8,10]);
    }
  },

  '#filter(callback)': {
    topic: list.filter(function(item) {
      return item % 2;
    }),

    'should create a new List': ensure_new_list,

    'should pack it with filtered data': function(list) {
      assert.deepEqual (list._, [1,3,5]);
    }
  },

  '#reject(callback)': {
    topic: list.reject(function(item) {
      return item % 2;
    }),

    'should create a new List': ensure_new_list,

    'should filter out all matching elements': function(list) {
      assert.deepEqual (list._, [2,4]);
    }
  },

  '#without(a,b,c)': {
    topic: list.without(1,2,4),

    'should create a new List': ensure_new_list,

    'should filter out listed values': function(list) {
      assert.deepEqual (list._, [3,5]);
    }
  },

  '#compact()': {
    topic: function() {
      this.original = new List([null, '', undefined, 0, 1]);
      return this.original.compact();
    },

    'should create a new List': function(list) {
      assert.instanceOf (list, List);
      assert.notSame    (list, this.original);
    },

    'should filter out nulls and undefineds': function(list) {
      assert.deepEqual (list._, ['', 0, 1]);
    }
  },

  '#toArray()': {
    topic: list.toArray(),

    'should make an array out of the list': function(array) {
      assert.isArray (array);
    },

    'should feed it with the original data': function(array) {
      assert.deepEqual (array, list._);
    },

    'should make a clone of the list not refer it by a link': function(array) {
      assert.notSame (array, list._);
    }
  },

  '#clone()': {
    topic: list.clone(),

    'should make a new list': ensure_new_list,

    'should clone the data': function(result) {
      assert.deepEqual (result._, list._);
      assert.notSame   (result._, list._);
    }
  }
}, module);

/**
 * Shortcut to ensure that a new list was created
 *
 * @param {List} list
 * @return void
 */
function ensure_new_list(object) {
  assert.instanceOf (object, List);
  assert.notSame    (object, list);
}