'use strict';
(function (){
	let divExamples = document.getElementById('examples').children[10];
	let buttons = divExamples.getElementsByClassName('tab-pane')[1].getElementsByTagName('button');

	function underscoreMethod(){
		class Countdown {
			constructor(counter, action) {
				this._counter = counter;
				this._action = action;
			}
			dec() {
				this._counter--;
				if (this._counter === 0) {
					this._action();
				}
			}
		}

		$$result.clear();
		$$result.logBold("Uso de guión bajo");
		let c = new Countdown(3,()=>$$result.log("El contador ha parado."));
		c.dec();
		c.dec();
		c.dec(); //El contador ha parado
		$$result.log(c._counter);//0

	}
	buttons[0].addEventListener('click', underscoreMethod);

	function weakMapMethod(){
		const _counter = new WeakMap();
		const _action = new WeakMap();

		class Countdown {
			constructor(counter, action) {
				_counter.set(this, counter);
				_action.set(this, action);
			}
			dec() {
				let counter = _counter.get(this);
				counter--;
				_counter.set(this, counter);
				if (counter === 0) {
					_action.get(this)();
				}
			}
		}

		$$result.clear();
		$$result.logBold("Método WeakMap");
		let c = new Countdown(3,()=>$$result.log("El contador ha parado."));
		c.dec();
		c.dec();
		c.dec(); //El contador ha parado
		$$result.log(c._counter);//undefined
	}
	buttons[1].addEventListener('click', weakMapMethod);

	function symbolMethod(){
		const _counter = Symbol('counter');
		const _action = Symbol('action');

		class Countdown {
				constructor(counter, action) {
						this[_counter] = counter;
						this[_action] = action;
				}
				dec() {
						if (this[_counter] < 1) return;
						this[_counter]--;
						if (this[_counter] === 0) {
								this[_action]();
						}
				}
		}
		$$result.clear();
		$$result.logBold("Método Symbol");
		let c = new Countdown(3,()=>$$result.log("El contador ha parado."));
		c.dec();
		c.dec();
		c.dec(); //El contador ha parado
		$$result.log(c._counter);//undefined
	}
	buttons[2].addEventListener('click', symbolMethod);

	function characterMethod(){
		class Countdown {
			#counter = 0;
			#action = null;
			constructor(counter, action) {
					this.#counter = counter;
					this.#action = action;
			}
			dec() {
					if (this.#counter < 1) return;
					this.#counter--;
					if (this.#counter === 0) {
						this.#action();
					}
			}

			get counter(){
				return this.#counter;
			}
		}

		$$result.clear();
		$$result.logBold("Método carácter #");
		let c = new Countdown(3,()=>$$result.log("El contador ha parado."));
		c.dec();
		$$result.log(c.counter); //2
		c.dec();
		$$result.log(c.counter); //1
		c.dec(); //El contador ha parado
		$$result.log(c.counter); //0
	}
	buttons[3].addEventListener('click', characterMethod);

})();

