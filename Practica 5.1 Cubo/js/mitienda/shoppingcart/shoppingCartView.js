import ShoppingCart from './shoppingCartModel.js';


class ShoppingCartView {
  constructor(){
		this.main = $('main');
		this.linkShoppingcart = $('#shoppingcart');
		this.categories = $('#categories');
  }

	init(){
		this.main.empty();
		this.main.append(`<div class="container article-banner">
			<div class="row">
				<div class="col d-md-flex align-items-md-stretch flex-md-nowrap">
					<div class="article-banner-image flex-sm-grow-1">
						<h4 class="d-lg-none">Artículo semanal</h4>
					</div>
					<div
						class="article-banner-text d-flex flex-column align-items-center justify-content-center flex-sm-grow-1">
						<h4>Artículo semanal</h4>
						<h5>Coworking</h5>
						<p>¿Cómo compartir espacios de trabajo?</p>
						<a id="button" class="btn" href="#">Ver artículo</a>
					</div>
				</div>
			</div>
		</div>`);
	}

	bindInit(handler){
		$('#init').click((event) => {
			handler();
		});
		$('#logo').click((event) => {
			handler();
		});
	}

	showNumberProductsInCart(numProducts) {
		let spanNumProducts = this.linkShoppingcart.find('span');
		if (spanNumProducts) spanNumProducts.remove();
		if (numProducts > 0){
			let spanNumProducts =  $(` <span class="rounded-circle px-2">${numProducts}</span>`);
			this.linkShoppingcart.append(spanNumProducts);
			this.linkShoppingcart.addClass('shopping');
			this.linkShoppingcart.attr('href', '#shoppingcart-table');
		}
	}

	showShoppingCart(data){
		if (data.numProducts > 0){
			this.main.empty();
			if (this.categories.children().length > 1)
			this.categories.children()[1].remove();

			let container = $(`<div class="container article-banner"><div class="row">
				<div class="table-responsive" id="shoppingcart-table">
					<table class="table">
						<thead>
								<tr>
										<th scope="col">#</th>
										<th scope="col">Marca</th>
										<th scope="col">Modelo</th>
										<th scope="col" class="text-center">Cantidad</th>
										<th scope="col" class="text-right">Precio</th>
								</tr>
						</thead>
						<tbody>
						</tbody>
						<tfoot>
						</tfoot>
					</table>
				</div>
			</div></div>`);
			this.main.append(container);

			let tbody = container.find('tbody');
			let products = data.products;
			let quantities = data.quantities;
			let product = products.next();
			let quantity = quantities.next();
			while (!product.done){
				let row = $(`<tr>
					<td scope="row">${product.value.serial}</td>
					<td>${product.value.brand}</td>
					<td>${product.value.model}</td>
					<td class="text-center">${quantity.value}</td>
					<td class="text-right">${(quantity.value * product.value.price).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</td>
				</tr>`);
				tbody.append(row);
				product = products.next();
				quantity = quantities.next();
			}

			let tfoot = container.find('tfoot');
			let totalWithoutTaxes = $(`<tr>
				<td colspan="4">Total sin impuestos</td>
				<td class="text-right">${data.totalWithoutTaxes.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</td>
			</tr>`);
			tfoot.append(totalWithoutTaxes);
			let taxes = $(`<tr>
				<td colspan="4">Impuestos</td>
				<td class="text-right">${data.taxes.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</td>
			</tr>`);
			tfoot.append(taxes);
			let total = $(`<tr>
				<td colspan="4"><strong>Total</strong></td>
				<td class="text-right"><strong>${data.total.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</strong></td>
			</tr>`);
			tfoot.append(total);
		}
	}

	bindShowShoppingCart(handler){
		this.linkShoppingcart.click((event) => {
			handler();
		});
	}

}

export default ShoppingCartView;
