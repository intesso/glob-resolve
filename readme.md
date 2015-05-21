# glob-resolve

resolves a [glob](https://github.com/isaacs/node-glob) filename array into it's segments and transforms it into a new array.

# why?
use it when you want to transform the `glob` filename Array.

# how does it work?
 - it uses glob with variables. see: [glob-var](https://github.com/intesso/glob-var)
 - you can use the whole [glob](https://github.com/isaacs/node-glob) syntax in the `src` and `dest` pattern,
   as well as the `glob-var` variables starting with a colon `:`
 - instead of the glob filename Array, `glob-resolve` returns a search object with:
   - src: `glob-var` object for the source pattern
   - dest: `glob-var` object for the destination pattern
 - you are most likely interrested in the `result.dest.path` Array, which is the transformed `glob` filenames Array.

# install

```bash
npm install glob-resolve
```

# use
```js

var resolve = require('glob-resolve');

// async
var src = __dirname + '/fixtures/:module/public/**';
var dest = __dirname + '/public/:module/**';
resolve(src, dest, function(err, result) {
    // result.dest.path is the transformed files array
    console.log('destination files array', result.dest.path);
});

```


```js
//or sync version
var result = resolve.sync('fixtures/:module/public', 'public/:module');
// result.dest.path is the transformed files array
result == {
 "src": {
   "pattern": "fixtures/:module/public",
   "glob": "fixtures/*/public",
   "globstars": 0,
   "named": [
     "module"
   ],
   "unnamed": [],
   "vars": [
     {
       "segment": ":module",
       "compiled": "*",
       "type": "named",
       "name": "module",
       "globstar": false,
       "index": 1
     }
   ],
   "segments": [
     {
       "segment": "fixtures",
       "compiled": "fixtures",
       "type": "text",
       "globstar": false,
       "index": 0
     },
     {
       "segment": ":module",
       "compiled": "*",
       "type": "named",
       "name": "module",
       "globstar": false,
       "index": 1
     },
     {
       "segment": "public",
       "compiled": "public",
       "type": "text",
       "globstar": false,
       "index": 2
     }
   ],
   "paths": [
     "fixtures/Irish-Pub/public",
     "fixtures/test_pub/public"
   ],
   "values": [
     {
       ":module": "Irish-Pub"
     },
     {
       ":module": "test_pub"
     }
   ]
 },
 "dest": {
   "pattern": "public/:module",
   "glob": "public/*",
   "globstars": 0,
   "named": [
     "module"
   ],
   "unnamed": [],
   "vars": [
     {
       "segment": ":module",
       "compiled": "*",
       "type": "named",
       "name": "module",
       "globstar": false,
       "index": 1
     }
   ],
   "segments": [
     {
       "segment": "public",
       "compiled": "public",
       "type": "text",
       "globstar": false,
       "index": 0
     },
     {
       "segment": ":module",
       "compiled": "*",
       "type": "named",
       "name": "module",
       "globstar": false,
       "index": 1
     }
   ],
   "values": [
     {
       ":module": "Irish-Pub"
     },
     {
       ":module": "test_pub"
     }
   ],
   "paths": [
     "public/Irish-Pub",
     "public/test_pub"
   ]
 }
}

```

# functions

## resolve(srcPattern, destPattern [,options] ,callback)
async glob resove version.

## resolve.sync(pattern [,options])
sync glob resove version.

## resolve.globvar
reference to the `glob-var` module


# test
```bash
npm test
```

# license
MIT


