const titulo = document.querySelector("#titulo");
const masFrente = document.querySelector("#masFrente");
const frente = document.querySelector("#frente");
const fondo = document.querySelector("#fondo");


window.addEventListener("scroll", (event)=> {


    titulo.style.right = window.scrollY * 2 +"px";
    masFrente.style.bottom = window.scrollY * .5 + "px";
    frente.style.bottom = window.scrollY * 2 + "px";
    fondo.style.bottom = window.scrollY * 5 + "px";
})