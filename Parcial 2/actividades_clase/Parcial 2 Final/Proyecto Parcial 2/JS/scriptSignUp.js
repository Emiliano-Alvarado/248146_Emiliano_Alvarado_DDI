const Registro = document.querySelector("#Registro")

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
    
//Esto es el constructor de la clase usuario

class Usuario {
    constructor(nom, ape, correo, contra) {
        this.nombre = nom;
        this.apellido = ape;
        this.correo = correo;
        this.contraseña = contra;
    }}

    //Esto es el codigo para la foto de perfil

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

//Esta es la funcion para inciar sesion

function Registrarse(){

    const form = document.getElementById("Registro");

    const nombre = form.nombre.value;
    const apellido = form.apellido.value;
    const correo = form.correo.value;
    const contraseña = form.contraseña.value;
    const confirmar = form.comfirmar.value;

    //Esto se activa en caso de que algo no este bien con el input del usuario

   
    if(!nombre || !apellido || !correo || !contraseña || !confirmar){
        alert("Todos los campos son obligatorios");
        return;
    }

    if(contraseña !== confirmar){
        alert("Las contraseñas no coinciden");
        return;
    }

    
    let Usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    
    const existe = Usuarios.find(user => user.correo === correo);
    if(existe){
        alert("Este correo ya está registrado");
        return;
    }

    
    const nuevoUsuario = {
        nombre,
        apellido,
        correo,
        contraseña
    };

    
    Usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(Usuarios));

    alert("Usuario registrado correctamente");

    
    form.reset();
}




