"use strict";
import {BaseException,
	InvalidAccessConstructorException,
	EmptyValueException,
	ParameterValidationException,
	InvalidValueException,
	AbstractClassException } from './BaseException.js';

// Objeto Coords para definir coordenadas.
class Coords {
	#latitude;
	#longitude;

	constructor(latitude = 0, longitude = 0){

		latitude = typeof latitude !== 'undefined' ? Number(latitude).valueOf() : 0;
		if (Number.isNaN(latitude)  || latitude < -90 || latitude > 90) 
			throw new InvalidValueException("latitude", latitude);
		longitude = typeof longitude !== 'undefined' ? Number(longitude).valueOf() : 0;
		if (Number.isNaN(longitude)  || longitude < -180 || longitude > 180) 
			throw new InvalidValueException("longitude", longitude);
	
		this.#latitude = latitude;
		this.#longitude = longitude;		
	}

	get latitude(){
		return this.#latitude;
	}
	set latitude(value){
		value = typeof value !== 'undefined' ? Number(value).valueOf() : 0;
		if (Number.isNaN(value)  || value < -90 || value > 90) 
			throw new InvalidValueException("latitude", value);
		this.#latitude = value;
	}

	get longitude(){
		return this.#longitude;
	}
	set longitude(value){
		value = typeof value !== 'undefined' ? Number(value).valueOf() : 0;
		if (Number.isNaN(value)  || value < -180 || value > 180) 
			throw new InvalidValueException("longitude", value);
		this.#longitude = value;
	}

	getSexagesimalLatitude(){
		let direction = this.latitude >= 0 ? "N" : "S";
		let latitude = Math.abs(this.latitude);
		let grades =  Math.floor (latitude);
		let tmpMinutes = (latitude - grades) * 60;
		let minutes = Math.floor (tmpMinutes);
		let tmpSeconds = (tmpMinutes - minutes) * 60;
		let seconds = Math.round (tmpSeconds);
	
		return grades + "°" + minutes + "'" + seconds + "''" + direction; 	
	} 


	getSexagesimalLongitude(){	
		let direction = this.longitude >= 0 ? "E" : "W";
		let longitude = Math.abs(this.longitude);
		let grades =  Math.floor (longitude);
		let tmpMinutes = (longitude - grades) * 60;
		let minutes = Math.floor (tmpMinutes);
		let tmpSeconds = (tmpMinutes - minutes) * 60;
		let seconds = Math.round (tmpSeconds);
	
		return grades + "°" + minutes + "'" + seconds + "''" + direction; 
	}
	
}

// Objeto Person
class Person {
	#name;
	#lastname1;
	#lastname2;
	#born;
	#picture;

	constructor(name, lastname1, born){
		name = name.trim();
		lastname1 = lastname1.trim();
		born = born.trim();
	
		if (name === 'undefined' || name === '') throw new EmptyValueException("name");
		if (/^[a-zA-Z][a-zA-Z0-9_\-]*(\.[a-zA-Z0-9_\-]*)*[a-zA-Z0-9]$/.test (name) !== true)
			throw new InvalidValueException("name", name);		
	
		if (lastname1 === 'undefined' || lastname1 === '') throw new EmptyValueException("lastname1");
		if (/^[a-zA-Z][a-zA-Z0-9_\-]*(\.[a-zA-Z0-9_\-]*)*[a-zA-Z0-9]$/.test (lastname1) !== true)
			throw new InvalidValueException("lastname1", lastname1);	

		if (born === 'undefined' || born === '') throw new EmptyValueException("born");
		if (!born instanceof Date) throw new InvalidValueException("born", value);

		this.#name = name;
		this.#lastname1 = lastname1;
		this.#born = born;
	}

	get name() {
		return this.#name;
	}
	set name(value){
		if (value === 'undefined' || value === '') throw new EmptyValueException("name");
		if (/^[a-z][a-z0-9_\-]*(\.[a-z0-9_\-]*)*[a-z0-9]$/.test (value) !== true)
			throw new InvalidValueException("name", value);		
		this.#name = value;
	}		

	get lastname1(){
		return this.#lastname1;
	}
	set lastname1(value){
		if (value === 'undefined' || value === '') throw new EmptyValueException("lastname1");	
		if (/^[a-z][a-z0-9_\-]*(\.[a-z0-9_\-]*)*[a-z0-9]\@[a-z0-9]+\.[a-z]{2,3}$/.test (value) !== true)
			throw new InvalidValueException("lastname1", value);		
		this.#lastname1 = value;
	}	
	
	get lastname2(){
		return this.#lastname2;
	}
	set lastname2(value){
		if (value === 'undefined' || value === '') throw new EmptyValueException("lastname2");	
		if (/^[a-z][a-z0-9_\-]*(\.[a-z0-9_\-]*)*[a-z0-9]\@[a-z0-9]+\.[a-z]{2,3}$/.test (value) !== true)
			throw new InvalidValueException("lastname2", value);		
		this.#lastname2 = value;
	}

	get born(){
		return this.#born;
	}
	set born(value){
		if (value === 'undefined' || value === '') throw new EmptyValueException("born");
		if (!value instanceof Date) throw new InvalidValueException("born", value);		
		this.#born = value;
	}

	get picture(){
		return this.#picture;
	}
	set picture(value){
		if (value === 'undefined' || value == null) throw new EmptyValueException("picture");	
		if (!value instanceof Production) throw new InvalidValueException("picture", value);		
		this.#picture = value;
	}	
	
	toString(){	
		return "Name: " + this.name + "(" + this.lastname1 + this.lastname2 + this.born + ")"; 
	}	
}

// Objeto User
class User {
	#username;
	#email;
	#password;

	constructor(username, email, password){
		username = username.trim();
		email = email.trim();
		password = password.trim();
	
		if (username === 'undefined' || username === '') throw new EmptyValueException("username");
		if (/^[a-zA-Z][a-zA-Z0-9_\-]*(\.[a-zA-Z0-9_\-]*)*[a-zA-Z0-9]$/.test (username) !== true)
			throw new InvalidValueException("username", username);		
	
		if (email === 'undefined' || email === '') throw new EmptyValueException("email");	
		if (/^[a-zA-Z][a-zA-Z0-9_\-]*(\.[a-zA-Z0-9_\-]*)*[a-zA-Z0-9]\@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test (email) !== true)
			throw new InvalidValueException("email", email);
			
		if (password === 'undefined' || password === '') throw new EmptyValueException("password");	
	
		this.#username = username;
		this.#email = email;
		this.#password = password;
	}

	get username() {
		return this.#username;
	}
	set username(value){
		if (value === 'undefined' || value === '') throw new EmptyValueException("username");		
		this.#username = value;
	}		

	get email(){
		return this.#email;
	}
	set email(value){
		if (value === 'undefined' || value === '') throw new EmptyValueException("email");	
		if (/^[a-z][a-z0-9_\-]*(\.[a-z0-9_\-]*)*[a-z0-9]\@[a-z0-9]+\.[a-z]{2,3}$/.test (value) !== true)
			throw new InvalidValueException("email", value);		
		this.#email = value;
	}			

	get password(){
		return this.#password;
	}
	set password(value){
		if (value === 'undefined' || value === '') throw new EmptyValueException("password");	
		this.#password = value;
	}	
	
	toString(){	
		return "User: " + this.username + "(" + this.email + this.password +")"; 
	}	
}

// Objeto Category.
class Category {
	#name;	
	#description;

	constructor(name = "Anon"){
		name = name.trim();
		if (name === 'undefined' || name === 'Anon') throw new EmptyValueException("name");					
	
		this.#name = name;	
		this.#description = "";
	}

	get name(){
		return this.#name;
	}
	set name(name = "Anon"){
		name = name.trim();
		if (name === 'undefined' || name === 'Anon') throw new EmptyValueException("name");					
		this.#name = name;
	}		

	get description(){
		return this.#description;
	}
	set description(value){
		if (value === 'undefined') throw new EmptyValueException("description");	
		this.#description = value;
	}		

	toString(){	
		return "Category: " + this.name + " (" + this.description + ")"; 
	}
	
}

// Objeto Resource.
class Resource {
	#duration;	
	#link;

	constructor(duration = "Anon", link = ""){
		duration = duration.trim();
		link = link.trim();

		if (duration === 'undefined' || duration === '') throw new EmptyValueException("duration");					
		if (link === 'undefined') throw new EmptyValueException("link");

		this.#duration = duration;	
		this.#link = link;
	}

	get duration(){
		return this.#duration;
	}
	set duration(duration = "Anon"){
		duration = duration.trim();
		if (duration === 'undefined' || duration === 'Anon') throw new EmptyValueException("duration");					
		this.#duration = duration;
	}		

	get link(){
		return this.#link;
	}
	set link(value){
		if (value === 'undefined') throw new EmptyValueException("link");	
		this.#link = value;
	}		

	toString(){	
		return "Resource: "+ this.duration + " (" + this.link + ")"; 
	}
	
}

//Objeto Production. Es abstracto
class Production {
	#title;
	#nationality;
	#publication;
	#synopsis;
	#image;

	constructor (title, publication){
		//Comprobación para que Production sea clase abstracta.
		if ((new.target === Production)) {
			throw new AbstractClassException("Production");
		}		

		title = title.trim();
		publication = publication.trim();
	
		if (title === 'undefined' || title === '') throw new EmptyValueException("title");

		if (publication === 'undefined' || publication === '') throw new EmptyValueException("url");		
		if (!publication instanceof Date) throw new InvalidValueException("publication", value);

		this.#title = title;
		this.#publication = publication;	
	}

	get title(){
		return this.#title;
	}
	set title(value){
		if (value === 'undefined' || value === '') throw new EmptyValueException("title");
		this.#title = value;
	}		

	get image(){
		return this.#image;
	}
	set image(value){
		if (value === 'undefined' || value === '') throw new EmptyValueException("image");	
		this.#image = value;
	}		

	get nationality(){
		return this.#nationality;
	}
	set nationality(value){
		if (value === 'undefined' || value == null) throw new EmptyValueException("nationality");	
		this.#nationality = value;
	}	
	
	get publication(){
		return this.#publication;
	}
	set publication(value){
		if (value === 'undefined') throw new EmptyValueException("publication");	
		this.#publication = value;
	}	

	get synopsis(){
		return this.#synopsis;
	}
	set synopsis(value){
		if (value === 'undefined') throw new EmptyValueException("synopsis");	
		this.#synopsis = value;
	}		

	toString(){	
		return this.constructor.name + ": " + this.title + "(" + this.nationality + "). " + this.synopsis; 
	}
}

// Objeto Movie herencia de Production
class Movie extends Production {
	#resource;
	#locations;
	#type = "movie";

	constructor(title, synopsis){
		super(title, synopsis);
	}

	get resource(){
		return this.#resource;
	}
	set resource(value){
		if (value === 'undefined') throw new EmptyValueException("resource");	
		this.#resource = value;
	}

	get locations(){
		return this.#locations;
	}
	set locations(value){
		if (value === 'undefined') throw new EmptyValueException("locations");	
		this.#locations = value;
	}

	toString(){	
		return this.title + "(" + this.synopsis + "). "  + "Tipo: "+this.#type; 
	}
}

// Objeto Serie herencia de Production
class Serie extends Production {
	#resource;
	#locations;
	#seasons;
	#type = "serie";

	constructor(title, synopsis, seasons){
		super(title, synopsis);
		seasons = seasons.trim();
		if (seasons === 'undefined') throw new EmptyValueException("seasons");					
	
		this.#seasons = seasons;
	}

	get resource(){
		return this.#resource;
	}
	set resource(value){
		if (value === 'undefined') throw new EmptyValueException("resource");	
		this.#resource = value;
	}

	get locations(){
		return this.#locations;
	}
	set locations(value){
		if (value === 'undefined') throw new EmptyValueException("locations");	
		this.#locations = value;
	}

	get seasons(){
		return this.#seasons;
	}
	set seasons(value){
		if (value === 'undefined') throw new EmptyValueException("seasons");	
		this.#seasons = value;
	}

	toString(){	
		return this.title + "(" + this.synopsis + "). "  + "Tipo: "+this.#type + " Temporadas: "+ this.seasons; 
	}
}



export {Coords, User, Person , Production , Movie , Serie , Category, Resource};