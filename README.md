# jul-data-mapper

A tool for mapping a JavaScript object from a data schema to another data schema

## Install

Install with [NPM](https://www.npmjs.com/)

`npm install --save jul-data-mapper`

## Usage

#### mapper.js

Use this tool to map a JavaScript object from a data schema to another data schema

Use with parsed JSON responses or any native JavaScript object structures.

Code example:
```js
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

// destination -> source
const oReverseMap = Object.fromEntries(Object.entries(oMap).map(aItem =>aItem.reverse()));
console.info(
mapper({}, oDest, oReverseMap)
);

// using a more compact form of mapping
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
console.info(
mapper({}, oSrc, oCompactMap, {prefixProp: '_mapTo'})
);

```
Version:
- 1.1.2

Author:
- [The Zonebuilder](https://www.google.com/search?hl=en&amp;num=50&amp;start=0&amp;safe=0&amp;filter=0&amp;nfpr=1&amp;q=The+Zonebuilder+web+development+programming+IT+society+philosophy+politics)

Source:
- [mapper.js, line 7](source/lib/mapper.js#L7)

## API

#### jul-data-mapper

Converts an object to another using a namespace path mapping.

Isomorphic: works both in backends and in frontends via e.g. webpack

Source:
- [mapper.js, line 63](source/lib/mapper.js#L63)

### Methods
[compact](#~compact)
#### (inner) compact(oMap)&rarr; {Object}

Compacts a mapping (key:value) object into a tree-like structure

##### Parameters:
`oMap`Object
Key-value object to compact

Source:
- [mapper.js, line 128](source/lib/mapper.js#L128)

[mapper](#~mapper)
#### (inner) mapper(oDest, oSrc, oMap, oConfigopt)&rarr; {Object}

Performs a mapping with a given object from a data schema to another data schema

##### Parameters:
`oDest`Object
The destination object where the mapped values are applied over

`oSrc`Object
The source object

`oMap`Object
A key-value hash (mapping) between namespace paths in the source and those in the destination

`oConfig`Object
<optional>
Optional configuration object with any of the following options:
- `uint {RegExp|String}`- regular expression or string to match an array index
placeholder e.g. `'$n'`. 

Defaults to `/\$[a-z]/`
- `prefixProp {String}`- name of a property of the mapping the will be used
as a prefix when computing the destination namespace for the current siblings.

Defaults to `'_mapToPrefix'`
- `strict {Boolean}`- performs checkings of not overwriting descendant values
that are already mapped. 

Defaults to `false`

Source:
- [mapper.js, line 200](source/lib/mapper.js#L200)

## License

Licensed under GNU GPLv2 or later and under GNU LGPLv3 or later. See enclosed 'licenses' folder.

## About

This utility is based on [JUL](https://www.npmjs.com/package/jul), 
which is a set of tools for managing configuration trees.

## Resources

- [API docs](https://zonebuilder.github.io/data-mapper/docs/)
- [Sourceforge downloads](https://sourceforge.net/u/zonebuilder/)

