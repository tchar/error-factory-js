/**
 * Extended Mode Module
 * @module lib/extended
 * @author Tilemachos Charalampous
 */

'use strict';
import ErrorFactory from './implementation/error_factory';

/**
 * Export the functions
 */

class ExtendedErrorFactory {
    
    public create(name: string, message: string, callback: any, extras: object): any {
        return ErrorFactory.getInstance().create(name, message, callback, extras);
    }
    
    public exists(error: any): boolean {
        return ErrorFactory.getInstance().exists(error);
    };

    public canHandle(error: any): boolean {
        return ErrorFactory.getInstance().canHandle(error);
    };

    public handle(error: any, ...params): boolean {
        return ErrorFactory.getInstance().handle.apply(ErrorFactory.getInstance(), [error].concat(params));
    };

    public handleAsync(error, ...params): boolean {
        return ErrorFactory.getInstance().handleAsync.apply(ErrorFactory.getInstance(), [error].concat(params));
    };

    public expressHandler(options: object): any {
        return ErrorFactory.getInstance().expressHandler(options);
    };

    public remove(error: any): void {
        ErrorFactory.getInstance().remove(error);
    };

    public flush(): void {
        ErrorFactory.getInstance().flush();
    };

    public addHandler(name: string, handler: any): void {
        ErrorFactory.getInstance().addHandler(name, handler);
    };

    public getHandler(name: string): any {
        return ErrorFactory.getInstance().getHandler(name);
    }

    public getErrorConstructor(error: any): any {
        return ErrorFactory.getInstance().getErrorConstructor(error);
    };

    public setPromiseLibrary(promiseLib: any): void {
        ErrorFactory.getInstance().setPromiseLibrary(promiseLib);
    };

}

export default ExtendedErrorFactory;
