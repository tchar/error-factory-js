/**
 * Extended Mode Module
 * @module lib/extended
 * @author Tilemachos Charalampous
 */

'use strict';
import errorFactory from './implementation/error_factory';

/**
 * Export the functions
 */

class ExtendedErrorFactory {
    
    public create(name: string, message: string, callback: any, extras: object): any {
        return errorFactory.create(name, message, callback, extras);
    }
    
    public exists(error: any): boolean {
        return errorFactory.exists(error);
    };

    public canHandle(error: any): boolean {
        return errorFactory.canHandle(error);
    };

    public handle(error: any, ...params): boolean {
        return errorFactory.handle.apply(errorFactory, [error].concat(params));
    };

    public handleAsync(error, ...params): boolean {
        return errorFactory.handleAsync.apply(errorFactory, [error].concat(params));
    };

    public expressHandler(options: object): any {
        return errorFactory.expressHandler(options);
    };

    public remove(error: any): void {
        errorFactory.remove(error);
    };

    public flush(): void {
        errorFactory.flush();
    };

    public addHandler(name: string, handler: any): void {
        errorFactory.addHandler(name, handler);
    };

    public getHandler(name: string): any {
        return errorFactory.getHandler(name);
    }

    public getErrorConstructor(error: any): any {
        return errorFactory.getErrorConstructor(error);
    };

    public setPromiseLibrary(promiseLib: any): void {
        errorFactory.setPromiseLibrary(promiseLib);
    };

}

export default new ExtendedErrorFactory();