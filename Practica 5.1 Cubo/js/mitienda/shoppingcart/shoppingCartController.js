import ShoppingCart from './shoppingCartModel.js';
import { BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException } from './shoppingCartModel.js';
import {Product, Laptop, Camera, Smartphone, Tablet} from './shoppingCartModel.js';
import {ShoppingCartException, ProductShoppingCartException, ProductNotExistException, PositionOutBoundsException} from './shoppingCartModel.js';

class ShoppingCartController {
  //Campos privados
  #shoppingCartModel;
  #shoppingCartView;

	#loadShoppingCartObjects(){
		let p1 = new Laptop("111-111-111","HP","EliteBook", 1000);
		p1.processor = "i7 8 núcleos";
		p1.memory = "16GB";
		p1.hd = "SDD";
		p1.size = "1TB";
		p1.system = "Windows 10";
		let p2 = new Camera("111-111-112","Canon","PowerShot", 500);
		p2.type = "Digital";
		p2.resolution = 7;
		p2.size = 7;
		let p3 = new Smartphone("111-111-113","Samsung","Galaxy", 500);
		p3.memory = "8GB";
		p3.storage = "64GB";
		p3.resolution = "1024x1024";
		p3.size = 7;
		p3.system = "Android";
		let p4 = new Tablet("111-111-114","Samsung","Galaxy", 500);
		p4.memory = "8GB";
		p4.storage = "64GB";
		p4.resolution = "1024x1024";
		p4.size = 15;
		p4.system = "Android";
		let p5 = new Laptop("111-111-111","HP","EliteBook", 1000);
		p5.processor = "i7 8 núcleos";
		p5.memory = "16GB";
		p5.hd = "SDD";
		p5.size = "1TB";
		p5.system = "Windows 10";

		this.#shoppingCartModel.addProduct(p1,2)
			.addProduct(p2,3)
			.addProduct(p3)
			.addProduct(p4,2)
			.addProduct(p5);
	}


  constructor(shoppingCartModel, shoppingCartView){
    this.#shoppingCartModel = shoppingCartModel;
    this.#shoppingCartView = shoppingCartView;

		// Eventos iniciales del Controlador
		this.onInit();
		this.onLoad();
		this.onNumberProductsInCartChanged();

		// Enlazamos handlers con la vista
		this.#shoppingCartView.bindInit(this.handleInit);
		this.#shoppingCartView.bindShowShoppingCart(this.handleShowShoppingCart);
  }

	onInit = () => {
		this.#shoppingCartView.init();
	}

	handleInit = () => {
		this.onInit();
	}

	onLoad = () => {
		this.#loadShoppingCartObjects();
	}

	onNumberProductsInCartChanged = () => {
		this.#shoppingCartView.showNumberProductsInCart(this.#shoppingCartModel.getNumberProducts());
	}

	handleShowShoppingCart = () => {
		let data = {
			numProducts: this.#shoppingCartModel.getNumberProducts(),
			products: this.#shoppingCartModel.products[Symbol.iterator](),
			quantities: this.#shoppingCartModel.quantities[Symbol.iterator](),
			totalWithoutTaxes: this.#shoppingCartModel.getTotalWithoutTaxes(),
			taxes: this.#shoppingCartModel.getTaxes(),
			total: this.#shoppingCartModel.getTotal()
		}
		this.#shoppingCartView.showShoppingCart (data);
	}


}

export default ShoppingCartController;
