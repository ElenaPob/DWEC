'use strict';
(function (){
	let divExamples = document.getElementById('examples').children[4];
	let buttons = divExamples.getElementsByClassName('tab-pane')[1].getElementsByTagName('button');

	function createSymbol(){
		$$result.clear();
		//Función factoria para crear un Symbol
		let sym1 = Symbol();
		let sym2 = Symbol("foo");
		let sym3 = Symbol("foo");

		$$result.logBold('Trabajando con Symbol');

		$$result.log(sym1.toString()); //Symbol()
		$$result.log(sym2.toString()); //Symbol(foo)
		$$result.log(sym3.toString()); //Symbol(foo)
		$$result.log(sym2.description); //foo
		$$result.log(typeof sym2); //symbol
		$$result.log(sym2 === sym3); //false
	}
	buttons[0].addEventListener('click', createSymbol);

	function propertySymbol(){
		$$result.clear();
		let id = Symbol("id");
		let computer = {
			[id]: 1, //Nombre de propiedad definido con symbol
			brand: "HP",
			model: "EliteBook",
			memory:16,
		}
		$$result.logBold('Un Symbol no es enumerable');
		// Las propiedades symbol no se pueden enumerar.
		for (let property in computer){
			$$result.log(computer[property]);
		}

		$$result.logBold('Las propiedades Symbol accedemos con la notación [ ]');
		$$result.log(computer[id]); //1
	}
	buttons[1].addEventListener('click', propertySymbol);

	function propertyNameCollision(){
		$$result.clear();
		const library1property = Symbol('lib1.id');
		const library2property = Symbol('lib2.id');

		function lib1tag(obj) {
			obj[library1property] = 1234;
		}

		function lib2tag(obj) {
			obj[library2property] = "abcd";
		}

		let computer = {
			brand: "HP",
			model: "EliteBook",
			memory:16,
		}
		lib1tag(computer);
		lib2tag(computer);
		$$result.logBold('Evitan colisiones entre nombres');
		$$result.log(computer[library1property]); //1234
		$$result.log(computer[library2property]); //abcd
	}
	buttons[2].addEventListener('click', propertyNameCollision);

	function symbolGlobalRegister(){
		$$result.clear();
		//Registramos los symbol para su uso
		Symbol.for('lib1.id');

		function func1(obj) {
			const s = Symbol.for('lib1.id');
			$$result.log(obj[s]); //1234
		}

		function func2(obj) {
			const s = Symbol.for('lib1.id');
			$$result.log(obj[s]); //1234
		}

		let computer = {
			brand: "HP",
			model: "EliteBook",
			memory:16,
		}
		$$result.logBold('Registro global de Symbol');
		computer[Symbol.for('lib1.id')] = 1234;
		$$result.log(Symbol.for('lib1.id') === Symbol.for('lib1.id')); //true
		func1(computer);
		func2(computer);
	}
	buttons[3].addEventListener('click', symbolGlobalRegister);
})();

