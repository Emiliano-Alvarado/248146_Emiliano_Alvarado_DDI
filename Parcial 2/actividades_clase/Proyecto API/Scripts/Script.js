const Regsitro = document.querySelector("#Registro")
const Usuarios   = [
    {
        nombre: "Emiliano",
        apellido: "Alvarado",
        correo: "Emiliano@gmail.com",
        contraseña :"eee"
    }
];
const Sesion = document.querySelector("#Sesion")
const url = "https://alexwohlbruck.github.io/cat-facts/docs/"



class Usuario {
    constructor(nom, ape, correo, contra) {
        this.nombre = nom;
        this.apellido = ape;
        this.correo = correo;
        this.contraseña = contra;
    }}

function Registrarse(){
    const datosFormulario = new FormData(Regsitro);

    const datos = Object.fromEntries(datosFormulario.entries());

    console.log(datos.contraseña);
    console.log(datos.comfirmar);

    if(datos.contraseña != datos.comfirmar){
        alert("La contraseña no es la misma!");
        console.log(datos.contraseña);
        console.log(datos.Comfirmar);
        //aqui va toda la logica del inicio de sesion  
    }
    else{
        alert("Se registro correctamente");

        Usuarios.push(new Usuario(datos.nombre, datos.apellido, datos.correo, datos.contraseña))

        console.log(Usuarios)
        window.location.href = "content.html"
    }
    
}

function InicioSesion (){
    const datosFormulario = new FormData(Sesion);

    const datos = Object.fromEntries(datosFormulario.entries());

    if(datos.correo == "" && datos.contraseña == ""){
        alert("sesion Iniciada correctamente");
        console.log(datos.correo);
        console.log(datos.contraseña);
        window.location.href = "content.html"

    }else{
        alert("El inicio de sesion no es valido");
    }
}

    


fetch(url).then(respuesta => {
    if(respuesta.ok){
        return respuesta.json()
    }
}).then(
    datos => {
        for (let i = 0; i < datos.results.length; i++) {
            PeticionFetch(datos.results[i].url);
        }
    }).catch((error)=>{

    })

function PeticionFetch(url) {
    fetch(url).then(respuesta => respuesta.json()).then(
        datos => {
            console.log(datos);
        })
}
