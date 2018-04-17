/**
 * Simple Mode Module
 * @module lib/simple
 * @author Tilemachos Charalampous
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const error_factory_1 = require("./implementation/error_factory");
class SimpleErrorFactory {
    /**
     * This function creates an error based on a name and a callback to
     * assign as the err.handle function. If no parameter is given to this function
     * then it returns the Error factory instance.
     * @param {string} name - The error's name
     * @param {function} callback - The error's handle function
     */
    simple(name, callback) {
        if (arguments.length === 0) {
            return error_factory_1.default.getInstance();
        }
        return error_factory_1.default.getInstance().generate(name, callback);
    }
}
exports.default = SimpleErrorFactory;
//# sourceMappingURL=simple.js.map