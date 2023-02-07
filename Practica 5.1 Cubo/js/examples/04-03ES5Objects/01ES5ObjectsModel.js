'use strict';
(function (){
	let divExamples = document.getElementById('examples').children[8];
	let buttons = divExamples.getElementsByClassName('tab-pane')[0].getElementsByTagName('button');

	function constructorWithoutParameters(){
		/*
		Ejemplo herencia en JavaScript
		Objetos: Employee, Manager, WorkerBee, SalesPerson y Engineer
		Implementación de constructores sin parámetros y herencia entre objetos.
		*/

		//Constructor Employee
		function Employee () {
			this.name = "";
		}
		Employee.prototype.constructor = Employee;
		//Propiedad heredad por todos los objetos Employee, así como todos los objetos que hereden de Employee.
		Employee.prototype.dept="general";

		//Constructor Manager
		function Manager () {
			this.reports = [];
		}
		//Manager hereda del objeto Employee sus propiedades
		Manager.prototype = Object.create(Employee.prototype);
		Manager.prototype.constructor = Manager;

		//Constructor WorkerBee
		function WorkerBee () {
			this.projects = [];
		}
		//WorkerBee hereda del objeto Employee sus propiedades
		WorkerBee.prototype = Object.create(Employee.prototype);
		WorkerBee.prototype.constructor = WorkerBee;

		//Constructor SalesPerson
		function SalesPerson () {
			this.quota = 100;
		}
		//SalesPerson hereda del objeto WorkerBee sus propiedades
		SalesPerson.prototype = Object.create(WorkerBee.prototype);
		SalesPerson.prototype.constructor = SalesPerson;
		SalesPerson.prototype.dept = "sales";

		//Constructor Engineer
		function Engineer () {
			this.machine = "";
		}
		//Engineer hereda del objeto WorkerBee sus propiedades
		Engineer.prototype = Object.create(WorkerBee.prototype);
		Engineer.prototype.constructor = Engineer;
		Engineer.prototype.dept = "engineering";

		function testExample(){
			$$result.clear();
			let engineer = new Engineer;
			//Engineer {machine: ,constructor: Engineer,dept: engineering,}
			$$result.log(engineer, "Engineer");
			//SalesPerson {constructor: SalesPerson,dept: sales,quota: 100,}
			let salesPerson = new SalesPerson;
			$$result.log(salesPerson, "SalesPerson");
		}
		testExample();
	}
	buttons[0].addEventListener('click', constructorWithoutParameters);

	function prototypeProperties(){
		//Constructor Employee
		function Employee () {
			this.name = "";
		}
		Employee.prototype.constructor = Employee;
		//Propiedad heredad por todos los objetos Employee, así como todos los objetos que hereden de Employee.
		Employee.prototype.dept="general";
		Employee.prototype.specialty="none";

		//Constructor Manager
		function Manager () {
			this.reports = [];
		}
		//Manager hereda del objeto Employee sus propiedades
		Manager.prototype = Object.create(Employee.prototype);
		Manager.prototype.constructor = Manager;

		//Constructor WorkerBee
		function WorkerBee () {
			this.projects = [];
		}
		//WorkerBee hereda del objeto Employee sus propiedades
		WorkerBee.prototype = Object.create(Employee.prototype);
		WorkerBee.prototype.constructor = WorkerBee;

		//Constructor SalesPerson
		function SalesPerson () {
			this.quota = 100;
		}
		//SalesPerson hereda del objeto WorkerBee sus propiedades
		SalesPerson.prototype = Object.create(WorkerBee.prototype);
		SalesPerson.prototype.constructor = SalesPerson;
		SalesPerson.prototype.dept = "sales";

		//Constructor Engineer
		function Engineer () {
			this.machine = "";
		}
		//Engineer hereda del objeto WorkerBee sus propiedades
		Engineer.prototype = Object.create(WorkerBee.prototype);
		Engineer.prototype.constructor = Engineer;
		Engineer.prototype.dept = "engineering";
		Engineer.prototype.specialty="code";

		function testExample(){
			$$result.clear();
			let engineer = new Engineer;
			//Engineer {machine: ,constructor: Engineer,dept: engineering,specialty: code,}
			$$result.log(engineer, "Engineer");
			//SalesPerson {constructor: SalesPerson,dept: sales,quota: 100,specialty: none,}
			let salesPerson = new SalesPerson;
			$$result.log(salesPerson, "SalesPerson");
		}
		testExample();
	}
	buttons[1].addEventListener('click', prototypeProperties);

	function constructorWithParameters(){
		/*
		Ejemplo herencia en JavaScript
		Objetos: Employee, Manager, WorkerBee, SalesPerson y Engineer
		Implementación de constructores con parámetros y herencia entre objetos.
		*/

		//Constructor Employee
		function Employee (name = "") {
			this.name = name;
		}
		Employee.prototype.constructor = Employee;
		//Propiedad heredad por todos los objetos Employee, así como todos los objetos que hereden de Employee.
		Employee.prototype.dept="general";
		Employee.prototype.specialty="none";

		//Constructor Manager
		function Manager (name, reps = []) {
			//Invocamos al superconstructor Employee con call y pasandole como contexto this y los argumentos que espera.
			Employee.call(this, name);
			this.reports = reps;
		}
		//Manager hereda del objeto Employee sus propiedades
		Manager.prototype = Object.create(Employee.prototype);
		Manager.prototype.constructor = Manager;

		//Constructor WorkerBee
		function WorkerBee (name, projs = []) {
			//Invocamos al superconstructor Employee con call y pasandole como contexto this y los argumentos que espera.
			Employee.call(this, name);
			this.projects = projs;
		}
		//WorkerBee hereda del objeto Employee sus propiedades
		WorkerBee.prototype = Object.create(Employee.prototype);
		WorkerBee.prototype.constructor = WorkerBee;

		//Constructor SalesPerson
		function SalesPerson (name, projs, q = 100) {
			WorkerBee.call(this, name, projs);
			this.quota = q;
		}
		//SalesPerson hereda del objeto WorkerBee sus propiedades
		SalesPerson.prototype = Object.create(WorkerBee.prototype);
		SalesPerson.prototype.constructor = SalesPerson;
		SalesPerson.prototype.dept = "sales";

		//Constructor Engineer
		function Engineer (name, projs, mach = "") {
			WorkerBee.call(this, name, projs);
			this.machine = mach;
		}
		//Engineer hereda del objeto WorkerBee sus propiedades
		Engineer.prototype = Object.create(WorkerBee.prototype);
		Engineer.prototype.constructor = Engineer;
		Engineer.prototype.dept = "engineering";
		Engineer.prototype.specialty="code";

		function testExample(){
			$$result.clear();
			let engineer = new Engineer ("engineer",["project1","project2","project3"],"Machine1");
			//Engineer {name: engineer,projects: project1,project2,project3,machine: Machine1,constructor: Engineer,dept: engineering,specialty: code,}
			$$result.log(engineer, "Engineer");
			//SalesPerson {name: salesPerson,projects: project4,project5,project6,quota: 2500,constructor: SalesPerson,dept: sales,specialty: none,}
			let salesPerson = new SalesPerson ("salesPerson",["project4","project5","project6"],2500);
			$$result.log(salesPerson, "SalesPerson");
		}
		testExample();
	}
	buttons[2].addEventListener('click', constructorWithParameters);

	function sequentialIdentifiers(){

		//Closure con un contador.
		let counter = (function (){
			let counter = 0;
			return (function (){
				return ++counter;
			})
		})();

		//Constructor Employee
		function Employee (name = "") {
			this.name = name;
			if (name){
				this.id = counter();
			}
		}
		Employee.prototype.constructor = Employee;
		//Propiedad heredad por todos los objetos Employee, así como todos los objetos que hereden de Employee.
		Employee.prototype.dept="general";
		Employee.prototype.specialty="none";

		//Constructor Manager
		function Manager (name, reps = []) {
			//Invocamos al superconstructor Employee con call y pasandole como contexto this y los argumentos que espera.
			Employee.call(this, name);
			this.reports = reps;
		}
		//Manager hereda del objeto Employee sus propiedades
		Manager.prototype = Object.create(Employee.prototype);
		Manager.prototype.constructor = Manager;

		//Constructor WorkerBee
		function WorkerBee (name, projs = []) {
			//Invocamos al superconstructor Employee con call y pasandole como contexto this y los argumentos que espera.
			Employee.call(this, name);
			this.projects = projs;
		}
		//WorkerBee hereda del objeto Employee sus propiedades
		WorkerBee.prototype = Object.create(Employee.prototype);
		WorkerBee.prototype.constructor = WorkerBee;

		//Constructor SalesPerson
		function SalesPerson (name, projs, q = 100) {
			WorkerBee.call(this, name, projs);
			this.quota = q;
		}
		//SalesPerson hereda del objeto WorkerBee sus propiedades
		SalesPerson.prototype = Object.create(WorkerBee.prototype);
		SalesPerson.prototype.constructor = SalesPerson;
		SalesPerson.prototype.dept = "sales";

		//Constructor Engineer
		function Engineer (name, projs, mach = "") {
			WorkerBee.call(this, name, projs);
			this.machine = mach;
		}
		//Engineer hereda del objeto WorkerBee sus propiedades
		Engineer.prototype = Object.create(WorkerBee.prototype);
		Engineer.prototype.constructor = Engineer;
		Engineer.prototype.dept = "engineering";
		Engineer.prototype.specialty="code";

		function testExample(){
			$$result.clear();
			let engineer = new Engineer ("engineer",["project1","project2","project3"],"Machine1");
			//Engineer {name: engineer,id: 1,projects: project1,project2,project3,machine: Machine1,constructor: Engineer,dept: engineering,specialty: code,}
			$$result.log(engineer, "Engineer");
			//SalesPerson {name: salesPerson,id: 2,projects: project4,project5,project6,quota: 2500,constructor: SalesPerson,dept: sales,specialty: none,}
			let salesPerson = new SalesPerson ("salesPerson",["project4","project5","project6"],2500);
			$$result.log(salesPerson, "SalesPerson");
		}
		testExample();
	}
	buttons[3].addEventListener('click', sequentialIdentifiers);

	function multipleInheritance(){
		/*
		Ejemplo herencia en JavaScript
		Objetos: Employee, Manager, WorkerBee, SalesPerson y Engineer
		La herencia múltiple no existe pero se puede implementar invocando varios superconstructores en la función constructora
		Llamadas al superconstructor.
		*/

		//Constructor para implementar herencia múltiple.
		function Hobbyist (hobby = "scuba") {
			this.hobby = hobby;
		}
		//El problema de la herencia múltiple, es que al solo heredar de un prototype, la siguiente propiedad no podrá ser heredada por los objetos Engineer.
		Hobbyist.prototype.equipment = ["mask", "fins", "regulator"];

		//Closure con un contador.
		let counter = (function (){
			let counter = 0;
			return (function (){
				return ++counter;
			})
		})();

		//Constructor Employee
		function Employee (name = "") {
			this.name = name;
			if (name){
				this.id = counter();
			}
		}
		Employee.prototype.constructor = Employee;
		//Propiedad heredad por todos los objetos Employee, así como todos los objetos que hereden de Employee.
		Employee.prototype.dept="general";
		Employee.prototype.specialty="none";

		//Constructor Manager
		function Manager (name, reps = []) {
			//Invocamos al superconstructor Employee con call y pasandole como contexto this y los argumentos que espera.
			Employee.call(this, name);
			this.reports = reps;
		}
		//Manager hereda del objeto Employee sus propiedades
		Manager.prototype = Object.create(Employee.prototype);
		Manager.prototype.constructor = Manager;

		//Constructor WorkerBee
		function WorkerBee (name, projs = []) {
			//Invocamos al superconstructor Employee con call y pasandole como contexto this y los argumentos que espera.
			Employee.call(this, name);
			this.projects = projs;
		}
		//WorkerBee hereda del objeto Employee sus propiedades
		WorkerBee.prototype = Object.create(Employee.prototype);
		WorkerBee.prototype.constructor = WorkerBee;

		//Constructor SalesPerson
		function SalesPerson (name, projs, q = 100) {
			WorkerBee.call(this, name, projs);
			this.quota = q;
		}
		//SalesPerson hereda del objeto WorkerBee sus propiedades
		SalesPerson.prototype = Object.create(WorkerBee.prototype);
		SalesPerson.prototype.constructor = SalesPerson;
		SalesPerson.prototype.dept = "sales";

		//Constructor Engineer
		function Engineer (name, projs, mach = "", hobby) {
			WorkerBee.call(this, name, projs);
			//Al invocar un segundo constructor, estamos implementando herencia múltiple.
			Hobbyist.call(this, hobby);
			Object.assign(this, Hobbyist.prototype);
			this.machine = mach;
		}
		//Engineer hereda del objeto WorkerBee sus propiedades
		Engineer.prototype = Object.create(WorkerBee.prototype);
		Engineer.prototype.constructor = Engineer;
		Engineer.prototype.dept = "engineering";
		Engineer.prototype.specialty="code";

		function testExample(){
			$$result.clear();
			let engineer = new Engineer ("engineer",["project1","project2","project3"],"Machine1");
			//Engineer {name: engineer,id: 1,projects: project1,project2,project3,hobby: scuba,equipment: mask,fins,regulator,machine: Machine1,constructor: Engineer,dept: engineering,specialty: code,}
			$$result.log(engineer, "Engineer");
			//SalesPerson {name: salesPerson,id: 2,projects: project4,project5,project6,quota: 2500,constructor: SalesPerson,dept: sales,specialty: none,}
			let salesPerson = new SalesPerson ("salesPerson",["project4","project5","project6"],2500);
			$$result.log(salesPerson, "SalesPerson");
		}
		testExample();
	}
	buttons[4].addEventListener('click', multipleInheritance);

	function comparePrototypes(){
		//Constructor para implementar herencia múltiple.
		function Hobbyist (hobby = "scuba") {
			this.hobby = hobby;
		}
		//El problema de la herencia múltiple, es que al solo heredar de un prototype, la siguiente propiedad no podrá ser heredada por los objetos Engineer.
		Hobbyist.prototype.equipment = ["mask", "fins", "regulator"];

		//Closure con un contador.
		let counter = (function (){
			let counter = 0;
			return (function (){
				return ++counter;
			})
		})();

		//Constructor Employee
		function Employee (name = "") {
			this.name = name;
			if (name){
				this.id = counter();
			}
		}
		Employee.prototype.constructor = Employee;
		//Propiedad heredad por todos los objetos Employee, así como todos los objetos que hereden de Employee.
		Employee.prototype.dept="general";
		Employee.prototype.specialty="none";

		//Constructor Manager
		function Manager (name, reps = []) {
			//Invocamos al superconstructor Employee con call y pasandole como contexto this y los argumentos que espera.
			Employee.call(this, name);
			this.reports = reps;
		}
		//Manager hereda del objeto Employee sus propiedades
		Manager.prototype = Object.create(Employee.prototype);
		Manager.prototype.constructor = Manager;

		//Constructor WorkerBee
		function WorkerBee (name, projs = []) {
			//Invocamos al superconstructor Employee con call y pasandole como contexto this y los argumentos que espera.
			Employee.call(this, name);
			this.projects = projs;
		}
		//WorkerBee hereda del objeto Employee sus propiedades
		WorkerBee.prototype = Object.create(Employee.prototype);
		WorkerBee.prototype.constructor = WorkerBee;

		//Constructor SalesPerson
		function SalesPerson (name, projs, q = 100) {
			WorkerBee.call(this, name, projs);
			this.quota = q;
		}
		//SalesPerson hereda del objeto WorkerBee sus propiedades
		SalesPerson.prototype = Object.create(WorkerBee.prototype);
		SalesPerson.prototype.constructor = SalesPerson;
		SalesPerson.prototype.dept = "sales";

		//Constructor Engineer
		function Engineer (name, projs, mach = "", hobby) {
			WorkerBee.call(this, name, projs);
			//Al invocar un segundo constructor, estamos implementando herencia múltiple.
			Hobbyist.call(this, hobby);
			Object.assign(this, Hobbyist.prototype);
			this.machine = mach;
		}
		//Engineer hereda del objeto WorkerBee sus propiedades
		Engineer.prototype = Object.create(WorkerBee.prototype);
		Engineer.prototype.constructor = Engineer;
		Engineer.prototype.dept = "engineering";
		Engineer.prototype.specialty="code";

		function testExample(){
			$$result.clear();
			let engineer = new Engineer ("engineer",["project1","project2","project3"],"Machine1");
			$$result.log(engineer instanceof Engineer); //true
			$$result.log(engineer.__proto__ == Engineer.prototype); //true
			$$result.log(engineer instanceof WorkerBee); //true
			$$result.log(engineer.__proto__.__proto__ == WorkerBee.prototype); //true
			$$result.log(engineer instanceof Employee); //true
			$$result.log(engineer.__proto__.__proto__.__proto__ == Employee.prototype); //true
			$$result.log(engineer instanceof Object); //true
			$$result.log(engineer.__proto__.__proto__.__proto__.__proto__ == Object.prototype); //true
			//El prototipo de un Object es un objeto sin propiedad __proto__, por tanto el operador no lo reconoce como tipo Object.
			$$result.log(engineer.__proto__.__proto__.__proto__.__proto__ instanceof Object); //false
			$$result.log(engineer.__proto__.__proto__.__proto__.__proto__.__proto__ == null); //true
		}
		testExample();
	}
	buttons[5].addEventListener('click', comparePrototypes);

})();

