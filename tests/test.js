const assert = require('assert')
const should = require('should');
const ErrorFactory = require('../error_factory');

describe('Error Factory', function(){
	it('should work in simple mode', function(done){
		var message;
		try{
			var MyError = ErrorFactory('MyError');
			throw MyError('A message');
		} catch(err){
			message = err.message;
		} finally{
			assert(message === 'A message', true);
			done();
		}
	});

	it('should work in simple mode with callback and extras', function(done){
		var message;
		var extras = {value: 0};
		var func = function(){
			message = this.message;
			extras = this.extras;
		}
		try{
			var MyError = ErrorFactory('MyError', func);
			throw MyError('A message', {value: 1});
		} catch(error){
			error.handle();
		} finally {
			assert(message === 'A message' && extras.value === 1, true);
			done();
		}
	});

	it('should work in extra mode', function(done){
		var message;
		try{
			throw ErrorFactory().create('MyError', 'A message');
		} catch(err){
			message = err.message;
		} finally{
			assert(message === 'A message', true);
			done();
		}
	});

	it('should work in extra mode with callback and extras', function(done){
		var message;
		var extras = {value: 0};
		var func = function(){
			message = this.message;
			extras = this.extras;
		}
		try{
			throw ErrorFactory().create('MyError', 'A message', func, {value: 1});
		} catch(error){
			error.handle();
		} finally {
			assert(message === 'A message' && extras.value === 1, true);
			done();
		}
	});

	it('should work in extra mode with handleAsync', function(done){
		var message;
		var extras = {value: 0};
		var func = function(){
			message = this.message;
			extras = this.extras;
		}
		try{
			throw ErrorFactory().create('MyError', 'A message', func, {value: 1});
		} catch(error){
			ErrorFactory().handleAsync(error);
		} finally {
			assert(typeof message === 'undefined' && extras.value === 0, true);
			setTimeout(function() {
				assert(message === 'A message' && extras.value === 1, true);
				done();
			}, 100);
		}
	});

	it('should work in simple mode with handleAsync', function(done){
		var message;
		var extras = {value: 0};
		var func = function(){
			message = this.message;
			extras = this.extras;
		}
		try{
			var SomeError = ErrorFactory('SomeError', func)
			throw SomeError('A message', {value: 1});
		} catch(error){
			ErrorFactory().handleAsync(error);
		} finally {
			assert(typeof message === 'undefined' && extras.value === 0, true);
			setTimeout(function() {
				assert(message === 'A message' && extras.value === 1, true);
				done();
			}, 100);
		}
	});

	it ('should work with handlers sync', function(done){
		var messages = [];
		function func(){
			messages.push(this.message);
		}

		function handler(){
	
		}

		handler.prototype.handle = function(err){
			if (err instanceof SomeError){
				err.handle();
			} else if (err instanceof SomeOtherError){
				messages.push(err.message);
			}
		}

		ErrorFactory().addHandler('MyHandler', new handler());
		var SomeError = ErrorFactory('SomeError', func);
		var SomeOtherError = ErrorFactory('SomeOtherError');
		try{
			throw SomeError('1');
		} catch(error){
			ErrorFactory().getHandler('MyHandler').handle(error);
		}

		try{
			throw SomeOtherError('2');
		} catch(error){
			ErrorFactory().getHandler('MyHandler').handle(error);
		}
		assert(messages.length === 2 && messages[0] === '1' && messages[1] === '2', true);
		done();

	});

	it ('should work with handlers async', function(done){
		var messages = [];
		function func(timeout){
			var thisObj = this;
			setTimeout(function() {
				messages.push(thisObj.message);
			}, timeout);
		}

		function handler(){
	
		}

		handler.prototype.handle = function(err){
			if (err instanceof SomeError){
				ErrorFactory().handleAsync(err, 10);
			} else if (err instanceof SomeOtherError){
				ErrorFactory().handleAsync(err, 20);
			}
		}

		ErrorFactory().addHandler('MyHandler', new handler());
		var SomeError = ErrorFactory('SomeError', func);
		var SomeOtherError = ErrorFactory('SomeOtherError', func);
		try{
			throw SomeOtherError('1');
		} catch(error){
			ErrorFactory().getHandler('MyHandler').handle(error);
		}

		try{
			throw SomeError('2');
		} catch(error){
			ErrorFactory().getHandler('MyHandler').handle(error);
		}
		setTimeout(function() {
			messages.sort();
			assert(messages.length === 2 && messages[0] === '1' && messages[1] === '2', true);
			done();
		}, 100);
		
		
	});
})