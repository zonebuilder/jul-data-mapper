/*
    JUL Data Mapper v1.1.1
    Copyright (c) 2021 The Zonebuilder <zone.builder@gmx.com>
    https://www.npmjs.com/package/jul-data-mapper
    Licenses: GNU GPL2 or later; GNU LGPLv3 or later
*/
/**
    @fileOverview    Bidirectional test for jul-data-mapper
*/
'use strict';
const {mapper} = require('../lib/mapper.js');
const tools = require('jul').parser({_tabString: '  '});

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

console.info('// source -> destination');
console.info(tools.obj2str(
    mapper(oDest, oSrc, oMap)
));

console.info('// destination -> source');
const oReverseMap = Object.fromEntries(Object.entries(oMap).map(aItem => aItem.reverse()));
console.info(tools.obj2str(
    mapper({}, oDest, oReverseMap)
));

console.info('// using a more compact form of mapping');
const oCompactMap = {
    'server': 'result.source',
    'items[$u]': {
        _mapTo: 'result.entries[$u]',
        id: 'uid',
        name: 'fullName'
    },
    'grid[$i][$j]': 'map[$i][$j].value',
    pref: 'result.show'
};
console.info(tools.obj2str(
    mapper({}, oSrc, oCompactMap, {prefixProp: '_mapTo'})
));
