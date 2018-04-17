/**
 * The main module
 * @module index
 * @author Tilemachos Charalampous
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const simple_1 = require("./simple");
const extended_1 = require("./extended");
const simple = new simple_1.default().simple;
const extended = new extended_1.default();
/**
 * Export simple and extended modules
 */
exports.default = simple;
function create(name, message, callback, extras) {
    return extended.create(name, message, callback, extras);
}
exports.create = create;
function exists(error) {
    return extended.exists(error);
}
exports.exists = exists;
;
function canHandle(error) {
    return extended.canHandle(error);
}
exports.canHandle = canHandle;
;
function handle(error, ...params) {
    return extended.handle.apply(extended, [error].concat(params));
}
exports.handle = handle;
;
function handleAsync(error, ...params) {
    return extended.handleAsync.apply(extended, [error].concat(params));
}
exports.handleAsync = handleAsync;
;
function expressHandler(options) {
    return extended.expressHandler(options);
}
exports.expressHandler = expressHandler;
;
function remove(error) {
    extended.remove(error);
}
exports.remove = remove;
;
function flush() {
    extended.flush();
}
exports.flush = flush;
;
function addHandler(name, handler) {
    extended.addHandler(name, handler);
}
exports.addHandler = addHandler;
;
function getHandler(name) {
    return extended.getHandler(name);
}
exports.getHandler = getHandler;
function getErrorConstructor(error) {
    return extended.getErrorConstructor(error);
}
exports.getErrorConstructor = getErrorConstructor;
;
function setPromiseLibrary(promiseLib) {
    extended.setPromiseLibrary(promiseLib);
}
exports.setPromiseLibrary = setPromiseLibrary;
;
module.exports = simple;
module.exports.create = extended.create;
module.exports.exists = extended.exists;
module.exports.canHandle = extended.canHandle;
module.exports.handle = extended.handle;
module.exports.handleAsync = extended.handleAsync;
module.exports.expressHandler = extended.expressHandler;
module.exports.remove = extended.remove;
module.exports.flush = extended.flush;
module.exports.addHandler = extended.addHandler;
module.exports.getHandler = extended.getHandler;
module.exports.getErrorConstructor = extended.getErrorConstructor;
module.exports.setPromiseLibrary = extended.setPromiseLibrary;
//# sourceMappingURL=index.js.map