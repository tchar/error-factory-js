/**
 * The main module
 * @module index
 * @author Tilemachos Charalampous
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const simple_1 = require("./simple");
const extended_1 = require("./extended");
/**
 * Export simple and extended modules
 */
module.exports = simple_1.default;
module.exports.create = extended_1.default.create;
module.exports.exists = extended_1.default.exists;
module.exports.canHandle = extended_1.default.canHandle;
module.exports.handle = extended_1.default.handle;
module.exports.handleAsync = extended_1.default.handleAsync;
module.exports.expressHandler = extended_1.default.expressHandler;
module.exports.remove = extended_1.default.remove;
module.exports.flush = extended_1.default.flush;
module.exports.addHandler = extended_1.default.addHandler;
module.exports.getHandler = extended_1.default.getHandler;
module.exports.getErrorConstructor = extended_1.default.getErrorConstructor;
module.exports.setPromiseLibrary = extended_1.default.setPromiseLibrary;
//# sourceMappingURL=index.js.map