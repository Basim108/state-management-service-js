const {expect, test} = require("@jest/globals");
const stateStore = require('../dist/state-store').default;
// storage can work with key of type string or number
// but here in tests, as a storage is a singleton the keys used in tests have to be unique;
// therefore uuid package is used for generated unique string-type keys
const uuid = require('uuid').v4;

test('should resolve null when registered null', () => {
    const key = uuid();
    stateStore.register(key, null);
    expect(stateStore.resolve(key)).toBeNull();
});

test('should register and resolve numbers', () => {
    const key = uuid();
    const expected = 123;
    stateStore.register(key, expected);
    expect(stateStore.resolve(key)).toBe(expected)
});

test('should register and resolve strings', () => {
    const key = uuid();
    const expected = 'hello world!';
    stateStore.register(key, expected);
    expect(stateStore.resolve(key)).toBe(expected)
});

test('should register and resolve functions', () => {
    const key = uuid();
    const expected = function (x){ return x + 1; };
    stateStore.register(key, expected);
    expect(stateStore.resolve(key)).toBe(expected)
});

test('should register and resolve arrow functions', () => {
    const key = uuid();
    const expected = (x) => x + 1;
    stateStore.register(key, expected);
    expect(stateStore.resolve(key)).toBe(expected)
});

test('should register and resolve an array', () => {
    const key = uuid();
    const expected = [1, 2, 3];
    stateStore.register(key, expected);
    const actual = stateStore.resolve(key);
    expect(actual).not.toBeNull();
    expect(Array.isArray(actual)).toBe(true);
    expect(actual).toBe(expected);
});

test('should register and resolve objects', () => {
    const key = uuid();
    const expected = {
        prop1: 10,
        prop2: 'str'
    }
    stateStore.register(key, expected);
    const actual = stateStore.resolve(key);
    expect(actual).not.toBeNull();
    expect(actual).toBe(actual);
});

test('should register and resolve Dates', () => {
    const key = uuid();
    const expected = new Date()
    stateStore.register(key, expected);
    const actual = stateStore.resolve(key);
    expect(actual).not.toBeNull();
    expect(actual).toBe(actual);
});