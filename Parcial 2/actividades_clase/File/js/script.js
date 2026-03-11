/*
function leerArchivo(event){
    const archivo = event.target.files[0];
    if(archivo){
        if (archivo.type === "image/jpeg") {
            const lectorArchivo = new FileReader();

            lectorArchivo.onload = function(elemento){
                const contenido = elemento.target.result;
                const imagen = new Image();
                imagen.src = url_imagen;
                document.body.appendChild(imagen);

            }

            lectorArchivo.readAsDataURL(archivo);
        }
    }else{
        console.log("no se leyo el archivo");
    }
}
*/

document.querySelector("#input-imagen").addEventListener("change", (event) => {
    const url = leerArchivo(event.target.files[0]);
    url.then((dato) => {
        const imagen = document.querySelector("#imagen-seleccionada");
        imagen.src = dato;
    }).catch(
        () => {
            console.log("algo salio mal");
        }
    )
})

function leerArchivo(archivo){
    return new Promise((resolve, reject) => {
        if(archivo){
            if(archivo.type === "image/jpeg" || archivo.type === "image/png" || archivo.type === "image/webp"){
                const lectorArchivo = new FileReader();

                lectorArchivo.onload = (elemento) => {
                    const url_imagen = elemento.target.result;
                    resolve(url_imagen);
                }

                lectorArchivo.readAsDataURL(archivo);
            }
            else {
                console.log(archivo);
                reject();
            }
        }
        else {
            console.log(archivo);
            reject();
        }
    });
}
        