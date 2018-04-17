declare class SimpleErrorFactory {
    /**
     * This function creates an error based on a name and a callback to
     * assign as the err.handle function. If no parameter is given to this function
     * then it returns the Error factory instance.
     * @param {string} name - The error's name
     * @param {function} callback - The error's handle function
     */
    simple(name: string, callback: any): any;
}
export default SimpleErrorFactory;
