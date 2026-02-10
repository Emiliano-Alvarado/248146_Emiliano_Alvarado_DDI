const Contenedor = document.querySelector("contenedor-grid")
const Elemento1 = document.querySelector("#Elemento1")
const Elemento2 = document.querySelector("#Elemento2")
const Elemento3 = document.querySelector("#Elemento3")
const Elemento4 = document.querySelector("#Elemento4")
const Elemento5 = document.querySelector("#Elemento5")
const Pikmin = document.querySelector("#RedPikmin")
const Pikmin2 = document.querySelector("#YellPikmin")
const Pikmin3 = document.querySelector("#BluePikmin")

Elemento1.addEventListener('mouseover',() =>{
    console.log("evento mouseover")

    Elemento1.style.opacity ="1" 

})

Elemento1.addEventListener('mouseout',() =>{
    console.log("evento mouseover")

    Elemento1.style.opacity="0" 

})

Elemento3.addEventListener('mouseover',() =>{
    console.log("evento mouseover")

    Pikmin.style.width = "200%"

})

Elemento3.addEventListener('mouseout',() =>{
    console.log("evento mouseover")

    Pikmin.style.width = "50%"

})

Elemento4.addEventListener('mouseover',() =>{
    console.log("evento mouseover")

    Pikmin2.style.height = "200%"

})

Elemento4.addEventListener('mouseout',() =>{
    console.log("evento mouseover")

    Pikmin2.style.height = "50%"

})

Elemento5.addEventListener('mouseover',() =>{
    console.log("evento mouseover")

    Pikmin3.style.height = "200%"
    Pikmin3.style.width = "200%"

})

Elemento5.addEventListener('mouseout',() =>{
    console.log("evento mouseover")

    Pikmin3.style.height = "50%"
    Pikmin3.style.width = "50%"

})

