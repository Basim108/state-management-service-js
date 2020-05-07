const {expect, test} = require("@jest/globals");
// storage can work with key of type string or number
// but here in tests, as a storage is a singleton the keys used in tests have to be unique;
// therefore uuid package is used for generated unique string-type keys
const uuid = require('uuid').v4;

test('module should export a singleton storage', () => {
    const stateStore1 = require('../dist/state-store').default;
    const stateStore2 = require('../dist/state-store').default;
    const key = uuid();
    stateStore1.register(key, 'value');
    expect(stateStore2.resolve(key)).toBe('value');
});