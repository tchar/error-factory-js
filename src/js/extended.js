/**
 * Extended Mode Module
 * @module lib/extended
 * @author Tilemachos Charalampous
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const error_factory_1 = require("./implementation/error_factory");
/**
 * Export the functions
 */
class ExtendedErrorFactory {
    create(name, message, callback, extras) {
        return error_factory_1.default.create(name, message, callback, extras);
    }
    exists(error) {
        return error_factory_1.default.exists(error);
    }
    ;
    canHandle(error) {
        return error_factory_1.default.canHandle(error);
    }
    ;
    handle(error, ...params) {
        return error_factory_1.default.handle.apply(error_factory_1.default, [error].concat(params));
    }
    ;
    handleAsync(error, ...params) {
        return error_factory_1.default.handleAsync.apply(error_factory_1.default, [error].concat(params));
    }
    ;
    expressHandler(options) {
        return error_factory_1.default.expressHandler(options);
    }
    ;
    remove(error) {
        error_factory_1.default.remove(error);
    }
    ;
    flush() {
        error_factory_1.default.flush();
    }
    ;
    addHandler(name, handler) {
        error_factory_1.default.addHandler(name, handler);
    }
    ;
    getHandler(name) {
        return error_factory_1.default.getHandler(name);
    }
    getErrorConstructor(error) {
        return error_factory_1.default.getErrorConstructor(error);
    }
    ;
    setPromiseLibrary(promiseLib) {
        error_factory_1.default.setPromiseLibrary(promiseLib);
    }
    ;
}
exports.default = new ExtendedErrorFactory();
//# sourceMappingURL=extended.js.map