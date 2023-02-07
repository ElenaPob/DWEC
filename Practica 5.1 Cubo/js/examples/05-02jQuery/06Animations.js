$(function(){
	let divExamples = document.getElementById('examples').children[13];
	let buttons = divExamples.getElementsByClassName('tab-pane')[7].getElementsByTagName('button');

	function testBasicEffects(){
		let categories = $('#categories > div.row > div');
		let bShow = $('<button class="btn btn-primary m-1"></button>').text('Show');
		let bHide = $('<button class="btn btn-primary m-1"></button>').text('Hide');
		let bToggle = $('<button class="btn btn-primary m-1"></button>').text('Toggle');

		bShow.click(function (){
			let img = $(this).parent().find('div.cat-list-image').first();
			img.show(1000);
		});

		bHide.click(function (){
			let img = $(this).parent().find('div.cat-list-image').first();
			img.hide(2000);
		});

		bToggle.click(function (){
			let img = $(this).parent().find('div.cat-list-image').first();
			img.toggle(3000);
		});

		categories.prepend(bShow, bHide, bToggle);
	}

	buttons[0].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Botones para ocultar y mostrar las categorías.');
		testBasicEffects();
	});

	function testCallBack(){
		let categories = $('#categories > div.row > div');
		let bShow = $('<button class="btn btn-primary m-1"></button>').text('Show');
		bShow.attr('disabled', true);
		let bHide = $('<button class="btn btn-primary m-1"></button>').text('Hide');
		let bToggle = $('<button class="btn btn-primary m-1"></button>').text('Toggle');

		bShow.click(function (){
			let img = $(this).parent().find('div.cat-list-image').first();
			let button = $(this);
			img.show(1000, function(){
				button.attr('disabled', true);
				button.next().removeAttr('disabled');
			});
		});

		bHide.click(function (){
			let img = $(this).parent().find('div.cat-list-image').first();
			let button = $(this);
			img.hide(2000, function(){
				button.attr('disabled', true);
				button.prev().removeAttr('disabled');
			});
		});

		bToggle.click(function (){
			let img = $(this).parent().find('div.cat-list-image').first();
			let button = $(this);
			img.toggle(3000, function(){
				if(button.prev().attr('disabled')){
					button.prev().removeAttr('disabled');
					button.prev().prev().attr('disabled',true);
				} else {
					button.prev().attr('disabled', true);
					button.prev().prev().removeAttr('disabled');
				}
			});
		});

		categories.prepend(bShow, bHide, bToggle);
	}

	buttons[1].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Botones para ocultar y mostrar las categorías.');
		$$result.log('Los botones quedan deshabilitados.');
		testCallBack();
	});

	function testSlideEffects(){
		let categories = $('#categories > div.row > div');
		let bShow = $('<button class="btn btn-primary m-1"></button>').text('Show');
		bShow.attr('disabled', true);
		let bHide = $('<button class="btn btn-primary m-1"></button>').text('Hide');
		let bToggle = $('<button class="btn btn-primary m-1"></button>').text('Toggle');

		bShow.click(function (){
			let img = $(this).parent().find('div.cat-list-image').first();
			let button = $(this);
			img.slideDown(1000, function(){
				button.attr('disabled', true);
				button.next().removeAttr('disabled');
			});
		});

		bHide.click(function (){
			let img = $(this).parent().find('div.cat-list-image').first();
			let button = $(this);
			img.slideUp(2000, function(){
				button.attr('disabled', true);
				button.prev().removeAttr('disabled');
			});
		});

		bToggle.click(function (){
			let img = $(this).parent().find('div.cat-list-image').first();
			let button = $(this);
			img.slideToggle(3000, function(){
				if(button.prev().attr('disabled')){
					button.prev().removeAttr('disabled');
					button.prev().prev().attr('disabled',true);
				} else {
					button.prev().attr('disabled', true);
					button.prev().prev().removeAttr('disabled');
				}
			});
		});

		categories.prepend(bShow, bHide, bToggle);
	}

	buttons[2].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Botones para ocultar y mostrar las categorías en un slide.');
		$$result.log('Los botones quedan deshabilitados.');
		testSlideEffects();
	});

	function testFadeEffects(){
		let categories = $('#categories > div.row > div');
		let bShow = $('<button class="btn btn-primary m-1"></button>').text('Show');
		bShow.attr('disabled', true);
		let bHide = $('<button class="btn btn-primary m-1"></button>').text('Hide');
		let bToggle = $('<button class="btn btn-primary m-1"></button>').text('Toggle');

		bShow.click(function (){
			let img = $(this).parent().find('div.cat-list-image').first();
			let button = $(this);
			img.fadeIn(1000, function(){
				button.attr('disabled', true);
				button.next().removeAttr('disabled');
			});
		});

		bHide.click(function (){
			let img = $(this).parent().find('div.cat-list-image').first();
			let button = $(this);
			img.fadeOut(2000, function(){
				button.attr('disabled', true);
				button.prev().removeAttr('disabled');
			});
		});

		bToggle.click(function (){
			let img = $(this).parent().find('div.cat-list-image').first();
			console.dir(img);
			let button = $(this);
			img.fadeToggle(3000, function(){
				if(button.prev().attr('disabled')){
					button.prev().removeAttr('disabled');
					button.prev().prev().attr('disabled',true);
				} else {
					button.prev().attr('disabled', true);
					button.prev().prev().removeAttr('disabled');
				}
			});
		});

		categories.find('div.cat-list-image').mouseenter(function (){
			$(this).fadeTo(1000, 0.5);
		});

		categories.find('div.cat-list-image').mouseleave(function (){
			$(this).fadeTo(1000, 1);
		});

		categories.prepend(bShow, bHide, bToggle);
	}

	buttons[3].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Botones para ocultar y mostrar las categorías desvaneciendose.');
		$$result.log('Los botones quedan deshabilitados.');
		$$result.log('Al entrar o salir de las categorías cambia la opacidad.');
		testFadeEffects();
	});

	function testAnimate(){
		let container = $('#categories');
		let categories = $('#categories > div.row > div');
		container.css('position', 'relative');
		let button1 = $('<button class="btn btn-primary m-1"></button>').text('Animate');
		container.prepend(button1);

		let first = categories.first();
		let last = categories.last();

		let coordinates = {
			first: {
				left: first.get(0).offsetLeft,
				top: first.get(0).offsetTop
			},
			last: {
				left: last.get(0).offsetLeft,
				top: last.get(0).offsetTop
			}
		}

		button1.click(function (){
			first.css({position: 'absolute', zIndex: '1', border: '10px solid red'});
			first
				.animate({left: '+=200', top: '-=200', opacity: '0.5',}, 1000)
				.animate({left: coordinates.last.left - 200}, 1000)
				.animate({left: coordinates.last.left, top: coordinates.last.top, opacity: '1',}, 1000);
		})
	}

	buttons[4].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Animación personalizada.');
		$$result.log('La primera categoría pasa a la última posición.');
		testAnimate();
	});

	function testStop(){
		let container = $('#categories');
		let categories = $('#categories > div.row > div');
		container.css('position', 'relative');
		let button1 = $('<button class="btn btn-primary m-1"></button>').text('Animate');
		let button2 = $('<button class="btn btn-primary m-1"></button>').text('Stop');
		container.prepend(button1, button2);

		let first = categories.first();
		let last = categories.last();

		let coordinates = {
			first: {
				left: first.get(0).offsetLeft,
				top: first.get(0).offsetTop
			},
			last: {
				left: last.get(0).offsetLeft,
				top: last.get(0).offsetTop
			}
		}

		button1.click(function (){
			first.css({position: 'absolute', zIndex: '1', border: '10px solid red'});
			first
				.animate({left: '+=200', top: '-=200', opacity: '0.5',}, 1000)
				.animate({left: coordinates.last.left - 200}, 1000)
				.animate({left: coordinates.last.left, top: coordinates.last.top, opacity: '1',}, 1000);
		})

		button2.click(function (){
			first.stop(true);
		});
	}

	buttons[5].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Animación personalizada.');
		$$result.log('La primera categoría pasa a la última posición.');
		$$result.log('El botón de stop.');
		testStop();
	});

	function testAnimateOptionsV1(){
		let container = $('#categories');
		let categories = $('#categories > div.row > div');
		container.css('position', 'relative');
		let button1 = $('<button class="btn btn-primary m-1"></button>').text('Animate');
		let button2 = $('<button class="btn btn-primary m-1"></button>').text('Stop');
		container.prepend(button1, button2);

		let first = categories.first();
		let last = categories.last();

		let coordinates = {
			first: {
				left: first.get(0).offsetLeft,
				top: first.get(0).offsetTop
			},
			last: {
				left: last.get(0).offsetLeft,
				top: last.get(0).offsetTop
			}
		}

		button1.click(function (){
			let progress = $('#progress');
			if (progress.length === 0){
				let progressBar = $('<div class="row border border-primary mt-2"><div id="progress"></div></div>');
				container.append(progressBar);
				progress = $('#progress');
				progress.css({
					height: '40px',
					color: '#ffffff',
					fontSize: '2em',
					textAlign: 'center',
				});
			}

			let duration = 1000;
			first
				.animate({left: '+=200', top: '-=200', opacity: '0.5',},{
					duration: duration,
					start: function(){
						$(this).css({position: 'absolute', zIndex: '1', border: '10px solid red'});
						progress.css({
							background: 'red',
							width: '0%'
						});
						progress.animate({width: '100%'}, {
							duration: duration * 3,
							easing: 'linear',
							step: function(width, fx){
								$(this).text(width.toFixed(2) + "%");
							},
						});
					},
					done: function(){
						first.css({border: '10px solid blue'});
						progress.css({background: 'blue'});
					}
				})
				.animate({left: coordinates.last.left - 200},{
					duration: duration,
					done: function(){
						first.css({border: '10px solid green'});
						progress.css({background: 'green'});
					}
				})
				.animate({left: coordinates.last.left, top: coordinates.last.top, opacity: '1',},{
					duration: duration,
				});
		})

		button2.click(function (){
			first.stop(true);
			$('#progress').stop();
		});
	}

	buttons[6].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Animación personalizada.');
		$$result.log('La primera categoría pasa a la última posición.');
		$$result.log('El botón de stop.');
		$$result.log('Personalizamos la animación en cada paso.');
		testAnimateOptionsV1();
	});

	function testAnimateExercise(){
		let container = $('#categories');
		let categories = $('#categories > div.row > div');
    container.children().first().css('position', 'relative');
    container.children().first().height(container.height());
		let button1 = $('<button class="btn btn-primary m-1"></button>').text('Animate');
		let button2 = $('<button class="btn btn-primary m-1"></button>').text('Stop');
		container.prepend(button1, button2);

    let coordinates = [];
    for (let img of categories){
        coordinates.push({
            left: img.offsetLeft,
            top: img.offsetTop
        });
    }
    for (let i = 0; i < categories.length; i++){
        $(categories[i]).css({
            position: 'absolute',
            left: coordinates[i].left,
            top: coordinates[i].top
        });
    }

		button1.click(function (){
			let categories = $('#categories > div.row > div');
			let first = categories.first();
			let last = categories.last();
			let button = $(this);
			button.attr('disabled', true);
			let progress = $('#progress');
			if (progress.length === 0){
				let progressBar = $('<div class="row border border-primary mt-2"><div id="progress"></div></div>');
				container.append(progressBar);
				progress = $('#progress');
				progress.css({
					height: '40px',
					color: '#ffffff',
					fontSize: '2em',
					textAlign: 'center',
				});
			}

			let duration = 1000;
			first
				.animate({left: '+=200', top: '-=200', opacity: '0.5',},{
					duration: duration,
					start: function(){
						$(this).css({position: 'absolute', zIndex: '1', border: '10px solid red'});
						progress.css({
							background: 'red',
							width: '0%'
						});
						progress.animate({width: '100%'}, {
							duration: duration * 3,
							easing: 'linear',
							step: function(width, fx){
								$(this).text(width.toFixed(2) + "%");
							},
						});
						let siblings = $(this).siblings();
						for (let i = 0; i < siblings.length; i++){
								$(siblings[i]).animate({
										left: coordinates[i].left
								}, duration);
						}
					},
					done: function(){
						first.css({border: '10px solid blue'});
						progress.css({background: 'blue'});
					}
				})
				.animate({left: coordinates[coordinates.length-1].left - 200},{
					duration: duration,
					done: function(){
							first.css({border: '10px solid green'});
							progress.css({background: 'green'});
					}
				})
				.animate({
						left: coordinates[coordinates.length-1].left,
						top: coordinates[coordinates.length-1].top,
						borderWidth: '0px',
						opacity: '1',},{
					duration: duration,
					done: function(){
						button.removeAttr('disabled');
						$(this).parent().append($(this));
						$(this).css({zIndex: '0'});
						console.dir($(this));
					}
				});
		})

		button2.click(function (){
			$('#progress').stop(true);
			categories.stop(true);
			$(this).prev().removeAttr('disabled');
		});
	}

	buttons[7].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Animación personalizada.');
		$$result.log('La primera categoría pasa a la última posición.');
		$$result.log('El botón de stop.');
		$$result.log('Personalizamos la animación en cada paso.');
		testAnimateExercise();
	});

});

