"use strict";

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

// El elemento no es un objeto
function notObjectException() {
	let instance = BaseException.call(this, "Invalid type of element.");
	instance.name = "notObjectException";
	return instance;
}
notObjectException.prototype = Object.create(BaseException.prototype);
notObjectException.prototype.constructor = notObjectException;

// La lista está llena
function listFullException() {
	let instance = BaseException.call(this, "The list is full.");
	instance.name = "listFullException";
	return instance;
}
listFullException.prototype = Object.create(BaseException.prototype);
listFullException.prototype.constructor = listFullException;

// La lista está vacía
function listEmptyException() {
	let instance = BaseException.call(this, "The list is empty.");
	instance.name = "listEmptyException";
	return instance;
}
listEmptyException.prototype = Object.create(BaseException.prototype);
listEmptyException.prototype.constructor = listEmptyException;

// El índice está fuera de los límites de la lista
function indexOffLimitsException() {
	let instance = BaseException.call(this, "Index is out of limits.");
	instance.name = "indexOffLimitsException";
	return instance;
}
indexOffLimitsException.prototype = Object.create(BaseException.prototype);
indexOffLimitsException.prototype.constructor = indexOffLimitsException;

// El tipo que se introduce es invalido
function invalidTypeException() {
	let instance = BaseException.call(this, "The type is invalid.");
	instance.name = "invalidTypeException";
	return instance;
}
invalidTypeException.prototype = Object.create(BaseException.prototype);
invalidTypeException.prototype.constructor = invalidTypeException;
