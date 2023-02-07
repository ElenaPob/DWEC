$(function(){
	let divExamples = document.getElementById('examples').children[13];
	let buttons = divExamples.getElementsByClassName('tab-pane')[3].getElementsByTagName('button');

	function testAncestors1(){
		$$result.logBold('Método parent()');
		$$result.log('Borde rojo en la primera categoría y sus padres.');
		let img0 = $('#categories img:eq(0)');
		img0.parent().css('border', '1px solid red');
		img0.parent().parent().css('border', '1px solid red');
		img0.parent().parent().parent().css('border', '1px solid red');
	}

	buttons[0].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Selección de ancestros');
		testAncestors1();
	});

	function testAncestors2(){
		$$result.logBold('Método parents()');
		$$result.log('Borde azul en la segunda categoría y todos padres.');
		let img1 = $('#categories img:eq(1)');
		img1.parents().css('border', '1px solid blue');
	}

	buttons[1].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Selección de ancestros');
		testAncestors2();
	});

	function testAncestors2(){
		$$result.logBold('Método parentsUntil()');
		$$result.log('Borde verde en la tercera categoría hasta el contenedor de categorías.');
		let img2 = $('#categories img:eq(2)');
		img2.parentsUntil($('#categories')).css('border', '1px solid green');
	}

	buttons[2].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Selección de ancestros');
		testAncestors2();
	});

	function testAncestors3(){
		$$result.logBold('Método offsetParent()');
		$$result.log('Obtenemos el contenedor posicionado del botón Ver Artículo.');
		let button = $('#button');
		button.offsetParent().css('border', '10px solid red');
		$$result.logBold('Método closest()');
		$$result.log('Ancestro del botón que contenga la clase .container.');
		button.closest('.container').css('border', '10px solid blue');
	}

	buttons[3].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Selección de ancestros');
		testAncestors3();
	});

	function testDescendant(){
		$$result.logBold('Método children()');
		$$result.log('Bordes en Enlaces de Interés.');
		let links = $('#footer div.row div:nth-child(2) ul');
		links.children().css('border', '1px solid red');
		links.children().first().css('border', '1px solid blue');
		links.children().last().css('border', '1px solid green');

		$$result.logBold('Método find()');
		$$result.log('Imágenes en categorías.');
		let categories = $('#categories');
		categories.find('img').attr('src', 'https://via.placeholder.com/150.jpg?text=Find');

		$$result.log('Bordes en todas las filas de los contenedores.');
		let containers = $('.container');
		containers.find('.row').css('border', '1px solid red');
	}

	buttons[4].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Selección de ancestros');
		testDescendant();
	});

	function testDescendant(){
		$$result.logBold('Método children()');
		$$result.log('Bordes en Enlaces de Interés.');
		let links = $('#footer div.row div:nth-child(2) ul');
		links.children().css('border', '1px solid red');
		links.children().first().css('border', '1px solid blue');
		links.children().last().css('border', '1px solid green');

		$$result.logBold('Método find()');
		$$result.log('Imágenes en categorías.');
		let categories = $('#categories');
		categories.find('img').attr('src', 'https://via.placeholder.com/150.jpg?text=Find');

		$$result.log('Bordes en todas las filas de los contenedores.');
		let containers = $('.container');
		containers.find('.row').css('border', '1px solid red');
	}

	buttons[4].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Selección de ancestros');
		testDescendant();
	});

	function testDescendant(){
		$$result.logBold('Método siblings()');
		$$result.log('Bordes en hermanos de Servicio 3.');
		let li = $('#footer div.row div:nth-child(3) ul li:eq(2)');
		li.siblings().css('border', '1px solid red');

		$$result.logBold('Método nextAll()');
		$$result.log('Fondo rojo siguientes hermanos de Servicio 3.');
		li.nextAll().css('background', 'red');

		$$result.logBold('Método prevAll()');
		$$result.log('Fondo azul hermanos previos de Servicio 3.');
		li.prevAll().css('background', 'blue');

		$$result.logBold('Método next() y prev()');
		$$result.log('Fondo verde en hermanos de Servicio 3.');
		li.next().css('background', 'green');
		li.prev().css('background', 'green');

		$$result.logBold('Método nextUntil() y prevUntil()');
		$$result.log('Subrayado en hermanos de Servicio 3.');
		li.nextUntil('*:nth-child(5)').css('text-decoration', 'underline');
		li.prevUntil('*:nth-child(1)').css('text-decoration', 'underline');
	}

	buttons[5].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Selección de hermanos');
		testDescendant();
	});

});

