"use strict";

function HighSchoolException() {
	let instance = BaseException.call(this, "Error: HighSchool Exception.");
	instance.name = "HighSchoolException";
	return instance;
}
HighSchoolException.prototype = Object.create(BaseException.prototype, {
	constructor: {
		value: HighSchoolException,
		enumerable: false,
		writable: false,
		configurable: false
	}
});

// Excepción personalizada para saber si existe
function ExistHighSchoolException(param) {
	let instance = HighSchoolException.call(this, "Error: The parameter " + param + " already exist.");
	instance.name = "ExistHighSchoolException";
	return instance;
}
ExistHighSchoolException.prototype = Object.create(BaseException.prototype, {
	constructor: {
		value: ExistHighSchoolException,
		enumerable: false,
		writable: false,
		configurable: false
	}
});

// Excepción personalizada para saber si no existe
function NotExistHighSchoolException(param) {
	let instance = HighSchoolException.call(this, "Error: The parameter " + param + " doesn't exist.");
	instance.name = "NotExistHighSchoolException";
	return instance;
}
NotExistHighSchoolException.prototype = Object.create(BaseException.prototype, {
	constructor: {
		value: NotExistHighSchoolException,
		enumerable: false,
		writable: false,
		configurable: false
	}
});

let HighSchool = (function () {
	let instantiated;

	function init() {
		function HighSchool() {
			if (!(this instanceof HighSchool)) throw new InvalidAccessConstructorException();

			let _name = '';
			let _courses = [];

			Object.defineProperty(this, 'name', {
				get: function () {
					return _name;
				},
				set: function (value) {
					if (!value) throw new EmptyValueException("name");
					_name = value;
				}
			});

			// Devuelve un iterator de los cursos
			Object.defineProperty(this, 'courses', {
				get: function () {
					let nextIndex = 0;
					return {
						next: function () {
							return nextIndex < _courses.length ?
								{ value: _courses[nextIndex++], done: false } :
								{ done: true };
						}
					}
				}
			});

			// Añade un curso en el centro
			this.addCourse = function (course) {
				if (!course) throw new EmptyValueException("course");
				if (!(course instanceof Course)) throw new InvalidValueException('course', course);
				if (_courses.includes(course)) throw new ExistHighSchoolException(course.name);

				return _courses.push(course);
			}

			// Elimina un curso del centro
			this.removeCourse = function (course) {
				if (!course) throw new EmptyValueException("course");
				if (!(course instanceof Course)) throw new InvalidValueException('course', course);
				if (!(_courses.includes(course))) throw new NotExistHighSchoolException(course.name);

				let index = _courses.findIndex(elem => elem.name === course.name);
				let ar = _courses.splice(index, 1);
				return _courses.length;
			}
		}
		HighSchool.prototype = {};
		HighSchool.prototype.constructor = HighSchool;

		// Iterador de cursos
		HighSchool.prototype.iterateCourses = function () {
			let str = "";
			let courses = this.courses;
			let course = courses.next();

			while (!course.done) {
				str = str + 'Cursos - ' + course.value.name + '\n';
				course = courses.next();
			}
			return str;
		}

		let hs = new HighSchool();
		Object.freeze(hs);
		return hs;
	}
	return {
		getInstance: function () {
			if (!instantiated) {
				instantiated = init();
			}
			return instantiated;
		}
	};
})();
