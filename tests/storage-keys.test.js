const {expect, test} = require("@jest/globals");
const stateStore = require('../dist/state-store').default;
// storage can work with key of type string or number
// but here in tests, as a storage is a singleton the keys used in tests have to be unique;
// therefore uuid package is used for generated unique string-type keys
const uuid = require('uuid').v4;

test('should register and resolve when key is number', () => {
    stateStore.register(12, 'value');
    expect(stateStore.resolve(12)).toBe('value');
});

test('should register and resolve when part of the key is number', () => {
    stateStore.register('11.basim', 'value');
    expect(stateStore.resolve('11.basim')).toBe('value');
});

test('should resolve undefined when given not existed key', () => {
    expect(stateStore.resolve(uuid())).toBeUndefined();
});