'use strict';
import { BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException } from '../exceptions.js';

class Product{
	//Campos privados
	#serial;
	#brand;
	#model;
	#price;
	#taxPercentage;
	#url;
	constructor (serial, brand, model, price, taxPercentage = Product.IVA){
		//La función se invoca con el operador new
		if (!new.target) throw new InvalidAccessConstructorException(); // Verificación operador new
		if (new.target === Product) throw new AbstractClassException("Product"); // Chequeo clase abstracta

		//Validación de parámetros obligatorios
		if (!serial) throw new EmptyValueException("serial");
		if (!brand) throw new EmptyValueException("brand");
		if (!model) throw new EmptyValueException("model");
		price = Number.parseFloat(price);
		if (!price || price <= 0) throw new InvalidValueException("price", price);
		if (!taxPercentage || taxPercentage < 0) throw new InvalidValueException("taxPercentage", taxPercentage);

		//Definición de atributos privados del objeto
		this.#serial = serial;
		this.#brand = brand;
		this.#model = model;
		this.#price = price;
		this.#taxPercentage = taxPercentage;
	}

	//Propiedades de acceso a los atributos privados
	get serial(){
		return this.#serial;
	}
	set serial(value){
		if (!value) throw new EmptyValueException("serial");
		this.#serial = value;
	}

	get brand(){
		return this.#brand;
	}
	set brand(value){
		if (!value) throw new EmptyValueException("brand");
		this.#brand = value;
	}

	get model(){
		return this.#model;
	}
	set model(value){
		if (!value) throw new EmptyValueException("model");
		this.#model = value;
	}

	get price(){
		return this.#price;
	}
	set price(value){
		value = Number.parseFloat(value);
		if (Number.isNaN(value) && value > 0) throw new InvalidValueException("price", value);
		this.#price = value;
	}

	get taxPercentage(){
		return this.#taxPercentage;
	}
	set taxPercentage(value = Product.IVA){
		if (!value || value < 0) throw new InvalidValueException("taxPercentage", value);
		this.#taxPercentage = value;
	}

	get url(){
		return this.#url;
	}

	set url(value){
		if (!value) throw new EmptyValueException("url");
		this.#url = value;
	}

	//Propiedades estáticas.
	static get IVA(){
		return 21;
	}

	// Métodos públicos
	get priceWithoutTaxes(){
		return this.price - (this.price * this.taxPercentage / 100);
	}
	get tax(){
		return this.price * this.taxPercentage / 100;
	}
	toString(){
		return "Serial: " + this.serial + " Brand: " + this.brand + " Model: " + this.model + " Price: " + this.price + "€ Tax: " + this.taxPercentage + "%";
	}
}
Object.defineProperty(Product.prototype, "serial", {enumerable: true});
Object.defineProperty(Product.prototype, "brand", {enumerable: true});
Object.defineProperty(Product.prototype, "model", {enumerable: true});
Object.defineProperty(Product.prototype, "price", {enumerable: true});
Object.defineProperty(Product.prototype, "taxPercentage", {enumerable: true});
Object.defineProperty(Product.prototype, "description", {enumerable: true, writable: true});

//Definimos la subclase Laptop
class Laptop extends Product{
	//Atributos privados
	#processor;
	#memory;
	#hd;
	#size;
	constructor (serial, brand, model, price, taxPercentage = Product.IVA, processor = "unkonwn", memory = "0GB", hd = "-", size = "0GB"){
		//La función se invoca con el operador new
		if (!new.target) throw new InvalidAccessConstructorException();
		//Llamada al superconstructor.
		super(serial,brand,model,price,taxPercentage);

		//Validación de argumentos
		if (!processor) throw new EmptyValueException("processor");
		if (!/^((\d+GB)|(\d+TB))$/.test(memory)) throw new InvalidValueException("memory",memory);
		if (!/^((HDD)|(SDD)|(-))$/.test(hd)) throw new InvalidValueException("hd",hd);
		if (!/^((\d+GB)|(\d+TB))$/.test(size)) throw new InvalidValueException("size",size);

		//Atributos privados
		this.#processor = processor;
		this.#memory = memory;
		this.#hd = hd;
		this.#size = size;
	}

	//Propiedades de acceso a los atributos privados
	get processor(){
		return this.#processor;
	}
	set processor(value){
		if (!value) throw new EmptyValueException("processor");
		this.#processor = value;
	}

	get memory(){
		return this.#memory;
	}
	set memory(value){
		if (!/^((\d+GB)|(\d+TB))$/.test(value)) throw new InvalidValueException("memory",value);
		this.#memory = value;
	}

	get hd(){
		return this.#hd;
	}
	set hd(value){
		if (!/^((HDD)|(SDD))$/.test(value)) throw new InvalidValueException("hd",value);
		this.#hd = value;
	}

	get size(){
		return this.#size;
	}
	set size(value){
		if (!/^((\d+GB)|(\d+TB))$/.test(value)) throw new InvalidValueException("size",value);
		this.#size = value;
	}
	//Métodos públicos
	toString (){
		return super.toString() + " System: " + this.system + " Processor: " + this.processor +
			" Memoria: " + this.memory + " HD: " + this.hd + " Size: " + this.size;
	}
}
Object.defineProperty(Laptop.prototype, "processor", {enumerable: true});
Object.defineProperty(Laptop.prototype, "memory", {enumerable: true});
Object.defineProperty(Laptop.prototype, "hd", {enumerable: true});
Object.defineProperty(Laptop.prototype, "size", {enumerable: true});
Object.defineProperty(Laptop.prototype, "system", {value:"Unknown", enumerable: true, writable: true});
Object.defineProperty(Product.prototype, "url", {enumerable: true});

//Definimos la subclase Camera
class Camera extends Product{
	//Atributos privados
	#type;
	#resolution;
	#size;
	constructor (serial, brand, model, price, taxPercentage = Product.IVA, type = "-", resolution = 0, size = 0){
		//La función se invoca con el operador new
		if (!new.target) throw new InvalidAccessConstructorException();
		//Llamada al superconstructor.
		super(serial,brand,model,price,taxPercentage);

		//Validación de argumentos
		resolution = Number.parseFloat(resolution);
		size = Number.parseFloat(size);
		if (!/^((Digital)|(Reflex)|(-))$/.test(type)) throw new InvalidValueException("type",type);
		if (Number.isNaN(resolution) || resolution < 0) throw new InvalidValueException("resolution",resolution);
		if (Number.isNaN(size) || size < 0) throw new InvalidValueException("size",size);

		//Atributos privados
		this.#type = type;
		this.#resolution = resolution;
		this.#size = size;
	}

	//Propiedades de acceso a los atributos privados
	get type(){
		return this.#type;
	}
	set type(value){
		if (!/^((Digital)|(Reflex)|(-))$/.test(value)) throw new InvalidValueException("type",value);
		this.#type = value;
	}

	get resolution(){
		return this.#resolution;
	}
	set resolution(value){
		value = Number.parseFloat(value);
		if (Number.isNaN(value) || value < 0) throw new InvalidValueException("resolution",value);
		this.#resolution = value;
	}

	get size(){
		return this.#size;
	}
	set size(value){
		value = Number.parseFloat(value);
		if (Number.isNaN(value) || value < 0) throw new InvalidValueException("size",value);
		this.#size = value;
	}

	//Métodos públicos
	toString (){
		return super.toString() +
		" Tipo: " + this.type + " Resolución: " + this.resolution + "MP Size: " + this.size + "''";
	}
}
Object.defineProperty(Camera.prototype, "type", {enumerable: true});
Object.defineProperty(Camera.prototype, "resolution", {enumerable: true});
Object.defineProperty(Camera.prototype, "size", {enumerable: true});

//Definimos la subclase Smartphone
class Smartphone extends Product{
	//Atributos privados
	#memory;
	#storage;
	#resolution;
	#size;
	constructor (serial, brand, model, price, taxPercentage = Product.IVA, memory = "0GB", storage = "0GB", resolution = "0x0", size = 0){
		//La función se invoca con el operador new
		if (!new.target) throw new InvalidAccessConstructorException();
		//Llamada al superconstructor.
		super(serial,brand,model,price,taxPercentage);

		//Validación de argumentos
		if (!/^((\d+GB)|(\d+TB))$/.test(memory)) throw new InvalidValueException("memory",memory);
		if (!/^((\d+GB)|(\d+TB))$/.test(storage)) throw new InvalidValueException("storage",storage);
		size = Number.parseFloat(size);
		if (Number.isNaN(size) || size < 0) throw new InvalidValueException("size",size);
		if (!/^(\d+x\d+)$/.test(resolution)) throw new InvalidValueException("resolution",resolution);

		//Atributos privados
		this.#memory = memory;
		this.#storage = storage;
		this.#resolution = resolution;
		this.#size = size;
	}

	//Propiedades de acceso a los atributos privados
	get memory(){
		return this.#memory;
	}
	set memory(value){
		if (!/^((\d+GB)|(\d+TB))$/.test(value)) throw new InvalidValueException("memory",value);
		this.#memory = value;
	}

	get resolution(){
		return this.#resolution;
	}
	set resolution(value){
		if (!/^(\d+x\d+)$/.test(value)) throw new InvalidValueException("resolution",value);
		this.#resolution = value;
	}

	get storage(){
		return this.#storage;
	}
	set storage(value){
		if (!/^((\d+GB)|(\d+TB))$/.test(value)) throw new InvalidValueException("storage",value);
		this.#storage = value;
	}

	get size(){
		return this.#size;
	}
	set size(value){
		value = Number.parseFloat(value);
		if (Number.isNaN(value) || value < 0) throw new InvalidValueException("size",value);
		this.#size = value;
	}

	//Métodos públicos
	toString (){
		return super.toString() + " System: " + this.system +
		" Memoria: " + this.memory + " Almacenamiento: " + this.storage + " Resolución: " + this.resolution + " Size: " + this.size + "''";
	}
}
Object.defineProperty(Smartphone.prototype, "memory", {enumerable: true});
Object.defineProperty(Smartphone.prototype, "storage", {enumerable: true});
Object.defineProperty(Smartphone.prototype, "resolution", {enumerable: true});
Object.defineProperty(Smartphone.prototype, "size", {enumerable: true});
Object.defineProperty(Smartphone.prototype, "system", {value:"Unknown", enumerable: true, writable: true});

//Definimos la subclase Tablet
class Tablet extends Product{
	//Atributos privados
	#memory;
	#storage;
	#resolution;
	#size;
	constructor (serial, brand, model, price, taxPercentage = Product.IVA, memory = "0GB", storage = "0GB", resolution = "0x0", size = 0){
		//La función se invoca con el operador new
		if (!new.target) throw new InvalidAccessConstructorException();
		//Llamada al superconstructor.
		super(serial,brand,model,price,taxPercentage);

		//Validación de argumentos
		if (!/^((\d+GB)|(\d+TB))$/.test(memory)) throw new InvalidValueException("memory",memory);
		if (!/^((\d+GB)|(\d+TB))$/.test(storage)) throw new InvalidValueException("storage",storage);
		size = Number.parseFloat(size);
		if (Number.isNaN(size) || size < 0) throw new InvalidValueException("size",size);
		if (!/^(\d+x\d+)$/.test(resolution)) throw new InvalidValueException("resolution",resolution);

		//Atributos privados
		this.#memory = memory;
		this.#storage = storage;
		this.#resolution = resolution;
		this.#size = size;
	}

	//Propiedades de acceso a los atributos privados
	get memory(){
		return this.#memory;
	}
	set memory(value){
		if (!/^((\d+GB)|(\d+TB))$/.test(value)) throw new InvalidValueException("memory",value);
		this.#memory = value;
	}

	get resolution(){
		return this.#resolution;
	}
	set resolution(value){
		if (!/^(\d+x\d+)$/.test(value)) throw new InvalidValueException("resolution",value);
		this.#resolution = value;
	}

	get storage(){
		return this.#storage;
	}
	set storage(value){
		if (!/^((\d+GB)|(\d+TB))$/.test(value)) throw new InvalidValueException("storage",value);
		this.#storage = value;
	}

	get size(){
		return this.#size;
	}
	set size(value){
		value = Number.parseFloat(value);
		if (Number.isNaN(value) || value < 0) throw new InvalidValueException("size",value);
		this.#size = value;
	}

	//Métodos públicos
	toString (){
		return super.toString() + " System: " + " System: " + this.system +
		" Memoria: " + this.memory + " Almacenamiento: " + this.storage + " Resolución: " + this.resolution + " Size: " + this.size + "''";
	}
}
Object.defineProperty(Tablet.prototype, "memory", {enumerable: true});
Object.defineProperty(Tablet.prototype, "storage", {enumerable: true});
Object.defineProperty(Tablet.prototype, "resolution", {enumerable: true});
Object.defineProperty(Tablet.prototype, "size", {enumerable: true});
Object.defineProperty(Tablet.prototype, "system", {value:"Unknown", enumerable: true, writable: true});

class Category {
	#title
	#url

	constructor (title = 'Anon', url = 'https://via.placeholder.com/258x172.jpg?text=SinNombre'){
			if (!new.target) throw new InvalidAccessConstructorException();
			if (!title) throw new EmptyValueException('title');
			if (!url) throw new EmptyValueException('url');

			this.#title = title;
			this.#url = url;
			this.description = '';
	}

	get title(){
			return this.#title;
	}
	set title(value = 'Anon'){
			if (!value) throw new EmptyValueException('title');
			this.#title = value;
	}
	get url(){
			return this.#url;
	}
	set url(value = 'Anon'){
			if (!value) throw new EmptyValueException('url');
			this.#url = value;
	}
}
Object.defineProperty(Category.prototype, 'title', {enumerable: true});
Object.defineProperty(Category.prototype, 'url', {enumerable: true});



export {Product, Laptop, Camera, Smartphone, Tablet, Category};
