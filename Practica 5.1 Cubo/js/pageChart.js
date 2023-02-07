'use strict';
// Charts
const monthCtx = document.getElementById('monthlySales').getContext('2d');
const deptCtx = document.getElementById('deptSales').getContext('2d');
const yearlyLabel = document.getElementById('yearlyTotal');
const bAddSale = document.getElementById('bAddSale');
const bSalesOver5000 = document.getElementById('bSalesOver5000');
const bReset = document.getElementById('bReset');
const bAddSaleModal = document.getElementById('bAddSaleModal');
const bDeleteSale = document.getElementById('bDeleteSale');
const bRemoveSaleModal = document.getElementById('bRemoveSaleModal');

// Valores del formulario
const newAmount = document.getElementById('itemAmount');
const newMonth = document.getElementById('monthId');

//Colecciones para mostrar en gráficos.
const monthlySalesMap = new Map();
const monthlyLabelsSet = new Set();
const monthlySalesArray = [];

//Variables
let monthSales = Array.of(6500, 3250, 4000);
let monthLabels = Array.of('Octubre', 'Noviembre', 'Diciembre');
let deptSales = Array.of(12, 9, 7, 3);
let deptLabels = Array.of('Cámara', 'Móvil', 'Portátil', 'Tablet');

let yearlyTotal = 0;

// Bar
let monthlySalesChart = new Chart(monthCtx, {
	type: 'bar',
	data: {
		labels: monthLabels,
		datasets: [{
			label: 'Número de ventas',
			data: [],
			backgroundColor: [
				'rgba(238, 184, 104, 1)',
				'rgba(75, 166, 223, 1)',
				'rgba(239, 118, 122, 1)',
			],
			borderWidth: 0
		}]
	},
	options: {
		scales: {
			yAxes: [{
				ticks: { beginAtZero: true }
			}]
		}
	}
});

// Pie
let deptSalesChart = new Chart(deptCtx, {
	type: 'pie',
	data: {
		labels: deptLabels,
		datasets: [{
			label: 'Número de ventas',
			data: deptSales,
			backgroundColor: [
				'rgba(238, 184, 104, 1)',
				'rgba(75, 166, 223, 1)',
				'rgba(239, 118, 122, 1)',
				'rgba(40, 167, 69, 1)',
			],
			borderWidth: 0
		}]
	},
	options: {}
})

/* Calculo de totales */
function initMonthlyTotalSales(){
	yearlyLabel.innerHTML = Array.from(monthlySalesMap.values()).reduce(function (count, value){
		return count + value;
	}, 0) + "€";
}

initMonthlyTotalSales();

/* Ventas por encima de 5000 */
function findOver5000(){
	let position = -1;
	let quantity = monthSales.find(function(elem, index){
		if (elem > 5000){
			position = index;
			return true;
		}
		return false;
	});
	alert("Cantidad: " + quantity + " Posición: " + position);
}
bSalesOver5000.addEventListener('click', getSalesMonths);

function getSalesMonths(){
	monthlySalesMap.forEach(function (amount, month){
		alert(month + ": " + amount);
	});
}

//Resetear datos en los gráficos
function resetMonthlySales(){
	monthlySalesMap.clear();
	monthlySalesChart.reset();
	monthlySalesChart.render();
	initMonthlyTotalSales();
}
bReset.addEventListener('click',resetMonthlySales);

//Añadir ventas al gráfico
function cleanAddSaleForm(){
	newMonth.value = "";
	newAmount.value = "";
}

function addSale(){
	try {
		// Validación de datos de entrada
		if (monthlySalesMap.has(newMonth.value))
			throw {
				name: "MonthError",
				message: "El mes ya está incluido en la gráfica."
			}
		monthlySalesMap.set(newMonth.value, Number.parseInt(newAmount.value));
		//Recuento de totales
		initMonthlyTotalSales();

		//Actualizar gráfico
		monthlySalesChart.data.datasets[0].data = Array.from(monthlySalesMap.values());
		monthlySalesChart.data.labels = Array.from(monthlySalesMap.keys());
		monthlySalesChart.update();
	} catch (error){
		// Tratamiento de excepciones
		alert(error.message);
	} finally {
		// Reseteo de formulario
		cleanAddSaleForm();
	}
}
bAddSaleModal.addEventListener('click',addSale);

// Cargar select con nuevas options
function drawSelectMontlySales(){
	// Seleccionamos elemento usando id con jQuery
	let removeSales = $("#removeSales");
	// Eliminamos option del select.
	removeSales.empty();
	for (let [month, amount] of monthlySalesMap.entries()){
		// Creamos elemento option con jQuery
		let opt = $("<option>").val(month).text(month + ": " + amount);
		// Añadimos elemento al select.
		removeSales.append(opt);
	}
}
bDeleteSale.addEventListener('click',drawSelectMontlySales);

// Borrar meses de la colección
function removeMonthlySale(){
	let removeSales = document.getElementById("removeSales");
	// Borramos de la colección la venta.
	monthlySalesMap.delete(removeSales.value);
	// Actualizamos colección en el gráfico
	monthlySalesChart.data.datasets[0].data = Array.from(monthlySalesMap.values());
	monthlySalesChart.data.labels = Array.from(monthlySalesMap.keys());
	monthlySalesChart.update();
	// Actualizasmos la vista
	initMonthlyTotalSales();
	drawSelectMontlySales();
}
bRemoveSaleModal.addEventListener('click',removeMonthlySale);
