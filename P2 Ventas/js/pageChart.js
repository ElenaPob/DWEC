// Charts
const monthCtx = document.getElementById("monthlySales").getContext("2d");
const deptCtx = document.getElementById("deptSales").getContext("2d");
const yearlyLabel = document.getElementById("yearlyTotal");

// 1:camera 2:movil 3:portatil 4:tablet form.name para guardar los productos
const newProduct = document.forms[0].inlineRadioOptions;

/*Manera de recoger los productos:

const product=document.getElementsByName('inlineRadioOptions');
    for(i=0; i<product.length; i++){
        if(product[i].checked){
            var inlineRadioOptions=product[i].checked;
        }
 
        if(inlineRadioOptions==true){
            inlineRadioOptions="Camera";
        }
        if(inlineRadioOptions==true){
            inlineRadioOptions="Móvil";
        }
        if(inlineRadioOptions==true){
            inlineRadioOptions="Portátil";
        }
        if(inlineRadioOptions==true){
            inlineRadioOptions="Tablet";
        }
 
    }

*/

const newAmount = document.getElementById("itemAmount");
const newMonth = document.getElementById("monthId");

//Colecciones para mostrar en gráficos. 1 por cada barra y dato
const monthlySalesMap = new Map();

let monthlySalesCamera = new Map();
let monthlySalesLaptop = new Map();
let monthlySalesPhone = new Map();
let monthlySalesTablet = new Map();

//Variables
let deptSales = new Map([['c', 0], ['m', 0], ['p', 0], ['t', 0]]);
let deptLabels = new Map([['Cámara', "c"], ['Móvil', "m"], ['Portátil', "p"], ['Tablet', "t"]]);
let yearlyTotal = 0;

// Bar
let monthlySalesChart = new Chart(monthCtx, {
	type: 'bar',
	data: {
		labels: Array.from(monthlySalesMap.keys()),
		datasets: [{
			label: 'Cámaras',
			data: Array.from(monthlySalesCamera.values()),
			backgroundColor: 'rgba(238,184,104,1)',
			borderWidth: 0
		},
		{
			label: 'Teléfonos',
			data: Array.from(monthlySalesPhone.values()),
			backgroundColor: 'rgba(75,166,223,1)',
			borderWidth: 0
		},
		{
			label: 'Portátiles',
			data: Array.from(monthlySalesLaptop.values()),
			backgroundColor: 'rgba(239,118,122,1)',
			borderWidth: 0
		},
		{
			label: 'Tablets',
			data: Array.from(monthlySalesTablet.values()),
			backgroundColor: 'rgba(40,167,69,1)',
			borderWidth: 0
		}]
	},
	options: {
		scales: {
			yAxes: [{
				ticks: {
					beginAtZero: true
				}
			}]
		}
	}
});

// Pie
let deptSalesChart = new Chart(deptCtx, {
	type: 'pie',
	data: {
		labels: Array.from(deptLabels.keys()),
		datasets: [{
			label: 'Número de ventas',
			data: Array.from(deptSales.values()),
			backgroundColor: [
				'rgba(238,184,104,1)',
				'rgba(75,166,223,1)',
				'rgba(239,118,122,1)',
				'rgba(40,167,69,1)',
			],
			borderWidth: 0
		}]
	},
	options: {}
});

function addYearlyTotal(a, b, c) {
  return a + b + c;
}

//Calcular la suma del mes
function initMonthlyTotalSales() {
  yearlyLabel.innerHTML = Array.from(monthlySalesMap.values()).reduce(function (count, value) {
      return count + value;
    }, 0) + "€";
}

initMonthlyTotalSales();

//Se resetean todos los valores de todos los mapas
function resetMonthlySales() {
  //Se borran todos los datos que hay en los map
  	monthlySalesMap.clear();
	monthlySalesCamera.clear();
	monthlySalesPhone.clear();
	monthlySalesLaptop.clear();
	monthlySalesTablet.clear();

	deptSalesChart.clear();

  //Se actualiza el grafico para pintarlo de nuevo
	monthlySalesChart.update();
	monthlySalesChart.reset();
	monthlySalesChart.render();

	
	deptSalesChart.update();
	deptSalesChart.reset();
	deptSalesChart.render();



	initMonthlyTotalSales();
	
}


//Encuentra el primer valor que sea mayor de 5000
function findOver5000() {
  let position = -1;
  let quantity = monthSales.find(function (elem, index) {
    if (elem > 5000) {
      position = index;
      return true;
    }
    return false;
  });
  alert("Cantidad: " + quantity + " Posición: " + position);
}

//Borra los datos del formulario
function cleanAddSaleForm() {
  newMonth.value = "";
  newAmount.value = "";
}

//Suma la cantidad del producto que se le introduzca
function sum(i, j) {
	let suma = i.get(j);
	suma += Number.parseInt(newAmount.value);
	i.set(j, suma);
}

//Funcion para agregar los productos al map
function addProduct(){
	//Coger el producto
	switch (newProduct.value) {
		case "camera"://Camara
			//Si existe el mes suma, sino lo crea
			if(monthlySalesCamera.has(newMonth.value)) {
				sum(monthlySalesCamera, newMonth.value);
			} else {
				monthlySalesCamera.set(newMonth.value, Number.parseInt(newAmount.value));
			}
			//Suma la cantidad para el Pie
			sum(deptSales, "c");
			break;
		case "phone"://Movil
			if(monthlySalesPhone.has(newMonth.value)) {
				sum(monthlySalesPhone, newMonth.value);
			} else {
				monthlySalesPhone.set(newMonth.value, Number.parseInt(newAmount.value));
			}
			//Suma la cantidad para el Pie
			sum(deptSales, "m");
			break;
		case "laptop"://Portatil
			if(monthlySalesLaptop.has(newMonth.value)) {
				sum(monthlySalesLaptop, newMonth.value);
			} else {
				monthlySalesLaptop.set(newMonth.value, Number.parseInt(newAmount.value));
			}
			//Suma la cantidad para el Pie
			sum(deptSales, "p");
			break;
		case "tablet": //tablet
			if(monthlySalesTablet.has(newMonth.value)) {
				sum(monthlySalesTablet, newMonth.value);
			} else {
				monthlySalesTablet.set(newMonth.value, Number.parseInt(newAmount.value));
			}
			//Suma la cantidad para el Pie
			sum(deptSales, "t");
			break;
	}
}

function addSale() {
  try {
		if(!(/^(\d{4})([\-.])(\d{2})$/.test(newMonth.value))) throw {name: "MonthError", message: "Seleccione un mes."}
    	if(NaN) throw {name: "AmountError", message: "El precio no es valido."}
    	if(NaN) throw {name: "ProductError", message: "Tiene que seleccionar un producto."}

		// Comprueba si el mes se ha pasado ya o no al Map
		if(monthlySalesMap.has(newMonth.value)) {
			sum(monthlySalesMap, newMonth.value);
			addProduct();
		} else {
			monthlySalesMap.set(newMonth.value, Number.parseInt(newAmount.value));
			addProduct();
		}

		//Se cuentan los totales
		initMonthlyTotalSales();

		//Pone valores al grafico
		monthlySalesChart.data.labels = Array.from(monthlySalesMap.keys());
		monthlySalesChart.data.datasets[0].data = Array.from(monthlySalesCamera.values());
		monthlySalesChart.data.datasets[1].data = Array.from(monthlySalesPhone.values());
		monthlySalesChart.data.datasets[2].data = Array.from(monthlySalesLaptop.values());
		monthlySalesChart.data.datasets[3].data = Array.from(monthlySalesTablet.values());

		monthlySalesChart.update();

		//Pone valores al Pie
		deptSalesChart.data.datasets[0].data = Array.from(deptSales.values());
		deptSalesChart.data.labels = Array.from(deptLabels.keys());

		deptSalesChart.update();

	} catch(error) {
    //Mensaje de error
		alert(error.message);
	} finally {
    //Para que siempre limpie el formulario
		cleanAddSaleForm();
	}
}


// Crear select con 
function drawSelectMonthlySales(){ 
  // Seleccionamos elemento usando id con jQuery 
  let removeSales = $("#removeSales"); 
  // Eliminamos option del select. 
	removeSales.empty();
  
  for (let [month, amount] of monthlySalesMap.entries()){ 
    // Creamos elemento option con jQuery 
    let opt = $("<option>").val(month).text(month + ": " + amount);
     //Añadimos elemento al select. 
     removeSales.append(opt); 
  } 

}

// Borra meses o productos de la colección
function removeMonthlySale() {
	let removeSales = document.getElementById("removeSales");

	if(removeSales.value != 0) {
		monthlySalesCamera.delete(removeSales.value);
		monthlySalesPhone.delete(removeSales.value);
		monthlySalesLaptop.delete(removeSales.value);
		monthlySalesTablet.delete(removeSales.value);
		monthlySalesMap.delete(removeSales.value);
	}

	monthlySalesChart.data.datasets[0].data = Array.from(monthlySalesCamera.values());
	monthlySalesChart.data.datasets[1].data = Array.from(monthlySalesPhone.values());
	monthlySalesChart.data.datasets[2].data = Array.from(monthlySalesLaptop.values());
	monthlySalesChart.data.datasets[3].data = Array.from(monthlySalesTablet.values());
	monthlySalesChart.data.labels = Array.from(monthlySalesMap.keys());
	monthlySalesChart.update();

	deptSalesChart.data.datasets[0].data = Array.from(deptSales.values());
	deptSalesChart.data.labels = Array.from(deptLabels.keys());
	deptSalesChart.update();

	initMonthlyTotalSales();
	drawSelectMonthlySales();
}