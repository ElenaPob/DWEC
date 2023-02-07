import { BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException } from '../exceptions.js';
import {Product, Laptop, Camera, Smartphone, Tablet, Category} from '../entities/products.js';

class ManagerException extends BaseException {
	constructor (message = 'Error: Manager Exception.', fileName, lineNumber){
			super(message, fileName, lineNumber);
			this.name = 'ManagerException';
	}
}

class ObjecManagerException extends ManagerException {
  constructor (param, className, fileName, lineNumber){
    super(`Error: The ${param} is not a ${className}`, fileName, lineNumber);
    this.param = param;
    this.param = className;
    this.name = 'ObjecManagerException';
  }
}

class CategoryExistsException extends ManagerException {
  constructor (category, fileName, lineNumber){
    super(`Error: The ${category.title} already exists in the manager.`, fileName, lineNumber);
    this.category = category;
    this.name = 'CategoryExistsException';
  }
}

class ProductExistsException extends ManagerException {
  constructor (product, fileName, lineNumber){
    super(`Error: The ${product.serial} already exists in the manager.`, fileName, lineNumber);
    this.product = product;
    this.name = 'ProductExistsException';
  }
}

class ProductExistInCategoryException extends ManagerException {
  constructor (product, category, fileName, lineNumber){
    super(`Error: The ${product.serial} already exist in ${category.title}.`, fileName, lineNumber);
    this.category = category;
    this.product = product;
    this.name = 'ProductExistInCategoryException';
  }
}

class CategoryNotExistException extends ManagerException {
  constructor (category, fileName, lineNumber){
    super(`Error: The ${category.title} doesn't exist in the manager.`, fileName, lineNumber);
    this.category = category;
    this.name = 'CategoryNotExistException';
  }
}

class ProductNotExistInManagerException extends ManagerException {
  constructor (product, fileName, lineNumber){
    super(`Error: The ${product.serial} doesn't exist in the manager.`, fileName, lineNumber);
    this.product = product;
    this.name = 'ProductNotExistInManagerException';
  }
}

class ProductNotExistInCategoryException extends ManagerException {
  constructor (product, category, fileName, lineNumber){
    super(`Error: The ${product.serial} doesn't exist in ${category.title}.`, fileName, lineNumber);
    this.category = category;
    this.product = product;
    this.name = 'ProductNotExistInCategoryException';
  }
}

let Manager = (function () {
  let instantiated;

  function init(){ //Inicialización del Singleton
		class Manager {
			#categories = [];
			#products = [];

			#order = {
				serial: (productA, productB) => {return productA.serial < productB.serial? -1 : 1},
				brand: (productA, productB) => {return productA.brand < productB.brand? -1 : 1},
				model: (productA, productB) => {return productA.model < productB.model? -1 : 1},
				price: (productA, productB) => {return productA.price < productB.price? -1 : 1},
			}

			constructor (){
				if (!new.target) throw new InvalidAccessConstructorException();
			}

			addCategory(){
				for (let category of arguments){
					if (!(category instanceof Category)) {
						throw new ObjecManagerException ('category', 'Category');
					}
					let position = this.#getCategoryPosition(category);
					if (position === -1){
						this.#categories.push({
							category: category,
							products: []
						});
						this.#categories.sort((catA, catB) => {
							return (catA.category.title.toLocaleLowerCase() < catB.category.title.toLocaleLowerCase())? -1:1;
						})
					} else {
						throw new CategoryExistsException(category);
					}
				}
				return this;
			}

			#getCategoryPosition(category){
				return this.#categories.findIndex(x => x.category.title === category.title);
			}

			addProduct(){
				for (let product of arguments){
					if (!(product instanceof Product)) {
						throw new ObjecManagerException ('product', 'Product');
					}
					let position = this.#getProductPosition(product);
					if (position === -1){
						this.#products.push(product);
						this.#products.sort((productA, productB) => {
							if (productA.brand.toLocaleLowerCase() < productB.brand.toLocaleLowerCase()){
								return -1;
							} else if (productA.brand.toLocaleLowerCase() > productB.brand.toLocaleLowerCase()){
								return 1;
							} else {
								return (productA.model.toLocaleLowerCase() < productB.model.toLocaleLowerCase())? -1:1;
							}
						});
					} else {
						throw new ProductExistsException(product);
					}
				}
				return this;
			}

			#getProductPosition(product){
				return this.#products.findIndex(x => x.serial === product.serial);
			}

			addProductInCategory (category){
				if (!(category instanceof Category)) {
					throw new ObjecManagerException ('category', 'Category');
				}
				let pCategory = this.#getCategoryPosition(category);
				if (pCategory === -1){
					this.addCategory(category);
					pCategory = this.#getCategoryPosition(category);
				}

				for (let i = 1; i < arguments.length; i++){
					let product = arguments[i];
					if (!(product instanceof Product)) {
						throw new ObjecManagerException ('product', 'product');
					}
					let pProduct = this.#getProductPosition (product);
					if (pProduct === -1){
						this.addProduct(product);
						pProduct = this.#getProductPosition (product);
					}
					let position = this.#getProductPositionInCategory(product,  this.#categories[pCategory]);
					if (position === -1){
						this.#categories[pCategory].products.push(this.#products[pProduct]);
						this.#categories[pCategory].products.sort((productA, productB) => {
							return (productA.price > productB.price)? -1:1;
						});
					} else {
						throw new ProductExistInCategoryException(product, category);
					}
				}
				return this;
			}

			#getProductPositionInCategory(product, category){
				return category.products.findIndex(x => x.serial === product.serial);
			}

			//Devuelve un iterator de las categorías
			get categories(){
				let nextIndex = 0;
				// referencia para habilitar el closure en el objeto
				let array = this.#categories;
				return {
					* [Symbol.iterator](){
						for (let arrayCat of array){
							yield arrayCat.category;
						}
					}
				}
			}

			//Devuelve un iterator de los productos
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

			* getCategoryProducts(category){
				if (!(category instanceof Category)) {
					throw new ObjecManagerException ('category', 'Category');
				}
				let position = this.#getCategoryPosition(category);
				if (position !== -1){
					let nextIndex = 0;
					let array = this.#categories[position].products;
					for (let product of array){
						yield product;
					}
				} else{
					throw new CategoryNotExistException(category);
				}
			}

			toString (separator = '\n'){
				let str = '';
				for (let category of this.categories){
					str += category.title + separator;
					for (let product of this.getCategoryProducts(category)){
						//console.log(product.value.toString());
						str += product.toString() + separator;
					}
				}
				return str;
			}

			removeCategory(){
				for (let category of arguments){
					if (!(category instanceof Category)) {
						throw new ObjecManagerException ('category', 'Category');
					}
					let position = this.#getCategoryPosition(category);
					if (position !== -1){
						this.#categories.splice(position,1);
					} else{
						throw new CategoryNotExistException(category);
					}
				}
				return this;
			}

			removeProduct(){
				for (let product of arguments){
					if (!(product instanceof Product)) {
						throw new ObjecManagerException ('product', 'product');
					}
					let position = this.#getProductPosition(product);
					if (position !== -1){
						let storedProduct = this.#products[position];
						for (let category of this.#categories){
							let pProduct = this.#getProductPositionInCategory(storedProduct, category);
							if (pProduct !== -1){
								category.products.splice(pProduct,1);
							}
						}
						this.#products.splice(position,1);
					} else{
						throw new ProductNotExistInManagerException(product);
					}
				}
				return this;
			}

			removeProductInCategory(category){
				if (!(category instanceof Category)) {
					throw new ObjecManagerException ('category', 'Category');
				}
				let pCategory = this.#getCategoryPosition(category);
				if (pCategory !== -1){
					for (let i = 1; i < arguments.length; i++){
						let product = arguments[i];
						if (!(product instanceof Product)) {
							throw new ObjecManagerException ('product', 'product');
						}
						let pProduct = this.#getProductPositionInCategory(product, this.#categories[pCategory]);
						if (pProduct !== -1){
							this.#categories[pCategory].products.splice(pProduct,1);
						} else {
							throw new ProductNotExistInCategoryException(product, this.#categories[pCategory].category);
						}
					}
				} else{
					throw new CategoryNotExistException(category);
				}

				return this;
			}

			clean (){
				this.#categories.length = 0;
				this.#products.length = 0;
			}

			* getTypeProducts(type, field){
				let nextIndex = 0;
				let array = this.#products.filter(product => {
					return product instanceof type;
				});
				if (this.#order[field]){
					array.sort(this.#order[field]);
				}

				for (let product of array){
					yield product;
				}
			}

			getCategory(title){
				let position = this.#categories.findIndex(x => x.category.title === title);
				if (position === -1)
					throw new CategoryNotExistException(new Category(title));
				return this.#categories[position].category;
			}

			getProduct(serial){
				let position = this.#products.findIndex(x => x.serial === serial);
				if (position === -1)
					throw new ProductNotExistInManagerException(new Laptop(serial, 'anon', 'anon', 0.0001));
				return this.#products[position];
			}

		}
		Object.defineProperty(Manager.prototype, 'categories', {enumerable: true});
		Object.defineProperty(Manager.prototype, 'products', {enumerable: true});

		let manager = new Manager();
		Object.freeze(manager);
		return manager;
	}
  return {
    getInstance: function () {
      if (!instantiated) {
        instantiated = init();
      }
      return instantiated;
    }
  };
})();


export {ManagerException, ObjecManagerException, CategoryExistsException, ProductExistInCategoryException, CategoryNotExistException, ProductNotExistInManagerException, ProductNotExistInCategoryException};
export default Manager;
export {BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException } from '../exceptions.js';
export {Product, Laptop, Camera, Smartphone, Tablet, Category} from '../entities/products.js';

