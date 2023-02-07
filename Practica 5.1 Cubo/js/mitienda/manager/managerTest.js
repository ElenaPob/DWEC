
import Manager from './manager.js';
import { BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException } from './manager.js';
import {Product, Laptop, Camera, Smartphone, Tablet, Category} from './manager.js';
import {ManagerException, ObjecManagerException, CategoryExistsException, ProductExistInCategoryException, CategoryNotExistException, ProductNotExistInManagerException, ProductNotExistInCategoryException} from './manager.js';


let category1 = new Category('Promociones', 'https://via.placeholder.com/258x172.jpg?text=Promociones');
let category2 = new Category('Outlet', 'https://via.placeholder.com/258x172.jpg?text=Outlet');
let category3 = new Category('Ofertas especiales', 'https://via.placeholder.com/258x172.jpg?text=Ofertas+especiales');
let category4 = new Category('Reacondicionados', 'https://via.placeholder.com/258x172.jpg?text=Reacondicionados');
category1.description = 'Productos en promoción.';
category2.description = 'Outlet de productos con grandes descuentos.';
category3.description = 'Ofertas actuales.';
category4.description = 'Productos reacondicionados o seminuevos.';
let errorCategory = new Category('Reacondicionados', 'https://via.placeholder.com/258x172.jpg?text=Reacondicionados');

let product1 = new Laptop(1, 'brand1', 'model1', 1100);
let product2 = new Camera(2, 'brand1', 'model2', 1200);
let product3 = new Smartphone(3, 'brand1', 'model3', 1300);
let product4 = new Tablet(4, 'brand1', 'model4', 1400);
let product5 = new Laptop(5, 'brand1', 'model5', 1500);
let product6 = new Laptop(6, 'brand2', 'model1', 2100);
let product7 = new Camera(7, 'brand2', 'model2', 2200);
let product8 = new Tablet(8, 'brand2', 'model3', 2300);
let product9 = new Smartphone(9, 'brand2', 'model4', 2400);
let product10 = new Laptop(10, 'brand2', 'model5', 2500);
let product11 = new Laptop(11, 'brand3', 'model1', 3100);
let product12 = new Camera(12, 'brand3', 'model2', 3200);
let product13 = new Tablet(13, 'brand3', 'model3', 3300);
let product14 = new Smartphone(14, 'brand3', 'model4', 3400);
let product15 = new Laptop(15, 'brand3', 'model5', 3500);
let product16 = new Laptop(16, 'brand4', 'model1', 4100);
let product17 = new Camera(17, 'brand4', 'model2', 4200);
let product18 = new Tablet(18, 'brand4', 'model3', 4300);
let product19 = new Tablet(19, 'brand4', 'model4', 4400);
let product20 = new Laptop(20, 'brand4', 'model5', 4500);

function testCreateObjects(){
  let manager = Manager.getInstance();

	$$result.logBold("Testeo: Objetos categorias");
  manager.addCategory(category2, category1, category4);
  try{
    manager.addCategory(errorCategory);
  } catch(error){
    console.log(error.toString());
  }

	$$result.logBold("Testeo: Objetos productos");
  manager.addProduct(product2, product3, product4, product5);
  manager.addProduct(product7, product8, product9, product10);
  manager.addProduct(product12, product13, product14, product15);
  manager.addProduct(product17, product18, product19, product20);

  manager.addProductInCategory(category1, product1, product2, product3, product4, product5);
  manager.addProductInCategory(category2, product6, product7, product8, product9, product10);
  manager.addProductInCategory(category3, product11, product12, product13, product14, product15);
  manager.addProductInCategory(category4, product16, product17, product18, product19, product20);

	$$result.logBold("Contenido del carrito");
  $$result.log(manager.toString('<br>'));
}

function testRemoveObjects(){
	let manager = Manager.getInstance();

	$$result.logBold("Test: Borrado de objetos");
	$$result.logBold("Test: Borrado de productos");
	$$result.log("Productos: p1 y p12");
	manager.removeProduct(product1, product12);
	$$result.logBold("Test: Borrado de productos en categorías");
	$$result.log("Productos: p2 y p3 en c1");
	manager.removeProductInCategory(category1, product3, product2);
	try{
		manager.removeProductInCategory(category1, product19);
	} catch(error){
		console.log(error.toString());
	}

	$$result.logBold("Test: Borrado de categoría");
	$$result.log("Categoría: c2");
	manager.removeCategory(category2);

	try{
		manager.removeCategory(new Category('ErrorCategory', 'img/error.jpg'));
	} catch(error){
		console.log(error.toString());
	}

	$$result.logBold("Contenido del carrito");
	$$result.log(manager.toString('<br>'));
}

function testListObjects(){
	let manager = Manager.getInstance();

	$$result.logBold("Listado Laptop ordenado por brand");
	for (let product of manager.getTypeProducts(Laptop, 'brand')){
		$$result.log(product.toString());
	}
}

function testManager(){
	$$result.logBold("Testeo del Manager");
	testCreateObjects();
	testRemoveObjects();
	testListObjects();
}

export {testManager};
