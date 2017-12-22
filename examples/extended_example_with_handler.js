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
	if (ErrorFactory().handle(error)){
		console.log('Error handled');
	} else {
		// this Factory cannot handle the error
		// either because it was not created by it
		// or callback function is not specified.
		// handle it manually

	}
}