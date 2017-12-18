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
 *		doSomething();
 * }
 *
 * @author Tilemachos Charalampous
 * 
 */

"use strict";

const Promise = require('bluebird');

/**
 *
 * This function is used to create custom errors
 *
 * @param name string the error name
 * @param msg string the error message
 * @param callback function to call if you wish to handle it differently
 *
 */

function customError(name, msg, callback, extras){

	Error.captureStackTrace(this, this.constructor);
	this.name = name;
	this.message = msg;
	this.handle = callback;
	this.extras = extras;
	this.createdByErrorFactory = true;
}

require('util').inherits(customError, Error);


/**
 *
 * This function is a wrapper for the error to simulate the
 * new Error("Some message")
 * @param name string error name
 * @param callback function
 * @param extras any extras
 * @return function
 *
 */

function customErrorWrapper(name, callback){
	return function(msg, extras) {
		return errorFactory.create(name, msg, callback, extras);
	}
}


/**
 *
 * This function is the ErrorFactory implementation
 * 
 */

var ErrorFactory = function(){
	this.errorSet = new Set();
	this.errorHandlers = new Map();
}

var errorFactory = new ErrorFactory();


/**
 * This method creates an error with specified name, message, callback and extras
 *
 * @param name string name of the error
 * @param msg string message of the error
 * @param callback function of the error, as error.handle
 * @param extras any extras passed to error, as error.extras
 * @return error the error produced
  *
 */

ErrorFactory.prototype.create = function(name, msg, callback, extras){
	this.errorSet.add(name);
	return new customError(name, msg, callback, extras);
}

/**
 * This method check if the provided error exists in ErrorFactory's
 * errorSet, meaning it was previously created by it.
 * 
 * @error error 
 * @return boolean true if exists else false
 *
 */

ErrorFactory.prototype.exists = function(error){
	return this.errorSet.has(error.name) && error.createdByErrorFactory;
}


/*
 * This method checks if the error was created by this ErrorFactory 
 * and can handle itself (calling error.handle).
 * 
 * @param error error
 * @return boolean true if can handle else false
 *
 */

ErrorFactory.prototype.canHandle = function(error){
	return (this.exists(error) && error.handle) ? true : false;
}

/**
 * This method performs the handling of an error by calling the
 * error.handle function and returns true if handled else false
 *
 * @param error error
 * @param params any other parameters needed by error.handle
 * 				 function
 * @return boolean true if handled else false
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
 * @param error error
 * @param params any other parameters needed by the callback
 *				 defined when creating the error
 * @return boolean true if handled or false
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

/*
 * This method is an express handler for handling errors. It accepts a 
 * JavaScript object as options and produces a function with a proper signature
 * for using with express (app.use). In any case he error can be handled it handles it
 * else it calls next(err).
 *
 * Options object: {
 * 		handleAsync: boolean if you want to handle using handleAsync (Promises), default false	
 * }
 * @param options javascript object options for the Express Handler
 */

ErrorFactory.prototype.expressHandler = function(options){
	let thisContext = this;
	let handleFunc = (options && options.handleAsync) ? this.handleAsync : this.handle;
	return function(error, req, res, next) {
		if (!handleFunc.call(thisContext, error, req, res, next)){
			next(error);
		}
	}
}

/**
 * This method removes an error from the errorSet, meaning
 * it can no longer be handled by this ErrorFactory. However
 * it can be handled explicitly by error.handle function if it is defined
 *
 *
 */

ErrorFactory.prototype.remove = function(error){
	this.errorSet.delete(error.name);
}

/**
 * This method fluses the errorSet and removes all errors.
 *
 */

ErrorFactory.prototype.flush = function(){
	this.errorSet.clear();
}

/**
 * 
 * This method is used to add custom handlers
 *
 * @param name string handler name
 * @param handler function handler
 *
 */

ErrorFactory.prototype.addHandler = function(name, handler){
	this.errorHandlers.set(name, handler);
}

/**
 *
 * This method is used to get custom handlers
 *
 * @param name string name of the handler
 * @return function the handler
 *
 */

ErrorFactory.prototype.getHandler = function(name){
	return this.errorHandlers.get(name);
}

/**
 *
 * Wrapper function for ErrorFactory.
 * There are two ways to create an error.
 * The first way is to create an error class
 * var MyError= ErrorFactory("MyError");
 * throw MyError("This is an error");
 * The second mode is to use the underline ErrorFactory by using
 * ErrorFactory = ErrorFactory().create("MyError", "This is an error");
 * 
 * @param name string the error name
 * @param callback function in case a specific callback needs to be created;
 * @param extras any extras needed to pass to the error
 * @return ErrorFactory or function depending on the parameters passed
 *
 */

function errorFactoryWrapper(name, callback, extras){
	if (arguments.length === 0){
		return errorFactory;
	} else {
		return customErrorWrapper(name, callback);
	}
}

/* Export the wrapper */

module.exports = errorFactoryWrapper;