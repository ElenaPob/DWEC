'use strict';
(function (){
	let divExamples = document.getElementById('examples').children[8];
	let buttons = divExamples.getElementsByClassName('tab-pane')[1].getElementsByTagName('button');

	function membersScope(){
		//Constructor Employee
		function Employee (name = "") {
			// Campos privados
			let _name = name;
			let _id;
			if (name){
				_id = Employee.counter();
			}

			//Propiedades de acceso a los atributos privados
			Object.defineProperty(this, 'id', {
				get:function(){
					return _id;
				}
			});
			Object.defineProperty(this, 'name', {
				get:function(){
					return _name;
				},
				set:function(value = ""){
					_name = value;
				}
			});

			// Método interno
			function getUserName(){
				return _name + _id;
			}
			Object.defineProperty(this, 'username', {
				get:function(){
					return getUserName();
				}
			});
		}
		Employee.prototype.constructor = Employee;
		// Métodos públicos
		Employee.prototype.toString = function (){
			return "(" + this.username + "): " + this.name + " " + this.id;
		}

		//Closure con un contador.
		Employee.counter = (function (){
			let counter = 0;
			return (function (){
				return ++counter;
			})
		})();

		function testExample(){
			$$result.clear();
			let employee = new Employee ("anon");
			$$result.log(employee.id); // 1
			$$result.log(employee.name); // anon
			employee.name = "Pablo";
			$$result.log(employee.name); // Pablo
			$$result.log(employee.username); //Pablo1
			$$result.log(employee.toString()); //(Pablo1): Pablo 1
		}
		testExample();
	}
	buttons[0].addEventListener('click', membersScope);

	function scopeExercise1(){
		//Constructor Employee
		function Employee (name = "") {
			// Campos privados
			let _name = name;
			let _id;
			if (name){
				_id = Employee.counter();
			}

			//Propiedades de acceso a los atributos privados
			Object.defineProperty(this, 'id', {
				get:function(){
					return _id;
				}
			});
			Object.defineProperty(this, 'name', {
				get:function(){
					return _name;
				},
				set:function(value = ""){
					_name = value;
				}
			});

			// Método interno
			function getUserName(){
				return _name + _id;
			}
			Object.defineProperty(this, 'username', {
				get:function(){
					return getUserName();
				}
			});
		}
		Employee.prototype.constructor = Employee;
		// Propiedades públicas heredadas
		Employee.prototype.dept="general";
		Employee.prototype.specialty="none";
		// Métodos públicos
		Employee.prototype.toString = function (){
			return "(" + this.username + "): " + this.name + " " + this.id;
		}

		//Closure con un contador.
		Employee.counter = (function (){
			let counter = 0;
			return (function (){
				return ++counter;
			})
		})();

		//Constructor Manager
		function Manager (name, reps = []) {
			//Invocamos al superconstructor Employee con call y pasandole como contexto this y los argumentos que espera.
			Employee.call(this, name);

			let _reports = reps;
			//Propiedades de acceso a los atributos privados
			Object.defineProperty(this, 'reports', {
				get:function(){
					return _reports;
				}
			});
		}
		//Manager hereda del objeto Employee sus propiedades
		Manager.prototype = Object.create(Employee.prototype);
		Manager.prototype.constructor = Manager;

		//Constructor WorkerBee
		function WorkerBee (name, projs = []) {
			//Invocamos al superconstructor Employee con call y pasandole como contexto this y los argumentos que espera.
			Employee.call(this, name);

			let _projects = projs;
			//Propiedades de acceso a los atributos privados
			Object.defineProperty(this, 'projects', {
				get:function(){
					return _projects;
				}
			});
		}
		//WorkerBee hereda del objeto Employee sus propiedades
		WorkerBee.prototype = Object.create(Employee.prototype);
		WorkerBee.prototype.constructor = WorkerBee;

		//Constructor SalesPerson
		function SalesPerson (name, projs, q = 100) {
			WorkerBee.call(this, name, projs);

			let _quota = q;
			//Propiedades de acceso a los atributos privados
			Object.defineProperty(this, 'quota', {
				get:function(){
					return _quota;
				}
			});
		}
		//SalesPerson hereda del objeto WorkerBee sus propiedades
		SalesPerson.prototype = Object.create(WorkerBee.prototype);
		SalesPerson.prototype.constructor = SalesPerson;
		SalesPerson.prototype.dept = "sales";

		//Constructor Engineer
		function Engineer (name, projs, mach = "", hobby) {
			WorkerBee.call(this, name, projs);

			let _machine = mach;
			//Propiedades de acceso a los atributos privados
			Object.defineProperty(this, 'machine', {
				get:function(){
					return _machine;
				}
			});
		}
		//Engineer hereda del objeto WorkerBee sus propiedades
		Engineer.prototype = Object.create(WorkerBee.prototype);
		Engineer.prototype.constructor = Engineer;
		Engineer.prototype.dept = "engineering";
		Engineer.prototype.specialty="code";


		function testExample(){
			$$result.clear();
			let employee = new Employee ("anon");
			let manager = new Manager ("manager",["project1","project2","project3"]);
			let engineer = new Engineer ("engineer",["project4","project5","project6"],"Machine1");
			$$result.logBold(manager.id); //2
			$$result.log(manager.name); //manager
			$$result.log(manager.reports); //project1,project2,project3
			$$result.log(manager.dept); //general
			$$result.log(manager.specialty); //none
			engineer.name = "Pablo";
			$$result.logBold(engineer.id); //3
			$$result.log(engineer.name); //Pablo
			$$result.log(engineer.projects); //project4,project5,project6
			$$result.log(engineer.dept); //engineering
			$$result.log(engineer.specialty); //code
		}
		testExample();
	}
	buttons[1].addEventListener('click', scopeExercise1);

	function toStringMethods(){
		//Constructor Employee
		function Employee (name = "") {
			// Campos privados
			let _name = name;
			let _id;
			if (name){
				_id = Employee.counter();
			}

			//Propiedades de acceso a los atributos privados
			Object.defineProperty(this, 'id', {
				get:function(){
					return _id;
				}
			});
			Object.defineProperty(this, 'name', {
				get:function(){
					return _name;
				},
				set:function(value = ""){
					_name = value;
				}
			});

			// Método interno
			function getUserName(){
				return _name + _id;
			}
			Object.defineProperty(this, 'username', {
				get:function(){
					return getUserName();
				}
			});
		}
		Employee.prototype.constructor = Employee;
		// Propiedades públicas heredadas
		Employee.prototype.dept="general";
		Employee.prototype.specialty="none";
		// Métodos públicos
		Employee.prototype.toString = function (){
			return "(" + this.username + "): " + this.name + " " + this.id;
		}

		//Closure con un contador.
		Employee.counter = (function (){
			let counter = 0;
			return (function (){
				return ++counter;
			})
		})();

		//Constructor Manager
		function Manager (name, reps = []) {
			//Invocamos al superconstructor Employee con call y pasandole como contexto this y los argumentos que espera.
			Employee.call(this, name);

			let _reports = reps;
			//Propiedades de acceso a los atributos privados
			Object.defineProperty(this, 'reports', {
				get:function(){
					return _reports;
				}
			});
		}
		//Manager hereda del objeto Employee sus propiedades
		Manager.prototype = Object.create(Employee.prototype);
		Manager.prototype.constructor = Manager;
		Manager.prototype.toString = function (){
			return Employee.prototype.toString.call(this) + " Reports: " + this.reports;
		}


		//Constructor WorkerBee
		function WorkerBee (name, projs = []) {
			//Invocamos al superconstructor Employee con call y pasandole como contexto this y los argumentos que espera.
			Employee.call(this, name);

			let _projects = projs;
			//Propiedades de acceso a los atributos privados
			Object.defineProperty(this, 'projects', {
				get:function(){
					return _projects;
				}
			});
		}
		//WorkerBee hereda del objeto Employee sus propiedades
		WorkerBee.prototype = Object.create(Employee.prototype);
		WorkerBee.prototype.constructor = WorkerBee;
		WorkerBee.prototype.toString = function (){
			return Employee.prototype.toString.call(this) + " Projects: " + this.projects;
		}


		//Constructor SalesPerson
		function SalesPerson (name, projs, q = 100) {
			WorkerBee.call(this, name, projs);

			let _quota = q;
			//Propiedades de acceso a los atributos privados
			Object.defineProperty(this, 'quota', {
				get:function(){
					return _quota;
				}
			});
		}
		//SalesPerson hereda del objeto WorkerBee sus propiedades
		SalesPerson.prototype = Object.create(WorkerBee.prototype);
		SalesPerson.prototype.constructor = SalesPerson;
		SalesPerson.prototype.dept = "sales";
		SalesPerson.prototype.toString = function (){
			return WorkerBee.prototype.toString.call(this) + " Quota: " + this.quota;
		}

		//Constructor Engineer
		function Engineer (name, projs, mach = "", hobby) {
			WorkerBee.call(this, name, projs);

			let _machine = mach;
			//Propiedades de acceso a los atributos privados
			Object.defineProperty(this, 'machine', {
				get:function(){
					return _machine;
				}
			});
		}
		//Engineer hereda del objeto WorkerBee sus propiedades
		Engineer.prototype = Object.create(WorkerBee.prototype);
		Engineer.prototype.constructor = Engineer;
		Engineer.prototype.dept = "engineering";
		Engineer.prototype.specialty="code";
		Engineer.prototype.toString = function (){
			return WorkerBee.prototype.toString.call(this) + " Machine: " + this.machine;
		}

		function testExample(){
			$$result.clear();
			let employee = new Employee ("anon");
			let manager = new Manager ("manager",["project1","project2","project3"]);
			let engineer = new Engineer ("engineer",["project4","project5","project6"],"Machine1");
			//(manager2): manager 2 Reports: project1,project2,project3
			$$result.log(manager.toString());
			//(engineer3): engineer 3 Projects: project4,project5,project6 Machine: Machine1
			$$result.log(engineer.toString());
		}
		testExample();
	}
	buttons[2].addEventListener('click', toStringMethods);

	function getSalaryMethods(){
		//Constructor Employee
		function Employee (name = "", checks = []) { // Redefinimios el constructor para el array de las nóminas.
			// Campos privados
			let _name = name;
			let _id;
			if (name){
				_id = Employee.counter();
			}
			let paychecks = checks; // Asignamos el array compartido entre constructores.

			this.paySalary = function(salary, tax){
					paychecks.push(salary - (salary * tax / 100));
			}

			this.getSalaries = function(){
					return paychecks.reduce((salary, total) => total + salary, 0);
			}

			//Propiedades de acceso a los atributos privados
			Object.defineProperty(this, 'id', {
				get:function(){
					return _id;
				}
			});
			Object.defineProperty(this, 'name', {
				get:function(){
					return _name;
				},
				set:function(value = ""){
					_name = value;
				}
			});

			// Método interno
			function getUserName(){
				return _name + _id;
			}
			Object.defineProperty(this, 'username', {
				get:function(){
					return getUserName();
				}
			});
		}
		Employee.prototype.constructor = Employee;
		// Propiedades públicas heredadas
		Employee.prototype.dept="general";
		Employee.prototype.specialty="none";
		// Métodos públicos
		Employee.prototype.toString = function (){
			return "(" + this.username + "): " + this.name + " " + this.id;
		}

		//Closure con un contador.
		Employee.counter = (function (){
			let counter = 0;
			return (function (){
				return ++counter;
			})
		})();

		//Constructor Manager
		function Manager (name, reps = []) {
			let paychecks = []; // Campo privado para nóminas

			//Invocamos al superconstructor Employee con call y pasandole como contexto this y los argumentos que espera.
			// Invocamos al superconstructor pasando el campo privado.
			Employee.call(this, name, paychecks);

			let _reports = reps;
			//Propiedades de acceso a los atributos privados
			Object.defineProperty(this, 'reports', {
				get:function(){
					return _reports;
				}
			});

			let paySalaryEmployee = this.paySalary; // Guardamos la referencia a paySalary heredado de Employee.
			this.paySalary = function(salary, tax, bonus){ // El nuevo método paySalary invoca al del padre.
					paySalaryEmployee.call(this, salary + bonus, tax);
			}

			this.getSalaries = function(annualTax = 0){
					let total = paychecks.reduce((salary, total) => total + salary, 0);
					return total - annualTax;
			}
		}
		//Manager hereda del objeto Employee sus propiedades
		Manager.prototype = Object.create(Employee.prototype);
		Manager.prototype.constructor = Manager;
		Manager.prototype.toString = function (){
			return Employee.prototype.toString.call(this) + " Reports: " + this.reports;
		}


		//Constructor WorkerBee
		function WorkerBee (name, projs = []) {
			let paychecks = []; // Campo privado para nóminas

			//Invocamos al superconstructor Employee con call y pasandole como contexto this y los argumentos que espera.
			// Invocamos al superconstructor pasando el campo privado.
			Employee.call(this, name, paychecks);

			let _projects = projs;
			//Propiedades de acceso a los atributos privados
			Object.defineProperty(this, 'projects', {
				get:function(){
					return _projects;
				}
			});

			let paySalaryEmployee = this.paySalary; // Guardamos la referencia a paySalary heredado de Employee.
			this.paySalary = function(salary, tax, bonus){ // El nuevo método paySalary invoca al del padre.
					paySalaryEmployee.call(this, salary + bonus, tax);
			}

			this.getSalaries = function(annualTax = 0){
					let total = paychecks.reduce((salary, total) => total + salary, 0);
					return total - annualTax;
			}
		}
		//WorkerBee hereda del objeto Employee sus propiedades
		WorkerBee.prototype = Object.create(Employee.prototype);
		WorkerBee.prototype.constructor = WorkerBee;
		WorkerBee.prototype.toString = function (){
			return Employee.prototype.toString.call(this) + " Projects: " + this.projects;
		}


		//Constructor SalesPerson
		function SalesPerson (name, projs, q = 100) {
			WorkerBee.call(this, name, projs);

			let _quota = q;
			//Propiedades de acceso a los atributos privados
			Object.defineProperty(this, 'quota', {
				get:function(){
					return _quota;
				}
			});
		}
		//SalesPerson hereda del objeto WorkerBee sus propiedades
		SalesPerson.prototype = Object.create(WorkerBee.prototype);
		SalesPerson.prototype.constructor = SalesPerson;
		SalesPerson.prototype.dept = "sales";
		SalesPerson.prototype.toString = function (){
			return WorkerBee.prototype.toString.call(this) + " Quota: " + this.quota;
		}

		//Constructor Engineer
		function Engineer (name, projs, mach = "", hobby) {
			WorkerBee.call(this, name, projs);

			let _machine = mach;
			//Propiedades de acceso a los atributos privados
			Object.defineProperty(this, 'machine', {
				get:function(){
					return _machine;
				}
			});
		}
		//Engineer hereda del objeto WorkerBee sus propiedades
		Engineer.prototype = Object.create(WorkerBee.prototype);
		Engineer.prototype.constructor = Engineer;
		Engineer.prototype.dept = "engineering";
		Engineer.prototype.specialty="code";
		Engineer.prototype.toString = function (){
			return WorkerBee.prototype.toString.call(this) + " Machine: " + this.machine;
		}

		function testExample(){
			$$result.clear();
			let employee = new Employee ("anon");
			let manager = new Manager ("manager",["project1","project2","project3"]);
			let engineer = new Engineer ("engineer",["project4","project5","project6"],"Machine1");

			console.dir(manager);

			$$result.logBold('Manager');
			manager.paySalary(1000,10,300);
			manager.paySalary(1100,10,350);
			manager.paySalary(1200,10,200);
			$$result.log(manager.getSalaries(1500)); // 2235

			$$result.logBold('Engineer');
			engineer.paySalary(1000,10,300);
			engineer.paySalary(1100,10,350);
			engineer.paySalary(1200,10,200);
			$$result.log(engineer.getSalaries(1500)); // 2235

			$$result.logBold('Employee');
			employee.paySalary(1000,10);
			employee.paySalary(1100,10);
			employee.paySalary(1200,10);
			$$result.log(employee.getSalaries()); // 2970
		}
		testExample();
	}
	buttons[3].addEventListener('click', getSalaryMethods);

})();

