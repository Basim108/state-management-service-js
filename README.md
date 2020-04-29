# state-store-js  
![GitHub](https://img.shields.io/github/license/basim108/state-store-js)
![npm](https://img.shields.io/npm/v/state-store)
![npm](https://img.shields.io/npm/dy/state-store)

This is a centralized object store that works in the browser and nodejs.
# installing
`npm install state-store --save`
or
`yarn add state-store`
# usage
## Putting value into the storage:
```
import stateStore from 'state-store';

stateStore.register('key', 10);
```
## Getting value from the storage
```
import stateStore from 'state-store';

// getting a value by key
let value = stateStore.resolve('key');

// setting a new  a value in the store
stateStore.register('key', value + 1);
```
## Optimizations
To make searching process faster use period-separated delimeter in the key. The storage is optimized by using a tree structure to store objects. Key splits by a period '.' on parts and each part becomes a node of the tree structure; therefore, the complexity of searching algorithm becomes O(Log(n)).
