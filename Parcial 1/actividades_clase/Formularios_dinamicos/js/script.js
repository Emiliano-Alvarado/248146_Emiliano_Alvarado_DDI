const nombre = document.querySelector("#input_txt_nombre")
const apellido = document.querySelector("#input_txt_apellido")
const boton_guardar = document.querySelector("#boton_guardar")


boton_guardar.addEventListener("click", (e) => {
    e.preventDefault();
    
    const usuario = new Usuario(nombre.value, apellido.value);
    console.log(usuario);
    //crear elementos
    const nombre_info = document.createElement("h2");
    nombre_info.textContent = usuario.nombre, usuario.apellido;
    document.body.appendChild(nombre_info);
})

class Usuario{
    constructor(nom, appe){
        this.nombre =nom;
        this.apellido =appe;
    }
}

