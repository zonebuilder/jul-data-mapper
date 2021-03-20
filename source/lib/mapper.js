/*
    JUL jul-data-mapper v1.0.5
    Copyright (c) 2021 The Zonebuilder <zone.builder@gmx.com>
    https://www.npmjs.com/package/jul-data-mapper
    Licenses: GNU GPL2 or later; GNU LGPLv3 or later
*/
/**
    @fileOverview    Use this tool to map a JavaScript object from a data schema to another data schema<br>
    Use with parsed JSON responses or any native JavaScript object structures.<br>
    Code example:
    <code><pre>
    'use strict';
    const {mapper} = require('jul-data-mapper');
    
    const oSrc = {
        server: 'express',
        items: [
            {id: 101, name: 'Ana'},
            {id: 102, name: 'Bell'},
            {id: 103, name: 'Kevin'}
        ],
        pref: {perPage: 25, filter: false},
        grid: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    };
    const oDest = {version: '1.0.0'};
    const oMap = {
        'server': 'result.source',
        'items[$u].id': 'result.entries[$u].uid',
        'items[$u].name': 'result.entries[$u].fullName',
        'grid[$i][$j]': 'map[$i][$j].value',
        pref: 'result.show'
    };
    
	// source -> destination
    console.info(
        mapper(oDest, oSrc, oMap)
    );
    
    const oReverseMap = Object.fromEntries(Object.entries(oMap).map(aItem => aItem.reverse()));
    // destination -> source
    console.info(
        mapper({}, oDest, oReverseMap)
    );
    </pre></code>
    @author    {@link https://www.google.com/search?hl=en&num=50&start=0&safe=0&filter=0&nfpr=1&q=The+Zonebuilder+web+development+programming+IT+society+philosophy+politics|The Zonebuilder}
    @version    1.0.5
*/
/**
    Converts an object to another using a namespace path mapping.<br>
    Isomorphic: works both in backends and in frontends via e.g. webpack
    @module jul-data-mapper
 */
'use strict';
const jul = require('jul');

/**
    Gets the array of segments for a JavaScript path<br>
    e.g. <code>'a.b.c[1[2].d' => ['a', 'b', 'c', '1', '2', 'd']  </code>
    @param    {String}    sNs    A JavaScript (namespace) path
    @returns    {Array}    An array of path segments from left to right
    @private
*/
const segments = sNs => sNs || sNs === 0 || sNs === false ?
    jul._square2dots(sNs.toString(), ':::::').split('.').map(sItem => sItem.replace(/:{5}/g, '.')) : [];

/**
    Makes a dotted path from an array of path segments<br>
    e.g. <code>['a', 'b', 1, 0, 'c'] => 'a.b.1.0.c'</code>
    @param    {Array}    aSeg    An array of path segments
    @returns    {String}    A dotted (namespace) path
    @private
*/
const dotted = aSeg => jul.trim(aSeg.map(sItem => sItem.toString().replace(/\./g, '\\.')).join('.'), '.', true);

/**
    Gets the intersection of two arrays of path segments
    @param    {Array}    aNs1    First array to intersect
    @param    {Array}    aNs2    Second array to intersect
    @returns    {Array}    Empty array or array of common segments from the beginning
    @private
*/
const intersect = (aNs1, aNs2) => {
    const aNs = aNs2.length > aNs1.length ? aNs1 : aNs2;
    const aPair = aNs === aNs1 ? aNs2 : aNs1;
    const aRes = [];
    for (let i = 0; i < aNs.length; i++) {
        const sa = aNs[i].toString();
        const sb = aPair[i].toString();
        const eq = sa === sb;
        if (aRes.length && !eq) { return aRes; }
        if (eq) { aRes.push(sa); }
    }
    return aRes;
};

/**
    Compacts a mapping (key:value) object into a tree-like structure
    @param    {Object}    oMap    Key-value object to compact
    @returns    {Object}    The compacted object
*/
const compact = oMap => {
    const oRes = Object.keys(oMap).reduce((oRes, sKey) => {
        const oMapVal = oMap[sKey];
        if (sKey === '.') {
            oRes[sKey] = oMapVal;
            return oRes;
        }
        const aNs1 = segments(sKey);
        const nIntersect = Object.keys(oRes).reduce((nIntersect, sItem) => {
            if (nIntersect) { return nIntersect; }
            if (sItem === '.') { return 0; }
            const aNs2 = segments(sItem);
            const aIntersect = intersect(aNs2, aNs1);
            nIntersect = aIntersect.length;
            if (!nIntersect) { return 0; }
            const oVal = oRes[sItem];
            const aRest1 = aNs1.slice(nIntersect);
            const aRest2 = aNs2.slice(nIntersect);
            if (aRest1.length || aRest2.length) {
                const sCommon = dotted(aIntersect);
                if (!oRes[sCommon] || typeof oRes[sCommon] !== 'object') { oRes[sCommon] = {}; }
                if (aRest2.length) {
                    oRes = Object.keys(oRes).reduce((oAcc, s) => {
                        if (s === sItem) {
                            oAcc[sCommon] = oRes[sCommon];
                            oAcc[sCommon][dotted(aRest2)] = oVal;
                        }
                        else {
                            oAcc[s] = oRes[s];
                        }
                        return oAcc;
                    }, {});
                }
                else {
                    if (typeof oVal !== 'object') { oRes[sCommon]['.'] = oVal; }
                }
                if (aRest1.length) { oRes[sCommon][dotted(aRest1)] = oMapVal; }
                else { oRes[sCommon][ '.'] = oMapVal; }
            }
            else {
                if (!oVal || typeof oVal !== 'object') { oRes[sItem] = oMapVal; }
                else { oRes[sItem]['.'] = oMapVal; }
            }
            return nIntersect;
        }, 0);
        if (!nIntersect) { oRes[dotted(aNs1)] = oMapVal; }
        return oRes;
    }, {'.': '.'});
    Object.keys(oRes).forEach(sKey => {
        const oVal = oRes[sKey];
        if (oVal && typeof oVal === 'object') { oRes[sKey] = compact(oVal); }
        else if (typeof oVal === 'string' && oVal !== '.') { oRes[sKey] = jul._square2dots(oVal); }
    });
    return oRes;
};

/**
    Performs a mapping with a given object from a data schema to another data schema
    @param    {Object}    oDest    The destination object where the mapped values are applied over
    @param    {Object}    oSrc    The source object
    @param    {Object}    oMap    A key-value hash (mapping) between namespace paths in the source and those in the destination
    @param    {Object}    [oConfig]    Optional configuration object with any of the following options:<ul>
    <li><code>uint {RegExp|String}</code> - regular expression or string to match an array index
    placeholder e.g. <code>'$n'</code>. <br>Defaults to <code>/\$[a-z]/</code></li>
    <li><code>prefixProp {String}</code> - name of a property of the mapping the will be used
    as a prefix when computing the destination namespace for the current siblings.
    <br>Defaults to <code>'_mapToPrefix'</code></li>
    <li><code>strict {Boolean}</code> - performs checkings of not overwriting descendant values
    that are already. <br>Defaults tO <code>false</code></li>
    </ul>
    @returns    {Object}    The destination object
*/
const mapper = (oDest, oSrc, oMap, oConfig) => {
    oConfig = oConfig || {};
    oConfig.uint = oConfig.uint || /\$[a-z]/;
    if (typeof oConfig.uint !== 'object') {
        oConfig.uint = new RegExp(oConfig.uint.toString().split('').map(c => {
            return '\\x' + c.charCodeAt(0).toString(16);
        }).join(''));
    }
    oConfig.prefixProp = oConfig.prefixProp || '_mapToPrefix';
    oConfig.strict = oConfig.strict || false;
    oConfig._level = oConfig._level || {
        instSrc: jul.instance({nsRoot: oSrc}),
        instDest: jul.instance({nsRoot: oDest}),
        depth: 0,
        indexes: [],
        hash: []
    };
    const oLevel = oConfig._level;
    if (typeof oMap['.'] === 'undefined') { oMap = compact(oMap); }
    const aKeys = Object.keys(oMap);
    (oConfig.strict ? aKeys.filter(sKey => sKey !== '.').concat('.') : aKeys).forEach(sKey => {
        if (!sKey) { return; }
        const oMapVal = typeof oMap[sKey] === 'object' ? oMap[sKey] :
            jul.trim([].concat(oMap[oConfig.prefixProp] || [], oMap[sKey]).join('.'), '.', true);
        if (!oMapVal) { return; }
        if (oConfig.uint.test(sKey)) {
            const sParent = dotted(segments(sKey.split(oConfig.uint)[0]).filter(sItem => sItem));
            const oTo = oLevel.instSrc.get(sParent);
            if (!oTo || typeof oTo !== 'object') { return; }
            const oNewLevel = jul.apply({
                depth: oLevel.depth + 1
            }, oLevel, true);
            oLevel.indexes[oLevel.depth] = 0;
            for (const oItem of oTo) {
                if (typeof oItem !== 'undefined') {
                    const oNewMap = {'.': '.'};
                    oNewMap[sKey.replace(oConfig.uint, oLevel.indexes[oLevel.depth])] =  oMap[sKey];
                    mapper(oDest, oSrc, oNewMap, jul.apply({
                        _level: oNewLevel
                    }, oConfig, true));
                }
                oLevel.indexes[oLevel.depth]++;
            }
        }
        else {
            oSrc = oLevel.instSrc.get(jul.trim(sKey, '.', true));
            if (typeof oSrc === 'undefined') { return; }
            if (typeof oMapVal === 'object') {
                const oNewLevel = jul.apply({
                    instSrc: jul.instance({nsRoot: oSrc})
                }, oConfig._level, true);
                mapper(oDest, oSrc, oMap[sKey], jul.apply({
                    _level: oNewLevel
                }, oConfig, true));
            }
            else {
                if (oConfig.strict) {
                    const aPath = segments(oMapVal).map(sItem => oConfig.uint.test(sItem) ? '$$n' : sItem);
                    for (var j = 0; j < oLevel.hash.length; j++) {
                        const aItem = oLevel.hash[j];
                        const aIntersect = intersect(aPath, aItem);
                        if (aIntersect.length === aPath.length && aIntersect.length !== aItem.length) { return; }
                        else if (aIntersect.length === aPath.length && aPath.length === aItem.length) { j = oLevel.hash.length + 1;  }
                        else if (aIntersect.length === aItem.length && aIntersect.length !== aPath.length) {
                            oLevel.hash[j] = aPath;
                            j = oLevel.hash.length + 1; 
                        }
                    }
                    if (j === oLevel.hash.length) { oLevel.hash.push(aPath); }
                }
                const sMapTo = !oLevel.depth || !oConfig.uint.test(oMapVal) ? oMapVal :
                    oLevel.indexes.slice(0, oLevel.depth).reduce((sNs, n) => {
                        return sNs.replace(oConfig.uint, n);
                    }, oMapVal);
                oLevel.instDest.ns(sMapTo, oSrc);
            }
        }
    });
    return oDest;
};

module.exports = {mapper, compact};
