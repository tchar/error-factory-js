const app = require('express')();
const ErrorFactory = require('error-factory-js');

app.use('/' function(req, res, next){
    next(ErrorFactory().create('MyError', callback));
})

var MyHandler = function(err, req, res, next){
    // implement something
}

ErrorFactory().addHandler('SomeHandler', MyHandler);

app.use(ErrorFactory().getHandler('SomeHandler'));

app.use(function(err, req, res, next)){
    // Handle other errors not created by this Factory
}