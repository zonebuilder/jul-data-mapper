'use strict';

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.string.trim.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.array.reduce.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.array.for-each.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.regexp.constructor.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.array.iterator.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var jul = require('jul');

var rexs = {
  dot: /(\.|\[|\])/g,
  nat: /^(\d|[1-9]\d+)$/
};

var segments = function segments(sNs) {
  return sNs || sNs === 0 || sNs === false ? jul._square2dots(sNs.toString(), ':::::').split('.').map(function (sItem) {
    return sItem.replace(/:{5}/g, '.');
  }) : [];
};

var dotted = function dotted(aSeg) {
  return jul.trim(aSeg.map(function (sItem) {
    return sItem.toString().replace(rexs.dot, '\\$1');
  }).join('.'), '.', true);
};

var intersect = function intersect(aNs1, aNs2) {
  var aNs = aNs2.length > aNs1.length ? aNs1 : aNs2;
  var aPair = aNs === aNs1 ? aNs2 : aNs1;
  var aRes = [];

  for (var i = 0; i < aNs.length; i++) {
    var sa = aNs[i].toString();
    var sb = aPair[i].toString();
    var eq = sa === sb;

    if (aRes.length && !eq) {
      return aRes;
    }

    if (eq) {
      aRes.push(sa);
    }
  }

  return aRes;
};

var compact = function compact(oMap) {
  var oRes = Object.keys(oMap).reduce(function (oRes, sKey) {
    var oMapVal = oMap[sKey];

    if (sKey === '.') {
      oRes[sKey] = oMapVal;
      return oRes;
    }

    var aNs1 = segments(sKey);
    var nIntersect = Object.keys(oRes).reduce(function (nIntersect, sItem) {
      if (nIntersect) {
        return nIntersect;
      }

      if (sItem === '.') {
        return 0;
      }

      var aNs2 = segments(sItem);
      var aIntersect = intersect(aNs2, aNs1);
      nIntersect = aIntersect.length;

      if (!nIntersect) {
        return 0;
      }

      var oVal = oRes[sItem];
      var aRest1 = aNs1.slice(nIntersect);
      var aRest2 = aNs2.slice(nIntersect);

      if (aRest1.length || aRest2.length) {
        var sCommon = dotted(aIntersect);

        if (!oRes[sCommon] || _typeof(oRes[sCommon]) !== 'object') {
          oRes[sCommon] = {};
        }

        if (aRest2.length) {
          oRes = Object.keys(oRes).reduce(function (oAcc, s) {
            if (s === sItem) {
              oAcc[sCommon] = oRes[sCommon];
              oAcc[sCommon][dotted(aRest2)] = oVal;
            } else {
              oAcc[s] = oRes[s];
            }

            return oAcc;
          }, {});
        } else {
          if (_typeof(oVal) !== 'object') {
            oRes[sCommon]['.'] = oVal;
          }
        }

        if (aRest1.length) {
          oRes[sCommon][dotted(aRest1)] = oMapVal;
        } else {
          oRes[sCommon]['.'] = oMapVal;
        }
      } else {
        if (!oVal || _typeof(oVal) !== 'object') {
          oRes[sItem] = oMapVal;
        } else {
          oRes[sItem]['.'] = oMapVal;
        }
      }

      return nIntersect;
    }, 0);

    if (!nIntersect) {
      oRes[dotted(aNs1)] = oMapVal;
    }

    return oRes;
  }, {
    '.': '.'
  });
  Object.keys(oRes).forEach(function (sKey) {
    var oVal = oRes[sKey];

    if (oVal && _typeof(oVal) === 'object') {
      oRes[sKey] = compact(oVal);
    } else if (typeof oVal === 'string' && oVal !== '.') {
      oRes[sKey] = jul._square2dots(oVal);
    }
  });
  return oRes;
};

var mapper = function mapper(oDest, oSrc, oMap, oConfig) {
  oConfig = oConfig || {};
  var bStart = !oConfig._level;

  if (bStart) {
    oConfig = Object.assign({}, oConfig);
  }

  oConfig.uint = oConfig.uint || /\$[a-z]/;

  if (_typeof(oConfig.uint) !== 'object') {
    oConfig.uint = new RegExp(oConfig.uint.toString().split('').map(function (c) {
      return '\\x' + c.charCodeAt(0).toString(16);
    }).join(''));
  }

  oConfig.prefixProp = oConfig.prefixProp || '_mapToPrefix';
  oConfig.strict = oConfig.strict || false;
  oConfig._level = oConfig._level || {
    instSrc: jul.instance({
      nsRoot: oSrc
    }),
    instDest: jul.instance({
      nsRoot: oDest
    }),
    indexes: [],
    depth: 0,
    splits: 0,
    hash: []
  };
  var oLevel = oConfig._level;

  if (typeof oMap['.'] === 'undefined') {
    oMap = compact(oMap);
  }

  var oDotVal = oMap['.'];
  var aIx = oDotVal && _typeof(oDotVal) === 'object' ? oDotVal : null;
  var bKeep = oConfig.strict && !aIx && typeof oDotVal !== 'undefined';
  var sMapPrefix = oMap[oConfig.prefixProp];

  if (!aIx) {
    oMap = Object.assign({}, oMap);
  }

  delete oMap[oConfig.prefixProp];

  if (oConfig.strict || aIx) {
    delete oMap['.'];
  }

  var aKeys = aIx ? aIx[1] : Object.keys(oMap);

  if (bKeep) {
    oMap['.'] = oDotVal;
    aKeys.push('.');
  }

  aKeys.forEach(function (sKey, ix) {
    var oMapVal = _typeof(oMap[sKey]) !== 'object' ? jul.trim(!sMapPrefix || sKey === '.' ? oMap[sKey].toString() : sMapPrefix + '.' + oMap[sKey], '.', true) : oMap[sKey];

    if (!oMapVal) {
      return;
    }

    if (aIx) {
      oLevel.indexes[oLevel.depth - 1] = aIx[0][ix];
    }

    if (oLevel.splits !== 1 && (oLevel.splits || oConfig.uint.test(sKey))) {
      var aRex = sKey.split(oConfig.uint);
      var sParent = dotted(segments(aRex[0]).filter(function (sItem) {
        return sItem;
      }));
      var oTo = oLevel.instSrc.get(sParent);

      if (!oTo || _typeof(oTo) !== 'object') {
        return;
      }

      var aIv = [[], []];
      var oNewMap = {};
      var aIterate = typeof oTo.keys === 'function' ? oTo.keys() : Object.keys(oTo);

      var _iterator = _createForOfIteratorHelper(aIterate),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var i = _step.value;
          var x = i.toString().replace(rexs.dot, '\\$1');
          var s = sKey.replace(oConfig.uint, x);
          aIv[0].push(x);
          aIv[1].push(s);
          oNewMap[s] = oMapVal;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      oNewMap['.'] = aIv;
      oLevel.splits = aRex.length - 1;
      oLevel.depth++;
      oLevel.indexes.length = oLevel.depth;
      mapper(oDest, oSrc, oNewMap, oConfig);
      oLevel.depth--;
      oLevel.splits = 0;
    } else {
      oSrc = oLevel.instSrc.get(jul.trim(sKey, '.', true));

      if (typeof oSrc === 'undefined') {
        return;
      }

      if (_typeof(oMapVal) === 'object') {
        oLevel.splits = 0;
        var oInst = oLevel.instSrc;
        oLevel.instSrc = jul.instance({
          nsRoot: oSrc
        });
        mapper(oDest, oSrc, oMapVal, oConfig);
        oLevel.instSrc = oInst;
      } else {
        if (oConfig.strict) {
          var aPath = segments(oMapVal).map(function (sItem) {
            return oConfig.uint.test(sItem) ? '$$n' : sItem;
          });

          for (var j = 0; j < oLevel.hash.length; j++) {
            var aItem = oLevel.hash[j];
            var aIntersect = intersect(aPath, aItem);

            if (aIntersect.length === aPath.length && aIntersect.length !== aItem.length) {
              return;
            } else if (aIntersect.length === aPath.length && aPath.length === aItem.length) {
              j = oLevel.hash.length + 1;
            } else if (aIntersect.length === aItem.length && aIntersect.length !== aPath.length) {
              oLevel.hash[j] = aPath;
              j = oLevel.hash.length + 1;
            }
          }

          if (j === oLevel.hash.length) {
            oLevel.hash.push(aPath);
          }
        }

        var sMapTo = !oLevel.depth ? oMapVal : oLevel.indexes.reduce(function (sNs, n) {
          return sNs.replace(oConfig.uint, n);
        }, oMapVal);
        oLevel.instDest.ns(sMapTo, oSrc);
      }
    }
  });

  if (bStart) {
    oLevel.hash.length = 0;
    oLevel.indexes.length = 0;
  }

  return oDest;
};

module.exports = {
  mapper: mapper,
  compact: compact
};