const Ship = document.querySelector("#ship")
const PikminSecreto =document.querySelector("#PikminSecreto")

//Esto mueve la nave de izquierda a derecha


window.addEventListener("scroll", (event)=> {
    console.log (window.scrollY)
    Ship.style.left = window.scrollY * 1.5 +".5px";
})



