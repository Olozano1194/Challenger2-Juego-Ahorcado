import { state } from './state.js';

export function dibujeCanvas(){ //esta funcion es para crear la guillotina
    const canvas = document.getElementById('canvas');
    const tablero = canvas.getContext('2d');

    //obteniendo las dimensiones actuales 
    const width = canvas.width;
    const height = canvas.height;

    //Configurando las lineas
    tablero.lineWidth= 0.04 * width; //Porcentaje del ancho del canvas
    tablero.lineCap= "round";
    tablero.lineJoin= "round";
    tablero.fillStyle= "#F3F5F6";
    tablero.strokeStyle= "#8A3871";

    //limpiamos el canvas
    tablero.clearRect(0, 0, width, height);

    //Dibujar la base
    tablero.fillRect(0,0,width,height); //Cambia a las dimensiones del canvas

    //Estructura del ahorcado
    const baseY = height * 0.5; //Posición y de la base
    const columnX = width * 0.45; //Posición X de la columna
    const vigaX = width * 0.58; //Posición X de la viga
    const columnHeight = height * 0.5; //Altura de la columna

    //base
    tablero.beginPath();
    tablero.moveTo(width * 0.37, baseY);//Inicio de la linea base
    tablero.lineTo(width * 0.63, baseY); // Fin de la linea base
    
    //Columna
    tablero.moveTo(columnX, height * 0.1); //Parte superior de la columna
    tablero.lineTo(columnX, baseY); //Fin de la linea base

    //Viga  
    tablero.moveTo(vigaX, height * 0.1); //Parte superior de la viga
    tablero.lineTo(columnX, height * 0.1); //Parte inferior de la viga

    //Columna más pequeña
    tablero.moveTo(vigaX, height * 0.1);
    tablero.lineTo(vigaX, height * 0.15);

    //Dibuja las lineas
    tablero.stroke();
    tablero.closePath();
}

export function dibujarLinea(){ //esta funcion la usamos para colocar los guiones correspondientes
    if (!state.palabraSecreta || state.palabraSecreta.length === 0) return;
    
    const canvas = document.getElementById('canvas');
    const tablero = canvas.getContext('2d');

    //Obtener las dimensiones actuales
    const width = canvas.width;
    const height = canvas.height;

    //Calcular el ancho para cada linea
    const anchura = width * 0.6 / state.palabraSecreta.length; //Espaciado entre lineas
    const anchoLinea = Math.min(width * 0.05, anchura * 0.65); //Ancho de cada linea, se achica si hay muchas letras
    
    //Configuración de la linea  
    tablero.lineWidth = Math.min(5, anchoLinea * 0.3);
    tablero.lineCap= "round";
    tablero.fillStyle= "#F3F5F6";
    tablero.strokeStyle= "#8A3871";

    for(let i=0; i < state.palabraSecreta.length; i++){
        const centro = (width * 0.125) + (anchura * i);
        tablero.moveTo(centro - anchoLinea/2, height * 0.75);
        tablero.lineTo(centro + anchoLinea/2, height * 0.75);
    }
    //Dibuja las lineas
    tablero.stroke();
    tablero.closePath();
}

//esta funcion nos ayuda a mostrar las letras correctas
export function dibujarLetra(letra){
    const canvas = document.getElementById('canvas');
    const tablero = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    tablero.font = `${Math.min(width * 0.04, height * 0.04)}px Inter`;
    tablero.textAlign = 'center';
    tablero.lineWidth = 0.2;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.fillStyle = "#2A3871";
    const anchura = width * 0.6 / state.palabraSecreta.length;
    tablero.fillText(state.palabraSecreta[letra], (width * 0.125) + (anchura * letra), height * 0.68);
}

//esta funcion va a servir para mostrar las letras incorrectas
export function dibujarLetraIncorrecta(letra, errorsLeft){
    const canvas = document.getElementById('canvas');
    const tablero = canvas.getContext('2d');

    //Obtenemos las dimensiones actuales
    const width = canvas.width;
    const height = canvas.height;

    tablero.font= `${0.06 * height}px Inter`;
    tablero.lineWidth = 0.01 * width;
    tablero.lineCap= "round";
    tablero.lineJoin= "round";
    tablero.fillStyle = "#2A3871";

    //Posición X para dibujar la letra incorrecta
    const posX = (width * 0.2) + (0.05 * width * (10 - errorsLeft));

    //dibujar la letra
    tablero.fillText(letra, posX, height * 0.9); //se ajusta la posición Y
    
} 

export function dibujarVidaHorca(contador){
    const canvas = document.getElementById('canvas');
    const tablero = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    tablero.strokeStyle = "#8A3871";
    tablero.lineWidth = 0.01 * width;

    const headRadius = Math.min(width, height) * 0.025;
    const centerX = width * 0.58;
    const headY = height * 0.15 + headRadius * 1.8;   // cabeza colgando de la soga con espacio
    const bodyStartY = headY + headRadius * 0.8;  // cuello
    const bodyEndY = headY + headRadius * 3.5;    // largo del torso
    const armsY = bodyStartY + (bodyEndY - bodyStartY) * 0.4;
    const armLength = headRadius * 2;
    const legLength = headRadius * 1.8;

    tablero.beginPath();
    if (contador >= 1) {
        // cabeza
        tablero.arc(centerX, headY, headRadius, 0, Math.PI * 2);
    }
    if (contador >= 2) {
        // cuerpo
        tablero.moveTo(centerX, bodyStartY);
        tablero.lineTo(centerX, bodyEndY);
    }
    if (contador >= 3) {
        // brazo derecho
        tablero.moveTo(centerX, armsY);
        tablero.lineTo(centerX + armLength, armsY + armLength * 0.6);
    }
    if (contador >= 4) {
        // brazo izquierdo
        tablero.moveTo(centerX, armsY);
        tablero.lineTo(centerX - armLength, armsY + armLength * 0.6);
    }
    if (contador >= 5) {
        // pierna derecha
        tablero.moveTo(centerX, bodyEndY);
        tablero.lineTo(centerX + legLength, bodyEndY + legLength * 0.8);
    }
    if (contador >= 6) {
        // pierna izquierda
        tablero.moveTo(centerX, bodyEndY);
        tablero.lineTo(centerX - legLength, bodyEndY + legLength * 0.8);
    }
    tablero.stroke();
    tablero.closePath();
}

export function redibujarTodo() {
    const canvas = document.getElementById('canvas');
    const tablero = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    tablero.clearRect(0, 0, width, height);

    dibujeCanvas();
    dibujarLinea();

    if (state.palabraSecreta) {
        for (let i = 0; i < state.letras.length; i++) {
            const letra = state.letras[i];
            if (state.palabraSecreta.includes(letra)) {
                for (let j = 0; j < state.palabraSecreta.length; j++) {
                    if (state.palabraSecreta[j] === letra) {
                        dibujarLetra(j);
                    }
                }
            }
        }

        for (let i = 0; i < state.letraIncorrecta.length; i++) {
            const letra = state.letraIncorrecta[i];
            const errorsLeft = 6 - (i + 1);
            dibujarLetraIncorrecta(letra, errorsLeft);
        }

        const numErrors = 6 - state.errores;
        for (let i = 1; i <= numErrors; i++) {
            dibujarVidaHorca(i);
        }
    }
}

export function resizeCanvas() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;
    redibujarTodo();
}

export function init() {
    resizeCanvas();    
}

window.addEventListener('resize', resizeCanvas);
window.addEventListener('load', init);


