(function (){
	let divExamples = document.getElementById('examples').children[12];
	let buttons = divExamples.getElementsByClassName('tab-pane')[3].getElementsByTagName('button');

	function testCreateElement(){
		let ul = document.querySelector('#footer div.row div:nth-child(3) ul');
		let li = document.createElement("li");
		ul.appendChild(li);
		let anchor = document.createElement("a");
		anchor.href = "#";
		li.appendChild(anchor);
		let i = document.createElement("i");
		i.classList.add("fas");
		i.classList.add("fa-angle-right");
		anchor.appendChild(i);
		let text = document.createTextNode(" Servicio " + ul.children.length);
		anchor.appendChild(text);
	}

	buttons[0].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('createElement() y appendChild()');
		$$result.log('Añadimos nuevo enlace en Servicios');
		testCreateElement();
	});

	function testInsertBefore(){
		let li = document.querySelector('#footer div.row div:nth-child(2) ul li:nth-child(2)');
		let new_li = document.createElement("li");
		let anchor = document.createElement("a");
		anchor.href = "#";
		new_li.appendChild(anchor);
		let i = document.createElement("i");
		i.classList.add("fas");
		i.classList.add("fa-angle-right");
		anchor.appendChild(i);
		let text = document.createTextNode(" Nuevo enlace");
		anchor.appendChild(text);
		li.parentElement.insertBefore(new_li, li);
	}

	buttons[1].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('insertBefore()');
		$$result.log('Añadimos nuevo enlace de interés');
		testInsertBefore();
	});

	function testCloneNode(){
		let li = document.querySelector('#footer div.row div:nth-child(2) ul li:nth-child(2)');
		let new_li = li.cloneNode(true);
		new_li.firstElementChild.childNodes[1].textContent = " Nuevo enlace";
		li.parentElement.insertBefore(new_li, li);
	}

	buttons[2].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('cloneNode()');
		$$result.log('Añadimos nuevo enlace de interés clonado');
		testCloneNode();
	});

	function testReplaceChild(){
		let li = document.querySelector('#footer div.row div:nth-child(2) ul li:nth-child(2)');
		let new_li = li.cloneNode(true);
		new_li.firstElementChild.childNodes[1].textContent = " Nuevo enlace";
		li.parentElement.replaceChild(new_li, li);
	}

	buttons[3].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('replaceChild()');
		$$result.log('Reemplazamos enlace de interés por nuevo enlace clonado');
		testReplaceChild();
	});

	function testRemove(){
		let li = document.querySelector('#footer div.row div:nth-child(2) ul li:nth-child(2)');
		li.remove();
	}

	buttons[4].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('remove()');
		$$result.log('Borramo el segundo enlace de interés');
		testRemove();
	});

})();

