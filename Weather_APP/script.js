let url = 'https://raw.githubusercontent.com/Albertux2/JSON/main/tiempo.json'
let actual = document.getElementById("today")

fetch(url)
.then(response => response.json())
.then(data => console.log(data));

async function fetchJSON(url){
	const respuesta = await fetch(url);
	const json = await respuesta.json();
	return json;
}

fetchJSON(url)
	.then(json=> {
			actual.innerHTML=`
			<img class="img-dia-actual" src="${json.Tiempo[0].Estado.Imagen}">			
			<h3 class="temperatura-dia-actual">${json.Tiempo[0].Temperatura}ºC</h3>
			<h2 class="nombre-estado">${json.Tiempo[0].Estado.Nombre}</h2>
			<h2 class="nombre-ciudad">${json.Ciudad}</h2>
			<h2 class="dia">Dia ${json.Tiempo[0].Dia}
			`
			document.getElementById("humedad").innerText=`${json.Tiempo[0].Humedad}%`
			document.getElementById("viento").innerText=`${json.Tiempo[0].Viento}km/h`
		let dia=0;
		for (const Tiempo of json.Tiempo) {
			if (!(Tiempo.Dia ==json.Tiempo[0].Dia)) {
			document.getElementById("dia"+dia).innerHTML=`
			<h2 class="dia-pronostico">Dia ${Tiempo.Dia}</h2>
			<img class="img-pronostico" src="${Tiempo.Estado.Imagen}">
			<h3 class="temperatura-pronostico">${Tiempo.Temperatura}ºC</h3>
			`
		}
			if (dia<3) {
				dia++;
			}
			
		}
	})