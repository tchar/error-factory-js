const app = require('express')();
const ErrorFactory = require('error-factory-js');

var func = function(req, res, next){
    res.status(500).send(this.message);
}

app.use('/', function(req, res, next){
    next(ErrorFactory().create('CustomError', 'Hey something went wrong', func));
    // or
    var MyError = ErrorFactory('CustomError', func);
    next(MyError('Hey something went wrong'));
});

app.use(ErrorFactory().expressHandler({handleAsync: true}));
// If the error can be handled by the express handler next() is called after
// handling the error else next(err) is called 
// so be sure to add this before the generic error handler
// and not use any res.send below this point

app.use(function(err, req, res, next){
    // Handle the other errors;
});

// This code will send a status 500 with message 'Hey something went wrong'