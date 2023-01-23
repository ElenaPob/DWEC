'use strict';

function objectTest() {

	// Propiedades de Objetos Student
	console.log('Alumnos');
	let st1 = new Student('Marina', '12345678A', new Date(1990, 11, 20), 'bachelor', 7.5);
	let st2 = new Student('Mario', '12345678B', new Date(1992, 2, 2), 'bachelor', 5);
	let st3 = new Student('Pepe', '12345678C', new Date(1990, 1, 20), 'bachelor', 8.6);
	let st4 = new Student('Luisa', '12345678D', new Date(1996, 9, 10), 'bachelor', 9.7);
	let st5 = new Student('Marta', '12345678E', new Date(1990, 7, 8), 'bachelor', 10);
	let st6 = new Student('María', '22345678A', new Date(1980, 11, 5), 'vocacional', 6.5);
	let st7 = new Student('Celia', '22345678B', new Date(1986, 8, 15), 'vocacional', 9);
	let st8 = new Student('Carlos', '22345678C', new Date(1987, 4, 4), 'vocacional', 8.2);
	let st9 = new Student('Yeray', '22345678D', new Date(1988, 3, 3), 'vocacional', 9.4);
	let st10 = new Student('Tania', '22345678E', new Date(1995, 11, 2), 'vocacional', 10);
	let st11 = new Student('Cristal', '32345678A', new Date(1995, 10, 5), 'others', 5.5);
	let st12 = new Student('Luis', '32345678B', new Date(1970, 0, 10), 'others', 6);
	let st13 = new Student('Susan', '32345678C', new Date(1980, 3, 12), 'others', 9.6);
	let st14 = new Student('Tom', '32345678D', new Date(1990, 2, 14), 'others', 5.7);
	let st15 = new Student('Tobias', '32345678E', new Date(1999, 0, 16), 'others', 10);

	try {
		st1.name = '';
	} catch (error) {
		console.log(error.toString());
	}
	try {
		st2.dni = 'A12345678';
	} catch (error) {
		console.log(error.toString());
	}
	try {
		st3.degree = 'nada';
	} catch (error) {
		console.log(error.toString());
	}
	console.log(st1.toString());
	console.log(st6.toString());
	console.log(st10.toString());

	// Propiedades de Objetos Professor
	console.log('Profesores');
	let pr1 = new Professor('Arturo', '42345678A', new Date(1968, 1, 10));
	let pr2 = new Professor('Antonio', '42345678B', new Date(1988, 6, 20));
	let pr3 = new Professor('Clara', '42345678C', new Date(1985, 4, 14));
	let pr4 = new Professor('Lorenzo', '42345678D', new Date(1979, 1, 16));
	let pr5 = new Professor('Pepa', '42345678E', new Date(1976, 0, 1));

	try {
		pr1.name = '';
	} catch (error) {
		console.log(error.toString());
	}
	try {
		pr2.dni = 'A42345678';
	} catch (error) {
		console.log(error.toString());
	}
	console.log(pr1.toString());
	console.log(pr5.toString());

	// El objeto Person no se puede instanciar
	console.log('Person');
	try {
		let p1 = new Person('Nombre', '11111111A', new Date(1990, 11, 20));
	} catch (error) {
		console.log(error.toString());
	}

	// Propiedades de Objetos Course
	console.log('Cursos');
	// Asignar un tutor a un Course
	let co1 = new Course('Cultura clásica', 10, pr1);
	let co2 = new Course('Informática', 6, pr2);
	let co3 = new Course('Latin', 3, pr3);
	let co4 = new Course('Turismo', 3, pr4);
	let co5 = new Course('Dibujo', 3, pr5);

	try {
		co1.name = '';
	} catch (error) {
		console.log(error.toString());
	}
	try {
		co2.students = '';
	} catch (error) {
		console.log(error.toString());
	}
	try {
		co3.tutor = st1;
	} catch (error) {
		console.log(error.toString());
	}

	// El objeto HighSchool es único
	console.log('Instituto');
	let hs = new HighSchool.getInstance();
	hs.name = 'Maestre de Calatrava';

	// Añadir un objeto Course
	console.log('Añadido. Cursos: ' + hs.addCourse(co1));
	console.log('Añadido. Cursos: ' + hs.addCourse(co2));
	console.log('Añadido. Cursos: ' + hs.addCourse(co3));
	console.log('Añadido. Cursos: ' + hs.addCourse(co4));
	console.log('Añadido. Cursos: ' + hs.addCourse(co5));

	try {
		console.log('Añadido. Cursos: ' + hs.addCourse(st1));
	} catch (error) {
		console.log(error.toString());
	}
	try {
		console.log('Añadido. Cursos: ' + hs.addCourse(co5));
	} catch (error) {
		console.log(error.toString());
	}

	// Borrar un objeto Course de HighSchool
	console.log('Eliminado un curso. Hay: ' + hs.removeCourse(co5));
	try {
		console.log('Eliminado un curso. Hay: ' + hs.removeCourse(co5));
	} catch (error) {
		console.log(error.toString());
	}

	// Recorrer objetos Course de HighSchool
	console.log('Añadido. Cursos: ' + hs.addCourse(co5));
	console.log(hs.iterateCourses());

	// Añadir alumnos que aplican a un curso mediante doApplication()
	console.log('Añadido alumno al curso: ' + co1.name + ' hay: ' + co1.doApplication(st1));
	console.log('Añadido alumno al curso: ' + co1.name + ' hay: ' + co1.doApplication(st2));
	console.log('Añadido alumno al curso: ' + co1.name + ' hay: ' + co1.doApplication(st3));
	console.log('Añadido alumno al curso: ' + co1.name + ' hay: ' + co1.doApplication(st4));
	console.log('Añadido alumno al curso: ' + co1.name + ' hay: ' + co1.doApplication(st5));
	console.log('Añadido alumno al curso: ' + co1.name + ' hay: ' + co1.doApplication(st6));
	console.log('Añadido alumno al curso: ' + co1.name + ' hay: ' + co1.doApplication(st7));
	console.log('Añadido alumno al curso: ' + co1.name + ' hay: ' + co1.doApplication(st8));
	console.log('Añadido alumno al curso: ' + co1.name + ' hay: ' + co1.doApplication(st9));
	console.log('Añadido alumno al curso: ' + co1.name + ' hay: ' + co1.doApplication(st10));
	console.log('Añadido alumno al curso: ' + co1.name + ' hay: ' + co1.doApplication(st11));
	console.log('Añadido alumno al curso: ' + co1.name + ' hay: ' + co1.doApplication(st12));
	console.log('Añadido alumno al curso: ' + co1.name + ' hay: ' + co1.doApplication(st13));
	console.log('Añadido alumno al curso: ' + co1.name + ' hay: ' + co1.doApplication(st14));
	console.log('Añadido alumno al curso: ' + co1.name + ' hay: ' + co1.doApplication(st15));

	console.log('Añadido alumno al curso: ' + co2.name + ' hay: ' + co2.doApplication(st2));
	console.log('Añadido alumno al curso: ' + co2.name + ' hay: ' + co2.doApplication(st3));
	console.log('Añadido alumno al curso: ' + co2.name + ' hay: ' + co2.doApplication(st7));
	console.log('Añadido alumno al curso: ' + co2.name + ' hay: ' + co2.doApplication(st8));
	console.log('Añadido alumno al curso: ' + co2.name + ' hay: ' + co2.doApplication(st12));
	console.log('Añadido alumno al curso: ' + co2.name + ' hay: ' + co2.doApplication(st13));

	console.log('Añadido alumno al curso: ' + co3.name + ' hay: ' + co3.doApplication(st3));
	console.log('Añadido alumno al curso: ' + co3.name + ' hay: ' + co3.doApplication(st8));
	console.log('Añadido alumno al curso: ' + co3.name + ' hay: ' + co3.doApplication(st13));
	
	console.log('Añadido alumno al curso: ' + co4.name + ' hay: ' + co4.doApplication(st4));
	console.log('Añadido alumno al curso: ' + co4.name + ' hay: ' + co4.doApplication(st9));
	console.log('Añadido alumno al curso: ' + co4.name + ' hay: ' + co4.doApplication(st14));

	console.log('Añadido alumno al curso: ' + co5.name + ' hay: ' + co5.doApplication(st5));
	console.log('Añadido alumno al curso: ' + co5.name + ' hay: ' + co5.doApplication(st10));
	console.log('Añadido alumno al curso: ' + co5.name + ' hay: ' + co5.doApplication(st15));

	try {
		console.log('Añadido alumno al curso: ' + co5.name + ' hay: ' + co5.doApplication(st15));
	} catch (error) {
		console.log(error.toString());
	}

	// Recuperar alumnos admitidos de un curso
	console.log(co1.admittedStudents());
}
objectTest();
