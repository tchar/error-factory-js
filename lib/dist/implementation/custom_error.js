/**
 * Custom Error Module
 * @module lib/implementation/custom_error
 * @author Tilemachos Charalampous
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const Util = require("util");
class CustomError {
    /**
     *
     * @param {object} stack - the errors stack trace
     * @returns {object} - the stack cleared
     */
    static getStackTraceCleaned(stack) {
        stack = stack.split('\n');
        stack.splice(1, 1);
        return stack.join('\n');
    }
    /**
     *
     * This function is a wrapper for the error to simulate the
     * new Error("Some message")
     * @param {string} name - error name
     * @param {function} callback - the error handling funbction
     * @return function
     *
     */
    static generate(name, callback) {
        const nameProperty = {
            enumerable: true,
            configurable: false,
            writable: false,
            value: name
        };
        const body = `
            return function ` + name + ` (message, extras) {
                if (!this || !(this instanceof ` + name + `)){
                    return new ` + name + `(message, extras);
                }
                Error.apply(this,arguments);
                Error.captureStackTrace(this,this.constructor);
                Object.defineProperty(this, 'message', {
                    enumerable: true,
                    configurable: false,
                    value: message
                });
                Object.defineProperty(this, 'name', nameProperty);
                this.stack = getStack(this.stack);
                this.extras = extras;
                this.handle = callback;
            }`;
        let customError;
        try {
            customError = Function('name, getStack, callback, nameProperty', body)(name, CustomError.getStackTraceCleaned, callback, nameProperty);
        }
        catch (err) {
            throw Error('Invalid error name');
        }
        Util.inherits(customError, Error);
        return customError;
    }
}
exports.default = CustomError;
//# sourceMappingURL=custom_error.js.map