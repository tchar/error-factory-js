# error-factory-js
A JavaScript Factory for creating and handling errors

This module can be used to create custom JavaScript Errors and handle them
When creating an Error a function can be passed to it, so when catching it
you can handle it by calling error.handle(args);

Also this module knows which Errors are generated by it so you can create generic
handlers for Errors that were created by it.

Handling Errors is simple and can be either sync or async (Using bluebird's promises) by using the ErrorFactory's
methods (see Examples)

# Documentation
This module supports a simple mode to create errors and an extended mode to access the ErrorFactory and its methods

The simple mode can be accessed by using
```javascript
const ErrorFactory = require('error-factory-js');
var MyError = ErrorFactory('MyError', callback);
throw MyError('Some messsage', extras);
```

In this context the callback and extras are optional, though
they can be accessed by using
```error.handle()``` and ```error.extras```

The extended mode can be accessed by using
```javascript
const ErrorFactory = require('error-factory-js');
```
and call ```ErrorFactory().someMethod()``` to access the method

The supported methods are:
### create()
This method is equivalent to the simple mode's error creation
```javascript
try{
    throw ErrorFactory().create('MyError', 'Some Message', callback, extras);
} catch(err){
    err.message // The error message
    err.handle() // To call the handle function
    err.extras // The extras
}
```
### exists()
This method returns true if the error was created by this ErrorFactory, false otherwise
```javascript
try {
    throw ErrorFactory().create('MyError', 'Some Message', callback, extras);
} catch(err){
    ErrorFactory().exists(err) // This is true
}
```
### canHandle()
This method returns true if a callback was specified when creating an error, false otherwise
```javascript
try{
    var MyError = ErrorFactory('MyError', callback)
    throw MyError('Some Message');
} catch(err){
    ErrorFactory().canHandle(err) // This is true
}
```
### handle()
This method handles the error and returns true if the error was handled false otherwise
```javascript
try{
    var MyError = ErrorFactory('MyError', callback)
    throw MyError('Some Message');
} catch(err){
    ErrorFactory().handle(err) // This is true and error was handled using callback
}
```
### handleAsync()
This method is like handle() but handles the error using bluebird's Promises
```javascript
try{
    var MyError = ErrorFactory('MyError', callback)
    throw MyError('Some Message');
} catch(err){
    ErrorFactory().handleAsync(err) // This is true and error will be handled using callback
}
```
### expressHandler()
This method is a generic express handler that returns a function with a signature (err, req, res, next)
The express handler takes a javascript object as options.
Options ```{handleAsync: boolean}``` if you want to use handle or handleAsync, default ```false```
See examples below in how to use it
```javascript
app.use('/' function(req, res, next){
    next(ErrorFactory().create('MyError', callback));
})

app.use(ErrorFactory().expressHandler());

app.use(function(err, req, res, next)){
    // Handle other errors not created by this Factory
}
```
### remove()
Removes an error from this factory, so now it can not be handled by handle(), handleAsync() etc.
```javascript
try{
    var MyError = ErrorFactory('MyError', callback)
    throw MyError('Some Message');
} catch(err){
    ErrorFactory().remove(err);
    ErrorFactory().exists(err) // This is false
    ErrorFactory().canHandle(err) // This is false
    ErrorFactory().handle(err) // This is false
    ErrorFactory().handleAsync(err) // this is false
}
```
### flush()
Removes all errors from this factory
```javascript
try{
    var MyError = ErrorFactory('MyError', callback)
    throw MyError('Some Message');
} catch(err){
    ErrorFactory.flush();
    ErrorFactory().exists(err) // This is false
    ErrorFactory().canHandle(err) // This is false
    ErrorFactory().handle(err) // This is false
    ErrorFactory().handleAsync(err) // this is false
}
```
### addHandler() / getHandler()
Sets/gets a handler with a name for later use
Following code is for express, but can be used for other instances too.
```javascript
app.use('/' function(req, res, next){
    next(ErrorFactory().create('MyError', callback));
})

var MyHandler = function(args){
    // implement something
}

ErrorFactory().addHandler('SomeHandler', MyHandler);

app.use(ErrorFactory().getHandler('SomeHandler'));

app.use(function(err, req, res, next)){
    // Handle other errors not created by this Factory
}
```
# Examples

## Simple Example
```javascript
const ErrorFactory = require('error-factory-js');

try{
    var MyError = ErrorFactory('MyError');
    throw MyError('This is an error');
} catch (error){
    console.log(error.message); // Prints This is an error
}
```
## Simple Example by using ErrorFactory's create method
```javascript
const ErrorFactory = require('error-factory-js');

try{
    throw ErrorFactory().create('MyError', 'This is some err');
} catch (error){
    console.log(error.message); // Prints This is some err
}
```
## Simple Example with handle function
```javascript
const ErrorFactory = require('error-factory-js');

var handleFunc = function(){
    console.log(this.message) // This refers to the error
                              // If called from error context
}

try{
    var MyError = ErrorFactory('MyError', handleFunc);
    throw MyError("Some other message");
} catch (error){
    error.handle(); // Will print Some other message
}
```
## Simple Example with handle function by using ErrorFactory's sync handle
```javascript
const ErrorFactory = require('error-factory-js');

var handleFunc = function(){
    console.log(this.message) // This refers to the error
}

try{
    var MyError = ErrorFactory('MyError', handleFunc);
    throw MyError("Some other message too");
} catch (error){
    if (ErrorFactory().handle(error)){
        console.log('Error Handled')
    } else {
        console.log('Error not handled');
        // Handle error manually in case handleFunc was not defined
        // Or the error was not created by this ErrorFactory
    }
}

// The output of this should be
// Some other message too
// Error Handled
```
## Simple Example with handle function by using ErrorFactory's sync handle
```javascript
const ErrorFactory = require('error-factory-js');

var handleFunc = function(){
    console.log(this.message) // This refers to the error
}

try{
    var MyError = ErrorFactory('MyError', handleFunc);
    throw MyError("Another other message");
} catch (error){
    if (ErrorFactory().handleAsync(error)){
        console.log('Error Handled')
    } else {
        console.log('Error not handled');
        // Handle error manually in case handleFunc was not defined
        // Or the error was not created by this ErrorFactory
    }
}

// The output of this should be
// Error Handled
// Another other message
```
## Simple Example with Express and using ErrorFactory's handle/handleAsync
```javascript
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

app.use(function(err, req, res, next){
    if (!ErrorFactory().handleAsync(err, req, res, next)){
        // handle the error manually
    }
});

// This code will send a status 500 with message 'Hey something went wrong'
```
## Simple Example with Express and using ErrorFactory's expressHandler
```javascript
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
```