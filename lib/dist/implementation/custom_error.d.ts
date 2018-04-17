export default class CustomError {
    /**
     *
     * @param {object} stack - the errors stack trace
     * @returns {object} - the stack cleared
     */
    private static getStackTraceCleaned(stack);
    /**
     *
     * This function is a wrapper for the error to simulate the
     * new Error("Some message")
     * @param {string} name - error name
     * @param {function} callback - the error handling funbction
     * @return function
     *
     */
    static generate(name: any, callback: any): any;
}
