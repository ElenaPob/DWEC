(function (){
	let divExamples = document.getElementById('examples').children[12];
	let buttons = divExamples.getElementsByClassName('tab-pane')[4].getElementsByTagName('button');

	function testListenerV1(){
		let button = document.getElementById("button");
		button.onclick = function(){
			alert("Ejecución del manejador");
		}
	}

	buttons[0].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('onclick');
		$$result.log('Botón ver artículo');
		testListenerV1();
	});

	function testListenerV2(){
		let button = document.getElementById("button");
		button.onclick = function(){
			alert("Identificador: " + this.id);
		}
	}

	buttons[1].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('onclick con this');
		$$result.log('Botón ver artículo');
		testListenerV2();
	});

	function testListenerV3(){
		let button = document.getElementById("button");
		button.addEventListener("click", function(){
			console.log("Evento minúsculas.")
			this.classList.toggle("text-lowercase");
		})
		button.addEventListener("click", function(){
			console.log("Evento negrita.")
			this.classList.toggle("font-weight-bold");
		})
	}

	buttons[2].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('onclick addEventListener');
		$$result.log('Botón ver artículo');
		$$result.log('Cambio de negrita y minúsculas');
		testListenerV3();
	});

	function listenerExercise1(){
		let ul = document.querySelector('#footer div.row div:nth-child(2) ul');
		let input = document.createElement("input");
		input.type = "text";
		input.id = "new-link";
		input.placeholder = "Nuevo enlace";
		ul.parentElement.appendChild(input);

		let button = document.createElement("button");
		button.innerText = "Añadir";
		ul.parentElement.appendChild(button);

		button.addEventListener("click", function(){
			let input = document.getElementById("new-link");
			if (input.value.length > 4){
				let ul = document.querySelector('#footer div.row div:nth-child(2) ul');
				let li = document.createElement("li");
				ul.appendChild(li);
				let anchor = document.createElement("a");
				anchor.href = "#";
				li.appendChild(anchor);
				let i = document.createElement("i");
				i.classList.add("fas");
				i.classList.add("fa-angle-right");
				anchor.appendChild(i);
				let text = document.createTextNode(" " + input.value);
				anchor.appendChild(text);
			} else {
				alert ("La longitud debe ser de al menos 5 caracteres.");
			}
			input.value = "";
		})
	}

	buttons[3].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Ejercicio 1 input y button');
		$$result.log('Añade un elemento input y un button en los enlaces de interés. El botón debe recoger el texto del input, validar que tenga al menos cinco caracteres y añadirlo como enlace al listado.');
		listenerExercise1();
	});

	// Manejador de eventos
	function imageFullScreen(){
		if (this.requestFullscreen) {
			this.requestFullscreen();
		}
	}

	function listenerExercise2(){
		let categories = document.getElementById("categories");
		let images = categories.getElementsByTagName("img");
		for (let image of images){
			image.addEventListener("click", imageFullScreen);
		}
	}

	buttons[4].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Ejercicio 2: Categorías a pantalla completa');
		$$result.log('Añade un manejador de eventos para cada una de la sección de categorías, para que al cliquear en ellas se abra la imagen a tamaño de pantalla completo.');
		listenerExercise2();
	});

	function testRemoveEventListener(){
		let categories = document.getElementById("categories");
		let images = categories.getElementsByTagName("img");
		images[0].removeEventListener("click", imageFullScreen);
	}

	buttons[5].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Borrado de manejador imágenes de categoría');
		$$result.log('Eliminamos el manejador creado en el ejercicio 2.');
		testRemoveEventListener();
	});

})();

