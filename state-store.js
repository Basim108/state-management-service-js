/**
 * @summary Centralized objects store. Optimized by using a tree structure to store objects.
 * Register Key separates by a period '.'. Each section become a node in the tree structure.
 * That can improve search up to O(Log(n)).
 */
class StateStore {
    /** @summary Register value in store by unique name
     * @param {string} key - unique name, by it will resolve the value in future.
     *           for much faster resolve values, use key separated by symbol '.'.
     *           It makes complexity of resolving from O(N) to O(log N).
     * @param {any} value - The value for register
     * @returns {any} Returns the value if registration went successful, otherwise returns undefined.
     *          For more information about error watch console. */
    register(key, value) {
        let namespace = convertKeyToNamespaces(key);
        if (isNullOrEmpty(namespace))
            return;
        let currentContainer = _container,
            i, len = namespace.length - 1;
        if (namespace.length > 1) {
            for (i = 0; i < len; i++) {
                let name = namespace[i];
                if (currentContainer[name] === undefined)
                    currentContainer[name] = [];
                currentContainer = currentContainer[name];
            }
        }
        currentContainer[namespace[len]] = value;
        return value;
    }

    /** @summary Resolving value/object by unique name
     *  @param {string} key - unique name, by which the value has been registered before
     * @returns {any} value that was registered by the key. */
    resolve(key) {
        let namespace = convertKeyToNamespaces(key);
        if (isNullOrEmpty(namespace))
            return;
        let registeredValue = getObjectByName(namespace);
        if (registeredValue === undefined) {
            return consoleError({
                message: _constants.consolePrefix + _constants.errors.objectNotFound,
                context: {
                    key: key,
                    namespace: namespace,
                    registeredValue: registeredValue
                }
            });
        }
        return registeredValue;
    }
}

/* ---------------------------------- Private methods --------------------------------- */

function isNullOrEmpty(arg) {
    if (!arg)
        return true;
    if (typeof arg === 'string')
        return !arg.trim();
    return !arg.length;
}

function consoleError(errorInfo) {
    console.error(errorInfo.message, errorInfo.context);
}

/** @summary Geting object by his full name
 * @param {string[]} namespace - array of name parts
 * @returns {any} the object which has been registered before, if does not find the function will return undefined.
 */
function getObjectByName(namespace) {
    if (isNullOrEmpty(namespace))
        return;
    let currentContainer = _container, i, len = namespace.length;
    for (i = 0; i < len; i++) {
        let name = namespace[i];
        currentContainer = currentContainer[name];
        if (currentContainer === undefined) {
            return consoleError({
                message: _constants.consolePrefix + _constants.errors.objectNotFound,
                context: {
                    name: name,
                    i: i,
                    namespace: namespace
                }
            });
        }
    }
    return currentContainer;
}


/** @summary Check input key, devide it to name parts.
 * @param {string} key - string value, could be devided by separator symbol.
 * @returns {string[]} the array of name parts. if key name1.name2, the array will be returned ['name1', 'name2']
 */
function convertKeyToNamespaces(key) {
    if (!key) {
        console.error(_constants.consolePrefix + _constants.errors.keyIsEmpty);
        return null;
    }
    if (typeof key !== 'string') {
        console.error(_constants.consolePrefix + _constants.errors.keyIsNotString);
        return null;
    }
    let names = key.split(_constants.namespace.separator);
    let i, len = names.length;
    for (i = 0; i < len; i++) {
        if (isNullOrEmpty(names[i])) {
            consoleError({
                message: _constants.consolePrefix + _constants.errors.keyContainsDoubleSeparator,
                context: {
                    name: name,
                    i: i,
                    namespace: namespace
                }
            });
            return null;
        }
        if (!isNaN(parseInt(names[i]))) {
            consoleError({
                message: _constants.consolePrefix + _constants.errors.keyIsNotString,
                context: {
                    name: name,
                    i: i
                }
            });
            return null;
        }
    }
    return names;
}


/** Tree kind dictionary for registred values.
 *  key: the name, by which the value was registred,
 *  value: registred value.
 * @example
 * // If we want register value of some url 'https://mycompany.com/businessobject/edit/'
 * // and then in diferent part of program resolve this value {@link resolve} be key 'urls.businessobject.edit',
 * // then into the register method {@link register} will be created next arrays:
 * // _container['urls']['businessobject']['edit'] = 'https://mycompany.com/businessobject/edit/'  */
let _container = {};

let _constants = {
    consolePrefix: 'healbe.ioc: ',
    namespace: {
        separator: '.'
    },
    errors: {
        objectNotFound: 'Object not found.',
        registerCanceled: 'Registration value in IOC failed',
        keyIsEmpty: 'Ключ по которому регистрируется/резолвиться объект пустой.',
        keyIsNotString: 'Неверный тип ключа по которому регистрируется/резолвиться объект.',
        keyContainsDoubleSeparator: 'Неверный ключ по которому регистрируется/резолвиться объект. Содержит два разделителя подряд.'
    }
};

const stateStore = new StateStore();
export default stateStore;