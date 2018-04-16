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
    
    public create(...params) {
        return errorFactory.create.apply(errorFactory, params);
    }
    
    public exists(...params) {
        return errorFactory.exists.apply(errorFactory, params);
    };

    public canHandle(...params) {
        return errorFactory.canHandle.apply(errorFactory, params);
    };

    public handle(...params) {
        return errorFactory.handle.apply(errorFactory, params);
    };

    public handleAsync(...params) {
        return errorFactory.handleAsync.apply(errorFactory, params);
    };

    public expressHandler(...params) {
        return errorFactory.expressHandler.apply(errorFactory, params);
    };

    public remove(...params) {
        return errorFactory.remove.apply(errorFactory, params);
    };

    public flush(...params) {
        return errorFactory.flush.apply(errorFactory, params);
    };

    public addHandler(...params) {
        return errorFactory.addHandler.apply(errorFactory, params);
    };

    public getHandler(...params) {
        return errorFactory.getHandler.apply(errorFactory, params);
    }

    public getErrorConstructor(...params) {
        return errorFactory.getErrorConstructor.apply(errorFactory, params);
    };

    public setPromiseLibrary(...params) {
        return errorFactory.setPromiseLibrary.apply(errorFactory, params);
    };

}

export default new ExtendedErrorFactory();