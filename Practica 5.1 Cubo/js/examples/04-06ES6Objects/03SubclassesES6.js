'use strict';
(function (){
	let divExamples = document.getElementById('examples').children[10];
	let buttons = divExamples.getElementsByClassName('tab-pane')[2].getElementsByTagName('button');

	function extendingStandardObjects(){
		class EZArray extends Array {
			get first() { return this[0]; }
			get last() { return this[this.length-1]; }
		}

		$$result.clear();
		let a = new EZArray();
		$$result.logBold("EZArray");
		$$result.log(a instanceof Array); //true
		$$result.logBold("Invocación de métodos");
		a.push("a","b","c","d");
		$$result.log(a.pop()); //d
		$$result.log(a.first); //a
		$$result.log(a.last); //c
		$$result.log(EZArray.isArray(a)); //true
	}
	buttons[0].addEventListener('click', extendingStandardObjects);

	function mixinClass(){
		const Hobbyist = (Sup) => class extends Sup {
			#materials = [];
			#hobby;
			set hobby(value){
				this.#hobby = value;
			}
			get hobby(){
				return this.#hobby;
			}
			addMaterial(material){
				this.#materials.push(material);
				return this;
			}
			materials(){
				return `${this.hobby}: ${this.#materials.toString()}`;
			}
		}

		const Person = (Sup) => class extends Sup {
			constructor (firstName, lastName, age){
				super();
				this.firstName = firstName;
				this.lastName = lastName;
				this.age = age;
			}
		}

		class Student extends Person(Hobbyist(Object)){
			constructor (firstName, lastName, age, course){
				super(firstName, lastName, age);
				this.course = course;
			}
			toString(){
				return this.firstName + " " + this.course + " " + this.hobby;
			}
		}

		$$result.clear();
		$$result.logBold("Creación de objetos Student");
		let s1 = new Student("John","Doe",23,"2020-2021");
		s1.hobby = "scuba";
		s1.addMaterial("mask").addMaterial("fins").addMaterial("regulator");
		$$result.log(s1.toString()); // John 2020-2021 scuba
		$$result.log(s1.materials()); // scuba: mask,fins,regulator
	}
	buttons[1].addEventListener('click', mixinClass);

	function classCompositionExample(){
		class Histogram {
			// Constructor con propiedad de tipo Map.
			constructor() { this.map = new Map(); }

			// Devuelve el número de ocurrencias de una clave.
			count(key) { return this.map.get(key) || 0; }

			// Indica si la clave está en el histograma a partir del número de entradas.
			has(key) { return this.count(key) > 0; }

			// Nos devuelve el número de entradas del histogragama.
			get size() { return this.map.size; }

			// Incrementa en 1 una clave del histograma.
			add(key) { this.map.set(key, this.count(key) + 1); return this; }

			// Decrementa una clave del histograma.
			delete(key) {
					let count = this.count(key);
					if (count === 1) {
							this.map.delete(key);
					} else if (count > 1) {
							this.map.set(key, count - 1);
					}
					return this;
			}

			// Iteradores del histograma.
			keys() { return this.map.keys(); }
			values() { return this.map.values(); }
			entries() { return this.map.entries(); }
		}

		$$result.clear();
		$$result.logBold("Histogram");
		let h = new Histogram();
		h.add("Tablet").add("Tablet").add("Tablet").add("Tablet"); // Tablet: 4
		h.add("Laptop").add("Laptop").add("Laptop"); // Laptop: 3
		h.add("Camera"); // Camera: 1
		h.add("SmartPhone").add("SmartPhone"); // SmartPhone: 2
		for (let [k,v] of h.entries()){
			$$result.log(k + ": " + v);
		}
	}
	buttons[2].addEventListener('click', classCompositionExample);

	function abstractClassExample(){
		// Clase abstracta para la implementación de un conjunto.
		class AbstractSet {
			constructor(){
				if(new.target === AbstractSet) throw new Error("AbstractSet is an abstract class.");
			}
			// Método abstracto sin implementación.
			has(x) { throw new Error("Abstract method"); }
		}

		// Clase concreta que extiende AbstractSet.
		class NotSet extends AbstractSet {
			constructor(set) {
				super();
				this.set = set;
			}
			// Implementación del método heredado.
			has(x) { return !this.set.has(x); }
			// Sobrescribimos toString()
			toString() { return `{ x| ${this.set.toString()}`; }
		}

		// Clase concreta que extiende AbstractSet.
		class RangeSet extends AbstractSet {
			constructor(from, to) {
				super();
				this.from = from;
				this.to = to;
			}
			has(x) { return x >= this.from && x <= this.to; }
			toString() { return `{ x | ${this.from} ≤ x ≤ ${this.to} }`; }
		}

		$$result.clear();
		$$result.logBold("Instanciamos objetos clases hijas");
		let range = new RangeSet(1,5);
		$$result.log(range.has(3)); //true
		$$result.log(range.has(-3)); //false
		$$result.logBold("Instanciamos clase abstracta");
		try {
			let abstract = new AbstractSet();
		} catch(error){
			// Error: AbstractSet is an abstract class.
			$$result.log(error.toString());
		}
	}
	buttons[3].addEventListener('click', abstractClassExample);

})();

