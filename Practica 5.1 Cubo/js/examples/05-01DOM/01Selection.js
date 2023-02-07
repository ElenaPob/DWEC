(function (){
	let divExamples = document.getElementById('examples').children[12];
	let buttons = divExamples.getElementsByClassName('tab-pane')[0].getElementsByTagName('button');

	function testGetElementById(){
		let message = document.getElementById("message");
		console.dir(message);
		message.style.border = "2px solid red";
	}
	buttons[0].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Selección de un elemento por id');
		$$result.log('Seleccionamos texto cabecera y añadimos borde rojo.');
		testGetElementById();
	});

	function testQuerySelector(){
		document.querySelector('#message').style.background = "blue";
		document.querySelector('.navbar .account').style.background = "yellow";
		document.querySelector('li:first-child').style.background = "red";
		document.querySelector('li:last-child').style.background = "green";
		document.querySelector('li:nth-child(3)').style.background = "purple";

		let message = document.getElementById("footer");
		message.querySelector('li:first-child').style.background = "red";
		message.querySelector('li:last-child').style.background = "green";
		message.querySelector('li:nth-child(3)').style.background = "purple";
	}

	buttons[1].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Selección de un elemento por selector');
		$$result.logBold('Desde la raíz');
		$$result.log('Seleccionamos el primer elemento que cumple el selector especificado.');
		$$result.log('#message' + ' blue');
		$$result.log('.navbar .account' + ' yellow');
		$$result.log('li:first-child' + ' red');
		$$result.log('li:last-child' + ' green');
		$$result.log('li:nth-child(3)' + ' purple');
		$$result.logBold('Desde footer');
		$$result.log('li:first-child' + ' red');
		$$result.log('li:last-child' + ' green');
		$$result.log('li:nth-child(3)' + ' purple');

		testQuerySelector();
	});

	function testQuerySelectorAll(){
		let ul = document.querySelector('#footer .footer-links ul');
		let itemList = ul.querySelectorAll("li a");
		itemList.forEach(function (item, index){
			item.textContent = index + 1 + item.textContent;
		});
	}

	buttons[2].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Selección de mltiples elementos por selector');
		$$result.log('Devuelve NodeList es estático, utiliza for-each');
		$$result.log('Primera lista en el footer');
		$$result.log('#footer .footer-links ul');
		$$result.log('Seleccionamos los enlaces dentro de li');
		$$result.log('li a');
		$$result.log('Numeramos estos enlaces');

		testQuerySelectorAll();
	});

	function testGetElementsByTagName(){
		let ul = document.querySelector('#footer div.row div:nth-child(3) ul');
		let itemList = ul.getElementsByTagName("a");
		for (let link of itemList) {
			link.style.textDecoration = "underline";
		}
	}

	buttons[3].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Selección de múltiples elementos por nombre de Tag');
		$$result.log('Devuelve HTMLCollection');
		$$result.log('Tercera lista en el footer');
		$$result.log('#footer div.row div:nth-child(3) ul');
		$$result.log('Todos los enlaces subrayados');

		testGetElementsByTagName();
	});

	function testGetElementsByClassName(){
		let footer = document.getElementById("footer");
		let divs = footer.getElementsByClassName("footer-links");
		for (let i = 0; i < divs.length; i++) {
			divs[i].style.border = "2px solid red";
		}
	}

	buttons[4].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Selección de múltiples elementos por nombre de clase');
		$$result.log('Devuelve HTMLCollection');
		$$result.log('Contenedores de listas en el footer');
		$$result.log('Añadimos border rojo de 2px');

		testGetElementsByClassName();
	});

})();

