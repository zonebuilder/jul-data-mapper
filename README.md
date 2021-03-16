# jul-data-mapper

A tool for mapping a JavaScript object from a data schema to another data schema  



## Install

Install with [NPM](https://www.npmjs.com/)  


`npm i --save jul-data-mapper`  





## Usage

    @fileOverview    Use this tool to map a JavaScript object from a data schema to another data schema  

    Example code:  


    
```
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
    
    console.info(
        mapper(oDest, oSrc, oMap)
    );
    
```

    
## API

[API docs](https://zonebuilder.github.io/data-mapper/docs/)



## License

 Licensed under GNU GPLv2 or later and under GNU LGPLv3 or later. See enclosed 'licenses' folder.  



## About

Thos utility is based on [JUL](https://www.npmjs.com/package/jul), 
which is a set of tools for managing configuration trees.
