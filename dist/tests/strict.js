'use strict';

var _require = require('../lib/mapper.js'),
    mapper = _require.mapper;

var tools = require('jul').parser({
  _tabString: '  '
});

var oSrc = {
  server: 'express',
  items: [{
    id: 101,
    name: 'Ana'
  }, {
    id: 102,
    name: 'Bell'
  }, {
    id: 103,
    name: 'Kevin'
  }],
  pref: {
    perPage: 25,
    filter: false
  },
  grid: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
};
var oDest = {
  version: '1.0.0'
};
var oMap = {
  'server': 'result.source',
  'items[$u].id': 'result.entries[$u].uid',
  'items[$u].name': 'result.entries[$u].fullName',
  'grid[$i][$j]': 'map[$i][$j].value',
  pref: 'result.show',
  items: 'result',
  'grid[$i]': 'map[$i]',
  'grid[1][1]': 'result.entries',
  'pref.filter': 'abc\\.123[efg\\.456]'
};
console.info('// strict mode - descendant values won\'t be overwritten when mapping ');
console.info(tools.obj2str(mapper(oDest, oSrc, oMap, {
  strict: true
})));