'use strict';
(function (){
	let divExamples = document.getElementById('examples').children[10];
	let buttons = divExamples.getElementsByClassName('tab-pane')[0].getElementsByTagName('button');

	function classExample(){
		class Person {
			constructor (firstName, lastName, age){
				this.firstName = firstName;
				this.lastName = lastName;
				this.age = age;
			}

			get fullName(){
				return this.firstName + " " + this.lastName;
			}
			set fullName(fullName){
				let name = fullName.split(" ");
				this.firstName = name[0];
				this.lastName = name[1];
			}
			isAdult(){
				return this.age >= 18;
			}
		}
		Object.defineProperty(Person.prototype, "fullName", {enumerable: true});
		Person.prototype.toString = function(){
			return `${this.firstName} ${this.lastName} ${this.age}`;
		}

		class Student extends Person {
			constructor (firstName, lastName, age){
				super(firstName, lastName, age);
				this._enrolledCourses = [];
			}
			toString(){
				return super.toString() + ` Cursos: ${this._enrolledCourses.length}`;
			}
			static fromPerson(person){
				return new Student(person.firstName, person.lastName, person.age);
			}
			static course = 2021;
		}

		$$result.clear();
		$$result.logBold("Definición de clase en ES6");
		let p1 = new Person("John", "Doe", 23);
		// Person {firstName: John,lastName: Doe,age: 23,}
		$$result.log(p1);
		// Person { }
		$$result.log(p1.__proto__);

		$$result.logBold("Métodos en ES6");
		p1.fullName = "Joe Doe";
		$$result.log(p1.fullName); //Joe Doe
		$$result.log(p1.isAdult()); //true
		$$result.log(p1.toString()); //Joe Doe 23 Cursos: 0

		$$result.logBold("Funcionamiento de las clases");
		$$result.log(Person.prototype.constructor === Person); //true
		$$result.log(p1.__proto__ === Person.prototype); //true
		$$result.log(p1 instanceof Person); //true
		$$result.log(p1 instanceof Student); //false
		$$result.log(p1.constructor.name); //Person

		$$result.logBold("Herencia en ES6");
		let s1 = new Student("Ava", "Johnson", 25);
		$$result.log(s1.toString()); //Ava Johnson 25 Cursos: 0
		$$result.log(s1 instanceof Person); //true
		$$result.log(s1 instanceof Student); //true

		$$result.logBold("Propiedades y métodos estáticos");
		let s2 = Student.fromPerson(new Person("Jane","Smith",21));
		$$result.log(s2.toString()); //Jane Smith 21 Cursos: 0
		$$result.log(Student.course); //2021
	}
	buttons[0].addEventListener('click', classExample);

	function classExpressionExample(){
		const Square = class {
			constructor(side) {
				this.side = side;
			}
			get area(){
				return this.side * this.side;
			}
		}
		$$result.clear();
		$$result.logBold("Ejemplo de class como expresión");
		let s = new Square(5);
		$$result.log(s.area); //25
	}
	buttons[1].addEventListener('click', classExpressionExample);

	function defaultValuesExample(){
		class BufferV1 {
			constructor() {
					this.size = 0;
					this.capacity = 4096;
			}
		}
		class BufferV2 {
			size = 0;
			capacity = 4096;
		}

		$$result.clear();
		$$result.logBold("Declaración tradicional");
		let b1 = new BufferV1(); //4096
		$$result.logBold("Propiedades en el cuerpo de la clase");
		let b2 = new BufferV2(); //4096
		$$result.log(b1.capacity);
		$$result.log(b2.capacity);
	}
	buttons[2].addEventListener('click', defaultValuesExample);

})();

