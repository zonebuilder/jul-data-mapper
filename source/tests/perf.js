/*
    JUL Data Mapper v1.1.3
    Copyright (c) 2021 The Zonebuilder <zone.builder@gmx.com>
    https://www.npmjs.com/package/jul-data-mapper
    Licenses: GNU GPL2 or later; GNU LGPLv3 or later
*/
/**
    @fileOverview    Performance test for data-mapper
*/
'use strict';
const {compact, mapper} = require('../lib/mapper.js');

console.info('***** JUL Data Mapper - Performance Test *****' );
const MAX = 10000;

const getRecord = (i, nBase, oNow = new Date()) => {
    i = i || 0;
    nBase = nBase || 1000000;
    const id = nBase + i + 1;
    const firstName = 'First' + id.toString().substr(1);
    const lastName = 'Last' + id.toString().substr(1);
    const lastLogin = new Date(oNow - (i << 15));
    const activeTine = (nBase >> 10) + (i & 1023);
    return {id, firstName, lastName, lastLogin, activeTine};
};

const SZ = Object.keys(getRecord()).length;
const oSrc = {status: 200, result: {version: '1.0.5'}};
oSrc.result.items = [];
const oDest = {client: true, data: {version: '1.1.0'}};
const oMeta = Object.keys(getRecord()).map(h => [`result.items[%j].${h}`, `data.entries[%k].${h}UI`]);
const oMap = compact(Object.fromEntries(oMeta));
const oRe = /%[a-z]/;
let now = 0;
let diff = 0;

console.info(`\n=== Normal mode - Generating ${MAX}(${SZ}) records ===` );
now = new Date();
oSrc.result.items = Array.from({length: MAX}, (h, i) => getRecord(i, 0, now));
console.info('Start mapping ...');
now = new Date();
mapper(oDest, oSrc, oMap, {uint: oRe});
diff = new Date() - now;
console.info(`=== Done in ${diff} ms ===`);
console.info('Displaying the last two entries: ');
console.log(...oDest.data.entries.slice(-2));
delete oDest.data.entries;

console.info(`\n=== Strict mode - Generating ${MAX}(${SZ}) records ===` );
now = new Date();
oSrc.result.items = Array.from({length: MAX}, (h, i) => getRecord(i, 2000000, now));
console.info('Start mapping ...');
now = new Date();
mapper(oDest, oSrc, oMap, {uint: oRe, strict: true});
diff = new Date() - now;
console.info(`=== Done in ${diff} ms ===`);
console.info('Displaying the last two entries: ');
console.log(...oDest.data.entries.slice(-2));

