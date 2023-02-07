$(function(){
	let divExamples = document.getElementById('examples').children[13];
	let buttons = divExamples.getElementsByClassName('tab-pane')[2].getElementsByTagName('button');

	function testMultipleSelection1(){
		$$result.logBold('Iteración propiedad length');
		$$result.log('Modificamos textos enlaces del footer.');
		let liElements = $('footer div.row li');
		for (let i = 0; i < liElements.length; i++){
		 liElements.get(i).innerHTML = "Elemento: " + i + " de " + liElements.length;
		}
	}

	function testMultipleSelection2(){
		$$result.logBold('Iteración con transformación DOM en jQuery');
		$$result.log('Modificamos textos enlaces del footer.');
		let liElements = $('footer div.row li');
		for (let i = 0; i < liElements.length; i++){
			$(liElements[i]).html("Tradicional:" + i + " de " + liElements.length);
		}
	}

	function testMultipleSelection3(){
		$$result.logBold('Iteración for..of');
		$$result.log('Modificamos textos enlaces del footer.');
		let liElements = $('footer div.row li');
		let i = 0;
		for (let element of liElements){
			$(element).html("For-of: " + i++ + " de " + liElements.length);
		}
	}

	function testMultipleSelection4(){
		$$result.logBold('Iteración con método each() y función callback');
		$$result.log('Modificamos textos enlaces del footer.');
		let liElements = $('footer div.row li');
		liElements.each(function(index){
			$(this).html("Each: " + index + " de " + liElements.length);
		});
	}

	buttons[0].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Selección múltiple');
		testMultipleSelection1();
		testMultipleSelection2();
		testMultipleSelection3();
		testMultipleSelection4();
	});

	function testCssMethod(){
		$$result.logBold('Método css()');
		$$result.log('Modificamos textos enlaces del footer con borde azul.');
		/*
		// Método tradicional con DOM
		let liElements = $('footer div.row li');
		for (let li of liElements){
			li.style.border = "1px solid red";
		}
		*/
		let liElements = $('footer div.row li');
		liElements.css('border', '1px solid blue');

		$$result.log('Modificamos elementos heterogéneos en verde, cabecera e imágenes de categorías.');
		let othersElements = $('header div.row li, #categories img');
		othersElements.css('border', '1px solid green');

		$$result.logBold('Método index()');
		let images = $('#categories img');
		let img1 = $('#categories img:eq(1)');
		$$result.log('Posición de un elemento: ' + images.index(img1));
	}

	buttons[1].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Método css() modificación en colección');
		testCssMethod();
	});

	function testFilter(){
		$$result.log('Filtramos de todos los elementos i, los que tengan la clase .fa-angle-right.');
		$('i').filter('.fa-angle-right').css('border', '1px solid red');

		$$result.log('Columnas de tres espacios en el foorter.');
		$('footer div.row div').filter('.col-lg-3').css('border', '1px solid red');

		$$result.logBold('Filter con callback.');
		$$result.log('Imágenes en categorías primera o última.');
		let images = $('#categories img');
		images.filter(function (index){
			return (this === images.first().get(0) || this === images.last().get(0));
		}).attr({src:'https://via.placeholder.com/258x172.jpg?text=Filtrado1'})

		$$result.log('Resto de imágenes de categorías.');
		images.filter(function (index){
			return (index > 0 && index < images.length-1);
		}).attr({src:'https://via.placeholder.com/258x172.jpg?text=Filtrado2'})

		$$result.logBold('Método contains()');
		$$result.log('Añadimos borde en el contenedor del botón ver artículo.');
		let containers = $('.container');
		let button = $('#button').get(0);
		containers.filter(function(){
			return $.contains(this, button);
		}).css('border', '1px solid red');
	}

	buttons[2].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Método filter()');
		testFilter();
	});

	function testNot(){
		$$result.log('Filtramos de todos los elementos i que no tengan asociado la clase .fa-angle-right.');
		$('i').not('.fa-angle-right').css('border', '1px solid red');

		$$result.log('Añadimos borde en los contenedores que no incluyan el botón ver artículo.');
		let containers = $('.container');
		let button = $('#button').get(0);
		containers.not(function(){
			return $.contains(this, button);
		}).css('border', '1px solid red');
	}

	buttons[3].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Método not()');
		testNot();
	});

	function testHas(){
		$$result.log('Añadimos borde en el contenedor del botón ver artículo.');
		let containers = $('.container');
		let button = $('#button').get(0);
		containers.has(button).css('border', '1px solid red');
	}

	buttons[4].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Método has()');
		testHas();
	});

	function testMap(){
		$$result.log('Todos los identificadores de la página');
		let idElements = $('*[id]');
		let map = idElements.map(function (index){
			return this.id;
		});
		$$result.log(map.get().join(' '));
	}

	buttons[5].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Método map()');
		testMap();
	});

	function testSlice(){
		$$result.log('Selección de imágenes de categorías centrales');
		let images = $('#categories img');
		images = images.slice(1,images.length-1);
		images.attr({src:'https://via.placeholder.com/258x172.jpg?text=Slice'});
	}

	buttons[6].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Método slice()');
		testSlice();
	});

});

