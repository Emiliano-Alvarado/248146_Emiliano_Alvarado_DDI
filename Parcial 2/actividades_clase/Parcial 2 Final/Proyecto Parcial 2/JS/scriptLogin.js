const AdminConfirmar = document.querySelector("#AdminConfirmar")

//Esto Activa y desactiva el estatus de admin al iniciar sesion

function Admin(){
    if(localStorage.getItem("EsAdmin") === "Verdadero"){
        localStorage.setItem("EsAdmin", "Falso")
        AdminConfirmar.textContent = "No es admin";

        //Esto muestra si se es admin sin necesidad de ver el local storage

}else{
        localStorage.setItem("EsAdmin","Verdadero");
        AdminConfirmar.textContent = "Es admin";
    }
}

//El constructor de la clase Usuario

class Usuario {
    constructor(nom, ape, correo, contra) {
        this.nombre = nom;
        this.apellido = ape;
        this.correo = correo;
        this.contraseña = contra;
    }
}

//Esto es la funcion para inciar sesion 

function InicioSesion(){

    const correoIngresado = document.getElementById("correo").value;
    const contraseñaIngresada = document.getElementById("contraseña").value;

    const Usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    //Esto busca entre los usuarios para ver si existe uno que coincida con lo ingresado

    const usuarioEncontrado = Usuarios.find(usuario => 
        usuario.correo === correoIngresado && 
        usuario.contraseña === contraseñaIngresada
    );

    if(usuarioEncontrado){
        alert("Se inicio sesion correctamente");

        //Esto indica en el local storage que hay sesion iniciada

        localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));

        window.location.href = "index.html";
    }else{
        alert("El inicio de sesion no es correcto");
    }
}
    