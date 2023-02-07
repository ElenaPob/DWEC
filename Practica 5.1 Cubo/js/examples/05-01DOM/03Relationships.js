(function (){
	let divExamples = document.getElementById('examples').children[12];
	let buttons = divExamples.getElementsByClassName('tab-pane')[2].getElementsByTagName('button');

	function testRelativesV1(){
		let ul = document.querySelector('#footer div.row div:nth-child(2) ul');
		ul.parentElement.style.border = "2px solid red";
		for (let item of ul.children){
			item.style.border = "2px solid green";
		}
		ul.firstElementChild.style.border = "2px solid blue";
		ul.lastElementChild.style.border = "2px solid blue";
	}

	buttons[0].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('parentElement, children, firstElementChild, lastElementChild');
		$$result.log('Selección enlaces de interés');
		$$result.log('Padre rojo');
		$$result.log('Hijos verde');
		$$result.log('Primer y último hijo azul');
		testRelativesV1();
	});

	function testRelativesV2(){
		let li = document.querySelector('#footer div.row div:nth-child(3) ul li:nth-child(3)');
		let previous = li.previousElementSibling;
		while (previous){
			previous.style.border = "2px solid red";
			previous = previous.previousElementSibling;
		}
		let next = li.nextElementSibling;
		while (next){
			next.style.border = "2px solid blue";
			next = next.nextElementSibling;
		}
	}

	buttons[1].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('nextElementSibling y previousElementSibling');
		$$result.log('Selección Servicio 3');
		$$result.log('Previos rojos');
		$$result.log('Siguientes azules');
		testRelativesV2();
	});

	function testRelativesV3(){
		let ul = document.querySelector('#footer div.row div:nth-child(2) ul');
		ul.parentElement.style.border = "2px solid red";
		ul.parentElement.parentElement.style.border = "2px solid red";
		ul.parentElement.parentElement.parentElement.style.border = "2px solid red";
		ul.parentElement.parentElement.parentElement.parentElement.style.border = "2px solid red";
		ul.parentElement.parentElement.parentElement.parentElement.parentElement.style.border = "2px solid red";
	}

	buttons[2].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('parentElement');
		$$result.log('Selección enlaces de interés');
		$$result.log('Ancestros rojos');
		testRelativesV3();
	});

})();

