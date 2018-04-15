/**
 * Extended Mode Module
 * @module lib/extended
 * @author Tilemachos Charalampous
 */

'use strict';
const getErrorFactory = require('./implementation/error_factory_singleton');


/**
 * The following functions are wrappers for the ErrorFactory methods  
 */
let create = function(...params){
    return getErrorFactory().create.apply(getErrorFactory(), params);
}

let exists = function (...params) {
    return getErrorFactory().exists.apply(getErrorFactory(), params);
}

let canHandle = function (...params) {
    return getErrorFactory().canHandle.apply(getErrorFactory(), params);
}

let handle = function (...params) {
    return getErrorFactory().handle.apply(getErrorFactory(), params);
}

let handleAsync = function (...params) {
    return getErrorFactory().handleAsync.apply(getErrorFactory(), params);
}

let expressHandler = function (...params) {
    return getErrorFactory().expressHandler.apply(getErrorFactory(), params);
}

let remove = function (...params) {
    return getErrorFactory().remove.apply(getErrorFactory(), params);
}

let flush = function (...params) {
    return getErrorFactory().flush.apply(getErrorFactory(), params);
}

let addHandler = function (...params) {
    return getErrorFactory().addHandler.apply(getErrorFactory(), params);
}

let getHandler = function (...params) {
    return getErrorFactory().getHandler.apply(getErrorFactory(), params);
}

let getErrorConstructor = function (...params) {
    return getErrorFactory().getErrorConstructor.apply(getErrorFactory(), params);
}

let setPromiseLibrary = function (...params) {
    return getErrorFactory().setPromiseLibrary.apply(getErrorFactory(), params);
}

/**
 * Export the functions
 */
module.exports.create = create;
module.exports.exists = exists;
module.exports.canHandle = canHandle;
module.exports.handle = handle;
module.exports.handleAsync = handleAsync;
module.exports.expressHandler = expressHandler;
module.exports.remove = remove;
module.exports.flush = flush;
module.exports.addHandler = addHandler;
module.exports.getHandler = getHandler;
module.exports.getErrorConstructor = getErrorConstructor;
module.exports.setPromiseLibrary = setPromiseLibrary;