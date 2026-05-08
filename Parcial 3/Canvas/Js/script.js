import { Cuadrado, Linea, Circulo, Sticker, Hexagono } from "./figuras.js";

const canvas = document.querySelector("#lienzo");
const ctx = canvas.getContext("2d");

// Inputs que utilizan las herramientas

const inputColorLinea = document.querySelector("#color_linea");
const inputColorRelleno = document.querySelector("#color_relleno");
const inputGrosor = document.querySelector("#grosor");
const inputImagen = document.querySelector("#input_imagen");

// Estados

const elementos = [];

const historial = [];
const rehacer = [];

const opciones = {
    pincel: false,
    linea: false,
    circulo: false,
    cuadrado: false,
    triangulo: false,
    borrador: false,
    sticker: false,
};

const posicionesCursor = {
    iniciales: { x: 0, y: 0 },
    finales: { x: 0, y: 0 }
};

let presionado = false;
let imagenSticker = null;

// Adaptacion mobil (no se mueve al dibujar)

canvas.style.touchAction = "none";

// Introducir sticker

inputImagen.addEventListener("change", (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
        imagenSticker = event.target.result;
    };

    reader.readAsDataURL(file);
});

// Eventos para PC y mobil

canvas.addEventListener("pointerdown", alPresionarClick);
canvas.addEventListener("pointermove", mientrasPrecionaClick);
canvas.addEventListener("pointerup", alSoltarClick);
canvas.addEventListener("pointerleave", alSoltarClick);

//

// herramientas
document.querySelector("#btn_pincel").onclick = () => cambiarOpcion("pincel");
document.querySelector("#btn_linea").onclick = () => cambiarOpcion("linea");
document.querySelector("#btn_cuadrado").onclick = () => cambiarOpcion("cuadrado");
document.querySelector("#btn_circulo").onclick = () => cambiarOpcion("circulo");
document.querySelector("#btn_hexagono").onclick = () => cambiarOpcion("triangulo");
document.querySelector("#btn_sticker").onclick = () => cambiarOpcion("sticker");
document.querySelector("#btn_borrador").onclick = () => cambiarOpcion("borrador");

// historial
document.querySelector("#btn_deshacer").onclick = deshacer;
document.querySelector("#btn_rehacer").onclick = reHacer;

// guardar
document.querySelector("#btn_guardar").onclick = guardarImagen;

// limpiar
document.querySelector("#btn_limpiar").onclick = limpiarLienzo;

// filtros
document.querySelector("#btn_bn").onclick = aplicarBlancoNegro;
document.querySelector("#btn_rojo").onclick = aplicarRojo;
document.querySelector("#btn_verde").onclick = aplicarVerde;
document.querySelector("#btn_azul").onclick = aplicarAzul;
document.querySelector("#btn_sepia").onclick = aplicarSepia;

// posicion del cursor

function obtenerPosicion(event){

    const rect = canvas.getBoundingClientRect();

    return{
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

// Opciones

function cambiarOpcion(opcion) {

    for (let key in opciones) {
        opciones[key] = false;
    }

    opciones[opcion] = true;
}

// Guardar el dibujo

function guardarImagen() {

    const imagen = canvas.toDataURL("image/png");

    const link = document.createElement("a");

    link.href = imagen;
    link.download = "Lienzo.png";

    link.click();
}

// Historial de movimientos

function guardarEstado() {

    historial.push(canvas.toDataURL());

    rehacer.length = 0;

    if (historial.length > 20) {
        historial.shift();
    }
}

function deshacer() {

    if (historial.length === 0) return;

    rehacer.push(canvas.toDataURL());

    const img = new Image();

    img.src = historial.pop();

    img.onload = () => {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(img, 0, 0);
    };
}

function reHacer() {

    if (rehacer.length === 0) return;

    historial.push(canvas.toDataURL());

    const img = new Image();

    img.src = rehacer.pop();

    img.onload = () => {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(img, 0, 0);
    };
}

// Creacion de elementos

function crearElemento() {

    const colorLinea = inputColorLinea.value;
    const colorRelleno = inputColorRelleno.value;
    const grosor = Number(inputGrosor.value);

    if (opciones.linea) {
        return new Linea(posicionesCursor, colorLinea, grosor);
    }

    if (opciones.cuadrado) {
        return new Cuadrado(posicionesCursor, colorLinea, colorRelleno, grosor);
    }

    if (opciones.circulo) {
        return new Circulo(posicionesCursor, colorLinea, colorRelleno, grosor);
    }

    if (opciones.triangulo) {
        return new Hexagono(posicionesCursor, colorLinea, colorRelleno, grosor);
    }

    if (opciones.sticker) {

        if (!imagenSticker) {

            alert("Sube una imagen primero");

            return null;
        }

        return new Sticker(posicionesCursor, imagenSticker);
    }

    return null;
}

// renderizado

function render() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    elementos.forEach(el => el.Dibujar(ctx));
}

// Dibujado

function alPresionarClick(event) {

    const pos = obtenerPosicion(event);

    posicionesCursor.iniciales.x = pos.x;
    posicionesCursor.iniciales.y = pos.y;

    presionado = true;
}

function mientrasPrecionaClick(event) {

    if (!presionado) return;

    const pos = obtenerPosicion(event);

    posicionesCursor.finales.x = pos.x;
    posicionesCursor.finales.y = pos.y;

    // ================= PINCEL =================

    if (opciones.pincel) {

        ctx.beginPath();

        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.moveTo(
            posicionesCursor.iniciales.x,
            posicionesCursor.iniciales.y
        );

        ctx.lineTo(
            posicionesCursor.finales.x,
            posicionesCursor.finales.y
        );

        ctx.strokeStyle = inputColorLinea.value;

        ctx.lineWidth = Number(inputGrosor.value);

        ctx.stroke();

        posicionesCursor.iniciales.x = posicionesCursor.finales.x;
        posicionesCursor.iniciales.y = posicionesCursor.finales.y;

        return;
    }

    // Borrador

    if (opciones.borrador) {

        const tamaño = Number(inputGrosor.value);

        ctx.clearRect(
            posicionesCursor.finales.x - tamaño / 2,
            posicionesCursor.finales.y - tamaño / 2,
            tamaño,
            tamaño
        );

        return;
    }

    // ================= FIGURAS =================

    const elemento = crearElemento();

    if (!elemento) return;

    render();

    elemento.Dibujar(ctx);
}

function alSoltarClick(event) {

    if (!presionado) return;

    const pos = obtenerPosicion(event);

    posicionesCursor.finales.x = pos.x;
    posicionesCursor.finales.y = pos.y;

    

    if (opciones.pincel || opciones.borrador) {

        guardarEstado();

        presionado = false;

        return;
    }

    const elemento = crearElemento();

    if (elemento) {
        elementos.push(elemento);
    }

    render();

    guardarEstado();

    presionado = false;
}

// Filtros

// blanco y negro

function aplicarBlancoNegro() {

    guardarEstado();

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {

        const promedio = (
            data[i] +
            data[i + 1] +
            data[i + 2]
        ) / 3;

        data[i] = promedio;
        data[i + 1] = promedio;
        data[i + 2] = promedio;
    }

    ctx.putImageData(imageData, 0, 0);
}

// escala rojos

function aplicarRojo() {

    guardarEstado();

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {

        data[i + 1] = 0;
        data[i + 2] = 0;
    }

    ctx.putImageData(imageData, 0, 0);
}

// escala verdes

function aplicarVerde() {

    guardarEstado();

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {

        data[i] = 0;
        data[i + 2] = 0;
    }

    ctx.putImageData(imageData, 0, 0);
}

// escala azul

function aplicarAzul() {

    guardarEstado();

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {

        data[i] = 0;
        data[i + 1] = 0;
    }

    ctx.putImageData(imageData, 0, 0);
}

// sepia

function aplicarSepia() {

    guardarEstado();

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {

        const rojo = data[i];
        const verde = data[i + 1];
        const azul = data[i + 2];

        data[i] = Math.min(255, (rojo * 0.393) + (verde * 0.769) + (azul * 0.189));

        data[i + 1] = Math.min(255, (rojo * 0.349) + (verde * 0.686) + (azul * 0.168));

        data[i + 2] = Math.min(255, (rojo * 0.272) + (verde * 0.534) + (azul * 0.131));
    }

    ctx.putImageData(imageData, 0, 0);
}

// limpiar el lienzo

function limpiarLienzo() {

    guardarEstado();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    elementos.length = 0;
}