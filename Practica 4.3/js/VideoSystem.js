"use strict";
import {BaseException,
	InvalidAccessConstructorException,
	EmptyValueException,
	ParameterValidationException,
	InvalidValueException,
	AbstractClassException } from './BaseException.js';
import {Coords, User, Person , Production , Movie , Serie , Category, Resource} from './ObjectsVideoSystem.js';

// Objeto VideoSystem
class VideoSystemException extends BaseException {
	constructor(message = "Error: Video System Generic Exception.",fileName, lineNumber) {
		super(message, fileName, lineNumber);
		this.name = "VideoSystemException";
	}
}

class ActorVideoSystemException extends VideoSystemException {
	constructor(fileName, lineNumber) {
		super("Error: The method needs a actor parameter.", fileName, lineNumber);
		this.name = "ActorVideoSystemException";
	}
}

class ActorExistsVideoSystemException extends VideoSystemException {
	constructor(fileName, lineNumber) {
		super("Error: The actor exists in the video system.", fileName, lineNumber);
		this.name = "ActorExistsVideoSystemException";
	}
}

class ActorNotExistsVideoSystemException extends VideoSystemException {
	constructor(fileName, lineNumber) {
		super("Error: The actor doesn't exist in the video system.", fileName, lineNumber);
		this.name = "ActorNotExistsVideoSystemException";
	}
}

class UserVideoSystemException extends VideoSystemException {
	constructor(fileName, lineNumber) {
		super("Error: The method needs a User parameter.", fileName, lineNumber);
		this.name = "UserVideoSystemException";
	}
}

class UserExistsVideoSystemException extends VideoSystemException {
	constructor(fileName, lineNumber) {
		super("Error: The user exists in the video system.", fileName, lineNumber);
		this.name = "UserExistsVideoSystemException";
	}
}

class UserNotExistsVideoSystemException extends VideoSystemException {
	constructor(fileName, lineNumber) {
		super("Error: The user doesn't exist in the video system.", fileName, lineNumber);
		this.name = "UserNotExistsVideoSystemException";
	}
}

class DirectorVideoSystemException extends VideoSystemException {
	constructor(fileName, lineNumber) {
		super("Error: The method needs a director parameter.", fileName, lineNumber);
		this.name = "DirectorVideoSystemException";
	}
}

class DirectorExistsVideoSystemException extends VideoSystemException {
	constructor(fileName, lineNumber) {
		super("Error: The director exists in the video system.", fileName, lineNumber);
		this.name = "DirectorExistsVideoSystemException";
	}
}

class DirectorNotExistsVideoSystemException extends VideoSystemException {
	constructor(fileName, lineNumber) {
		super("Error: The director doesn't exist in the video system.", fileName, lineNumber);
		this.name = "DirectorNotExistsVideoSystemException";
	}
}

class ProductionVideoSystemException extends VideoSystemException {
	constructor(fileName, lineNumber) {
		super("Error: The method needs a Production parameter.", fileName, lineNumber);
		this.name = "ProductionVideoSystemException";
	}
}

class ProductionExistsVideoSystemException extends VideoSystemException {
	constructor(fileName, lineNumber) {
		super("Error: The Production exists in the video system.", fileName, lineNumber);
		this.name = "ProductionExistsVideoSystemException";
	}
}

class ProductionNotExistsVideoSystemException extends VideoSystemException {
	constructor(fileName, lineNumber) {
		super("Error: The Production doesn't exist in the video system.", fileName, lineNumber);
		this.name = "ProductionNotExistsVideoSystemException";
	}
}


class CategoryVideoSystemException extends VideoSystemException {
	constructor(fileName, lineNumber) {
		super("Error: The method needs a Category parameter.", fileName, lineNumber);
		this.name = "CategoryVideoSystemException";
	}
}

class CategoryExistsVideoSystemException extends VideoSystemException {
	constructor(fileName, lineNumber) {
		super("Error: The category exists in the video system.", fileName, lineNumber);
		this.name = "CategoryExistsVideoSystemException";
	}
}

class CategoryNotExistsVideoSystemException extends VideoSystemException {
	constructor(fileName, lineNumber) {
		super("Error: The category doesn't exist in the video system.", fileName, lineNumber);
		this.name = "CategoryNotExistsVideoSystemException";
	}
}

class DefaultCategoryVideoSystemException extends VideoSystemException {
	constructor(fileName, lineNumber) {
		super("Error: The deafult category can't be removed.", fileName, lineNumber);
		this.name = "DefaultCategoryVideoSystemException";
	}
}

class VideoVideoSystemException extends VideoSystemException {
	constructor(fileName, lineNumber) {
		super("Error: The method needs a video parameter.", fileName, lineNumber);
		this.name = "VideoVideoSystemException";
	}
}

class VideoExistsVideoExistsException extends VideoSystemException {
	constructor(category, fileName, lineNumber) {
		super("Error: The video exists in the category '" + category.title + "'.", fileName, lineNumber);
		this.name = "VideoExistsVideoSystemException";
	}
}

class VideoNotExistsVideoSystemException extends VideoSystemException {
	constructor(category, fileName, lineNumber) {
		let message = (!category) ? "Error: The video doesn't exist." : 
			"Error: The video doesn't exist in the category '" + category.title;
		super(message, fileName, lineNumber);
		this.name = "VideoNotExistsVideoSystemException";
	}
}

class VideoBelongsDifferentAuthorSystemException extends VideoSystemException {
	constructor(fileName, lineNumber) {
		super("Error: the video belongs to another author", fileName, lineNumber);
		this.name = "VideoBelongsDifferentAuthorSystemException";
	}
}

let VideoSystem = (function () { //La función anónima devuelve un método getInstance que permite obtener el objeto único
	let instantiated; //Objeto con la instancia única VideoSystem

	function init() { //Inicialización del Singleton

		//Declaración de la clase VideoSystem
		class VideoSystem {

			#name = "Anonimous";
			/* Definición del atributo authors como array para contener todos los actores/actrices de las producciones. */
			#actors = []; //array con los actores/actrices.
			/* Definición del atributo directors como array para contener todas los directores de las producciones. */
			#directors = []; //array con los directores.
			/* Definición del atributo categories como array para contener todas las categorías de las producciones. */
			#categories = []; //array de categorías.
			/* Definición del atributo production con las producciones de las producciones */
			#production = []; //array con las producciones.
			/* Definición del atributo user con los usuarios que tengan acceso */
			#users = []; //array con los usuarios.

			//Declaración de funciones privadas
			//Dado un actor, devuelve la posición de ese actor en el array de actores o -1 si no lo encontramos.
			//Hemos elegido comparar por contenido no por referencia.
			#getActorsPosition(actor) {
				if (!(actor instanceof Person)) {
					throw new ActorVideoSystemException();
				}

				function compareElements(element) {
					return (element.actor.nickname === actor.nickname)
				}

				return this.#actors.findIndex(compareElements);
			}

			//Dado una categoría, devuelve la posición de esa categoría en el array de categorías o -1 si no lo encontramos.
			//Hemos elegido comparar por contenido no por referencia.
			#getCategoryPosition(category) {
				if (!(category instanceof Category)) 
					throw new CategoryVideoSystemException();
			

				function compareElements(element) {
					return (element.category.title === category.title)
				}

				return this.#categories.findIndex(compareElements);
			}

			//Dado un usuario, devuelve la posición de ese usuario en el array de usuarios o -1 si no lo encontramos.
			//Hemos elegido comparar por contenido no por referencia.
			#getUsersPosition(user) {
				if (!(user instanceof User)) {
					throw new UserVideoSystemException();
				}

				function compareElements(element) {
					return (element.user.username === user.username)
				}

				return this.#users.findIndex(compareElements);
			}

			//Dado un director, devuelve la posición de ese director en el array de director o -1 si no lo encontramos.
			//Hemos elegido comparar por contenido no por referencia.
			#getProductionPosition(production) {
				if (!(production instanceof Production)) {
					throw new ProductionVideoSystemException();
				}

				function compareElements(element) {
					return (element.production.title === production.title)
				}

				return this.#production.findIndex(compareElements);
			}

			//Dado una produccion, devuelve la posición de esa produccion en el array de produccion o -1 si no lo encontramos.
			//Hemos elegido comparar por contenido no por referencia.
			#getDirectorsPosition(director) {
				if (!(director instanceof Person)) {
					throw new DirectorVideoSystemException();
				}

				function compareElements(element) {
					return (element.director.nickname === director.nickname)
				}

				return this.#directors.findIndex(compareElements);
			}


			/* Definición del atributo name */
			get name() {
				return this.#name;
			}
			set name(name = "Anonimous") {
				name = name.trim();
				if (name === 'undefined' || name === 'Anon') throw new EmptyValueException("name");
				this.#name = name;
			}

			/*Users */
			//Devuelve un iterator de los usuarios
			get users() {
				let nextIndex = 0;
				// referencia para habilitar el closure en el objeto. En el generador se pierde la referencia this, por lo que hay que guardarla como closure
				let array = this.#users;
				// Los getter no admiten generadores, deben devolver un objeto iterable. [Symbol.iterator]() puede ser generador.
				return {
				  * [Symbol.iterator](){
					// Recorremos todos los usuarios
					for (let i = 1; i < array.length; i++){
					  yield array[i].users;
					}
				  }
				}			  
			}

			//Añade un nuevo usuario 
			addUsers(user) {
				if (!(user instanceof User)) {
					throw new UserVideoSystemException();
				}
				// Trabaja con un array de objetos User
				let position = this.#getUsersPosition(user);
				if (position === -1) {
					this.#users.push({
						username:user,
					});
				} else {
					throw new UserExistsVideoSystemException();
				}

				return this;
			}

			//Elimina un nuevo usuario
			removeUser(user) {
				if (!(user instanceof User)) {
					throw new UserVideoSystemException();
				}
				// Recuperamos la posición del usuario en el array.
				let position = this.#getUsersPosition(user);
				if (position !== -1) {
					if (user.username !== this.#users.username) {	
						this.#users.splice(position, 1);
					}
				} else {
					throw new UserNotExistsVideoSystemException();
				}
				return this.#users.length;
			}

			/*Directores */
			//Devuelve un iterator de los directores
			get directors() {
				let nextIndex = 0;
				// referencia para habilitar el closure en el objeto. En el generador se pierde la referencia this, por lo que hay que guardarla como closure
				let array = this.#directors;
				// Los getter no admiten generadores, deben devolver un objeto iterable. [Symbol.iterator]() puede ser generador.
				return {
				  * [Symbol.iterator](){
					// Recorremos todos los directores
					for (let i = 1; i < array.length; i++){
					  yield array[i].directors;
					}
				  }
				}			  
			}

			//Añade un nuevo director 
			addDirector(director) {
				if (!(director instanceof Person)) {
					throw new DirectorVideoSystemException();
				}
				// Trabaja con un array de objetos director
				let position = this.#getDirectorsPosition(director);
				if (position === -1) {
					this.#directors.push({
						nickname:director,
					});
				} else {
					throw new DirectorExistsVideoSystemException();
				}

				return this;
			}

			//Elimina un nuevo director
			removeDirector(director) {
				if (!(director instanceof Person)) {
					throw new DirectorVideoSystemException();
				}
				// Recuperamos la posición del director en el array.
				let position = this.#getDirectorsPosition(director);
				if (position !== -1) {
					if (director.nickname !== this.#directors.nickname) {	
						this.#directors.splice(position, 1);
					}
				} else {
					throw new DirectorNotExistsVideoSystemException();
				}
				return this.#directors.length;
			}

			/*Production */
			//Devuelve un iterator de las production
			get productions() {
				let nextIndex = 0;
				// referencia para habilitar el closure en el objeto. En el generador se pierde la referencia this, por lo que hay que guardarla como closure
				let array = this.#production;
				// Los getter no admiten generadores, deben devolver un objeto iterable. [Symbol.iterator]() puede ser generador.
				return {
				  * [Symbol.iterator](){
					// Recorremos todos los directores
					for (let i = 1; i < array.length; i++){
					  yield array[i].production;
					}
				  }
				}			  
			}

			//Añade una nueva prodccion 
			addProduction(production) {
				if (!(production instanceof Production)) {
					throw new ProductionVideoSystemException();
				}
				// Trabaja con un array de objetos produccion
				let position = this.#getProductionPosition(production);
				if (position === -1) {
					this.#production.push({
						title:production,
					});
				} else {
					throw new ProductionExistsVideoSystemException();
				}

				return this;
			}

			//Elimina una nueva produccion
			removeProduction(production) {
				if (!(production instanceof Production)) {
					throw new ProductionVideoSystemException();
				}
				// Recuperamos la posición de la produccion en el array.
				let position = this.#getProductionPosition(production);
				if (position !== -1) {
					if (production.title !== this.#production.title) {	
						this.#production.splice(position, 1);
					}
				} else {
					throw new ProductionNotExistsVideoSystemException();
				}
				return this.#production.length;
			}

			/*Actores */
			//Devuelve un iterator de los actors
			get actors() {
				let nextIndex = 0;
				// referencia para habilitar el closure en el objeto. En el generador se pierde la referencia this, por lo que hay que guardarla como closure
				let array = this.#actors;
				// Los getter no admiten generadores, deben devolver un objeto iterable. [Symbol.iterator]() puede ser generador.
				return {
				  * [Symbol.iterator](){
					// Recorremos todos los actors 
					for (let i = 1; i < array.length; i++){
					  yield array[i].actors;
					}
				  }
				}			  
			}

			//Añade un nuevo autor al gestor
			addActor(actor) {
				if (!(actor instanceof Person)) {
					throw new ActorVideoSystemException();
				}
				// Trabaja con un array de objetos Author
				let position = this.#getUsersPosition(actor);
				if (position === -1) {
					this.#actors.push({
						name:actor,
						lastname1: ""
					});
				} else {
					throw new ActorExistsVideoSystemException();
				}

				return this;
			}

			//Elimina un nuevo autor del gestor
			removeActor(actor) {
				if (!(actor instanceof Person)) {
					throw new ActorVideoSystemException();
				}
				// Recuperamos la posición del actor en el array.
				let position = this.#getActorsPosition(actor);
				if (position !== -1) {
					if (actor.name !== this.#actors.name) {	
						this.#actors.splice(position, 1);
					} else {
						throw new DefaultAuthorVideoSystemException();
					}
				} else {
					throw new ActorNotExistsVideoSystemException();
				}
				return this.#actors.length;
			}

			/*Categorias */
			//Devuelve un iterator de las categorias
			get categories() {
				let nextIndex = 0;
				// referencia para habilitar el closure en el objeto
				let array = this.#categories;
				return {
				  * [Symbol.iterator](){
					for (let i = 0; i < array.length; i++){
						yield array[i].category;
					}  
				  }
				}			  
			}

			//Añade una categoria al video 
			addCategory(category) {
				if (!(category instanceof Category)) {
					throw new CategoryVideoSystemException();
				}
				let position = this.#getCategoryPosition(category);
				if (position === -1) {
					// Añade objeto literal con una propiedad para la categoría
					this.#categories.push(
						{
							category: category,
							description: ""
						}
					);
				} else {
					throw new CategoryExistsVideoSystemException();
				}

				return this;
			}




			
		}

		let instance = new VideoSystem();//Devolvemos el objeto VideoSystem para que sea una instancia única.
		Object.freeze(instance);
		return instance;
	} //Fin inicialización del Singleton
	return {
		// Devuelve un objeto con el método getInstance
		getInstance: function () {
			if (!instantiated) { //Si la variable instantiated es undefined, priemera ejecución, ejecuta init.
				instantiated = init(); //instantiated contiene el objeto único
			}
			return instantiated; //Si ya está asignado devuelve la asignación.
		}
	};
})();

export {BaseException,
	InvalidAccessConstructorException,
	EmptyValueException,
	ParameterValidationException,
	InvalidValueException,
	AbstractClassException };
export {Coords, User, Person , Production , Movie , Serie , Category, Resource};
export {VideoSystemException ,
	ActorVideoSystemException  ,
	ActorExistsVideoSystemException ,
	ActorNotExistsVideoSystemException,
	UserVideoSystemException ,
	UserExistsVideoSystemException ,
	UserNotExistsVideoSystemException ,
	DirectorVideoSystemException,
	DirectorExistsVideoSystemException,
	DirectorNotExistsVideoSystemException,
	ProductionVideoSystemException,
	ProductionExistsVideoSystemException,
	ProductionNotExistsVideoSystemException,
	CategoryVideoSystemException ,
	CategoryExistsVideoSystemException ,
	CategoryNotExistsVideoSystemException ,
	VideoVideoSystemException ,
	VideoNotExistsVideoSystemException ,
	VideoBelongsDifferentAuthorSystemException };

export default VideoSystem;

