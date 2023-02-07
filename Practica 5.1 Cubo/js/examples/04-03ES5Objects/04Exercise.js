'use strict';
(function () {
	let divExamples = document.getElementById('examples').children[8];
	let buttons = divExamples.getElementsByClassName('tab-pane')[3].getElementsByTagName('button');

	function BaseException(message = "Default Message", fileName, lineNumber) {
		let instance = new Error(message, fileName, lineNumber);
		instance.name = "MyError";
		Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
		if (Error.captureStackTrace) {
			Error.captureStackTrace(instance, BaseException);
		}
		return instance;
	}
	BaseException.prototype = Object.create(Error.prototype, {
		constructor: {
			value: BaseException,
			enumerable: false,
			writable: false,
			configurable: false
		}
	});

	//Excepción acceso inválido a constructor
	function InvalidAccessConstructorException() {
		let instance = BaseException.call(this, "Constructor can’t be called as a function.");
		instance.name = "InvalidAccessConstructorException";
		return instance;
	}
	InvalidAccessConstructorException.prototype = Object.create(BaseException.prototype, {
		constructor: {
			value: InvalidAccessConstructorException,
			enumerable: false,
			writable: false,
			configurable: false
		}
	});

	//Excepción personalizada para indicar valores vacios.
	function EmptyValueException(param) {
		let instance = BaseException.call(this, "Error: The parameter " + param + " can't be empty.");
		instance.name = "EmptyValueException";
		instance.param = param;
		return instance;
	}
	EmptyValueException.prototype = Object.create(BaseException.prototype, {
		constructor: {
			value: EmptyValueException,
			enumerable: false,
			writable: false,
			configurable: false
		}
	});

	//Excepción de valor inválido
	function InvalidValueException(param, value) {
		let instance = BaseException.call(this, "Error: The paramenter " + param + " has an invalid value. (" + param + ": " + value + ")");
		instance.name = "InvalidValueException";
		instance.param = param;
		instance.param = value;
		return instance;
	}
	InvalidValueException.prototype = Object.create(BaseException.prototype, {
		constructor: {
			value: InvalidValueException,
			enumerable: false,
			writable: false,
			configurable: false
		}
	});

	//Constructor de Product. Permite definir propiedades comunes para todos los productos de la tienda.
	//Obligatorio serían serial, name y price.
	function Product(serial, brand, model, price, taxPercentage = Product.IVA) {
		//La función se invoca con el operador new
		if (!(this instanceof Product))
			throw new InvalidAccessConstructorException();

		//Validación de parámetros obligatorios
		if (!serial) throw new EmptyValueException("serial");
		if (!brand) throw new EmptyValueException("brand");
		if (!model) throw new EmptyValueException("model");
		price = Number.parseFloat(price);
		if (!price || price <= 0) throw new InvalidValueException("price", price);
		if (!taxPercentage || taxPercentage < 0) throw new InvalidValueException("taxPercentage", taxPercentage);

		//Definición de atributos privados del objeto
		let _serial = serial;
		let _brand = brand;
		let _model = model;
		let _price = price;
		let _taxPercentage = taxPercentage;

		//Propiedades de acceso a los atributos privados
		Object.defineProperty(this, 'serial', {
			get: function () {
				return _serial;
			},
			set: function (value) {
				if (!value) throw new EmptyValueException("serial");
				_serialNumber = value;
			}
		});

		Object.defineProperty(this, 'brand', {
			get: function () {
				return _brand;
			},
			set: function (value) {
				if (!value) throw new EmptyValueException("brand");
				_brand = value;
			}
		});

		Object.defineProperty(this, 'model', {
			get: function () {
				return _model;
			},
			set: function (value) {
				if (!value) throw new EmptyValueException("model");
				_model = value;
			}
		});

		Object.defineProperty(this, 'price', {
			get: function () {
				return _price;
			},
			set: function (value) {
				value = Number.parseFloat(value);
				if (Number.isNaN(value) && value > 0) throw new InvalidValueException("price", value);
				_price = value;
			}
		});

		Object.defineProperty(this, 'taxPercentage', {
			get: function () {
				return _taxPercentage;
			},
			set: function (value = Product.IVA) {
				if (!value || value < 0) throw new InvalidValueException("taxPercentage", value);
				_taxPercentage = value;

			}
		});
	}
	Product.prototype = {};
	Product.prototype.constructor = Product;
	Object.defineProperty(Product.prototype, 'description', {
		enunmerable: true,
		writable: true,
		configurable: false
	});
	Object.defineProperty(Product.prototype, 'priceWithoutTaxes', {
		get: function () {
			return this.price - (this.price * this.taxPercentage / 100);
		}
	});
	Object.defineProperty(Product.prototype, 'tax', {
		get: function () {
			return this.price * this.taxPercentage / 100;
		}
	});
	Product.prototype.toString = function () {
		return "Serial: " + this.serial + " Brand: " + this.brand + " Model: " + this.model + " Price: " + this.price + "€ Tax: " + this.taxPercentage + "%";
	}

	//Propiedad constante para definir el IVA.
	Object.defineProperty(Product, 'IVA', {
		value: 21,
		writable: false,
		enumerable: true,
		configurable: false
	});

	//Definimos la subclase Laptop
	function Laptop(serial, brand, model, price, taxPercentage = Product.IVA, processor = "unkonwn", memory = "0GB", hd = "-", size = "0GB") {
		//La función se invoca con el operador new
		if (!(this instanceof Laptop))
			throw new InvalidAccessConstructorException();
		//Llamada al superconstructor.
		Product.call(this, serial, brand, model, price, taxPercentage);

		//Validación de argumentos
		if (!processor) throw new EmptyValueException("processor");
		if (!/^((\d+GB)|(\d+TB))$/.test(memory)) throw new InvalidValueException("memory", memory);
		if (!/^((HDD)|(SDD)|(-))$/.test(hd)) throw new InvalidValueException("hd", hd);
		if (!/^((\d+GB)|(\d+TB))$/.test(size)) throw new InvalidValueException("size", size);

		//Atributos privados
		let _processor = processor;
		let _memory = memory;
		let _hd = hd;
		let _size = size;

		//Propiedades de acceso a los atributos privados
		Object.defineProperty(this, 'processor', {
			get: function () {
				return _processor;
			},
			set: function (value) {
				if (!value) throw new EmptyValueException("processor");
				_processor = value;
			}
		});

		Object.defineProperty(this, 'memory', {
			get: function () {
				return _memory;
			},
			set: function (value) {
				if (!/^((\d+GB)|(\d+TB))$/.test(value)) throw new InvalidValueException("memory", value);
				_memory = value;
			}
		});

		Object.defineProperty(this, 'hd', {
			get: function () {
				return _hd;
			},
			set: function (value) {
				if (!/^((HDD)|(SDD))$/.test(value)) throw new InvalidValueException("hd", value);
				_hd = value;
			}
		});

		Object.defineProperty(this, 'size', {
			get: function () {
				return _size;
			},
			set: function (value) {
				if (!/^((\d+GB)|(\d+TB))$/.test(value)) throw new InvalidValueException("size", value);
				_size = value;
			}
		});
	}
	Laptop.prototype = Object.create(Product.prototype, { //Heredamos de Product
		constructor: {
			value: Laptop,
			enumerable: false,
			writable: false,
			configurable: false
		}
	});
	Laptop.prototype.system = "Unknown"; // Propiedad pública
	Laptop.prototype.toString = function () {
		return Product.prototype.toString.call(this) + " System: " + this.system + " Processor: " + this.processor +
			" Memoria: " + this.memory + " HD: " + this.hd + " Size: " + this.size;
	}

	//Definimos la subclase Camera
	function Camera(serial, brand, model, price, taxPercentage = Product.IVA, type = "-", resolution = 0, size = 0) {
		//La función se invoca con el operador new
		if (!(this instanceof Camera))
			throw new InvalidAccessConstructorException();
		//Llamada al superconstructor.
		Product.call(this, serial, brand, model, price, taxPercentage);

		//Validación de argumentos
		resolution = Number.parseFloat(resolution);
		size = Number.parseFloat(size);
		if (!/^((Digital)|(Reflex)|(-))$/.test(type)) throw new InvalidValueException("type", type);
		if (Number.isNaN(resolution) || resolution < 0) throw new InvalidValueException("resolution", resolution);
		if (Number.isNaN(size) || size < 0) throw new InvalidValueException("size", size);

		//Atributos privados
		let _type = type;
		let _resolution = resolution;
		let _size = size;

		//Propiedades de acceso a los atributos privados
		Object.defineProperty(this, 'type', {
			get: function () {
				return _type;
			},
			set: function (value) {
				if (!/^((Digital)|(Reflex)|(-))$/.test(value)) throw new InvalidValueException("type", value);
				_type = value;
			}
		});

		Object.defineProperty(this, 'resolution', {
			get: function () {
				return _resolution;
			},
			set: function (value) {
				value = Number.parseFloat(value);
				if (Number.isNaN(value) || value < 0) throw new InvalidValueException("resolution", value);
				_resolution = value;
			}
		});

		Object.defineProperty(this, 'size', {
			get: function () {
				return _size;
			},
			set: function (value) {
				value = Number.parseFloat(value);
				if (Number.isNaN(value) || value < 0) throw new InvalidValueException("size", value);
				_size = value;
			}
		});
	}
	Camera.prototype = Object.create(Product.prototype, { //Heredamos de Product
		constructor: {
			value: Camera,
			enumerable: false,
			writable: false,
			configurable: false
		}
	});
	Camera.prototype.toString = function () {
		return Product.prototype.toString.call(this) +
			" Tipo: " + this.type + " Resolución: " + this.resolution + "MP Size: " + this.size + "''";
	}

	//Definimos la subclase Smartphone
	function Smartphone(serial, brand, model, price, taxPercentage = Product.IVA, memory = "0GB", storage = "0GB", resolution = "0x0", size = 0) {
		//La función se invoca con el operador new
		if (!(this instanceof Smartphone))
			throw new InvalidAccessConstructorException();
		//Llamada al superconstructor.
		Product.call(this, serial, brand, model, price, taxPercentage);

		//Validación de argumentos
		if (!/^((\d+GB)|(\d+TB))$/.test(memory)) throw new InvalidValueException("memory", memory);
		if (!/^((\d+GB)|(\d+TB))$/.test(storage)) throw new InvalidValueException("storage", storage);
		size = Number.parseFloat(size);
		if (Number.isNaN(size) || size < 0) throw new InvalidValueException("size", size);
		if (!/^(\d+x\d+)$/.test(resolution)) throw new InvalidValueException("resolution", resolution);

		//Atributos privados
		let _memory = memory;
		let _storage = storage;
		let _resolution = resolution;
		let _size = size;

		//Propiedades de acceso a los atributos privados
		Object.defineProperty(this, 'memory', {
			get: function () {
				return _memory;
			},
			set: function (value) {
				if (!/^((\d+GB)|(\d+TB))$/.test(value)) throw new InvalidValueException("memory", value);
				_memory = value;
			}
		});

		Object.defineProperty(this, 'resolution', {
			get: function () {
				return _resolution;
			},
			set: function (value) {
				if (!/^(\d+x\d+)$/.test(value)) throw new InvalidValueException("resolution", value);
				_resolution = value;
			}
		});

		Object.defineProperty(this, 'storage', {
			get: function () {
				return _storage;
			},
			set: function (value) {
				if (!/^((\d+GB)|(\d+TB))$/.test(value)) throw new InvalidValueException("storage", value);
				_storage = value;
			}
		});

		Object.defineProperty(this, 'size', {
			get: function () {
				return _size;
			},
			set: function (value) {
				value = Number.parseFloat(value);
				if (Number.isNaN(value) || value < 0) throw new InvalidValueException("size", value);
				_size = value;
			}
		});
	}
	Smartphone.prototype = Object.create(Product.prototype, { //Heredamos de Product
		constructor: {
			value: Smartphone,
			enumerable: false,
			writable: false,
			configurable: false
		}
	});
	Smartphone.prototype.system = "Unknown"; // Propiedad pública
	Smartphone.prototype.toString = function () {
		return Product.prototype.toString.call(this) + " System: " + this.system +
			" Memoria: " + this.memory + " Almacenamiento: " + this.storage + " Resolución: " + this.resolution + " Size: " + this.size + "''";
	}

	//Definimos la subclase Tablet
	function Tablet(serial, brand, model, price, taxPercentage = Product.IVA, memory = "0GB", storage = "0GB", resolution = "0x0", size = 0) {
		//La función se invoca con el operador new
		if (!(this instanceof Tablet))
			throw new InvalidAccessConstructorException();
		//Llamada al superconstructor.
		Product.call(this, serial, brand, model, price, taxPercentage);

		//Validación de argumentos
		if (!/^((\d+GB)|(\d+TB))$/.test(memory)) throw new InvalidValueException("memory", memory);
		if (!/^((\d+GB)|(\d+TB))$/.test(storage)) throw new InvalidValueException("storage", storage);
		size = Number.parseFloat(size);
		if (Number.isNaN(size) || size < 0) throw new InvalidValueException("size", size);
		if (!/^(\d+x\d+)$/.test(resolution)) throw new InvalidValueException("resolution", resolution);

		//Atributos privados
		let _memory = memory;
		let _storage = storage;
		let _resolution = resolution;
		let _size = size;

		//Propiedades de acceso a los atributos privados
		Object.defineProperty(this, 'memory', {
			get: function () {
				return _memory;
			},
			set: function (value) {
				if (!/^((\d+GB)|(\d+TB))$/.test(value)) throw new InvalidValueException("memory", value);
				_memory = value;
			}
		});

		Object.defineProperty(this, 'resolution', {
			get: function () {
				return _resolution;
			},
			set: function (value) {
				if (!/^(\d+x\d+)$/.test(value)) throw new InvalidValueException("resolution", value);
				_resolution = value;
			}
		});

		Object.defineProperty(this, 'storage', {
			get: function () {
				return _storage;
			},
			set: function (value) {
				if (!/^((\d+GB)|(\d+TB))$/.test(value)) throw new InvalidValueException("storage", value);
				_storage = value;
			}
		});

		Object.defineProperty(this, 'size', {
			get: function () {
				return _size;
			},
			set: function (value) {
				value = Number.parseFloat(value);
				if (Number.isNaN(value) || value < 0) throw new InvalidValueException("size", value);
				_size = value;
			}
		});
	}
	Tablet.prototype = Object.create(Product.prototype, { //Heredamos de Product
		constructor: {
			value: Tablet,
			enumerable: false,
			writable: false,
			configurable: false
		}
	});
	Tablet.prototype.system = "Unknown"; // Propiedad pública
	Tablet.prototype.toString = function () {
		return Product.prototype.toString.call(this) + " System: " + this.system +
			" Memoria: " + this.memory + " Almacenamiento: " + this.storage + " Resolución: " + this.resolution + " Size: " + this.size + "''";
	}

	buttons[0].addEventListener('click', function () {
		$$result.clear();

		$$result.logBold("Ejemplo de excepción");
		let error = new BaseException();
		$$result.log(error.toString()); // MyError: Default Message
		$$result.log(error.constructor.name); // BaseException

		$$result.logBold("Ejemplo Product");
		let product = new Product('111-111-111', 'Brand', 'Model', 1500);
		// Serial: 111-111-111 Brand: Brand Model: Model Price: 1500€ Tax: 21%
		$$result.log(product.toString());

		$$result.logBold("Ejemplo Laptop");
		let laptop = new Laptop('222-222-222', 'HP', 'Elitebook', 1500);
		laptop.processor = 'i7';
		laptop.memory = '32GB';
		laptop.hd = 'SDD';
		laptop.size = '1TB';
		laptop.system = 'W10';
		$$result.log(laptop.toString());

		$$result.logBold("Ejemplo Smartphone");
		let smartphone = new Smartphone('333-333-333', 'Brand', 'Model', 750);
		smartphone.processor = 'i7';
		smartphone.memory = '32GB';
		smartphone.resolution = '500x500';
		smartphone.storage = '1TB';
		smartphone.size = 5;
		smartphone.system = 'Android';
		$$result.log(smartphone.toString());

		$$result.logBold("Ejemplo Camera");
		let camera = new Camera('444-444-444', 'Canon', 'PowerShot', 285);
		camera.type = 'Digital';
		camera.resolution = 8;
		camera.size = 5;
		$$result.log(camera.toString());

		$$result.logBold("Ejemplo Tablet");
		let tablet = new Tablet('555-555-555', 'Samsung', 'Galaxy', 250);
		tablet.memory = '32GB';
		tablet.storage = '1TB';
		tablet.resolution = '500x500';
		tablet.size = 7;
		tablet.system = 'Android';
		$$result.log(tablet.toString());
	});

})();

