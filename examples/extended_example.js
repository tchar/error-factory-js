const ErrorFactory = require('error-factory-js');

var CustomError = ErrorFactory().create('CustomError');
try{
	throw new CustomError('This is a message');
} catch (error){
	console.log(error.message);
	// handle it
}