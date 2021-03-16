/*
    JUL Data Mapper v1.0.0
    Copyright (c) 2021 The Zonebuilder <zone.builder@gmx.com>
    https://www.npmjs.com/package/data-mapper
    Licenses: GNU GPL2 or later; GNU LGPLv3 or later
*/
/**
    @fileOverview    README.md source links cleanup
*/
'use strict';
const fs = require('fs');

const sText = fs.readFileSync('README.md', 'utf8').replace(/<a(\s|\S)+?\/a>,?/g, sMatch => {
    const aParts = sMatch.split('href="mapper.js.html');
    if (aParts.length < 2) { return sMatch; }
    const aHash = aParts[1].split('"').shift().split('#');
    if (aHash.length < 2) { return ''; }
    const n = aHash.pop().split('line').pop();
    return `<a href="source/lib/mapper.js#L${n}">mapper.js, line ${n}</a>`;
	
	
});
fs.writeFileSync('README.md', sText);
