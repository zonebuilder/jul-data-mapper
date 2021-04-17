/*
    JUL Data Mapper v1.1.1
    Copyright (c) 2021 The Zonebuilder <zone.builder@gmx.com>
    https://www.npmjs.com/package/jul-data-mapper
    Licenses: GNU GPL2 or later; GNU LGPLv3 or later
*/
/**
    @fileOverview    Strict mapping test for data-mapper
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
    pref: 'result.show',
    items: 'result',
    'grid[$i]': 'map[$i]',
    'grid[1][1]': 'result.entries',
    'pref.filter': 'abc\\.123[efg\\.456]'
};

console.info('// strict mode - descendant values won\'t be overwritten when mapping ');
console.info(tools.obj2str(
    mapper(oDest, oSrc, oMap, {strict: true})
));
