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

class AuthorVideoSystemException extends VideoSystemException {
	constructor(fileName, lineNumber) {
		super("Error: The method needs a Author parameter.", fileName, lineNumber);
		this.name = "AuthorVideoSystemException";
	}
}

class AuthorExistsVideoSystemException extends VideoSystemException {
	constructor(fileName, lineNumber) {
		super("Error: The author exists in the video system.", fileName, lineNumber);
		this.name = "AuthorExistsVideoSystemException";
	}
}

class AuthorNotExistsVideoSystemException extends VideoSystemException {
	constructor(fileName, lineNumber) {
		super("Error: The author doesn't exist in the video system.", fileName, lineNumber);
		this.name = "AuthorNotExistsVideoSystemException";
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
					throw new AuthorVideoSystemException();
				}

				function compareElements(element) {
					return (element.actor.nickname === actor.nickname)
				}

				return this.#actors.findIndex(compareElements);
			}

			//Dado una categoría, devuelve la posición de esa categoría en el array de categorías o -1 si no lo encontramos.
			//Hemos elegido comparar por contenido no por referencia.
			#getCategoryPosition(category) {
				if (!(category instanceof Category)) {
					throw new CategoryVideoSystemException();
				}

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
			//Devuelve un iterator de los actors
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
				let position = this.#getActorsPosition(user);
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
				// Recuperamos la posición del actor en el array.
				let position = this.#getActorsPosition(user);
				if (position !== -1) {
					if (user.username !== this.#user.username) {	
						this.#users.splice(position, 1);
					}
				} else {
					throw new UserNotExistsVideoSystemException();
				}
				return this.#users.length;
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
					throw new AuthorVideoSystemException();
				}
				// Trabaja con un array de objetos Author
				let position = this.#getUsersPosition(actor);
				if (position === -1) {
					this.#actors.push({
						name:actor,
						lastname1: ""
					});
				} else {
					throw new AuthorExistsVideoSystemException();
				}

				return this;
			}

			//Elimina un nuevo autor del gestor
			removeActor(actor) {
				if (!(actor instanceof Person)) {
					throw new AuthorVideoSystemException();
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
					throw new AuthorNotExistsVideoSystemException();
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
	AuthorVideoSystemException ,
	AuthorExistsVideoSystemException ,
	AuthorNotExistsVideoSystemException ,
	UserVideoSystemException ,
	UserExistsVideoSystemException ,
	UserNotExistsVideoSystemException ,
	CategoryVideoSystemException ,
	CategoryExistsVideoSystemException ,
	CategoryNotExistsVideoSystemException ,
	DefaultCategoryVideoSystemException ,
	VideoVideoSystemException ,
	VideoNotExistsVideoSystemException ,
	VideoBelongsDifferentAuthorSystemException };

export default VideoSystem;

