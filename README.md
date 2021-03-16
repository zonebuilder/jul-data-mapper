# jul-data-mapper

A tool for mapping a JavaScript object from a data schema to another data schema  



## Installati

Install with [NPM](https://www.npmjs.com/)  


`npm i --save jul-data-mapper`
## Usage

<section>
  <header>
    
      <h2>
        
        mapper.js
        
      </h2>

      
    
  </header>

  <article>
    <div class="container-overview">
      
        
            <div class="description">
              Use this tool to map a JavaScript object from a data schema to another data schema<br>
    Example code:
    <pre>'use strict';
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
    </pre>
            </div>
        

        

<dl class="details">

  
    <dt class="tag-version">Version:</dt>
    <dd class="tag-version">
      <ul class="dummy">
        <li>
          1.0.0
        </li>
      </ul>
    </dd>
  

  

  

  

  

  

  

  

  
    <dt class="tag-author">Author:</dt>
    <dd class="tag-author">
      <ul>
        
          <li>
            <a href="https://www.google.com/search?hl=en&num=50&start=0&safe=0&filter=0&nfpr=1&q=The+Zonebuilder+web+development+programming+IT+society+philosophy+politics">The Zonebuilder</a>
          </li>
        
      </ul>
    </dd>
  

  

  

  

  
    <dt class="tag-source">Source:</dt>
    <dd class="tag-source">
      <ul class="dummy">
        <li>
           <a href="source/lib/mapper.js#L7">mapper.js, line 7</a>
        </li>
      </ul>
    </dd>
  

  

  

  
</dl>


        
      
    </div>

    

    

    

     

    

    

    

    

    
  </article>
</section>

## API

# jul-data-mapper

 <section>
  <header>
    
      
        
  </header>

   <a href="source/lib/mapper.js#L39">mapper.js, line 39</a>
        </li>
      </ul>
    </dd>
  

  

  

  
</dl>














        
      
    </div>

    

    

    

     

    

    

    
      <h3 class="subsection-title">Methods</h3>

      
        


  

  <span class="name-container">
    <a class="link-icon" href="#~compact">
      <svg height="20" width="20" style="fill: black;">
        <use xlink:href="#linkIcon"/>
      </svg>
    </a>
    <h4 class="name" id="~compact">
      <span class="type-signature">(inner) </span>compact<span class="signature">(oMap)</span><span class="type-signature"> → {Object}</span>
    </h4>
  </span>

  



  <div class="description">
    Compacts a mapping (key:value) object into a tree-like structure
  </div>







  <h5>Parameters:</h5>
  

<table class="params">
  <thead>
    <tr>
      
        <th>Name</th>
      

      <th>Type</th>

      

      

      <th class="last">Description</th>
    </tr>
  </thead>

  <tbody>
    
      <tr>
        
          <td class="name"><code>oMap</code></td>
        

        <td class="type">
          
            
    <span class="param-type">
      Object
    </span>

    


          
        </td>

        

        

        <td class="description last">
          Key-value object to compact
          
        </td>
      </tr>

    
  </tbody>
</table>





<dl class="details">

  

  

  

  

  

  

  

  

  

  

  

  

  
    <dt class="tag-source">Source:</dt>
    <dd class="tag-source">
      <ul class="dummy">
        <li>
           <a href="source/lib/mapper.js#L92">mapper.js, line 92</a>
        </li>
      </ul>
    </dd>
  

  

  

  
</dl>














      
        


  

  <span class="name-container">
    <a class="link-icon" href="#~mapper">
      <svg height="20" width="20" style="fill: black;">
        <use xlink:href="#linkIcon"/>
      </svg>
    </a>
    <h4 class="name" id="~mapper">
      <span class="type-signature">(inner) </span>mapper<span class="signature">(oDest, oSrc, oMap, oConfig<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {Object}</span>
    </h4>
  </span>

  



  <div class="description">
    Performs a mapping with a given object from a data schema to another data schema
  </div>







  <h5>Parameters:</h5>
  

<table class="params">
  <thead>
    <tr>
      
        <th>Name</th>
      

      <th>Type</th>

      
        <th>Attributes</th>
      

      

      <th class="last">Description</th>
    </tr>
  </thead>

  <tbody>
    
      <tr>
        
          <td class="name"><code>oDest</code></td>
        

        <td class="type">
          
            
    <span class="param-type">
      Object
    </span>

    


          
        </td>

        
          <td class="attributes">
            

            

            
          </td>
        

        

        <td class="description last">
          The destination object where the mapped values are applied over
          
        </td>
      </tr>

    
      <tr>
        
          <td class="name"><code>oSrc</code></td>
        

        <td class="type">
          
            
    <span class="param-type">
      Object
    </span>

    


          
        </td>

        
          <td class="attributes">
            

            

            
          </td>
        

        

        <td class="description last">
          The source object
          
        </td>
      </tr>

    
      <tr>
        
          <td class="name"><code>oMap</code></td>
        

        <td class="type">
          
            
    <span class="param-type">
      Object
    </span>

    


          
        </td>

        
          <td class="attributes">
            

            

            
          </td>
        

        

        <td class="description last">
          A key-value hash (mapping) between namespace paths in the source and those in the destination
          
        </td>
      </tr>

    
      <tr>
        
          <td class="name"><code>oConfig</code></td>
        

        <td class="type">
          
            
    <span class="param-type">
      Object
    </span>

    


          
        </td>

        
          <td class="attributes">
            
              <optional><br>
            

            

            
          </td>
        

        

        <td class="description last">
          Optional configuration object with any of the following options:<ul>
    <li><code>uint {RegExp|String}</code> - regular expression or string to match an array index
    placeholder e.g. <code>'$n'</code>. <br>Defaults to <code>/\$[a-z]/</code></li>
    <li><code>prefixProp {String}</code> - name of a property of the mapping the will be used
    as a prefix when computing the destination namespace for the current siblings.
    <br>Defaults to <code>'_mapToPrefix'</code></li>
    <li><code>strict {Boolean}</code> - performs checkings of not overwriting descendant values
    that are already. <br>Defaults tO <code>false</code></li>
    </ul>
          
        </td>
      </tr>

    
  </tbody>
</table>





<dl class="details">

  

  

  

  

  

  

  

  

  

  

  

  

  
    <dt class="tag-source">Source:</dt>
    <dd class="tag-source">
      <ul class="dummy">
        <li>
           <a href="source/lib/mapper.js#L164">mapper.js, line 164</a>
        </li>
      </ul>
    </dd>
  

  

  

  
</dl>














      
    

    

    
  </article>
</section>

## License

 Licensed under GNU GPLv2 or later and under GNU LGPLv3 or later. See enclosed 'licenses' folder.  



## About

Thos utility is based on [JUL](https://www.npmjs.com/package/jul), 
which is a set of tools for managing configuration trees.
