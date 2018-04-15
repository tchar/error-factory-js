/**
 * Simple Mode Module
 * @module lib/simple
 * @author Tilemachos Charalampous
 */


'use strict';
const getErrorFactory = require('./implementation/error_factory_singleton');
const CustomError = require('./implementation/custom_error');

/**
 * This function creates an error based on a name and a callback to 
 * assign as the err.handle function. If no parameter is given to this function
 * then it returns the Error factory instance.
 * @param {string} name - The error's name
 * @param {function} callback - The error's handle function
 */
let simple = function(name, callback){
    if (arguments.length === 0){
        return getErrorFactory();
    }
    let NewError = CustomError(name, callback);
    getErrorFactory().errorSet.set(name, NewError);
    return NewError;
}

/**
 * Export the simple function
 */
module.exports = simple; 