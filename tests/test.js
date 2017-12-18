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
		var messages = ['3', '4'];
		function func(){
			messages.push(this.message);
		}

		function handler(){
	
		}

		handler.prototype.handle = function(err){
			if (err instanceof SomeError){
				err.handle();
			} else if (err instanceof SomeOtherError){
				messages.push(error.message);
			}
		}

		ErrorFactory().addHandler('MyHandler', new handler());
		var SomeError = ErrorFactory('SomeError', func);
		var SomeOtherError = ErrorFactory('SomeOtherError', func);
		done();
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

		assert(messages[0] === '1' && messages[1] === '2');

	});
})