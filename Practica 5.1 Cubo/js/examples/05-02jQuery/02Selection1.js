$(function(){
	let divExamples = document.getElementById('examples').children[13];
	let buttons = divExamples.getElementsByClassName('tab-pane')[1].getElementsByTagName('button');

	function testAttr(){
		let profile = $('.image img');
		$('#message').text(profile.attr('src')); // img/user.jpg
		profile.attr('src', 'https://via.placeholder.com/150.jpg?text=User1');

		$('#categories img').first().attr({
			src:'https://via.placeholder.com/258x172.jpg?text=Category1',
			title: 'Category1 Title',
			alt: 'Category1 Alt'
		});

		// Colecciones de objetos jQuery
		console.dir($('#message'));
		console.dir($('.image img'));
		console.dir($('#categories img'));
		console.dir($('#categories img').first())
	}
	buttons[0].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Método attr()');
		$$result.log('Cambiamos la imagen del perfil del usuario.');
		$$result.log('Mostramos su contenido en el banner.');
		$$result.log('Modificamos la primera imagen de las categorías.');
		testAttr();
	});

	function testGet(){
		let allElements = $('*');
		$$result.log('Número total de elmentos en la página (jQuery): ' + allElements.length);
		$$result.log('Número total de elmentos en la página (DOM): ' + allElements.get().length);
		console.dir(allElements);
		console.dir(allElements.get());
		let button = $('#button');
		$$result.log('Colección objeto button (jQuery): ' + button.length);
		$$result.log('Colección objeto button (DOM): ' + button.length);
		console.dir(button);
		console.dir(button.get());
	}

	buttons[1].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Método get()');
		testGet();
	});

	function testAttributeSelection(){
		let idElements = $('*[id]');
		$$result.log('Todos los elementos que tengan atributo id: ' + idElements.length);
		console.dir(idElements);
		let anchors1 = $('a[href="#"]');
		$$result.log('Todos los enlaces que tengan un valor "#" en su atributo href: ' + anchors1.length);
		console.dir(anchors1);
		let anchors2 = $('a[href!="#"]');
		$$result.log('El contrario, todos los enlaces que no tengan un valor "#": ' + anchors2.length);
		console.dir(anchors2);
		let jpg = $('img[src$=".jpg"]');
		$$result.log('Todas las imágenes que tengan extensión jpg, es decir, terminen en jpg: ' + jpg.length);
		console.dir(jpg);
		let alt = $('img[alt^="Categoría"]');
		$$result.log('Todas las imágenes cuyo atributo alt comience por "Categoría": ' + alt.length);
		console.dir(alt);
		let alt2 = $('img[alt*="iles"]');
		$$result.log('Podemos seleccionar por contenido, por ejemplo, las imágenes que en su atributo alt contiene el texto "iles": ' + alt2.length);
		console.dir(alt2);
		let alt3 = $('img[alt~="iles"]');
		$$result.log('Aunque también podemos hacer que sea la palabra completa: ' + alt3.length);
		console.dir(alt3);
	}

	buttons[2].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Selección de elementos por atributos');
		testAttributeSelection();
	});

	function testOrderSelection1(){
		$$result.logBold('first() y last()');
		$$result.log('Modificar la primera y última imagen de categorías.');
		$('#categories img').first().attr({
			src:'https://via.placeholder.com/258x172.jpg?text=First',
		});
		$('#categories img').last().attr({
			src:'https://via.placeholder.com/258x172.jpg?text=Last',
		});
	}

	buttons[3].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Selección de elementos por orden');
		testOrderSelection1();
	});

	function testOrderSelection2(){
		$$result.logBold('Pseudo-clases :first-child y :last-child');
		$$result.log('Añadimos borde a la primera y última categoría.');
		let firstCol = $('#categories div.row > div:first-child');
		let lastCol = $('#categories div.row > div:last-child');
		firstCol.css('border', '1px solid red');
		lastCol.css('border', '1px solid red');
	}

	buttons[4].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Selección de elementos por orden');
		testOrderSelection2();
	});

	function testOrderSelection3(){
		$$result.logBold('Pseudo-clases :first-of-type y :last-of-type');
		$$result.log('Añadimos borde a todas las listas que sean primer.');
		$$result.log('Cambiamos fondo a todos los botones que sean primer hijo.');
		$('ul:first-of-type').css('border', '1px solid red');
		$('button:first-of-type').css('background', 'red');
	}

	buttons[5].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Selección de elementos por orden');
		testOrderSelection3();
	});

	function testOrderSelection4(){
		$$result.logBold('Pseudo-clases :nth-child(n)y :nth-last-child(n)');
		$$result.log('Añadimos borde a Enlaces de Interés como segunda lista en el footer.');
		$$result.log('Añadimos borde rojo a su sengudo hijo.');
		$$result.log('Añadimos borde azul a su cuarto hijo.');
		$('footer div.row div:nth-child(2)').css('border', '1px solid red');
		$('footer div.row div:nth-child(2) li:nth-child(2)').css('border', '1px solid red');
		$('footer div.row div:nth-child(2) li:nth-last-child(2)').css('border', '1px solid blue');
	}

	buttons[6].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Selección de elementos por orden');
		testOrderSelection4();
	});

	function testOrderSelection5(){
		$$result.logBold('Selección en lista de elementos');
		$$result.log('Borde verde de todos los elementos li, el tercer que aparezca en la página. Cabecera menú contacto.');
		$$result.log('Borde en menú de servicios menores de 2 y mayores de 2.');
		let li3 = $('li:eq(3)');
		li3.css('border', '1px solid green');
		console.dir(li3);
		let serviceLt2 = $('footer div.row div:nth-child(3) li:lt(2)');
		let serviceGt2 = $('footer div.row div:nth-child(3) li:gt(2)');
		serviceLt2.css('border', '1px solid red');
		serviceGt2.css('border', '1px solid blue');
		console.dir(serviceLt2);
		console.dir(serviceGt2);
	}

	buttons[7].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Selección de elementos por orden');
		testOrderSelection5();
	});


	function testOrderSelection6(){
		$$result.logBold('Selección pares e impares');
		$$result.log('En Enlaces de Interés seleccionamos pares en rojo e impares en azul.');
		$('footer div.row div:nth-child(2) li a').even().css('border', '1px solid red');
		$('footer div.row div:nth-child(2) li a').odd().css('border', '1px solid blue');
	}

	buttons[8].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Selección de elementos por orden');
		testOrderSelection6();
	});
});

