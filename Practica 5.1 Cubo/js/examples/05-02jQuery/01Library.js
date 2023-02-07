$(document).ready(function(){
  console.log("Documento DOM cargado1");
});

$(function(){
  console.log("Documento DOM cargado2");
})

document.addEventListener("DOMContentLoaded", () => console.log("DOMContentLoaded"));

window.onload = function(){
  console.log("window.onload")
};

$(function(){
	let divExamples = document.getElementById('examples').children[13];
	let buttons = divExamples.getElementsByClassName('tab-pane')[0].getElementsByTagName('button');

	function showCategories(){
		$('#categories').show();
	}
	buttons[0].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Método show()');
		$$result.log('Mostramos las categorías.');
		showCategories();
	});

	function hideCategories(){
		$('#categories').hide();
	}
	buttons[1].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Método hide()');
		$$result.log('Ocultar las categorías.');
		hideCategories();
	});

	buttons[2].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Métodos text() y html()');
		$$result.log('Mostramos texto en el banner.');
		$('#message').text("Texto normal");
		$('#message2').html(`Texto <span class="text-primary">HTML</span>`);
		hideCategories();
	});

});

let jq = $.noConflict();
jq(function(){
	console.log("Nuevo prefijo.");
})

