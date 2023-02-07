import Manager from './manager.js';

class ManagerView {
  constructor(){
		this.main = $('main');
		this.categories = $('#categories');
		this.menu = $('.navbar-nav');
  }

	bindInit(handler){
		$('#init').click((event) => {
			handler();
		});
		$('#logo').click((event) => {
			handler();
		});
	}

	showProductTypes() {
		this.categories.empty();
		this.categories.append(`<div id="type-list" class="row">
			<div class="col-lg-3 col-md-6"><a data-type="Camera" href="#product-list">
					<div class="cat-list-image"><img alt="Categoría cámaras" src="img/catcamara.jpg" />
					</div>
					<div class="cat-list-text">
						<h3>Cámaras</h3>
						<div>Digitales y reflex</div>
					</div>
				</a>
			</div>
			<div class="col-lg-3 col-md-6"><a data-type="Smartphone" href="#product-list">
					<div class="cat-list-image"><img alt="Categoría móviles" src="img/catmovi.jpg" />
					</div>
					<div class="cat-list-text">
						<h3>Móviles</h3>
						<div>Modelos exclusivos</div>
					</div>
				</a>
			</div>
			<div class="col-lg-3 col-md-6"><a data-type="Laptop" href="#product-list">
					<div class="cat-list-image"><img alt="Categoría portátiles" src="img/catpportatil.jpg" />
					</div>
					<div class="cat-list-text">
						<h3>Portátiles</h3>
						<div>Intel y AMD</div>
					</div>
				</a>
			</div>
			<div class="col-lg-3 col-md-6"><a data-type="Tablet" href="#product-list">
					<div class="cat-list-image"><img alt="Categoría Tablets" src="img/cattablet.jpg" />
					</div>
					<div class="cat-list-text">
						<h3>Tablets</h3>
						<div>Android y iPad</div>
					</div>
				</a>
			</div>
		</div>`);
	}

	showCategories(categories) {
		if (this.categories.children().length > 1)
			this.categories.children()[1].remove();
		let container = $('<div id="category-list" class="row"></div>');
		for (let category of categories){
			container.append(`<div class="col-lg-3 col-md-6"><a data-category="${category.title}" href="#product-list">
					<div class="cat-list-image"><img alt="${category.title}" src="${category.url}" />
					</div>
					<div class="cat-list-text">
						<h3>${category.title}</h3>
						<div>${category.description}</div>
					</div>
				</a>
			</div>`);
		}
		this.categories.append(container);
	}

	showCategoriesInMenu (categories) {
		let li = $(`<li class="nav-item dropdown">
			<a class="nav-link dropdown-toggle" href="#" id="navCats" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				Categorías
			</a>
		</li>`);
		let container = $('<div class="dropdown-menu" aria-labelledby="navCats"></div>');
		//if (!category.done) shopping
		for (let category of categories){
			container.append(`<a data-category="${category.title}" class="dropdown-item" href="#productlist">${category.title}</a>`);
		}
		li.append(container);
		this.menu.append(li);
	}

	listProducts(products, title){
		this.main.empty();
		if (this.categories.children().length > 1)
			this.categories.children()[1].remove();
		let container = $(`<div id="product-list" class="container my-3"><div class="row"> </div></div>`);
		for (let product of products){
			let div = $(`<div class="col-md-4">
				<figure class="card card-product-grid card-lg"> <a data-serial="${product.serial}" href="#single-product" class="img-wrap"><img class="${product.constructor.name}-style" src="${product.url}"></a>
					<figcaption class="info-wrap">
						<div class="row">
							<div class="col-md-8"> <a data-serial="${product.serial}" href="#single-product" class="title">${product.brand} - ${product.model}</a> </div>
							<div class="col-md-4">
								<div class="rating text-right"> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> </div>
							</div>
						</div>
					</figcaption>
					<div class="bottom-wrap"> <a href="#" data-serial="${product.serial}" class="btn btn-primary float-right"> Comprar </a>
						<div class="price-wrap"> <span class="price h5">${product.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span> <br> <small class="text-success">Free shipping</small> </div>
					</div>
				</figure>
			</div>`);
			container.children().first().append(div);
		}
		container.prepend(`<h1>${title}</h1>`);
		this.main.append(container);
	}

	bindProductsCategoryList(handler){
		$('#navCats').next().children().click(function(event){
			handler(this.dataset.category);
		});
		$('#category-list').find('a').click(function(event){
			handler(this.dataset.category);
		});
	}

	bindProductsTypeList(handler){
		$('#type-list').find('a').click(function(event){
			handler(this.dataset.type);
		});
	}


	showProduct(product, message){
		this.main.empty();
		if (this.categories.children().length > 1)
			this.categories.children()[1].remove();
		let container;
		if (product){
			container = $(`<div id="single-product" class="${product.constructor.name}-style container mt-5 mb-5">
				<div class="row d-flex justify-content-center">
					<div class="col-md-10">
						<div class="card">
							<div class="row">
								<div class="col-md-6">
									<div class="images p-3">
										<div class="text-center p-4"> <img id="main-image" src="${product.url}"/> </div>
									</div>
								</div>
								<div class="col-md-6">
									<div class="product p-4">
										<div class="mt-4 mb-3"> <span class="text-uppercase text-muted brand">${product.brand}</span>
											<h5 class="text-uppercase">${product.model}</h5>
											<div class="price d-flex flex-row align-items-center">
												<span class="act-price">${product.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span>
											</div>
										</div>
										<p class="about">${product.description}</p>
										<div class="sizes mt-5">
											<h6 class="text-uppercase">Características</h6>
										</div>
										<div class="cart mt-4 align-items-center"> <button data-serial="${product.serial}" class="btn btn-primary text-uppercase mr-2 px-4">Comprar</button> </div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>`);

			container.find('h6').after(this.#instance[product.constructor.name]);

		} else {
			container = $(` <div class="container mt-5 mb-5">
				<div class="row d-flex justify-content-center">
					${message}
				</div>
			</div>`);
		}
		this.main.append(container);
	}

	#instance = {
		Laptop: this.#LaptopCharacteristics,
		Camera: this.#CameraCharacteristics,
		Smartphone: this.#SmartphoneCharacteristics,
		Tablet: this.#TabletCharacteristics,
	}
	#LaptopCharacteristics(product){
		return $('<div>Características de portátil.</div>');
	}
	#CameraCharacteristics(product){
		return $('<div>Características de cámara.</div>');
	}
	#SmartphoneCharacteristics(product){
		return $('<div>Características de teléfono.</div>');
	}
	#TabletCharacteristics(product){
		return $('<div>Características de tablet.</div>');
	}

	bindShowProduct(handler){
		$('#product-list').find('a.img-wrap').click(function(event){
			handler(this.dataset.serial);
		});
		$('#product-list').find('figcaption a').click(function(event){
			handler(this.dataset.serial);
		});
	}

}

export default ManagerView;
