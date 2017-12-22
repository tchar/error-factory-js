const ErrorFactory = require('error-factory-js');

function callback(verbose=false){
	if (verbose)
		console.log(this.message) // this refers to the error
	// do some handling
}

var SomeError = ErrorFactory().create('SomeError', callback);
try{
	throw new SomeError('This is a message');
} catch (error){
	error.handle(verbose=true);
}