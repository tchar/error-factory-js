const ErrorFactory = require('error-factory-js');

function callback(verbose=false){
	if (verbose || this.extras.errorType === 'fatal')
		console.log(this.message) // this refers to the error
	// do some handling
}

var SomeError = ErrorFactory().create('SomeError', callback);
try{
	throw new SomeError('This is a message', {errorType: 'fatal'});
} catch (error){
	error.handle(verbose=true);
}