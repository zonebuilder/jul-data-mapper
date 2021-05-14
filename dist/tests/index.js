'use strict';

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.object.from-entries.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.object.entries.js");

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
  pref: 'result.show'
};
console.info('// source -> destination');
console.info(tools.obj2str(mapper(oDest, oSrc, oMap)));
console.info('// destination -> source');
var oReverseMap = Object.fromEntries(Object.entries(oMap).map(function (aItem) {
  return aItem.reverse();
}));
console.info(tools.obj2str(mapper({}, oDest, oReverseMap)));
console.info('// using a more compact form of mapping');
var oCompactMap = {
  'server': 'result.source',
  'items[$u]': {
    _mapTo: 'result.entries[$u]',
    id: 'uid',
    name: 'fullName'
  },
  'grid[$i][$j]': 'map[$i][$j].value',
  pref: 'result.show'
};
console.info(tools.obj2str(mapper({}, oSrc, oCompactMap, {
  prefixProp: '_mapTo'
})));