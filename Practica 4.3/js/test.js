 "use strict";
 import {BaseException,
	InvalidAccessConstructorException,
	EmptyValueException,
	ParameterValidationException,
	InvalidValueException,
	AbstractClassException } from './VideoSystem.js';
import {Coords, User, Person , Production , Movie , Serie , Category, Resource} from './VideoSystem.js';
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
	VideoBelongsDifferentAuthorSystemException } from './VideoSystem.js';

import VideoSystem from './VideoSystem.js';


/* 
Testeo del video system.
*/
function test(){

	function testCoords(){
		console.log ("--- Testeo Objeto Coords. --- ");
		//Coordenadas c1: -90, 90
		console.log("Coordenadas c1: " + c1.latitude + ", " + c1.longitude);
		console.log("Coordenadas c1: " + c1.getSexagesimalLatitude());
		console.log("Coordenadas c1: " + c1.getSexagesimalLongitude());

		try {
			let c2 = new Coords(-120,40);
			console.log("Coordenadas c2: " + c2.latitude + ", " + c2.longitude);
		} catch(err) {
			console.log("Error: " + err.toString());
		}

		try {
			let c3 = new Coords(-90,190);
			console.log("Coordenadas c3: " + c3.latitude + ", " + c3.longitude);
		} catch(err) {
			console.log("Error: " + err.toString());
		}	
		console.log ("--- Fin: Testeo Objeto Coords. --- ");
		console.log("");
		console.log("");
	}

	function testPerson(){
		console.log ("--- Testeo Objeto Person. --- ");

		console.log(a1.toString());

		try {
			let aN = new Person("laura",12321);		
			console.log(aN.toString());
		} catch(err) {

			console.log("Error: " + err.toString());
		}
	
		console.log(a2.toString());
		console.log ("--- Fin: Testeo Objeto Person. --- ");
		console.log("");
		console.log("");		
	}

	function testProduction(){
		console.log ("--- Testeo Objeto Production. --- ");

		console.log(m1.toString());
		console.log(s1.toString());

		try {
			let m = new Production();		
			console.log(m.toString());
		} catch(err) {

			console.log("Error: " + err.toString());
		}
	
		console.log ("--- Fin: Testeo Objeto Production. --- ");
		console.log("");
		console.log("");		
	}

	function testUser(){
		console.log ("--- Testeo Objeto User. --- ");

		console.log(u1.toString());
		console.log(u2.toString());

		try {
			let u = new User("manolito", "adasda", "password");		
			console.log(u.toString());
		} catch(err) {
			console.log("Error: " + err.toString());
		}
	
		console.log ("--- Fin: Testeo Objeto User. --- ");
		console.log("");
		console.log("");		
	}

	function testCategory(){
		console.log ("--- Testeo Category. --- ");
		//Categoría cat1: Category: Categoría 1(Descripción categoría 1)
		console.log ("Categoría cat1: " + cat1.toString());
		//Categoría cat2: Category: Categoría 2(Descripción categoría 2)
		console.log ("Categoría cat2: " + cat2.toString());
		console.log ("--- Fin: Testeo Category. --- ");
		console.log("");
		console.log("");				
	}

	function showCategories(categories){
		console.log("Categorías: ");
		for (let cat of categories){
			console.log("Categoría: " + cat.title);
		} 		
	}


	let c1 = new Coords(-89.654654,-89.23323);
	testCoords();


	let a1 = new Person("pepito","perez", 27-11-1960);
	let a2 = new Person("lolita","martin", 27-11-1960);
	let a3 = new Person("clarita","lopez", 27-11-1960);
	testPerson();

	let m1 = new Movie("Cars", "descripción película 1");
	let s1 = new Serie("The last of us", "descripcion serie 1", "cuatro");
	testProduction();

	let u1 = new User("carlitos", "asda@gmail.com", "pass");
	let u2 = new User("federico", "asda@gmail.com", "pass");
	testUser();

	let cat1 = new Category("Categoría 1");
	cat1.description = "Descripción categoría 1";
	let cat2 = new Category("Categoría 2");
	cat2.description = "Descripción categoría 2";
	let cat3 = new Category("Categoría 3");
	cat3.description = "Descripción categoría 3";	
	testCategory();

	console.log ("--- Testeo VideoSystem. ---");
	let video = VideoSystem.getInstance();
	video.name = "Reproductor de videos";

	console.log ("Instancia VideoSystem: " + video.name);			

	video.addUsers(u1);
	video.addUsers(u2);

	

		
} 
window.onload = test;

