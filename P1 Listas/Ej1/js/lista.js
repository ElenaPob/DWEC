"use strict";

//Numero maximo de elementos de la lista
const maxElem = 5;
//La expresion regular para comprobar que el ISBN este bien
let regex= /[0-9]{3}-[0-9]{2}-[0-9]{4}-[0-9]{3}-[0-9]{1}/;

//Crea un array vacío para almacenar elementos de la lista
function create() {
    let list = [];

    return list;
}

// Devuelve si la lista está vacía
function isEmpty(list) {
    return list.length === 0; 
}

// Devuelve si la lista está llena
function isFull(list) {
    return list.length === maxElem;
}

// Devuelve el tamaño de la lista
function size(list) {
    return list.length;
}

// Añade un elemento al final de la lista y devuelve el tamaño de esta
function add(list, elem) {
    if(!(elem.hasOwnProperty("ISBN")) || !(elem.hasOwnProperty("title"))) throw "El elemento no es un Book";
    if(isFull(list)) throw "La lista está llena";
    if(!regex.test(elem.ISBN)) throw "El ISBN del elemento no corresponde con las reglas";

    list.push(elem);

    return list.length;
}

// Añade un elemento en una posición específica de la lista y devuelve su tamaño
function addAt(list, elem, index) {
    if(!(elem.hasOwnProperty("ISBN")) || !(elem.hasOwnProperty("title"))) throw "El elemento no es un Book";
    if(isFull(list)) throw "La lista está llena";
    if((index>capacity()) || (index< 0)) throw "El indice esta fuera de los limites de la lista";

    list.splice(index, 0 , elem);

    return list.length;
}

// Devuelve el elemento de la lista de la posición que se pida
function get(list, index) {
    if((index>capacity()) || (index< 0)) throw "El indice esta fuera de los limites de la lista";
    if(!regex.test(elem.ISBN)) throw "El ISBN del elemento no corresponde con las reglas";
    
    return list[index];
}

// Devuelve la lista en una cadena 
function toString(list) {
    return list.reduce(function(cad, item, index) {
        return (index === list.length - 1) ? cad += item.author + ": " + item.title : cad += item.author + ": " + item.title + " - ";
    }, "Lista: ");
}

// Devuelve la posición del elemento indicado, sino está devuelve -1
function indexOf(list, elem) {
    if(!(elem.hasOwnProperty("ISBN")) || !(elem.hasOwnProperty("title"))) throw "El elemento no es un Book";

    return list.findIndex(function(item) {
        return item.ISBN === elem.ISBN;
    });
}

// Devuelve la posición del elemento comenzando por el el final, sino está devuelve -1
function lastIndexOf(list, elem) {
    if(!(elem.hasOwnProperty("ISBN")) || !(elem.hasOwnProperty("title"))) throw "El elemento no es un Book";

    return list.lastIndexOf(elem);
}

// Devuelve el máximo número de elementos que podemos tener en la lista
function capacity(list) {
    return maxElem;
}

// Vacía la lista
function clear(list) {
    list.length = 0;
}

// Devuelve el primer elemento de la lista
function firstElement(list) {
    if(isEmpty(list)) throw "La lista está vacía";
    
    return Object.values(list[0]);
}

// Devuelve el último elemento de la lista
function lastElement(list) {
    if(isEmpty(list)) throw "La lista está vacía";

    return Object.values(list[list.length - 1]);
}

// Elimina el elemento de la posición indicada y lo devuelve
function remove(list, index) {
    if((index>capacity()) || (index< 0)) throw "El indice esta fuera de los limites de la lista";

    let elim = list[index];

    list.splice(index, 1);
    return elim;
}

// Elimina el elemento de la posición indicada y devuelve si se pudo
function removeElement(list, elem) {
    if(!(elem.hasOwnProperty("ISBN")) || !(elem.hasOwnProperty("title"))) throw "El elemento no es un Book";

    let index = indexOf(list, elem);

    if (index !== -1) {
        list.splice(index, 1);
        return true;
    }
    return false;
}

// Reemplaza el elemento de la lista indicada por otro y devuelve el anterior
function set(list, elem, index) {
    if(!(elem.hasOwnProperty("ISBN")) || !(elem.hasOwnProperty("title"))) throw "El elemento no es un Book";
    if((index>capacity()) || (index< 0)) throw "El indice esta fuera de los limites de la lista";
    if(!regex.test(elem.ISBN)) throw "El ISBN del elemento no corresponde con las reglas";

    let elim = list[index];

    list.splice(index, 1, elem);
    return elim;
}

function test() {
    
    try {
        let list = create();

        let elem1 = {
            ISBN: "978-44-9214-654-5", 
            title: "IT", 
            author: "Stephen King", 
            publicationDate: new Date(2000, 0, 3), 
            price: 134, 
        };
        let elem2 = {
            ISBN: "123-81-5404-354-4", 
            title: "Harry Potter", 
            author: "J.K. Rowling", 
            publicationDate: new Date(2010, 0, 1), 
            price: 2,
        };
        let elem3 = {
            ISBN: "978-84-9804-654-2",
            title: "El Quijote",
            author: "Miguel de Cervantes",
            publicationDate: new Date(1605, 0, 1),
            price: 20,
        };
        let elem4 = {
            ISBN: "898-94-3404-124-3", 
            title: "La Celestina", 
            author: "Fernando de Rojas", 
            publicationDate: new Date(1934, 3, 1), 
            price: 54, 
        };
        let elem5 = {
            ISBN: "345-34-9854-654-2", 
            title: "Marianela", 
            author: "Perez Galdós", 
            publicationDate: new Date(1987, 9, 8), 
            price: 7, 
        };
        let elem6 = {
            ISBN: "978-34-3245-654-1", 
            title: "1984", 
            author: "George Orwell", 
            publicationDate: new Date(2000, 11, 1), 
            price: 12, 
        };
        let elem7 = {
            ISBN: "978-mI-2311-654-4",
            title: "El nombre del viento",
            author: "Rufus",
            publicationDate: new Date(1988, 0, 18),
            price: 5
        };

        console.log("Lista vacía: " + isEmpty(list));
        console.log("Lista llena: " + isFull(list));
        console.log("Tamaño de la lista: " + size(list));

        console.log("Tamaño de la lista al añadir: " + add(list, elem1));
        console.log("Tamaño de la lista al añadir: " + add(list, elem2));
        console.log("Tamaño de la lista al añadir: " + add(list, elem3));
        console.log("Tamaño de la lista al añadir: " + add(list, elem4));
        console.log("Tamaño de la lista al añadir: " + addAt(list, elem5, 3));
        console.log(list);
        
        console.log("Lista vacía: " + isEmpty(list));
        console.log("Lista llena: " + isFull(list));
        console.log("Tamaño de la lista: " + size(list));

        console.log(get(list, 3));
        console.log(toString(list));

        console.log("Posición desde el inicio: " + indexOf(list, elem3));
        console.log("Posición desde el final: " + lastIndexOf(list, elem5));
        console.log("Tamaño máximo de la lista: " + capacity(list));

        console.log("Primer elemento de la lista: " + firstElement(list));
        console.log("Último elemento de la lista: " + lastElement(list));
        console.log(remove(list, 4));
        console.log(removeElement(list, elem3));
        console.log(set(list, elem6, 0));

        /*
        clear(list);
        console.log("Tamaño de la lista: " + size(list));
        console.log("Tamaño de la lista al añadir: " + add(list, elem1));
        console.log("Tamaño de la lista al añadir: " + add(list, elem2));
        console.log("Tamaño de la lista al añadir: " + add(list, elem3));
        console.log("Tamaño de la lista al añadir: " + add(list, elem5));
        console.log(list);

        */

        console.log(list);
        //console.log("Tamaño de la lista al añadir: " + add(list, elem7));
    } catch(error) {
		console.log(error);
    }
    
}
test();