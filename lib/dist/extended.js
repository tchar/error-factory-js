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
        return error_factory_1.default.getInstance().create(name, message, callback, extras);
    }
    exists(error) {
        return error_factory_1.default.getInstance().exists(error);
    }
    ;
    canHandle(error) {
        return error_factory_1.default.getInstance().canHandle(error);
    }
    ;
    handle(error, ...params) {
        return error_factory_1.default.getInstance().handle.apply(error_factory_1.default.getInstance(), [error].concat(params));
    }
    ;
    handleAsync(error, ...params) {
        return error_factory_1.default.getInstance().handleAsync.apply(error_factory_1.default.getInstance(), [error].concat(params));
    }
    ;
    expressHandler(options) {
        return error_factory_1.default.getInstance().expressHandler(options);
    }
    ;
    remove(error) {
        error_factory_1.default.getInstance().remove(error);
    }
    ;
    flush() {
        error_factory_1.default.getInstance().flush();
    }
    ;
    addHandler(name, handler) {
        error_factory_1.default.getInstance().addHandler(name, handler);
    }
    ;
    getHandler(name) {
        return error_factory_1.default.getInstance().getHandler(name);
    }
    getErrorConstructor(error) {
        return error_factory_1.default.getInstance().getErrorConstructor(error);
    }
    ;
    setPromiseLibrary(promiseLib) {
        error_factory_1.default.getInstance().setPromiseLibrary(promiseLib);
    }
    ;
}
exports.default = ExtendedErrorFactory;
//# sourceMappingURL=extended.js.map