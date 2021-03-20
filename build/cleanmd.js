/*
    JUL Data Mapper v1.0.5
    Copyright (c) 2021 The Zonebuilder <zone.builder@gmx.com>
    https://www.npmjs.com/package/jul-data-mapper
    Licenses: GNU GPL2 or later; GNU LGPLv3 or later
*/
/**
    @fileOverview    README.md build & cleanup
*/
'use strict';
Error.stackTraceLimit = 0;
const fs = require('fs');
//const TS = require('turndown');
const h2m = require('h2m');

const block = (sHtml, sTag, sAttr) => {
    const sOpen = '<' + sTag;
    const sClose = '</' + sTag;
    const oRes = sHtml.split(sOpen).reduce((oRes, sDiv, i) => {
        if (oRes.n < 0 || !i) { return oRes; }
        if (!oRes.n && sDiv.indexOf(sAttr) > -1) { oRes.n = 1; }
        else if (oRes.n) { oRes.n++; }
        if (!oRes.n) { return oRes; }
        const aEnd = sDiv.split(sClose);
        if (aEnd.length > oRes.n + 1) { aEnd.length = oRes.n + 1; }
        oRes.n -= aEnd.length - 1;
        if (oRes.n) {
            oRes.divs.push(sDiv);
        }
        else {
            aEnd[aEnd.length - 1] = '';
            oRes.divs.push(aEnd.join(sClose) + '>');
            oRes.n = -1;
        }
        return oRes;
    }, {n: 0, divs: ['']});
    return oRes.divs.join(sOpen).replace(/>\s+</g, '><')
        .replace(/>\s+/g, '>').replace(/\n\x20{4}/g, '\n').replace(/(<br)/g, '\n$1');
};

const sApi = fs.readFileSync('docs/module-jul-data-mapper.html', 'utf8');
const sUsage = fs.readFileSync('docs/index.html', 'utf8');
const sReadme = fs.readFileSync('build/README.html', 'utf8');
const aSeg = [
    `${block(sReadme, 'div', 'id="first"')}`,
    `<div><h2>Usage</h2>${block(sUsage, 'div', 'id="main"')}</div>`,
    `<div><h2>API</h2>${block(sApi, 'div', 'id="main"')}</div>`,
    `${block(sReadme, 'div', 'id="third"')}`
].map(h2m).map(sItem =>
    sItem.replace(/nametype(attributes)?description/gi, '').replace(/\[#~/g, '[').replace(/\n\x20{4}/g, '\n')
        .replace(/\n#{1,2}\s([a-z])/g, '\n#### $1').replace('\n`\n', '\n```js\n').replace('\n`\n', '\n```\n')
        .replace(/\[mapper\.js(\s|\S)+?#line(\d+)\)/g, '[mapper.js, line $2](source/lib/mapper.js#L$2)')
        .replace(/->(\w)/g, '-> $1').replace(/(<optional>)\n/gi, '$1').replace(/\n\s+\n/g, '\n\n')
);
aSeg.push('');
fs.writeFileSync('README.md', aSeg.join('\n\n'));
