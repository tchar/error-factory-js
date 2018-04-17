/**
 * Export the functions
 */
declare class ExtendedErrorFactory {
    create(name: string, message: string, callback: any, extras: object): any;
    exists(error: any): boolean;
    canHandle(error: any): boolean;
    handle(error: any, ...params: any[]): boolean;
    handleAsync(error: any, ...params: any[]): boolean;
    expressHandler(options: object): any;
    remove(error: any): void;
    flush(): void;
    addHandler(name: string, handler: any): void;
    getHandler(name: string): any;
    getErrorConstructor(error: any): any;
    setPromiseLibrary(promiseLib: any): void;
}
export default ExtendedErrorFactory;
