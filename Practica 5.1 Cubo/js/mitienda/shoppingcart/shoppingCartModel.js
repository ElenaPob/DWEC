"use strict";
import { BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException } from '../exceptions.js';
import {Product, Laptop, Camera, Smartphone, Tablet} from '../entities/products.js';

class ShoppingCartException extends BaseException {
  constructor (fileName, lineNumber){
    super("Error: Shopping Cart Exception.", fileName, lineNumber);
    this.name = "ShoppingCartException";
  }
}

class ProductShoppingCartException extends ShoppingCartException {
  constructor (fileName, lineNumber){
    super("Error: The method needs a Product parameter.", fileName, lineNumber);
    this.name = "ProductShoppingCartException";
  }
}

class ProductNotExistException extends ShoppingCartException {
  constructor (product, fileName, lineNumber){
    super("Error: The product doesn't exist in the cart. " + product.serial, fileName, lineNumber);
    this.name = "ProductShoppingCartException";
    this.product = product;
  }
}

class PositionOutBoundsException extends ShoppingCartException {
  constructor (product, fileName, lineNumber){
    super("Error: The position is out of bounds.", fileName, lineNumber);
    this.name = "PositionOutBoundsException";
    this.product = product;
  }
}

//Declaración objeto ShoppingCart mediante patrón Singleton
let ShoppingCart = (function () { //La función anónima devuelve un método getInstance que permite obtener el objeto único
	let instantiated; //Objeto con la instancia única ShoppingCart

	function init() { //Inicialización del Singleton

		class ShoppingCart {
			//Definición de atributos privados del objeto
			#products = []; //array con los productos del carrito
			#quantities = []; //array con las cantidades de cada producto del carrito.
			constructor (){
				//La función se invoca con el operador new
				if (!new.target) throw new InvalidAccessConstructorException();
			}

			//Dado un product, devuelve la posición de ese product en el carrito o -1 si no lo encontramos.
			getProductPosition (product){
				if (!(product instanceof Product)) {
					throw new ProductShoppingCartException ();
				}
				return this.#products.findIndex(x => x.serial === product.serial);
			}

			//Añade un nuevo product en el carrito o incrementa su cantidad si ya existe. La cantidad es opcional.
			addProduct (product, quantity = 1){
				if (!(product instanceof Product)) {
					throw new ProductShoppingCartException ();
				}
				let position = this.getProductPosition(product);
				if (position === -1){
					this.#products.push(product);
					this.#quantities.push(quantity);
				} else{
					this.#quantities[position] = this.#quantities[position] + quantity;
				}
				return this;
			}

			//Devuelve el número total de item en el carrito diferentes
			getNumberProducts (){
				return this.#products.length;
			}

			//Devuelve la cantidad de products que se van a comprar.
			getQuantityProducts (product){
				if (!(product instanceof Product)) {
					throw new ProductShoppingCartException ();
				}
				let position = this.getProductPosition(product);
				if (position === -1){
					throw new ProductNotExistException(product);
				}
				return this.#quantities[position];
			}

			//Devuelve la cantidad de products en función de la posición
			getQuantityProductPosition (position){
				if (position === 'undefined') throw new EmptyValueException("position");
				if (position >= this.#products.length || position < 0) throw new PositionOutBoundsException();
				return this.#quantities[position];
			}

			//Devuelve la cantidad de products en función de la posición
			getProduct (position){
				if (position === 'undefined') throw new EmptyValueException("position");
				if (position >= this.#products.length || position < 0) throw new PositionOutBoundsException();
				return this.#products[position];
			}

			//Modifica un product del carrito si existe, sino lanzamos una excepción
			updateProduct (product, quantity = 1){
				if (!(product instanceof Product)) {
					throw new ProductShoppingCartException ();
				}
				if (quantity < 0) throw new InvalidValueException("quantity",quantity);
				let position = this.getProductPosition(product);
				if (position !== -1){
					this.#quantities[position] = quantity;
					if (this.#quantities[position] === 0){
						this.#products.splice(position, 1);
						this.#quantities.splice(position, 1);
					}
				} else{
					throw new ProductNotExistException(product);
				}
				return this;
			}

			//Modifica un product del carrito si existe por posición, sino lanzamos una excepción
			updateProductPosition (position, quantity = 1){
				if (position === 'undefined') throw new EmptyValueException("position");
				if (position >= this.#products.length || position < 0) throw new PositionOutBoundsException();
				if (quantity < 0) throw new InvalidValueException("quantity",quantity);
				this.#quantities[position] = quantity;
				if (this.#quantities[position] === 0){
					this.#products.splice(position, 1);
					this.#quantities.splice(position, 1);
				}
				return this;
			}

			//Elimina un product del carrito si existe, sino lanzamos una excepción
			removeProduct (product){
				if (!(product instanceof Product)) {
					throw new ProductShoppingCartException ();
				}
				let position = this.getProductPosition(product);
				if (position !== -1){
					this.#quantities[position] = this.#quantities[position] - 1;
					if (this.#quantities[position] <= 0){
						this.#products.splice(position, 1);
						this.#quantities.splice(position, 1);
					}
				} else{
					throw new ProductNotExistException(product);
				}
				return this;
			}

			//Elimina un product completo del carrito si existe, sino lanzamos una excepción
			removeAllProduct (product){
				if (!(product instanceof Product)) {
					throw new ProductShoppingCartException ();
				}
				let position = this.getProductPosition(product);
				if (position !== -1){
					this.#products.splice(position, 1);
					this.#quantities.splice(position, 1);
				} else{
					throw new ProductNotExistException(product);
				}
				return this;
			}

			//Elimina un product del carrito si existe por posición, sino lanzamos una excepción
			removeProductPosition (position){
				if (position === 'undefined') throw new EmptyValueException("position");
				if (position >= this.#products.length || position < 0) throw new PositionOutBoundsException();
				this.#quantities[position] = this.#quantities[position] - 1;
				if (this.#quantities[position] <= 0){
					this.#products.splice(position, 1);
					this.#quantities.splice(position, 1);
				}
				return this;
			}

			//Elimina un product completo del carrito si existe por posición, sino lanzamos una excepción
			removeAllProductPosition (position){
				if (position === 'undefined') throw new EmptyValueException("position");
				if (position >= this.#products.length || position < 0) throw new PositionOutBoundsException();
				this.#products.splice(position, 1);
				this.#quantities.splice(position, 1);
			}

			//Vacía el carrito completo
			clear (){
				this.#products.length = 0;
				this.#quantities.length = 0;
			}

			//Devuelve un iterator de los products del carrito
			get products(){
				let nextIndex = 0;
				// referencia para habilitar el closure en el objeto
				let array = this.#products;
				return {
					* [Symbol.iterator](){
						for (let product of array){
							yield product;
						}
					}
				}
			}

			//Devuelve un iterator de las cantidades del carrito
			get quantities(){
				let nextIndex = 0;
				// referencia para habilitar el closure en el objeto
				let array = this.#quantities;
				return {
					* [Symbol.iterator](){
						for (let quantity of array){
							yield quantity;
						}
					}
				}
			}

			* [Symbol.iterator](){
				for (let i = 0; i < this.#products.length; i++){
					yield {
						product: this.#products[i],
						quantity: this.#quantities[i]
					}
				}
			}

			//Muestra el carrito en formato string
			toString (separator = "\n"){
				let str = "";
				for (let item of this){
					str = str + item.product.toString() + " Quantity: " + item.quantity + separator;
				}
				return str;
			}

			//Devuelve el coste total del carrito
			getTotal (){
				let total = 0;
				for (let item of this){
					total = total + item.product.price * item.quantity;
				}
				return total;
			}

			getTotalWithoutTaxes (){
				let total = 0;
				for (let item of this){
					total = total + item.product.priceWithoutTaxes * item.quantity;
				}
				return total;
			}

			getTaxes (){
				let total = 0;
				for (let item of this){
					total = total + item.product.tax * item.quantity;
				}
				return total;
			}
		}
		Object.defineProperty(ShoppingCart.prototype, "products", {enumerable: true});
		Object.defineProperty(ShoppingCart.prototype, "quantities", {enumerable: true});

		let sc = new ShoppingCart();//Devolvemos el objeto ShoppingCart para que sea una instancia única.
		Object.freeze(sc);
		return sc;
	} //Fin inicialización del Singleton
	return {
		// Devuelve un objeto con el método getInstance
		getInstance: function () {
			if (!instantiated) { //Si la variable instantiated es undefined, priemera ejecución, ejecuta init.
				instantiated = init(); //instantiated contiene el objeto único
			}
			return instantiated; //Si ya está asignado devuelve la asignación.
		}
	};
})();

export {ShoppingCartException, ProductShoppingCartException, ProductNotExistException, PositionOutBoundsException};
export default ShoppingCart;
export {BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException } from '../exceptions.js';
export {Product, Laptop, Camera, Smartphone, Tablet} from '../entities/products.js';
