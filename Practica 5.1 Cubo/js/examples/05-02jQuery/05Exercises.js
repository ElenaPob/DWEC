$(function(){
	let divExamples = document.getElementById('examples').children[13];
	let buttons = divExamples.getElementsByClassName('tab-pane')[6].getElementsByTagName('button');

	function lottery(){
		$('#loto').show();
		let Prize = (function () {
			let instantiated;

			function init() {
				let number = null;
				return { // Devuelve el objeto que será único.
					setNumber: function () {
						number = Math.floor(Math.random() * 100000);
					},
					getNumber: function (){
						let ciphers = [];
						let tmpNumber = number;
						for (let i = 4; i >= 0; i--){
							ciphers[i] = tmpNumber % 10;
							tmpNumber = Math.floor(tmpNumber/10);
						}
						return ciphers;
					}
				};
			}
			return {
				getInstance: function () {
					if (!instantiated) {
						instantiated = init();
					}
					return instantiated;
				}
			};
		})();

		$('#b-start').click(function () {
			Prize.getInstance().setNumber();
			$('#game').show();
			$(this).attr('disabled', 'true');
			let ciphers = $('#ciphers').find('input');
			$(ciphers).css('background', 'white');
			$('#ciphers').find('input').get(0).focus();
			$('#b-guess').removeAttr('disabled');
			alert(Prize.getInstance().getNumber());
		});

		function checkNumber(cipher, num){
			//alert(num + " " + cipher);
			if (cipher < num) return 'red';
			if (cipher > num) return 'blue';
			if (cipher === num) return 'green';
		}

		$('#b-guess').click(function(){
			let winning = true;
			let ciphers = $('#ciphers').find('input');
			let color;
			let numbers = Prize.getInstance().getNumber();
			for (let i = 0; i < 5; i++){
				console.log(numbers);
				color = checkNumber(Number.parseInt($(ciphers[i]).val()), numbers[i]);
				if (color !== 'green') winning = false;
				$(ciphers[i]).css('background', color);
			}
			if (winning) {
				$('#output').text('El número ganador es: ' + numbers.join('')).show();
				$(this).attr('disabled', 'true');
				$('#b-start').removeAttr('disabled');
			} else {
				$('#ciphers').find('input').get(0).focus();
			}
		});
	}

	buttons[0].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Muestra ejercicio de la lotería.');
		lottery();
	});

	function searchExercise(){
		$('#search').show();
		$('#b-search').on('keyup', function() {
			let value = $(this).val().toLowerCase();
			let rows = $('#players tr');
			rows.filter(function() {
				$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
			});

			let hideRows = $('#players tr[style = "display: none;"]');
			if (hideRows.length === rows.length){
				if ($('#players').parent().next().length === 0)
					$('#players').parent().after($('<div>No hay registros emparejados al criterio de búsqueda.</div>'));
			} else {
				$('#players').parent().next().remove();
			}
		});
	}

	buttons[1].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Muestra ejercicio del buscador.');
		searchExercise();
	});

});

