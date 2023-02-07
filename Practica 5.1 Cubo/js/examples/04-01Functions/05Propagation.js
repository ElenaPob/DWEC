'use strict';
(function (){
	let divExamples = document.getElementById('examples').children[6];
	let buttons = divExamples.getElementsByClassName('tab-pane')[4].getElementsByTagName('button');

	function restParametersExampleV1(){
		function greet(...names){
			names.forEach(name => $$result.log(name));
		}
		let names = ["Mary", "John", "James"];
		greet(names); // Mary, John, James
	}

	function restParametersExampleV2(){
		function greet(message = "Hi", ...names){
			$$result.log(message + ": ");
			names.forEach(name => $$result.log(name));
		}
		let names = ["Mary", "John", "James"];
		greet("Welcome", names); // Welcome: Mary, John, James
	}

	buttons[0].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold("Parámetro rest");
		restParametersExampleV1();
		$$result.logBold("Parámetro rest con argumentos");
		restParametersExampleV2();
	});

	function spreadOperatorExample(){
		$$result.clear();
		function greet(message = "Hi", name1, name2){
			$$result.log(message + ": ");
			$$result.log(name1);
			$$result.log(name2);
		}
		let names = ["Mary", "John"];
		greet("Welcome", ...names); // Welcome: Mary, John
	}
	buttons[1].addEventListener('click', spreadOperatorExample);

})();

