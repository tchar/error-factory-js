/**
 *
 * This module is used to create custom errors on the fly
 * without explicitly defining them by using an Factory design
 * pattern. The ErrorFactory is a singleton with a function
 * getInstance(). After that you can can use the functions
 * create/add to create an error with a specific name, message and callback
 * Furthermore, errors produced by this module can handle themselves if a callback is
 * provided in many different ways.
 *
 * The first way is to call error.handle exiplicitely with any parameters you wish.
 * 
 * The second way is to call ErrorFactory's handle and pass the error along
 * with any parameters you wish.
 * 
 * The third way is to use the handler function in an express: app.use way
 * and let the ErrorFactory do the handling. This way however the callbacks
 * defined must have a signature function(req, res, next) in order for this
 * to work.

 * The fourth way is to handle the errors in a more conventional way as:
 * if (error.name === 'someError'){
 *      doSomething();
 * }
 * @module lib/implementation/error_factory
 * @author Tilemachos Charalampous
 * 
 */

'use strict';

const CustomError = require('./custom_error');

/**
 *
 * This function is the ErrorFactory implementation
 * 
 */

var ErrorFactory = function(){
    this.errorSet = new Map();
    this.errorHandlers = new Map();
}

/**
 * This method creates an error with specified name, message, callback and extras
 *
 * @param {string} name - name of the error
 * @param {string} message - message of the error
 * @param {function} callback - handler of the error, as error.handle
 * @param {object} extras - any extras passed to error, as error.extras
 * @return {object} - error the error produced
 */
ErrorFactory.prototype.create = function(name, message, callback, extras){
    let newError = CustomError(name, callback);
    this.errorSet.set(name, newError);
    return new newError(message, extras);
}

/**
 * This method check if the provided error exists in ErrorFactory's
 * errorSet, meaning it was previously created by it.
 * 
 * @param {object} error - error 
 * @return {boolean} - true if exists else false
 */
ErrorFactory.prototype.exists = function(error){
    return this.errorSet.has(error.name);
}


/**
 * This method checks if the error was created by this ErrorFactory 
 * and can handle itself (calling error.handle).
 * 
 * @param {object} error - error
 * @return {boolean} - true if can handle else false
 *
 */
ErrorFactory.prototype.canHandle = function(error){
    return (this.exists(error) && typeof error.handle === 'function') ? true : false;
}

/**
 * This method performs the handling of an error by calling the
 * error.handle function and returns true if handled else false
 *
 * @param {object} error - error
 * @param {array} params any other parameters needed by error.handle function
 * @return {boolean} - true if handled else false
 */
ErrorFactory.prototype.handle = function(error, ...params) {
    if (this.canHandle(error)){
        error.handle.apply(error, params);
        return true;
    } else  {
        return false;
    }
}

/**
 * This method performs the handling of an error in a async
 * way by calling the error.handle function inside a Promise.
 * Returns true if error may be handled else false.
 *
 * @param {object} error - error
 * @param {array} params - any other parameters needed by the callback
 *                          defined when creating the error
 * @return {boolean} - true if handled or false
 */
ErrorFactory.prototype.handleAsync = function(error, ...params) {
    let thisContext = this;
    Promise.resolve(this.canHandle(error)).then(function(canHandle) {
        if (canHandle){
            error.handle.apply(error, params);
        }
    });
    return this.canHandle(error);
}

/**
 * This method is an express handler for handling errors. It accepts a
 * JavaScript object as options and produces a function with a proper signature
 * for using with express (app.use). In any case he error can be handled it handles it
 * else it calls next(err).
 *
 * Options object: {
 *      handleAsync: boolean if you want to handle using handleAsync (Promises), default false
 * }
 * @param {object} options - javascript object options for the Express Handler
 * @return {function} - an express function with signature error, req, res, next
 */
ErrorFactory.prototype.expressHandler = function(options){
    let thisContext = this;
    let handleFunc = (options && options.handleAsync) ? this.handleAsync : this.handle;
    return function(error, req, res, next) {
        if (!handleFunc.call(thisContext, error, error, req, res, next)){
            next(error);
        }
    }
}

/**
 * This method removes an error from the errorSet, meaning
 * it can no longer be handled by this ErrorFactory. However
 * it can be handled explicitly by error.handle function if it is defined
 *
 * @param {object} error - error
 */
ErrorFactory.prototype.remove = function(error){
    this.errorSet.delete(error.name);
}

/**
 * This method fluses the errorSet and removes all errors.
 */
ErrorFactory.prototype.flush = function(){
    this.errorSet.clear();
}

/**
 * This method is used to add custom handlers
 *
 * @param {string} name - string handler name
 * @param {function} handler - function handler
 */
ErrorFactory.prototype.addHandler = function(name, handler){
    this.errorHandlers.set(name, handler);
}

/**
 *
 * This method is used to get custom handlers
 *
 * @param {string} name - name of the handler
 * @return {function} - the handler
 *
 */
ErrorFactory.prototype.getHandler = function(name){
    return this.errorHandlers.get(name);
}

/**
 * This method is used to get the Error constructor of a
 * specific error
 *
 * @param {object} error - error
 * @return {function} - the constructor of the error
 */
ErrorFactory.prototype.getErrorConstructor = function(error){
    var ErrorConstructor = this.errorSet.get(error);
    if (typeof ErrorConstructor === 'function'){
        return ErrorConstructor;
    } else {
        return Error;
    }
}

/**
 * This function accepts a promise library and sets it as the default Promise library
 * @param {object} promise - the promise library to set 
 */
ErrorFactory.prototype.setPromiseLibrary = function(promise){
    if (!promise)
        throw new Error('Promise library is not defined');
    if (typeof promise !== 'function'){
        throw new Error('Invalid promise library');
    }
    Promise = promise
}

/**
 * export the ErrorFactory
 */
module.exports = ErrorFactory;
