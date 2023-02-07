'use strict';
(function (){
	let divExamples = document.getElementById('examples').children[8];
	let buttons = divExamples.getElementsByClassName('tab-pane')[2].getElementsByTagName('button');

	function genericErrorExample(){
		$$result.clear();
		function genericError(){
			throw new Error("Throw generic error");
		}
		try{
			$$result.log("Before error"); // Before error
			genericError();
			$$result.log("After error");
		} catch (error) {
			$$result.log(error.name); // Error
			$$result.log(error.message); // Throw generic error
		}
	}
	buttons[0].addEventListener('click', genericErrorExample);

	function specificErrorExample(){
		$$result.clear();
		function referenceError(){
			throw new ReferenceError("Error in a reference");
		}
		function typeError(){
			throw new TypeError("Error in a type");
		}
		try{
			referenceError();
		} catch (error) {
			if (error instanceof ReferenceError) {
				//ReferenceError: Error in a reference
				$$result.log(error.name + ': ' + error.message)
			} else if (error instanceof TypeError) {
				$$result.log(error.name + ': ' + error.message)
			}
		}
		try{
			typeError();
		} catch (error) {
			if (error instanceof ReferenceError) {
				$$result.log(error.name + ': ' + error.message)
			} else if (error instanceof TypeError) {
				//TypeError: Error in a type
				$$result.log(error.name + ': ' + error.message)
			}
		}
	}
	buttons[1].addEventListener('click', specificErrorExample);

	function customizeErrorV1(){
		// MyError hereda de Error
		function MyError(message = "Default Message") {
			this.name = "MyError";
			this.message = message;
		}
		MyError.prototype = Object.create(Error.prototype);
		MyError.prototype.constructor = MyError;

		$$result.clear();
		try {
			throw new MyError();
		} catch (error) {
			$$result.log(error.name);     // 'MyError'
			$$result.log(error.message);  // 'Default Message'
		}

		try {
			throw new MyError('custom message');
		} catch (error) {
			$$result.log(error instanceof MyError); // true
			$$result.log(error instanceof Error); // true
			$$result.log(error.name);     // 'MyError'
			$$result.log(error.message);  // 'custom message'
			$$result.log(error.stack);  // undefined
		}
	}
	buttons[2].addEventListener('click', customizeErrorV1);

	function customizeErrorV2(){
		function MyError(myproperty = "unknown", message = "Default Message", fileName, lineNumber) {
			let instance = new Error(message, fileName, lineNumber);
			instance.myproperty = myproperty;
			instance.name = "MyError";
			Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
			if (Error.captureStackTrace) {
				Error.captureStackTrace(instance, MyError);
			}
			return instance;
		}
		MyError.prototype = Object.create(Error.prototype, {
			constructor: {
				value: MyError,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});

		$$result.clear();
		try {
			throw new MyError("myprop", "custom message");
		} catch (error) {
			$$result.log(error instanceof MyError); // true
			$$result.log(error instanceof Error); // true
			$$result.log(error.myproperty);     // myprop
			$$result.log(error.name);     // MyError
			$$result.log(error.message);  // custom message
			$$result.log(error.stack);  // ...
		}
	}
	buttons[3].addEventListener('click', customizeErrorV2);

	let exceptionHierarchy = (function (){
		function BaseException(message = "Default Message", fileName, lineNumber) {
			let instance = new Error(message, fileName, lineNumber);
			instance.name = "MyError";
			Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
			if (Error.captureStackTrace) {
				Error.captureStackTrace(instance, BaseException);
			}
			return instance;
		}
		BaseException.prototype = Object.create(Error.prototype, {
			constructor: {
				value: BaseException,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});

		//Excepción acceso inválido a constructor
		function InvalidAccessConstructorException() {
			let instance = BaseException.call(this, "Constructor can’t be called as a function.");
			instance.name = "InvalidAccessConstructorException";
			return instance;
		}
		InvalidAccessConstructorException.prototype = Object.create(BaseException.prototype);
		InvalidAccessConstructorException.prototype.constructor = InvalidAccessConstructorException;

		//Excepción personalizada para indicar valores vacios.
		function EmptyValueException(param) {
			let instance = BaseException.call(this, "Error: The parameter " + param + " can't be empty.");
			instance.name = "EmptyValueException";
			instance.param = param;
			return instance;
		}
		EmptyValueException.prototype = Object.create(BaseException.prototype);
		EmptyValueException.prototype.constructor = EmptyValueException;

		//Excepción de valor inválido
		function InvalidValueException(param, value) {
			let instance = BaseException.call(this, "Error: The paramenter " + param + " has an invalid value. (" + param + ": " + value + ")");
			instance.name = "InvalidValueException";
			instance.param = param;
			instance.param = value;
			return instance;
		}
		InvalidValueException.prototype = Object.create(BaseException.prototype);
		InvalidValueException.prototype.constructor = InvalidValueException;

		function TestObject(){
			if (!(this instanceof TestObject))
				throw new InvalidAccessConstructorException();

			this.property1 = "property1";
			this.property2 = "property2";
		}

		return {
			hierarchyExample: function(){
				$$result.clear();
				try{
					let testObject = TestObject();
				} catch (error){
					// InvalidAccessConstructorException: Constructor can’t be called as a function.
					$$result.log(error instanceof BaseException); //true
					$$result.log(error instanceof InvalidAccessConstructorException); //true
					$$result.log(error.toString());
					$$result.log(error.stack);
				}
			},
			exceptionExercise: function(){
				$$result.clear();
				try{
					throw new EmptyValueException("price");
				} catch (error){
					// EmptyValueException: Error: The parameter price can't be empty.
					$$result.log(error.toString());
				}
				try{
					throw new InvalidValueException("price","aaa");
				} catch (error){
					// InvalidValueException: Error: The paramenter price has an invalid value. (price: aaa)
					$$result.log(error.toString());
				}
			}
		}
	})();
	buttons[4].addEventListener('click', exceptionHierarchy.hierarchyExample);
	buttons[5].addEventListener('click', exceptionHierarchy.exceptionExercise);

})();

