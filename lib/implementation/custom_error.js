/**
 * Custom Error Module
 * @module lib/implementation/custom_error
 * @author Tilemachos Charalampous
 */

/**
 * 
 * @param {object} stack - the errors stack trace
 * @returns {object} - the stack cleared 
 */

'use strict';

function getStackTraceCleaned(stack) {
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
function customErrorWrapper(name, callback) {

    var nameProperty = {
        enumerable: true,
        configurable: false,
        writable: false,
        value: name
    }

    var body = `
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

    try {
        var customError = Function('name, getStack, callback, nameProperty', body)(name, getStackTraceCleaned, callback, nameProperty);
    } catch (err) {
        throw Error('Invalid error name');
    }

    require('util').inherits(customError, Error);

    return customError;
}

/**
 * Export the customErrorWrapper
 */
module.exports = customErrorWrapper;