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
    create(...params) {
        return error_factory_1.default.create.apply(error_factory_1.default, params);
    }
    exists(...params) {
        return error_factory_1.default.exists.apply(error_factory_1.default, params);
    }
    ;
    canHandle(...params) {
        return error_factory_1.default.canHandle.apply(error_factory_1.default, params);
    }
    ;
    handle(...params) {
        return error_factory_1.default.handle.apply(error_factory_1.default, params);
    }
    ;
    handleAsync(...params) {
        return error_factory_1.default.handleAsync.apply(error_factory_1.default, params);
    }
    ;
    expressHandler(...params) {
        return error_factory_1.default.expressHandler.apply(error_factory_1.default, params);
    }
    ;
    remove(...params) {
        return error_factory_1.default.remove.apply(error_factory_1.default, params);
    }
    ;
    flush(...params) {
        return error_factory_1.default.flush.apply(error_factory_1.default, params);
    }
    ;
    addHandler(...params) {
        return error_factory_1.default.addHandler.apply(error_factory_1.default, params);
    }
    ;
    getHandler(...params) {
        return error_factory_1.default.getHandler.apply(error_factory_1.default, params);
    }
    getErrorConstructor(...params) {
        return error_factory_1.default.getErrorConstructor.apply(error_factory_1.default, params);
    }
    ;
    setPromiseLibrary(...params) {
        return error_factory_1.default.setPromiseLibrary.apply(error_factory_1.default, params);
    }
    ;
}
exports.default = new ExtendedErrorFactory();
//# sourceMappingURL=extended.js.map