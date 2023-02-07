$(function(){
	let divExamples = document.getElementById('examples').children[13];
	let buttons = divExamples.getElementsByClassName('tab-pane')[5].getElementsByTagName('button');

	function interestLinksExample(){
		let links = $('#footer div.row div:nth-child(2) ul');
		let input = $('<input>').attr({
			type: 'text',
			id: 'new-link',
			placeholder: 'Nuevo enlace'
		});
		let button = $('<button></button>').text('Añadir');
		links.after(button);
		links.after(input);

		button.click(function(){
			let input = $('#new-link');
			if (input.val().length > 4){
				let links = $('#footer div.row div:nth-child(2) ul');
				let li = $('<li></li>')
				let anchor = $('<a></a>').attr({
					href: '#'
				}).text(input.val());
				let i = $('<i></i>').addClass('fas fa-angle-right');
				li.append(i, anchor);
				links.append(li);
			} else {
				alert ('La longitud debe ser de al menos 5 caracteres.');
			}
		});
	}

	buttons[0].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Añadir enlaces de interés');
		if ($('#new-link').length === 0) interestLinksExample();
	});

	function fullScreenImageEvent(){
		let categories = $('#categories');
		let images = categories.find('img');

		function imageFullScreen(){
			if (this.requestFullscreen) {
				this.requestFullscreen();
			}
		}

		images.click(imageFullScreen);
	}

	buttons[1].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Imágenes categorías en pantalla completa');
		fullScreenImageEvent();
	});

	function testOnEvent(){
		let categories = $('#categories');
		let images = categories.find('img');

		function imageFullScreen(){
			if (this.requestFullscreen) {
				this.requestFullscreen();
			}
		}

		images.on('click', imageFullScreen);
		images.on('click', function(){
			$(this).css('border', '5px solid blue');
		});
		images.on({
			mouseenter: function(){
				$(this).css('border', '5px solid red');
			},
			mouseleave: function(){
				$(this).css('border', 'none');
			}
		});

		//images.off('click', imageFullScreen);
	}

	buttons[2].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Bordes en imágenes');
		testOnEvent();
	});

	function testOneEvent(){
		let categories = $('#categories');
		let images = categories.find('img');

		function imageFullScreen(){
			if (this.requestFullscreen) {
				this.requestFullscreen();
			}
		}

		images.one('click', imageFullScreen);
		images.one('click', function(){
			$(this).css('border', '5px solid blue');
		});
		images.on({
			mouseenter: function(){
				$(this).css('border', '5px solid red');
			},
			mouseleave: function(){
				$(this).css('border', 'none');
			}
		});
	}

	buttons[3].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Imagen de categorías a tamaño completo un única vez.');
		testOneEvent();
	});

	function testEventData(){
		let categories = $('#categories > div.row > div');
		let images = categories.find('img');
		let info = categories.find('div.cat-list-text')
		function showInfo(event){
			let name = $(event.data[0]).find('h3').text();
			alert(`Categoría: ${name} Posición: ${event.data[1].index}`);
			event.stopPropagation();
		}

		for (let i = 0; i < images.length; i++){
			$(images[i]).click([info[i], {index: i}], showInfo);
		}
	}

	buttons[4].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Pasamos información de cada categoría al evento.');
		testEventData();
	});

	window.testClickEvent = function(){
		let banner = $('.banner');
		let div = $('<div></div>').attr('id','references').css('border','5px solid red');
		banner.after(div);
		banner.click(function(event){
			let str = "";
			str = "offsetX: " + event.offsetX + " offsetY: " + event.offsetY + "<br>";
			str += "clientX: " + event.clientX + " clientY: " + event.clientY + "<br>";
			str += "pageX: " + event.pageX + " pageY: " + event.pageY + "<br>";
			str += "screenX: " + event.screenX + " screenY: " + event.screenY + "<br>";
			div.html(str);
		});
	}

	buttons[5].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Muestra posición del ratón al cliquear en el banner.');
		testClickEvent();
	});

	function testMouseEnterEvent(){
		let categories = $('#categories');
		let divImages = categories.find(".cat-list-image");

		function showDimensions(event){
			let dimensionsDiv = $('<div></div>')
				.addClass('border border-primary p-2')
				.css({
					background: '#f5f5f5',
					width: '150px',
					position: 'absolute',
					zIndex:'1',
					top: event.offsetY + 5 + 'px',
					left: event.offsetX + 5 + 'px',
				});

			let str = "offsetWidth: " + $(this).innerWidth() + "<br>" + "offsetHeight: " + $(this).innerHeight();
			dimensionsDiv.html(str);
			$(this).append(dimensionsDiv);
		}

		function hideDimensions(event){
			$(this).children().remove(':nth-child(2)');
		}

		function moveDimensions(event){
			event.stopPropagation();
			event.preventDefault();
			$(this).children(':nth-child(2)').css({
				top: event.offsetY + 5 + 'px',
				left: event.offsetX + 5 + 'px'
			});
		}

		divImages.css('position', 'relative');
		divImages.on({
			mouseenter: showDimensions,
			mouseleave: hideDimensions,
			mousemove: moveDimensions
		})
	}

	buttons[6].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Muestra dimensiones de las categorías.');
		testMouseEnterEvent();
	});

	window.testMouseOverEvent = function(){
		$('body').on({
			mouseover: function(event){
				$(event.target).addClass('border border-danger');
			},
			mouseout: function(event){
				$(event.target).removeClass('border border-danger');
			}
		});
	}

	buttons[7].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Muestra dimensiones de las categorías.');
		testMouseOverEvent();
	});

	function testFocusEvent(){
		let input = $('input[name = "email"]');
		input.on({
			focus: function(){
				let div = $('<div></div>');
				$(this).parent().append(div);
				div.text ('Introduce un correo electrónico.');
			},
			blur: function(){
				$(this).next().next().remove();
			}
		});
	}

	buttons[8].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Muestra capa al seleccionar el input de subscripción.');
		testFocusEvent();
	});

	function testHoverEventV1(){
		let categories = $('#categories');
		let divImages = categories.find(".cat-list-image");

		$( divImages ).hover(
			function() {
				$(this).addClass('border border-danger');
			}, function() {
				$(this).removeClass('border border-danger');
			}
		);
	}

	buttons[9].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Añade y elimina bordes de las categorías.');
		testHoverEventV1();
	});

	window.testHoverEventV2 = function(){
		let categories = $('#categories');
		let divImages = categories.find(".cat-list-image");

		$( divImages ).hover(
			function() {
				$(this).toggleClass('border border-success');
			});
	}

	function testKeydownEvent(){
		let input = $('input[name = "email"]');
		let div = $('<div></div>');
		input.parent().append(div);
		input.focus();
		input.keydown(function(event){
			let div = $(this).next().next();
			div.text(div.text() + `${event.key}(${event.code}) `);
		});
	}

	buttons[10].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Muestra teclas pulsadas en el input de subscripción.');
		testKeydownEvent();
	});

	function testKeyupEvent(){
		let categories = $('#categories');
		let divImages = categories.find('.cat-list-image');

		$(document).on({
			keydown: function (event) {
				if (event.altKey) {
					if (event.code.indexOf("Numpad") > -1 ||
						event.code.indexOf("Digit") > -1) {
						let number = (event.code.length === 7) ?
							event.code.substring(6) :
							event.code.substring(5);
						number = +number;

						let divImage = $(divImages[number]);
						if (number < divImages.length && divImage.children().length < 2) {
							let dimensionsDiv = $('<div></div>')
								.addClass('border border-primary p-2')
								.css({
									background: '#f5f5f5',
									width: '150px',
									position: 'absolute',
									top: '0px',
									left: '0px'
								});
							let str = "offsetWidth: " + divImage.innerWidth() + "<br>" + "offsetHeight: " + divImage.innerHeight();
							dimensionsDiv.html(str);
							divImage.css ('position', 'relative');
							divImage.append(dimensionsDiv);
						}
					}
				}
			},
			keyup: function (event) {
				if (event.altKey) {
					if (event.code.indexOf("Numpad") > -1 ||
						event.code.indexOf("Digit") > -1) {
						let number = (event.code.length === 7) ?
							event.code.substring(6) :
							event.code.substring(5);
						number = +number;
						if (number < divImages.length) {
							$(divImages[number]).children(':nth-child(2)').remove();
						}
					}
				}
			}
		});
	}

	buttons[11].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Muestra dimensiones al pulsar alt + Num de las categorías.');
		testKeyupEvent();
	});

});

