const loading = document.querySelector("#loading")
const promesa = new Promise((resolve, reject) =>{
    let exito = true;
    setTimeout(function(){
        if(exito){
            resolve("la tarea se realizo")
        }
        else {
            reject("la tarea fallo")
        }
        
    }, 5000);
});

promesa.then((resultado)=>{
    console.log(resultado)
    loading.style.opacity ="0%"

}).catch((error)=>{
    console.log(error);
})

/*let peticionFetch = new Promise((resolve,reject) =>{
    const url = ""
    fetch(url).then(resultado =>{
        if(resultado.ok)
            return resultado.json()
    }).then(datos => {
        resolve(datos);
    }).catch(error => {
        reject(error);
    })
});

peticionFetch.then(resultadoPeticion =>{
    console.log(resultadoPeticion);
}).catch(error=>{
    console.log(error);
})*/