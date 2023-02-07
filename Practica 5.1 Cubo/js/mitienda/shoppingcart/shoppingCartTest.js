'use strict';
import ShoppingCart from './shoppingCartModel.js';
import { BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException } from './shoppingCartModel.js';
import {Product, Laptop, Camera, Smartphone, Tablet} from './shoppingCartModel.js';
import {ShoppingCartException, ProductShoppingCartException, ProductNotExistException, PositionOutBoundsException} from './shoppingCartModel.js';

function testES5Objects(){
	$$result.logBold("Ejemplo de excepción");
	let error = new BaseException();
	$$result.log(error.toString()); // MyError: Default Message
	$$result.log(error.constructor.name); // BaseException

	$$result.logBold("Ejemplo Product");
	try {
		let product = new Product('111-111-111', 'Brand', 'Model', 1500);
		// Serial: 111-111-111 Brand: Brand Model: Model Price: 1500€ Tax: 21%
		$$result.log(product.toString());
	} catch (abstractError) {
		$$result.log(abstractError);
	}

	$$result.logBold("Ejemplo Laptop");
	let laptop = new Laptop('222-222-222', 'HP', 'Elitebook', 1500);
	laptop.processor = 'i7';
	laptop.memory = '32GB';
	laptop.hd = 'SDD';
	laptop.size = '1TB';
	laptop.system = 'W10';
	// Serial: 222-222-222 Brand: HP Model: Elitebook Price: 1500€ Tax: 21% System: W10 Processor: i7 Memoria: 32GB HD: SDD Size: 1TB
	$$result.log(laptop.toString());

	$$result.logBold("Ejemplo Smartphone");
	let smartphone = new Smartphone('333-333-333', 'Brand', 'Model', 750);
	smartphone.processor = 'i7';
	smartphone.memory = '32GB';
	smartphone.resolution = '500x500';
	smartphone.storage = '1TB';
	smartphone.size = 5;
	smartphone.system = 'Android';
	// Serial: 333-333-333 Brand: Brand Model: Model Price: 750€ Tax: 21% System: Android Memoria: 32GB Almacenamiento: 1TB Resolución: 500x500 Size: 5''
	$$result.log(smartphone.toString());

	$$result.logBold("Ejemplo Camera");
	let camera = new Camera('444-444-444', 'Canon', 'PowerShot', 285);
	camera.type = 'Digital';
	camera.resolution = 8;
	camera.size = 5;
	// Serial: 444-444-444 Brand: Canon Model: PowerShot Price: 285€ Tax: 21% Tipo: Digital Resolución: 8MP Size: 5''
	$$result.log(camera.toString());

	$$result.logBold("Ejemplo Tablet");
	let tablet = new Tablet('555-555-555', 'Samsung', 'Galaxy', 250);
	tablet.memory = '32GB';
	tablet.storage = '1TB';
	tablet.resolution = '500x500';
	tablet.size = 7;
	tablet.system = 'Android';
	// Serial: 555-555-555 Brand: Samsung Model: Galaxy Price: 250€ Tax: 21% System: Android Memoria: 32GB Almacenamiento: 1TB Resolución: 500x500 Size: 7''
	$$result.log(tablet.toString());
}

function laptopTest(){
	$$result.logBold("Testeo: Laptop");
	let p1 = new Laptop("111-111-111","HP","EliteBook", 1000);
	// Serial: 111-111-111 Brand: HP Model: EliteBook Price: 1000€ Tax: 21% Procesaor: unkonwn Memoria: 0GB HD: - Size: 0GB
	$$result.log(p1.toString());
	$$result.log(p1 instanceof Laptop); // true
	$$result.log(p1 instanceof Product); // true
	p1.processor = "i7 8 núcleos";
	try{
		p1.memory = "16GB2";
	} catch(error){
		//InvalidValueException: Error: The paramenter memory has an invalid value. (memory: 16GB2)
		$$result.log(error.toString());
	}
	p1.memory = "16GB";
	try{
		p1.hd = "SDDD";
	} catch(error){
		//InvalidValueException: Error: The paramenter hd has an invalid value. (hd: SDDD)
		$$result.log(error.toString());
	}
	p1.hd = "SDD";
	try{
		p1.size = "1TB2";
	} catch(error){
		//InvalidValueException: Error: The paramenter size has an invalid value. (size: 1TB2)
		$$result.log(error.toString());
	}
	p1.size = "1TB";
	p1.system = "Windows 10";
	//Serial: 111-111-111 Brand: HP Model: EliteBook Price: 1000€ Tax: 21% Procesaor: i7 8 núcleos Memoria: 16GB HD: SDD Size: 1TB
	$$result.log(p1.toString());
}

function cameraTest(){
	$$result.logBold("Testeo: Camera");
	let p1 = new Camera("111-111-111","Canon","PowerShot", 500);
	// Serial: 111-111-111 Brand: Canon Model: PowerShot Price: 500€ Tax: 21% Tipo: - Resolución: 0MP Size: 0''
	$$result.log(p1.toString());
	$$result.log(p1 instanceof Camera); // true
	$$result.log(p1 instanceof Product); // true
	try{
		p1.type = "Digitall";
	} catch(error){
		//InvalidValueException: Error: The paramenter type has an invalid value. (type: Digitall)
		$$result.log(error.toString());
	}
	p1.type = "Digital";
	try{
		p1.resolution = "m5";
	} catch(error){
		//InvalidValueException: Error: The paramenter resolution has an invalid value. (resolution: NaN)
		$$result.log(error.toString());
	}
	p1.resolution = 7;
	try{
		p1.size = "m5";
	} catch(error){
		//InvalidValueException: Error: The paramenter size has an invalid value. (size: NaN)
		$$result.log(error.toString());
	}
	p1.size = 7;
	//Serial: 111-111-111 Brand: Canon Model: PowerShot Price: 500€ Tax: 21% Tipo: Digital Resolución: 7MP Size: 7''
	$$result.log(p1.toString());
}

function smartphoneTest(){
	$$result.logBold("Testeo: Smartphone");
	let p1 = new Smartphone("111-111-111","Sansung","Galaxy", 500);
	// Serial: 111-111-111 Brand: Sansung Model: Galaxy Price: 500€ Tax: 21% Memoria: 0GB Almacenamiento: 0GB Resolución: 0x0 Size: 0''
	$$result.log(p1.toString());
	$$result.log(p1 instanceof Smartphone); // true
	$$result.log(p1 instanceof Product); // true
	try{
		p1.memory = "8GB2";
	} catch(error){
		//InvalidValueException: Error: The paramenter memory has an invalid value. (memory: 8GB2)
		$$result.log(error.toString());
	}

	p1.memory = "8GB";
	try{
		p1.storage = "64GB2";
	} catch(error){
		//InvalidValueException: Error: The paramenter storage has an invalid value. (storage: 64GB2)
		$$result.log(error.toString());
	}
	p1.storage = "64GB";

	try{
		p1.resolution = "1024";
	} catch(error){
		//InvalidValueException: Error: The paramenter resolution has an invalid value. (resolution: 1024)
		$$result.log(error.toString());
	}
	p1.resolution = "1024x1024";

	try{
		p1.size = "m5";
	} catch(error){
		//InvalidValueException: Error: The paramenter size has an invalid value. (size: NaN)
		$$result.log(error.toString());
	}
	p1.size = 7;
	p1.system = "Android";
	//Serial: 111-111-111 Brand: Sansung Model: Galaxy Price: 500€ Tax: 21% Memoria: 8GB Almacenamiento: 64GB Resolución: 1024x1024 Size: 7''
	$$result.log(p1.toString());
}

function tabletTest(){
	$$result.logBold("Testeo: Tablet");
	let p1 = new Tablet("111-111-111","Sansung","Galaxy", 500);
	// Serial: 111-111-111 Brand: Sansung Model: Galaxy Price: 500€ Tax: 21% Memoria: 0GB Almacenamiento: 0GB Resolución: 0x0 Size: 0''
	$$result.log(p1.toString());
	$$result.log(p1 instanceof Smartphone); // true
	$$result.log(p1 instanceof Product); // true
	try{
		p1.memory = "8GB2";
	} catch(error){
		//InvalidValueException: Error: The paramenter memory has an invalid value. (memory: 8GB2)
		$$result.log(error.toString());
	}

	p1.memory = "8GB";
	try{
		p1.storage = "64GB2";
	} catch(error){
		//InvalidValueException: Error: The paramenter storage has an invalid value. (storage: 64GB2)
		$$result.log(error.toString());
	}
	p1.storage = "64GB";

	try{
		p1.resolution = "1024";
	} catch(error){
		//InvalidValueException: Error: The paramenter resolution has an invalid value. (resolution: 1024)
		$$result.log(error.toString());
	}
	p1.resolution = "1024x1024";

	try{
		p1.size = "m5";
	} catch(error){
		//InvalidValueException: Error: The paramenter size has an invalid value. (size: NaN)
		$$result.log(error.toString());
	}
	p1.size = 15;
	p1.system = "Android";
	//Serial: 111-111-111 Brand: Sansung Model: Galaxy Price: 500€ Tax: 21% Memoria: 8GB Almacenamiento: 64GB Resolución: 1024x1024 Size: 15''
	$$result.log(p1.toString());
}

function testShoppingCart(){
	$$result.logBold('Testeo ShoppingCart');
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
	let p3 = new Smartphone("111-111-113","Sansung","Galaxy", 500);
	p3.memory = "8GB";
	p3.storage = "64GB";
	p3.resolution = "1024x1024";
	p3.size = 7;
	p3.system = "Android";
	let p4 = new Tablet("111-111-114","Sansung","Galaxy", 500);
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

	let sc = ShoppingCart.getInstance();
	sc.addProduct(p1,2).addProduct(p2,3).addProduct(p3).addProduct(p4,2).addProduct(p5);
	$$result.logBold('Elementos en el carrito');
	for (let item of sc){
		$$result.log('Product: ' + item.product.toString());
		$$result.log('Quantity: ' + item.quantity);
	}
	$$result.logBold('Productos del carrito');
	for (let product of sc.products){
		$$result.log('Product: ' + product.toString());
	}
	$$result.logBold('Cantidades en el carrito');
	for (let quantity of sc.quantities){
		$$result.log('Quantity: ' + quantity);
	}

	$$result.logBold('Resumen de datos del carrito');
	$$result.log('Nº productos en el carrito: ' + sc.getNumberProducts()); //4
	$$result.log('Total carrito: ' + sc.getTotal()); //6000
	$$result.log('Total sin impuestos: ' + sc.getTotalWithoutTaxes()); //4740
	$$result.log('Impuestos: ' + sc.getTaxes()); //1260

	$$result.log('Cantidad de productos de ' + p3.serial + ': ' + sc.getQuantityProducts(p3)); //1
	$$result.log('Cantidad de productos en la posición 2: ' + sc.getQuantityProductPosition(2)); //1
	$$result.log('Producto en la posición 2: ' + sc.getProduct(2).serial); //111-111-113

	$$result.log(sc.toString("<br>"));
	// Serial: 111-111-111 Brand: HP Model: EliteBook Price: 1000€ Tax: 21% System: Windows 10 Processor: i7 8 núcleos Memoria: 16GB HD: SDD Size: 1TB Quantity: 3
	// Serial: 111-111-112 Brand: Canon Model: PowerShot Price: 500€ Tax: 21% Tipo: Digital Resolución: 7MP Size: 7'' Quantity: 3
	// Serial: 111-111-113 Brand: Sansung Model: Galaxy Price: 500€ Tax: 21% System: Android Memoria: 8GB Almacenamiento: 64GB Resolución: 1024x1024 Size: 7'' Quantity: 1
	// Serial: 111-111-114 Brand: Sansung Model: Galaxy Price: 500€ Tax: 21% System: Android Memoria: 8GB Almacenamiento: 64GB Resolución: 1024x1024 Size: 15'' Quantity: 2

	$$result.logBold('Actualización producto del carrito');
	sc.updateProduct(p4,5).updateProductPosition(1,5);
	$$result.log(sc.toString("<br>"));
	// Serial: 111-111-111 Brand: HP Model: EliteBook Price: 1000€ Tax: 21% System: Windows 10 Processor: i7 8 núcleos Memoria: 16GB HD: SDD Size: 1TB Quantity: 3
	// Serial: 111-111-112 Brand: Canon Model: PowerShot Price: 500€ Tax: 21% Tipo: Digital Resolución: 7MP Size: 7'' Quantity: 5
	// Serial: 111-111-113 Brand: Sansung Model: Galaxy Price: 500€ Tax: 21% System: Android Memoria: 8GB Almacenamiento: 64GB Resolución: 1024x1024 Size: 7'' Quantity: 1
	// Serial: 111-111-114 Brand: Sansung Model: Galaxy Price: 500€ Tax: 21% System: Android Memoria: 8GB Almacenamiento: 64GB Resolución: 1024x1024 Size: 15'' Quantity: 5

	$$result.logBold('Borrado de productos del carrito');
	sc.removeProduct(p5).removeProduct(p2).removeProduct(p3).removeAllProduct(p4);
	$$result.log('Nº total de productos: ' + sc.getNumberProducts()); //2
	$$result.log(sc.toString("<br>"));
	// Serial: 111-111-111 Brand: HP Model: EliteBook Price: 1000€ Tax: 21% System: Windows 10 Processor: i7 8 núcleos Memoria: 16GB HD: SDD Size: 1TB Quantity: 2
	// Serial: 111-111-112 Brand: Canon Model: PowerShot Price: 500€ Tax: 21% Tipo: Digital Resolución: 7MP Size: 7'' Quantity: 4

	$$result.logBold('Borrado de productos por posición');
	sc.removeProductPosition(0,2).removeAllProductPosition(1);
	$$result.log('Nº total de productos: ' + sc.getNumberProducts()); //1
	// Serial: 111-111-111 Brand: HP Model: EliteBook Price: 1000€ Tax: 21% System: Windows 10 Processor: i7 8 núcleos Memoria: 16GB HD: SDD Size: 1TB Quantity: 1
	$$result.log(sc.toString("<br>"));

	sc.clear();
	$$result.log('Nº total de productos: ' + sc.getNumberProducts()); //0
	$$result.log(sc.toString("<br>"));
}

export {testShoppingCart, testES5Objects, laptopTest, cameraTest, smartphoneTest, tabletTest};
