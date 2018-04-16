/**
 * Simple Mode Module
 * @module lib/simple
 * @author Tilemachos Charalampous
 */


'use strict';
import CustomError from './implementation/custom_error';
import errorFactory from './implementation/error_factory';

class SimpleErrorFactory {

    /**
     * This function creates an error based on a name and a callback to 
     * assign as the err.handle function. If no parameter is given to this function
     * then it returns the Error factory instance.
     * @param {string} name - The error's name
     * @param {function} callback - The error's handle function
     */
    public simple(name, callback) {
        if (arguments.length === 0) {
            return errorFactory;
        }
        return errorFactory.generate(name, callback);
    }
}

export default new SimpleErrorFactory().simple;