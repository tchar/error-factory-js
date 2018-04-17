/**
 * The main module
 * @module index
 * @author Tilemachos Charalampous
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const simple_1 = require("./simple");
const extended_1 = require("./extended");
const simple = new simple_1.default().simple;
const extended = new extended_1.default();
/**
 * Export simple and extended modules
 */
module.exports = simple;
module.exports.create = extended.create;
module.exports.exists = extended.exists;
module.exports.canHandle = extended.canHandle;
module.exports.handle = extended.handle;
module.exports.handleAsync = extended.handleAsync;
module.exports.expressHandler = extended.expressHandler;
module.exports.remove = extended.remove;
module.exports.flush = extended.flush;
module.exports.addHandler = extended.addHandler;
module.exports.getHandler = extended.getHandler;
module.exports.getErrorConstructor = extended.getErrorConstructor;
module.exports.setPromiseLibrary = extended.setPromiseLibrary;
//# sourceMappingURL=index.js.map