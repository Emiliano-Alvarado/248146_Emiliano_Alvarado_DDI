class Figura {
    constructor(posicionesCursor, color_linea, color_relleno, grosor_linea) {
        this.posicionesCursor = {
            iniciales: { ...posicionesCursor.iniciales },
            finales: { ...posicionesCursor.finales }
        };

        this.color_linea = color_linea;
        this.color_relleno = color_relleno;
        this.grosor_linea = grosor_linea;
    }
}

export class Cuadrado extends Figura {
    constructor(posicionesCursor, color_linea="black", color_relleno="black", grosor_linea=5) {
        super(posicionesCursor, color_linea, color_relleno, grosor_linea);

        this.x = Math.min(this.posicionesCursor.iniciales.x, this.posicionesCursor.finales.x);
        this.y = Math.min(this.posicionesCursor.iniciales.y, this.posicionesCursor.finales.y);

        this.ancho = Math.abs(this.posicionesCursor.finales.x - this.posicionesCursor.iniciales.x);
        this.alto = Math.abs(this.posicionesCursor.finales.y - this.posicionesCursor.iniciales.y);
    }

    Dibujar(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color_relleno;
        ctx.strokeStyle = this.color_linea;
        ctx.lineWidth = this.grosor_linea;

        ctx.fillRect(this.x, this.y, this.ancho, this.alto);
        ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
    }
}

export class Circulo extends Figura {
    constructor(posicionesCursor, color_linea="black", color_relleno="black", grosor_linea=5) {
        super(posicionesCursor, color_linea, color_relleno, grosor_linea);

        const dx = this.posicionesCursor.finales.x - this.posicionesCursor.iniciales.x;
        const dy = this.posicionesCursor.finales.y - this.posicionesCursor.iniciales.y;

        this.radio = Math.sqrt(dx * dx + dy * dy);
        this.x = this.posicionesCursor.iniciales.x;
        this.y = this.posicionesCursor.iniciales.y;
    }

    Dibujar(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);

        ctx.fillStyle = this.color_relleno;
        ctx.strokeStyle = this.color_linea;
        ctx.lineWidth = this.grosor_linea;

        ctx.fill();
        ctx.stroke();
    }
}

export class Linea extends Figura {
    constructor(posicionesCursor, color_linea="black", grosor_linea=5) {
        super(posicionesCursor, color_linea, null, grosor_linea);
    }

    Dibujar(ctx) {
        
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.strokeStyle = this.color_linea;
        ctx.lineWidth = this.grosor_linea;

        ctx.moveTo(this.posicionesCursor.iniciales.x, this.posicionesCursor.iniciales.y);
        ctx.lineTo(this.posicionesCursor.finales.x, this.posicionesCursor.finales.y);

        ctx.stroke();
    }
}

export class Sticker extends Figura {
    constructor(posicionesCursor, urlImagen) {
        super(posicionesCursor);

        this.imagen = new Image();
        this.cargada = false;

        this.imagen.onload = () => {
            this.cargada = true;
        };

        this.imagen.src = urlImagen;
    }

    Dibujar(ctx) {
        if (!this.cargada) return;

        ctx.drawImage(
            this.imagen,
            this.posicionesCursor.iniciales.x,
            this.posicionesCursor.iniciales.y,
            this.imagen.width / 2,
            this.imagen.height / 2
        );
    }
}

export class Hexagono extends Figura {
    constructor(
        posicionesCursor,
        color_linea = "black",
        color_relleno = "transparent",
        grosor_linea = 5
    ) {
        super(posicionesCursor, color_linea, color_relleno, grosor_linea);
        
        this.x = this.posicionesCursor.iniciales.x;
        this.y = this.posicionesCursor.iniciales.y;

        const dx = this.posicionesCursor.finales.x - this.posicionesCursor.iniciales.x;
        const dy = this.posicionesCursor.finales.y - this.posicionesCursor.iniciales.y;

        this.radio = Math.sqrt(dx * dx + dy * dy);
    }

    Dibujar(ctx) {
        const sides = 6;
        const angleStep = (Math.PI * 2) / sides;

        ctx.beginPath();

        for (let i = 0; i < sides; i++) {
            const angle = i * angleStep;

            const x = this.x + this.radio * Math.cos(angle);
            const y = this.y + this.radio * Math.sin(angle);

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.closePath();

        ctx.fillStyle = this.color_relleno;
        ctx.strokeStyle = this.color_linea;
        ctx.lineWidth = this.grosor_linea;

        ctx.fill();
        ctx.stroke();
    }
}