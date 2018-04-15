/**
 * Error Factory Singleton Module
 * @module lib/implementation/error_factory_singleton
 * @author Tilemachos Charalampous
 */

'use strict';

const ErrorFactory = require('./error_factory');

let errorFactory;

/**
 * This function works as a singleton wrapper for the Error Factory
 * @returns {object} - Error Factory instance
 */
function getErrorFactory(){
    if (errorFactory == null){
        errorFactory = new ErrorFactory();
    }
    return errorFactory;
}

/**
 * Export the function
 */
module.exports = getErrorFactory;