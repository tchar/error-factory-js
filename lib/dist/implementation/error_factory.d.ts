declare class ErrorFactory {
    private static instance;
    private PromiseLib;
    protected errorSet: Map<string, any>;
    private errorHandlers;
    static getInstance(): ErrorFactory;
    generate(name: string, callback: any): any;
    /**
     * This method creates an error with specified name, message, callback and extras
     *
     * @param {string} name - name of the error
     * @param {string} message - message of the error
     * @param {function} callback - handler of the error, as error.handle
     * @param {object} extras - any extras passed to error, as error.extras
     * @return {object} - error the error produced
     */
    create(name: string, message: string, callback: any, extras: any): any;
    /**
     * This method check if the provided error exists in ErrorFactory's
     * errorSet, meaning it was previously created by it.
     *
     * @param {object} error - error
     * @return {boolean} - true if exists else false
     */
    exists(error: any): boolean;
    /**
     * This method checks if the error was created by this ErrorFactory
     * and can handle itself (calling error.handle).
     *
     * @param {object} error - error
     * @return {boolean} - true if can handle else false
     *
     */
    canHandle(error: any): boolean;
    /**
     * This method performs the handling of an error by calling the
     * error.handle function and returns true if handled else false
     *
     * @param {object} error - error
     * @param {array} params any other parameters needed by error.handle function
     * @return {boolean} - true if handled else false
     */
    handle(error: any, ...params: any[]): boolean;
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
    handleAsync(error: any, ...params: any[]): Promise<any>;
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
    expressHandler(options: any): any;
    /**
     * This method removes an error from the errorSet, meaning
     * it can no longer be handled by this ErrorFactory. However
     * it can be handled explicitly by error.handle function if it is defined
     *
     * @param {object} error - error
     */
    remove(error: any): void;
    /**
     * This method fluses the errorSet and removes all errors.
     */
    flush(): void;
    /**
     * This method is used to add custom handlers
     *
     * @param {string} name - string handler name
     * @param {function} handler - function handler
     */
    addHandler(name: string, handler: any): void;
    /**
     *
     * This method is used to get custom handlers
     *
     * @param {string} name - name of the handler
     * @return {function} - the handler
     *
     */
    getHandler(name: string): any;
    /**
     * This method is used to get the Error constructor of a
     * specific error
     *
     * @param {object} error - error
     * @return {function} - the constructor of the error
     */
    getErrorConstructor(error: any): any;
    /**
     * This function accepts a promise library and sets it as the default Promise library
     * @param {object} promise - the promise library to set
     */
    setPromiseLibrary(promise: any): void;
    private constructor();
}
export default ErrorFactory;
