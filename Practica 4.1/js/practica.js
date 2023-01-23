"use strict";

function List(capacity) {

	this.capacity = capacity;
	let _list = [];

	Object.defineProperty(this, 'list', {
		get: function () {
			return _list;
		},
		set: function (value = []) {
			_list = value;
		}
	});

	// Devuelve un booleano según si está vacío el array de List
	this.isEmpty = function() {
		return (_list.length === 0);
	}

	// Devuelve un booleano según si está lleno el array de List
	this.isFull = function () {
		return (_list.length === capacity);
	}

	// Devuelve el tamaño de la lista
	this.size = function () {
		return (_list.length);
	}

	// Devuelve el tamaño de la lista tras añadir un elemento al final
	this.add = function (elem) {
		if(_list.length === capacity) throw new ListFullException();

		_list.push(elem);
		return (this.size());
	}

	// Devuelve el tamaño de la lista tras añadir un elemento en una posición
	this.addAt = function (elem, index) {
		if(_list.length === capacity) throw new ListFullException();

		_list.splice(index, 0, elem);
		return (this.size());
	}

	// Devuelve un elemento en base al índice pasado
	this.get = function (index) {
		return (_list[index]);
	}

	// Devuelve la lista en formato cadena, delimitada por "-"
	this.toString = function () {
		let str = "";
		let c = 0;

		for (let elem of _list) {
			if(typeof elem === "object") {
				str += elem.ISBN + " " + elem.title + " " + elem.author + " " + elem.publicationDate.toLocaleDateString() + " " + elem.price;
			} else {
				str += elem;
			}
			++c;
			if(c !== _list.length) str += " - ";
		}

		return str;
	}

	// Devuelve la posición del elemento desde el inicio, sino está retornará -1
	this.indexOf = function (elem) {
		if(_list.length === 0) throw new listEmptyException();
		return _list.map((l) => {return ((typeof l === "object") ? l.ISBN : l)}).indexOf(elem);
	}

	// Devuelve la posición del elemento desde el final, sino está retornará -1
	this.lastIndexOf = function (elem) {
		if(_list.length === 0) throw new listEmptyException();

		return (_list.findIndex((l) => l.ISBN === elem));
	}

	// Vacía la lista
	this.clear = function () {
		_list.splice(0, _list.length);
		return _list.length;
	}

	// Devuelve el primer libro de la lista
	this.firstElement = function () {
		if(_list.length === 0) throw new listEmptyException();
		if(typeof _list[0] === "object") {
			let str = "";

			for (let [key, value] of Object.entries(_list[0])) {
				(key === "publicationDate") ? str += value.toLocaleDateString() : str += value;
				if(key !== "price") str += " ";
			}

			return (str);
		} else {
			return (_list[0]);
		}
	}

	// Devuelve el último libro de la lista
	this.lastElement = function () {
		if(_list.length === 0) throw new listEmptyException();
		if(typeof _list[0] === "object") {
			let str = "";

			for (let [key, value] of Object.entries(_list[_list.length - 1])) {
				(key === "publicationDate") ? str += value.toLocaleDateString() : str += value;
				if(key !== "price") str += " ";
			}

			return (str);
		} else {
			return (_list[_list.length - 1]);
		}
	}

	// Elimina el elemento de la posición concreta y lo retorna
	this.remove = function (index) {
		if(_list.length === 0) throw new listEmptyException();
		let elim = list[index];

		list.splice(index, 1);
		return elim;
	}

	// Elimina el elemento concreto y devuelve un booleano
	this.removeElement = function (elem) {
		if(_list.length === 0) throw new listEmptyException();

		let index = indexOf(list, elem);

		if (index !== -1) {
			list.splice(index, 1);
			return true;
		}
		return false;
	}

	// Reemplaza el elemento de la posición concreta y lo retorna
	this.set = function (elem, index) {
		if(_list.length === 0) throw new listEmptyException();
		let elim = list[index];

		list.splice(index, 1, elem);
		return elim;
	}
}

List.prototype.constructor = List;

function ObjectList(capacity, type) {

	List.call(this, capacity);
	let _objectList = [];

	Object.defineProperty(this, 'objectList', {
		get: function () {
			return _objectList;
		},
		set: function (value = []) {
			_objectList = value;
		}
	});

	// Propiedad para tipo de objeto de Lista
	this.type = type;

	// Sobreescritura de método add
	let addOL = this.add;
	this.add = function (elem) {
		if (typeof elem !== "object") throw new notObjectException();
		if (!(elem instanceof this.type)) throw new invalidTypeException();
		return addOL.call(this, elem);
	}

	// Sobreescritura de método addAt
	let addAtOL = this.addAt;
	this.addAt = function (elem, index) {
		if (typeof elem !== "object") throw new notObjectException();
		if (!(elem instanceof this.type)) throw new invalidTypeException();
		return addAtOL.call(this, elem, index);
	}

	//Sobreescritura de método toString
	this.toString = function () {
		let str = "";
		let c = 0;
		while(this.get(c) !== undefined) {
			str += this.get(c).title + " " + this.get(c).author;
			++c;
			if(!(this.get(c) === undefined)) str += " - ";
		}

		return str;
	}

	// Sobreescritura de método indexOf
	this.indexOf = function (elem) {
		if (typeof elem !== "object") throw new notObjectException();
		if (!(elem instanceof this.type)) throw new invalidTypeException();
		let c = 0;
		let ar = [];
		while(this.get(c) !== undefined) {
			ar[c] = this.get(c);
			++c;
		}
		return ar.indexOf(elem);
	}

	// Sobreescritura de método remove
	let removeOL = this.remove;
	this.remove = function (index) {
		let i = this.get(index);
		removeOL.call(this, index);
		return i;
	}

	// Sobreescritura de método removeElement
	let removeElementOL = this.removeElement;
	this.removeElement = function (elem) {
		if (typeof elem !== "object") throw new notObjectException();
		if (!(elem instanceof this.type)) throw new invalidTypeException();
		removeElementOL.call(this,elem);
		return removeElementOL.call(this, elem);
	}

	// Sobreescritura de método set
	let setOL = this.set;
	this.set = function (elem, index) {
		if (typeof elem !== "object") throw new notObjectException();
		if (!(elem instanceof this.type)) throw new invalidTypeException();
		let i = this.get(index);
		setOL.call(this, elem, index);
		return i;
	}

}
ObjectList.prototype = Object.create(List.prototype);
ObjectList.prototype.constructor = ObjectList;

function OrderedObjectList(capacity, type, order = "asc") {
	ObjectList.call(this, capacity, type);
	let _orderedObjectList = [];
	Object.defineProperty(this, 'orderedObjectList', {
		get: function () {
			return _orderedObjectList;
		},
		set: function (value = []) {
			_orderedObjectList = value;
		}
	});

	// Propiedad para el orden del objeto de Lista
	this.order = order;

	// Eliminamos los métodos que no podemos usar en este objeto
	delete this.addAt;
	delete this.lastIndexOf;
	delete this.set;

	//Sobreescribimos el metodo add con la funcion de sort para el orden
	this.add = function (elem) {
		let t = ObjectList.prototype.add.call(this, elem, _orderedObjectList);
		_orderedObjectList.sort((a, b) => (order !== "desc") ? a.ISBN.toString().replace(/\-/g, "") - b.ISBN.toString().replace(/\-/g, "") : b.ISBN.toString().replace(/\-/g, "") - a.ISBN.toString().replace(/\-/g, ""));

		t.call(this, elem);
		return (this.size(_orderedObjectList));
	}
}
OrderedObjectList.prototype = Object.create(ObjectList.prototype);
OrderedObjectList.prototype.constructor = OrderedObjectList;

(function(){

	//Definimos el objeto book
	function Book(ISBN, title, author, publicationDate, price) {
		this.ISBN = ISBN;
		this.title = title;
		this.author = author;
		this.publicationDate = publicationDate;
		this.price = price;
	}
	Book.prototype.constructor = Book;

	let book = new Book("978-44-9214-654-5", "IT", "Stephen King", new Date(2000, 0, 3), 134);
	let book1 = new Book("123-81-5404-354-4", "Harry Potter",  "J.K. Rowling", new Date(2010, 0, 1), 2);
	let book2 = new Book( "978-84-9804-654-2","El Quijote", "Miguel de Cervantes", new Date(1605, 0, 1),20) ;
	let book3 = new Book("898-94-3404-124-3", "La Celestina", "Fernando de Rojas", new Date(1934, 3, 1), 54);
	let book4 =  new Book("345-34-9854-654-2", "Marianela", "Perez Galdós", new Date(1987, 9, 8),  7);


	try {

		// LIST
		console.log("Prueba de la Lista:");
		console.log("Lista de cualquier cosa:");
		let freeList = new List(5);

		console.log(freeList);
		console.log(freeList.isEmpty());
		console.log(freeList.isFull());
		console.log("Tamaño de la lista de cualquier cosa: " + freeList.size());
		console.log("Añadido. Longitud de la lista: " + freeList.add("casa"));
		console.log("Añadido. Longitud de la lista: " + freeList.add(2));
		console.log("Añadido. Longitud de la lista: " + freeList.add("mlaskdasl"));
		console.log("Añadido. Longitud de la lista: " + freeList.add(1002931));
		console.log("Añadido. Longitud de la lista: " + freeList.addAt(4, 0));
		console.log(freeList.get(1));
		console.log(freeList.toString());
		console.log(freeList.indexOf(3));
		console.log(freeList.indexOf(2));
		console.log("La capacidad máxima de la lista es de: " + freeList.capacity);
		// lNums.clear();
		console.log("Primer elemento: " + freeList.firstElement());
		console.log("Último elemento: " + freeList.lastElement());
		console.log("Elemento eliminado: " + freeList.remove(0));
		console.log("Se ha eliminado el elemento: " + freeList.removeElement(29));
		console.log("Se ha eliminado el elemento:" + freeList.removeElement(5656));
		console.log("Elemento reemplazado: " + freeList.set(14, 0));

		

	} catch (error) {
		console.log(error.name + ": " + error.message);
	}

	try {
		// Prueba de Lista de Objetos
		console.log("Prueba de lista de objetos");

		let obList = new ObjectList(5, Book);

		console.log(obList);
		console.log(obList.isEmpty());
		console.log(obList.isFull());
		console.log("Tamaño de la lista de libros: " + obList.size());
		console.log("Añadido. Longitud de la lista: " + obList.add(book));
		console.log("Añadido. Longitud de la lista: " + obList.add(book1));
		console.log("Añadido. Longitud de la lista: " + obList.add(book2));
		console.log("Añadido. Longitud de la lista: " + obList.add(book3));
		console.log("Añadido. Longitud de la lista: " + obList.addAt(book4, 0));
		console.log(obList.get(1));
		console.log(obList.toString());
		console.log(obList.indexOf("123-81-5404-354-4"));
		console.log(obList.indexOf("978-44-9214-654-5"));
		console.log(obList.indexOf("345-34-9854-654-2"));
		//console.log(obList.lastIndexOf("123-81-5404-354-4"));
		//console.log(obList.lastIndexOf("978-44-9214-654-5"));
		//console.log(obList.lastIndexOf("345-34-9854-654-2"));
		console.log("La capacidad máxima de la lista es: " + obList.capacity);
		// obList.clear();
		console.log("Primer elemento: " + obList.firstElement());
		console.log("Último elemento: " + obList.lastElement());
		console.log("Elemento eliminado: " + obList.remove(0));
		console.log("Elemento eliminado: " + obList.removeElement(book));
		console.log("Elemento reemplazado: " + obList.set(book, 0));

	} catch (error) {
		console.log(error.name + ": " + error.message);
	}

	try {
		console.log("Prueba de listas de objetos ordenadas");

		// Prueba OrderedObjectList
		let ordenada = new OrderedObjectList(5, Book, "desc");

		console.log();
		console.log(ordenada.isEmpty());
		console.log(ordenada.isFull());
		console.log("Tamaño de la lista ordenada: " + ordenada.size());
		console.log("Añadido. Longitud de la lista: " + ordenada.add(book2));
		console.log("Añadido. Longitud de la lista: " + ordenada.add(book1));
		console.log("Añadido. Longitud de la lista: " + ordenada.add(book));
		console.log("Añadido. Longitud de la lista: " + ordenada.add(book4));
		console.log("Añadido. Longitud de la lista: " + ordenada.add(book3));
		console.log(ordenada.get(1));
		console.log(ordenada.toString());
		console.log(ordenada.indexOf("123-81-5404-354-4"));
		console.log(ordenada.indexOf("978-44-9214-654-5"));
		console.log(ordenada.indexOf("345-34-9854-654-2"));
		console.log("La capacidad máxima de la lista es: " + ordenada.capacity);
		// ordenada.clear();
		console.log("Primer elemento: " + ordenada.firstElement());
		console.log("Último elemento: " + ordenada.lastElement());

	} catch (error) {
		console.log(error.name + ": " + error.message);
	}

})();