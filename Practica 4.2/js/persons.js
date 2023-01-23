'use strict';

(function () {
	let abstractCreateLock = true;

	// Clase Abstracta Person
	function Person(name, dni, birth) {
		if (!(this instanceof Person)) throw new InvalidAccessConstructorException();

		if (abstractCreateLock) throw new AbstractClassException("Person");
		abstractCreateLock = true;

		if (!name) throw new EmptyValueException("name");
		if (!dni) throw new EmptyValueException("dni");
		if (!(/^\d{8}[A-Z]$/.test(dni))) throw new InvalidValueException("dni", dni);
		if (!birth) throw new EmptyValueException("birth");

		let _name = name;
		let _dni = dni;
		let _birth = birth;

		Object.defineProperty(this, 'name', {
			get: function () {
				return _name;
			},
			set: function (value) {
				if (!value) throw new EmptyValueException("name");
				_name = value;
			}
		});

		Object.defineProperty(this, 'dni', {
			get: function () {
				return _dni;
			},
			set: function (value) {
				if (!value) throw new EmptyValueException("dni");
				if (!(/^\d{8}[A-Z]$/.test(value))) throw new InvalidValueException("dni", value);
				_dni = value;
			}
		});

		Object.defineProperty(this, 'birth', {
			get: function () {
				return _birth;
			},
			set: function (value) {
				if (!value) throw new EmptyValueException("birth");
				_birth = value;
			}
		});
	}

	Person.prototype = {};
	Person.prototype.constructor = Person;
	Person.prototype.toString = function () {
		return "Name: " + this.name + " DNI: " + this.dni + " Birth: " + this.birth.toLocaleDateString();
	}

	// Subclase Student
	function Student(name, dni, birth, degree, grade) {
		if (!(this instanceof Student)) throw new InvalidAccessConstructorException();
		abstractCreateLock = false;

		Person.call(this, name, dni, birth);

		if (!degree) throw new EmptyValueException("degree");
		if (!grade) throw new EmptyValueException("grade");
		if (!/^bachelor|vocacional|others$/.test(degree)) throw new InvalidValueException("degree", degree);

		let _degree = degree;
		let _grade = grade;

		Object.defineProperty(this, 'degree', {
			get: function () {
				return _degree;
			},
			set: function (value) {
				if (!value) throw new EmptyValueException("degree");
				if (!/^bachelor|vocacional|others$/.test(value)) throw new InvalidValueException("degree", value);
				_degree = value;
			}
		});

		Object.defineProperty(this, 'grade', {
			get: function () {
				return _grade;
			},
			set: function (value) {
				if (!value) throw new EmptyValueException("grade");
				_grade = value;
			}
		});
	}

	Student.prototype = Object.create(Person.prototype, {
		constructor: {
			value: Student,
			enumerable: false,
			writable: false,
			configurable: false
		}
	});
	
	Student.prototype.toString = function () {
		return Person.prototype.toString.call(this) + " Degree: " + this.degree + " Grade: " + this.grade;
	}

	// Subclase Professor
	function Professor(name, dni, birth) {
		if (!(this instanceof Professor)) throw new InvalidAccessConstructorException();
		abstractCreateLock = false;

		Person.call(this, name, dni, birth);
	}

	Professor.prototype = Object.create(Person.prototype, {
		constructor: {
			value: Professor,
			enumerable: false,
			writable: false,
			configurable: false
		}
	});
	Professor.prototype.toString = function () {
		return Person.prototype.toString.call(this);
	}

	window.Person = Person;
	window.Student = Student;
	window.Professor = Professor;
})();
