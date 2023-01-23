'use strict';

// Clase Course
function Course(name, students, tutor) {
	if (!name) throw new EmptyValueException("name");
	if (!students) throw new EmptyValueException("students");
	if (!tutor) throw new EmptyValueException("tutor");
	if (!(tutor instanceof Professor)) throw new InvalidValueException("tutor", tutor);

	let _name = name;
	let _students = students;
	let _tutor = tutor;
	let _listBache = [];
	let _listVocac = [];
	let _listOther = [];

	Object.defineProperty(this, 'name', {
		get: function () {
			return _name;
		},
		set: function (value) {
			if (!value) throw new EmptyValueException("name");
			_name = value;
		}
	});

	Object.defineProperty(this, 'students', {
		get: function () {
			return _students;
		},
		set: function (value) {
			if (!value) throw new EmptyValueException("students");
			_students = value;
		}
	});

	Object.defineProperty(this, 'tutor', {
		get: function () {
			return _tutor;
		},
		set: function (value) {
			if (!value) throw new EmptyValueException("tutor");
			if (!(value instanceof Professor)) throw new InvalidValueException("tutor", value);
			_tutor = value;
		}
	});

	// Devuelve un iterator de los alumnos de Bachillerato
	Object.defineProperty(this, 'listBache', {
		get: function () {
			let nextIndex = 0;
			return {
				next: function () {
					return nextIndex < _listBache.length ?
						{ value: _listBache[nextIndex++], done: false } :
						{ done: true };
				}
			}
		}
	});

	// Devuelve un iterator de los alumnos de Grado Medio
	Object.defineProperty(this, 'listVocac', {
		get: function () {
			let nextIndex = 0;
			return {
				next: function () {
					return nextIndex < _listVocac.length ?
						{ value: _listVocac[nextIndex++], done: false } :
						{ done: true };
				}
			}
		}
	});

	// Devuelve un iterator de los alumnos de Otras Modalidades
	Object.defineProperty(this, 'listOther', {
		get: function () {
			let nextIndex = 0;
			return {
				next: function () {
					return nextIndex < _listOther.length ?
						{ value: _listOther[nextIndex++], done: false } :
						{ done: true };
				}
			}
		}
	});

	// Recibe un alumno y lo mete en la lista según sus estudios y ordenado por nota
	this.doApplication = function (student) {
		if (!student) throw new EmptyValueException("student");
		if (!(student instanceof Student)) throw new InvalidValueException('student', student);
		if ((_listBache.find(elem => elem.dni === student.dni)) !== undefined) throw new ExistHighSchoolException(student.dni);
		if ((_listVocac.find(elem => elem.dni === student.dni)) !== undefined) throw new ExistHighSchoolException(student.dni);
		if ((_listOther.find(elem => elem.dni === student.dni)) !== undefined) throw new ExistHighSchoolException(student.dni);

		switch (student.degree) {
			case 'bachelor':
				_listBache.push(student);
				_listBache.sort((elemA, elemB) => elemB.grade - elemA.grade);
				break;
			case 'vocacional':
				_listVocac.push(student);
				_listVocac.sort((elemA, elemB) => elemB.grade - elemA.grade);
				break;
			case 'others':
				_listOther.push(student);
				_listOther.sort((elemA, elemB) => elemB.grade - elemA.grade);
				break;
		}

		return _listBache.length + _listVocac.length + _listOther.length;
	}
}

Course.prototype = {};
Course.prototype.constructor = Course;

// Iterador de los alumnos admitidos en base a la proporción de las listas
Course.prototype.admittedStudents = function () {
	let cantB = this.students * 0.4;
	let cantV = this.students * 0.4;
	let cantO = this.students * 0.2;

	let cont = 0;
	let str = "";
	
	let bache = this.listBache;
	let vocac = this.listVocac;
	let other = this.listOther;
	//El iterador que consigue el valor del siguiente
	let b = bache.next();
	let v = vocac.next();
	let o = other.next();

	while (cont !== cantB) {
		str = str + 'Alumnos Bachillerato - Dni: ' + b.value.dni + ' Name: ' + b.value.name + ' Grade: ' + b.value.grade + '\n';
		b = bache.next();
		cont++;
	}
	cont = 0;
	while (cont !== cantV) {
		str = str + 'Alumnos Grado Medio - Dni: ' + v.value.dni + ' Name: ' + v.value.name + ' Grade: ' + v.value.grade + '\n';
		v = vocac.next();
		cont++;
	}
	cont = 0;
	while (cont !== cantO) {
		str = str + 'Alumnos Otra Modalidad - Dni: ' + o.value.dni + ' Name: ' + o.value.name + ' Grade: ' + o.value.grade + '\n';
		o = other.next();
		cont++;
	}
	return str;
}

window.Course = Course;
