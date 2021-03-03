const boton = document.getElementById("boton");
const contenedor = document.getElementById("contenedor");

boton.addEventListener("click", generarIconos);

function eliminarIcono(globo){
	globo.remove();
}

function generarIconos(){
	contenedor.remove();
	setInterval(iconos,1000);
}

function iconos() {
    const icono = document.createElement('div');

    icono.classList.add('icono');

    icono.innerHTML = '🎈';
    
    icono.style.left = Math.random() * 100 + "vw";

    document.body.appendChild(icono);

 	icono.style.animationDuration = Math.random() * 2 + 3 + "s";

    setTimeout(eliminarIcono, 4000, icono);

}

