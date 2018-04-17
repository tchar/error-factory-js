/**
 * The main module
 * @module index
 * @author Tilemachos Charalampous
 */
'use strict';
import SimpleErrorFactory from './simple';
import ExtendedErrorFactory from './extended';

const simple = new SimpleErrorFactory().simple;
const extended = new ExtendedErrorFactory();
/**
 * Export simple and extended modules
 */

export default simple;

export function create(name: string, message: string, callback: any, extras: object): any {
    return extended.create(name, message, callback, extras);
}
   
export function exists(error: any): boolean {
    return extended.exists(error);
};

export function canHandle(error: any): boolean {
    return extended.canHandle(error);
};

export function handle(error: any, ...params): boolean {
    return extended.handle.apply(extended, [error].concat(params));
};

export function handleAsync(error, ...params): boolean {
    return extended.handleAsync.apply(extended, [error].concat(params));
};

export function expressHandler(options: object): any {
    return extended.expressHandler(options);
};

export function remove(error: any): void {
    extended.remove(error);
};

export function flush(): void {
    extended.flush();
};

export function addHandler(name: string, handler: any): void {
    extended.addHandler(name, handler);
};

export function getHandler(name: string): any {
    return extended.getHandler(name);
}

export function getErrorConstructor(error: any): any {
    return extended.getErrorConstructor(error);
};

export function setPromiseLibrary(promiseLib: any): void {
    extended.setPromiseLibrary(promiseLib);
};


module.exports = simple;
module.exports.create = extended.create
module.exports.exists = extended.exists
module.exports.canHandle = extended.canHandle
module.exports.handle = extended.handle
module.exports.handleAsync = extended.handleAsync
module.exports.expressHandler = extended.expressHandler
module.exports.remove = extended.remove
module.exports.flush = extended.flush
module.exports.addHandler = extended.addHandler
module.exports.getHandler = extended.getHandler
module.exports.getErrorConstructor = extended.getErrorConstructor
module.exports.setPromiseLibrary = extended.setPromiseLibrary
    