const url = "https://pokeapi.co/api/v2/pokemon";
const newDiv = document.createElement("div");


fetch(url).then(
    respuesta => {
        if(respuesta.ok)
            return respuesta.json();
    }
).then(
    datos => {
        for(let i =0;i<datos.results.length;i++){
            console.log(datos.results[i]);

            Peticion2(datos.results[i].url)
        }
        
    }
).catch(error => {

    console.error(error.message);

})

function Peticion2(url){
    fetch(url).then(respuesta => {
        if (respuesta.ok)
            return respuesta.json()
    }).then(
        datos =>{
            console.log(datos);
        }
    )
}


addEventListener("DOMContentLoaded" , (event) => {
    const contenedor = document.querySelector("#Contenido")
    contenedor.innerHTML =""
     for (let i = 1; i <= datos.results.length; i++) {

        const Agregar= `<label>${datos.results.name[i]}</label>
        <br>`;

        contenedor.innerHTML += Agregar;
    }
})

