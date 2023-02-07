'use strict';
(function (){
	let divExamples = document.getElementById('examples').children[10];
	let buttons = divExamples.getElementsByClassName('tab-pane')[3].getElementsByTagName('button');

	function rangeExercise(){
		class Range {
			constructor(from, to) {
				// Límites del rango
				this.from = from;
				this.to = to;
			}

			// Devuelve si un valos está en el rango.
			includes(x) { return this.from <= x && x <= this.to; }

			// Representación en string
			toString() { return `(${this.from}...${this.to})`; }

			// Método estático para crear Range
			static parse(s) {
				let matches = s.match(/^\((\d+)\.\.\.(\d+)\)$/);
				if (!matches) {
						throw new TypeError(`Cannot parse Range from "${s}".`)
				}
				// Instanciamos el Range en base a los paréntesis de la expresión regular
				return new Range(parseInt(matches[1]), parseInt(matches[2]));
			}
		}

		class Span extends Range {
			constructor(start, length) {
				if (length >= 0) {
						super(start, start + length);
				} else {
						super(start + length, start);
				}
			}
		}

		$$result.clear();
		$$result.logBold('Range');
		let r1 = new Range(1,3);   // Create a Range object
		$$result.log(r1.includes(2)); //true
		$$result.log(r1.toString()); //(1...3)
		$$result.logBold('Span');
		let s = new Span(2,5);
		$$result.log(s.toString()); //(2...7)
		let r2 = Range.parse("(3...8)");
		$$result.log(r2.toString()); //(3...8)
	}
	buttons[0].addEventListener('click', rangeExercise);

})();

