
const SubirContenido = document.querySelector("#SubirContenido");
const ListaDeArmas =document.querySelector("#ListaDeArmas")

//Esto hace que la opcion de subir contenido sea visible solo para un usuario admin

if(localStorage.getItem("EsAdmin") !== "Verdadero"){
    SubirContenido.style.display = "none";
    ListaDeArmas.style.display = "none";
}

//Esto es boton para que el administrador suba contenido

const input = document.getElementById("SubirJSON");
const contenedor = document.getElementById("contenedor");

input.addEventListener("change", function(e) {
    const archivo = e.target.files[0];
    if (!archivo) return;

    const lector = new FileReader();

    lector.onload = function(evento) {
        try {
            const data = JSON.parse(evento.target.result);

            //Esto guarda el JSON subido para que no se borre al refrescar
            localStorage.setItem("armas", JSON.stringify(data));

            mostrarTarjetas(data);

        } catch (error) {
            alert("El archivo JSON no es válido");
        }
    };

    lector.readAsText(archivo);
});

//Esta funcion crea las tarjetas en base al JSON

function mostrarTarjetas(data){
    contenedor.innerHTML = "";

    data.forEach(arma => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${arma.img}" width="100%">
            <h3>${arma.name}</h3>
            <p>${arma.Description}</p>
            <p><strong>Ubicación:</strong> ${arma.Location}</p>
        `;

        contenedor.appendChild(card);
    });
}

//Esto se aseguar de que se carge las tarejtas siempre y cuando el JSON haya sido guardado previamente

window.addEventListener("DOMContentLoaded", () => {
    const datosGuardados = localStorage.getItem("armas");

    if(datosGuardados){
        const data = JSON.parse(datosGuardados);
        mostrarTarjetas(data);
    }
});