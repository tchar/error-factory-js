/**
 * The main module
 * @module index
 * @author Tilemachos Charalampous
 */
'use strict';
import simple from './simple';
import errorFactory from './implementation/error_factory';

/**
 * Export simple and extended modules
 */
module.exports = simple;
module.exports.create = errorFactory.create;
module.exports.exists = errorFactory.exists;
module.exports.canHandle = errorFactory.canHandle;
module.exports.handle = errorFactory.handle;
module.exports.handleAsync = errorFactory.handleAsync;
module.exports.expressHandler = errorFactory.expressHandler;
module.exports.remove = errorFactory.remove;
module.exports.flush = errorFactory.flush;
module.exports.addHandler = errorFactory.addHandler;
module.exports.getHandler = errorFactory.getHandler;
module.exports.getErrorConstructor = errorFactory.getErrorConstructor;
module.exports.setPromiseLibrary = errorFactory.setPromiseLibrary;
