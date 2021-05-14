'use strict';

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.object.from-entries.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.slice.js");

var _console, _console2;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _require = require('../lib/mapper.js'),
    compact = _require.compact,
    mapper = _require.mapper;

console.info('***** JUL Data Mapper - Performance Test *****');
var MAX = 10000;

var getRecord = function getRecord(i, nBase) {
  var oNow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Date();
  i = i || 0;
  nBase = nBase || 1000000;
  var id = nBase + i + 1;
  var firstName = 'First' + id.toString().substr(1);
  var lastName = 'Last' + id.toString().substr(1);
  var lastLogin = new Date(oNow - (i << 15));
  var activeTine = (nBase >> 10) + (i & 1023);
  return {
    id: id,
    firstName: firstName,
    lastName: lastName,
    lastLogin: lastLogin,
    activeTine: activeTine
  };
};

var SZ = Object.keys(getRecord()).length;
var oSrc = {
  status: 200,
  result: {
    version: '1.0.5'
  }
};
oSrc.result.items = [];
var oDest = {
  client: true,
  data: {
    version: '1.1.0'
  }
};
var oMeta = Object.keys(getRecord()).map(function (h) {
  return ["result.items[%j].".concat(h), "data.entries[%k].".concat(h, "UI")];
});
var oMap = compact(Object.fromEntries(oMeta));
var oRe = /%[a-z]/;
var now = 0;
var diff = 0;
console.info("\n=== Normal mode - Generating ".concat(MAX, "(").concat(SZ, ") records ==="));
now = new Date();
oSrc.result.items = Array.from({
  length: MAX
}, function (h, i) {
  return getRecord(i, 0, now);
});
console.info('Start mapping ...');
now = new Date();
mapper(oDest, oSrc, oMap, {
  uint: oRe
});
diff = new Date() - now;
console.info("=== Done in ".concat(diff, " ms ==="));
console.info('Displaying the last two entries: ');

(_console = console).log.apply(_console, _toConsumableArray(oDest.data.entries.slice(-2)));

delete oDest.data.entries;
console.info("\n=== Strict mode - Generating ".concat(MAX, "(").concat(SZ, ") records ==="));
now = new Date();
oSrc.result.items = Array.from({
  length: MAX
}, function (h, i) {
  return getRecord(i, 2000000, now);
});
console.info('Start mapping ...');
now = new Date();
mapper(oDest, oSrc, oMap, {
  uint: oRe,
  strict: true
});
diff = new Date() - now;
console.info("=== Done in ".concat(diff, " ms ==="));
console.info('Displaying the last two entries: ');

(_console2 = console).log.apply(_console2, _toConsumableArray(oDest.data.entries.slice(-2)));