//

let contenido = document.querySelector("#contenedor_contenido");
const boton =document.querySelector("#boton");
let bandera = false;

function cambiarColor (color) {
    contenido.style.background= color;
} 

function cambiarTamanio(ancho, alto) {
    contenido.style.width =ancho;
    contenido.style.height =alto;
} 

function cambiarTamanioIntervalo() {
    console.log("cambiar tamaño");
    contenido.style.width ="800px";
    contenido.style.height ="800px";
} 

boton.addEventListener("click" , () => {
    if(bandera){
        cambiarColor("white");
        cambiarTamanio("1000px", "1000px");
        bandera = false;
    }else{
        cambiarColor("blue");
        cambiarTamanio("500px", "500px");
        bandera = true;
    
    }
});

setInterval(cambiarTamanioIntervalo, 1000);