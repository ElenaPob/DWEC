"use strict";

//La expresion regular para comprobar que el ISBN este bien
let regex= /[0-9]{3}-[0-9]{2}-[0-9]{4}-[0-9]{3}-[0-9]{1}/;

// Crea un conjunto con un array vacío para almacenar elementos de la lista
function create() {
    let set = new Set();

    return set;
}

// Devuelve si la lista está vacía
function isEmpty(set) {
    return (set.size === 0); 
}

// Devuelve el tamaño de la lista
function size(set) {
    return set.size;
}

// Añade un elemento al final de la lista y devuelve el tamaño de esta
function add(set, elem) {
    if(!(elem.hasOwnProperty("ISBN")) || !(elem.hasOwnProperty("title"))) throw "El elemento no es un Book";
    if(has(set, elem)) throw "La ISBN ya está incluido en el conjunto";
    if(!regex.test(elem.ISBN)) throw "El ISBN del elemento no corresponde con las reglas";

    if(!(has(set, elem))) set.add(elem);

    return size(set);
}

// Indica si el elemento está en el conjunto
function has(set, elem) {
    if(!(elem.hasOwnProperty("ISBN")) || !(elem.hasOwnProperty("title"))) throw "El elemento no es un Book";
    
    for (let value of set) {
        if(value.ISBN === elem.ISBN) return set.has(elem);
    }
}

// Devuelve el conjunto en una cadena
function toString(set) {
    let cad = "";
    let cont = 1;
    
    set.forEach(function(item) {
        (cont === size(set)) ? cad += item.author + ": " + item.title : cad += item.author + ": " + item.title + " - ";
        cont++;
    });

    return cad;
}

// Vacía el conjunto
function clear(set) {
    set.clear();
}

// Elimina el elemento del conjunto del ISBN indicada y devuelve si se ha hecho o no
function remove(set, elem) {
    if(!(elem.hasOwnProperty("ISBN")) || !(elem.hasOwnProperty("title"))) throw "El elemento no es un Book";

    for (let value of set) {
        if(value.ISBN === elem.ISBN) {
            set.delete(elem);
            return set.has(elem);
        }
    }
}


function testSet() {
    
    try {
        let set = create();
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
            ISBN: "978-84-2311-654-4",
            title: "El nombre del viento",
            author: "Rufus",
            publicationDate: new Date(1988, 0, 18),
            price: 5
        };
        let elem8 = {
            ISBN: "978-Mi-2311-654-4",
            title: "Viajero",
            author: "Rufus",
            publicationDate: new Date(1988, 0, 18),
            price: 5
        };

        console.log("Conjunto vacío: " + isEmpty(set));
        console.log("Tamaño del conjunto: " + size(set));

        
        console.log("Tamaño del conjunto al añadir: " + add(set, elem1));
        console.log("Tamaño del conjunto al añadir: " + add(set, elem2));
        console.log("Tamaño del conjunto al añadir: " + add(set, elem3));
        console.log("Tamaño del conjunto al añadir: " + add(set, elem4));
        console.log("Tamaño del conjunto al añadir: " + add(set, elem5));
        console.log("Tamaño del conjunto al añadir: " + add(set, elem6));
        console.log(set);
        
        console.log("Conjunto vacío: " + isEmpty(set));
        console.log("Tamaño del conjunto: " + size(set));

        console.log(has(set, elem3));
        console.log(has(set, elem7));
        
        console.log(toString(set));
        

        console.log(remove(set, elem4));
        console.log(set);

        /*
        clear(set);
        console.log("Tamaño del conjunto: " + size(set));
        console.log("Tamaño del conjunto al añadir: " + add(set, elem1));
        console.log("Tamaño del conjunto al añadir: " + add(set, elem2));
        console.log("Tamaño del conjunto al añadir: " + add(set, elem3));
        console.log("Tamaño del conjunto al añadir: " + add(set, elem4));
        console.log("Tamaño del conjunto al añadir: " + add(set, elem5));
        console.log("Tamaño del conjunto al añadir: " + add(set, elem6));
        console.log(set);
        */

        //console.log("Tamaño del conjunto al añadir: " + add(set, elem8));

    } catch(error) {
		console.log(error);
    }

}
testSet();