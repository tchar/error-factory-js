const assert = require('assert');
const ErrorFactory = require('../index');

'use strict';
describe('Error Factory', function(){
    it('should work in simple mode', function(done){
        let message;
        const MyError = ErrorFactory('MyError');
        try{
            throw MyError('A message');
        } catch(err){
            assert(err instanceof MyError, true);
            message = err.message;
        } finally{
            assert(message === 'A message', true);
            done();
        }
    });

    it('should work in simple mode with callback and extras', function(done){
        let message;
        let extras = {value: 0};
        const func = function(){
            message = this.message;
            extras = this.extras;
        };

        const MyError = ErrorFactory('MyError', func);
        try{
            throw new MyError('A message', {value: 1});
        } catch(error){
            assert(error instanceof MyError, true);
            error.handle();
        } finally {
            assert(message === 'A message' && extras.value === 1, true);
            done();
        }
    });

    it('should work in extra mode', function(done){
        let message;
        try{
            throw ErrorFactory().create('MyError', 'A message');
        } catch(err){
            assert(err instanceof ErrorFactory.getErrorConstructor('MyError'));
            message = err.message;
        } finally{
            assert(message === 'A message', true);
            done();
        }
    });

    it('should work in extra mode with callback and extras', function(done){
        let message;
        let extras = {value: 0};
        const func = function(){
            message = this.message;
            extras = this.extras;
        };
        try{
            throw ErrorFactory.create('MyError', 'A message', func, {value: 1});
        } catch(error){
            assert(error instanceof ErrorFactory.getErrorConstructor('MyError'));
            error.handle();
        } finally {
            assert(message === 'A message' && extras.value === 1, true);
            done();
        }
    });

    it('should work in extra mode with handleAsync and promise library', function(done){
        let message;
        let extras = {value: 0};
        const func = function(){
            message = this.message;
            extras = this.extras;
        };
        try{
            ErrorFactory.setPromiseLibrary(require('bluebird'));
            throw ErrorFactory.create('MyError', 'A message', func, {value: 1});
        } catch(error){
            assert(error instanceof ErrorFactory.getErrorConstructor('MyError'));
            ErrorFactory.handleAsync(error);
        } finally {
            assert(typeof message === 'undefined' && extras.value === 0, true);
            setTimeout(function() {
                assert(message === 'A message' && extras.value === 1, true);
                done();
            }, 100);
        }
    });

    it('should work in simple mode with handleAsync', function(done){
        let message;
        let extras = {value: 0};
        const func = function(){
            message = this.message;
            extras = this.extras;
        };
        const SomeError = ErrorFactory('SomeError', func);
        try{
            throw SomeError('A message', {value: 1});
        } catch(error){
            assert(error instanceof SomeError, true);
            ErrorFactory.handleAsync(error);
        } finally {
            assert(typeof message === 'undefined' && extras.value === 0, true);
            setTimeout(function() {
                assert(message === 'A message' && extras.value === 1, true);
                done();
            }, 100);
        }
    });

    it ('should work with handlers sync', function(done){
        const messages = [];
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
        };

        ErrorFactory.addHandler('MyHandler', new handler());
        const SomeError = ErrorFactory('SomeError', func);
        const SomeOtherError = ErrorFactory('SomeOtherError');
        try{
            throw SomeError('1');
        } catch(error){
            assert(error instanceof SomeError, true);
            ErrorFactory.getHandler('MyHandler').handle(error);
        }

        try{
            throw SomeOtherError('2');
        } catch(error){
            assert(error instanceof SomeOtherError, true);
            ErrorFactory.getHandler('MyHandler').handle(error);
        }
        assert(messages.length === 2 && messages[0] === '1' && messages[1] === '2', true);
        done();

    });

    it ('should work with handlers async', function(done){
        const messages = [];
        function func(timeout){
            const thisObj = this;
            setTimeout(function() {
                messages.push(thisObj.message);
            }, timeout);
        }

        function handler(){

        }

        handler.prototype.handle = function(err){
            if (err instanceof SomeError){
                ErrorFactory.handleAsync(err, 10);
            } else if (err instanceof SomeOtherError){
                ErrorFactory.handleAsync(err, 20);
            }
        };

        ErrorFactory.addHandler('MyHandler', new handler());
        const SomeError = ErrorFactory('SomeError', func);
        const SomeOtherError = ErrorFactory('SomeOtherError', func);
        try{
            throw SomeOtherError('1');
        } catch(error){
            assert(error instanceof SomeOtherError, true);
            ErrorFactory.getHandler('MyHandler').handle(error);
        }

        try{
            throw SomeError('2');
        } catch(error){
            assert(error instanceof SomeError, true);
            ErrorFactory.getHandler('MyHandler').handle(error);
        }
        setTimeout(function() {
            messages.sort();
            assert(messages.length === 2 && messages[0] === '1' && messages[1] === '2', true);
            done();
        }, 100);
        
        
    });

    it('should not work for stupid error names', function(done){
        const errNames = ['+1', '2', 4, '-zf', '%123', '123', '1a'];
        errNames.forEach(function(item){
            let err = new Error();
            try{
                ErrorFactory(item);
            } catch(error){
                err = error;
            }	
            assert(err.message === 'Invalid error name');
        });
        done();
    });
});