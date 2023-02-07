import Manager from './manager.js';
import { BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException } from './manager.js';
import {Product, Laptop, Camera, Smartphone, Tablet, Category} from './manager.js';
import {ManagerException, ObjecManagerException, CategoryExistsException, ProductExistInCategoryException, CategoryNotExistException, ProductNotExistInManagerException, ProductNotExistInCategoryException} from './manager.js';

class ManagerController {
  //Campos privados
  #manager;
  #managerView;

	#loadManagerObjects(){
		let category1 = new Category('Apple', 'img/brands/apple.png');
		let category2 = new Category('HP', 'img/brands/HP.png');
		let category3 = new Category('Microsoft', 'img/brands/microsoft.png');
		let category4 = new Category('Samsung', 'img/brands/samsung.png');
		category1.description = 'Think Different.';
		category2.description = 'HP makes technology work for you.';
		category3.description = 'Be what\'s next.';
		category4.description = 'Designed For.';

		let manager = this.#manager;		;
		manager.addCategory(category1, category2, category3, category4);

		let product1 = new Laptop(1, 'Apple', 'Laptop Model1', 1100);
		let product2 = new Camera(2, 'Apple', 'Camera Model2', 1200);
		let product3 = new Smartphone(3, 'Apple', 'Smartphone Model3', 1300);
		let product4 = new Tablet(4, 'Apple', 'Tablet Model4', 1400);
		let product5 = new Laptop(5, 'Apple', 'Laptop Model5', 1500);
		let product6 = new Laptop(6, 'HP', 'Laptop Model1', 2100);
		let product7 = new Camera(7, 'HP', 'Camera Model2', 2200);
		let product8 = new Tablet(8, 'HP', 'Tablet Model3', 2300);
		let product9 = new Smartphone(9, 'HP', 'Smartphone Model4', 2400);
		let product10 = new Laptop(10, 'HP', 'Laptop Model5', 2500);
		let product11 = new Laptop(11, 'Microsoft', 'Laptop Model1', 3100);
		let product12 = new Camera(12, 'Microsoft', 'Camera Model2', 3200);
		let product13 = new Tablet(13, 'Microsoft', 'Tablet Model3', 3300);
		let product14 = new Smartphone(14, 'Microsoft', 'Smartphone Model4', 3400);
		let product15 = new Laptop(15, 'Microsoft', 'Laptop Model5', 3500);
		let product16 = new Laptop(16, 'Samsung', 'Laptop Model1', 4100);
		let product17 = new Camera(17, 'Samsung', 'Camera Model2', 4200);
		let product18 = new Tablet(18, 'Samsung', 'Tablet Model3', 4300);
		let product19 = new Tablet(19, 'Samsung', 'Tablet Model4', 4400);
		let product20 = new Laptop(20, 'Samsung', 'Laptop Model5', 4500);

		product1.url = `https://via.placeholder.com/258x172.jpg?text=${product1.brand}+${product1.model}`;
		product2.url = `https://via.placeholder.com/258x172.jpg?text=${product2.brand}+${product2.model}`;
		product3.url = `https://via.placeholder.com/258x172.jpg?text=${product3.brand}+${product3.model}`;
		product4.url = `https://via.placeholder.com/258x172.jpg?text=${product4.brand}+${product4.model}`;
		product5.url = `https://via.placeholder.com/258x172.jpg?text=${product5.brand}+${product5.model}`;
		product6.url = `https://via.placeholder.com/258x172.jpg?text=${product6.brand}+${product6.model}`;
		product7.url = `https://via.placeholder.com/258x172.jpg?text=${product7.brand}+${product7.model}`;
		product8.url = `https://via.placeholder.com/258x172.jpg?text=${product8.brand}+${product8.model}`;
		product9.url = `https://via.placeholder.com/258x172.jpg?text=${product9.brand}+${product9.model}`;
		product10.url = `https://via.placeholder.com/258x172.jpg?text=${product10.brand}+${product10.model}`;
		product11.url = `https://via.placeholder.com/258x172.jpg?text=${product11.brand}+${product11.model}`;
		product12.url = `https://via.placeholder.com/258x172.jpg?text=${product12.brand}+${product12.model}`;
		product13.url = `https://via.placeholder.com/258x172.jpg?text=${product13.brand}+${product13.model}`;
		product14.url = `https://via.placeholder.com/258x172.jpg?text=${product14.brand}+${product14.model}`;
		product15.url = `https://via.placeholder.com/258x172.jpg?text=${product15.brand}+${product15.model}`;
		product16.url = `https://via.placeholder.com/258x172.jpg?text=${product16.brand}+${product16.model}`;
		product17.url = `https://via.placeholder.com/258x172.jpg?text=${product17.brand}+${product17.model}`;
		product18.url = `https://via.placeholder.com/258x172.jpg?text=${product18.brand}+${product18.model}`;
		product19.url = `https://via.placeholder.com/258x172.jpg?text=${product19.brand}+${product19.model}`;
		product20.url = `https://via.placeholder.com/258x172.jpg?text=${product20.brand}+${product20.model}`;
		product1.description = 'Descripción ' + product1.model;
		product2.description = 'Descripción ' + product2.model;
		product3.description = 'Descripción ' + product3.model;
		product4.description = 'Descripción ' + product4.model;
		product5.description = 'Descripción ' + product5.model;
		product6.description = 'Descripción ' + product6.model;
		product7.description = 'Descripción ' + product7.model;
		product8.description = 'Descripción ' + product8.model;
		product9.description = 'Descripción ' + product9.model;
		product10.description = 'Descripción ' + product10.model;
		product11.description = 'Descripción ' + product11.model;
		product12.description = 'Descripción ' + product12.model;
		product13.description = 'Descripción ' + product13.model;
		product14.description = 'Descripción ' + product14.model;
		product15.description = 'Descripción ' + product15.model;
		product16.description = 'Descripción ' + product16.model;
		product17.description = 'Descripción ' + product17.model;
		product18.description = 'Descripción ' + product18.model;
		product19.description = 'Descripción ' + product19.model;
		product20.description = 'Descripción ' + product20.model;

		manager.addProductInCategory(category1, product1, product2, product3, product4, product5);
		manager.addProductInCategory(category2, product6, product7, product8, product9, product10);
		manager.addProductInCategory(category3, product11, product12, product13, product14, product15);
		manager.addProductInCategory(category4, product16, product17, product18, product19, product20);

		//console.log(manager.toString());
	}

	constructor(model, view){
		console.log('Manager Controller');
		this.#manager = model;
		this.#managerView = view;

		// Eventos iniciales del Controlador
		this.onLoad();
		this.onInit();

		// Enlazamos handlers con la vista
		this.#managerView.bindInit(this.handleInit);
		this.#managerView.bindProductsTypeList(this.handleProductsTypeList);
	}

	onLoad = () => {
		this.#loadManagerObjects();
		this.#managerView.showProductTypes();
		this.onAddCategory();
	}

	onInit = () => {
		this.#managerView.showCategories(this.#manager.categories);
		this.#managerView.bindProductsCategoryList(
			this.handleProductsCategoryList
		);
	}

	onAddCategory = () => {
		this.#managerView.showCategoriesInMenu(this.#manager.categories);
	}

	handleInit = () => {
		this.onInit();
	}

	handleProductsCategoryList = (title) => {
		let category = this.#manager.getCategory(title);
		this.#managerView.listProducts(this.#manager.getCategoryProducts(category),category.title);
		this.#managerView.bindShowProduct(this.handleShowProduct);
	}

	handleProductsTypeList = (type) => {
		let instance = {
			Laptop: Laptop,
			Camera: Camera,
			Smartphone: Smartphone,
			Tablet: Tablet,
		}
		if (instance[type]){
			this.#managerView.listProducts(this.#manager.getTypeProducts(instance[type]), type);
		} else {
			throw new Error (`${type} isn't a type of Product.`)
		}
		this.#managerView.bindShowProduct(this.handleShowProduct);
	}

handleShowProduct = (serial) => {
	try {
		let product = this.#manager.getProduct(Number.parseInt(serial));
		this.#managerView.showProduct(product);
	} catch (error){
		this.#managerView.showProduct(null, 'No existe este producto en la página.');
	}
}

}

export default ManagerController;
