//desde aca comienza el metodo canvas, creación del canvas
function dibujeCanvas(){ //esta funcion es para crear la guillotina
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

function dibujarLinea(){ //esta funcion la usamos para colocar los guiones correspondientes
    if (!palabraSecreta || palabraSecreta.length === 0) return;
    
    const canvas = document.getElementById('canvas');
    const tablero = canvas.getContext('2d');

    //Obtener las dimensiones actuales
    const width = canvas.width;
    const height = canvas.height;

    //Configuración de la linea    
    tablero.lineWidth = 5; //Ancho de la linea basado en el ancho del canvas
    tablero.lineCap= "round";
    tablero.fillStyle= "#F3F5F6";
    tablero.strokeStyle= "#8A3871";

    //Calcular el ancho para cada linea
    const anchura = width * 0.6 / palabraSecreta.length; //Se usa porcentaje del ancho 

    for(let i=0; i < palabraSecreta.length; i++){
        tablero.moveTo((width * 0.1) + (anchura * i), height * 0.75); //Ajusta la posición Y
        tablero.lineTo((width * 0.15) + (anchura * i), height * 0.75); //Ajusta la posición Y
    }
    //Dibuja las lineas
    tablero.stroke();
    tablero.closePath();
}

//esta funcion nos ayuda a mostrar las letras correctas
function dibujarLetra(letra){
    const canvas = document.getElementById('canvas');
    const tablero = canvas.getContext('2d');

    const width = canvas.width;
    const height = canvas.height;

    tablero.font= `${0.06 * height}px Inter`;
    tablero.lineWidth = 0.2;
    tablero.lineCap= "round";
    tablero.lineJoin= "round";
    tablero.fillStyle = "#2A3871";
    
    //Calcula el ancho 
    var anchura=width * 1 / palabraSecreta.length;

    tablero.fillText(palabraSecreta[letra],(width * 0.1) + (anchura*letra), height * 0.65);
    
}

//esta funcion va a servir para mostrar las letras incorrectas
function dibujarLetraIncorrecta(letra, errorsLeft){
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

function dibujarVidaHorca(contador){
    const canvas = document.getElementById('canvas');
    const tablero = canvas.getContext('2d');

    //Obtenemos las dimensiones actuales
    const width = canvas.width;
    const height = canvas.height;

    tablero.strokeStyle = "#8A3871" ;
    tablero.lineWidth = 0.01 * width;

    tablero.beginPath();
    // Dibujar todas las partes acumulativamente hasta el contador actual
    if (contador >= 1) {
        // cabeza
        tablero.arc(width * 0.58, height * 0.27, 8, 0, Math.PI * 2);
    }
    if (contador >= 2) {
        // cuerpo
        tablero.moveTo(width * 0.58, height * 0.20);
        tablero.lineTo(width * 0.58, height * 0.38);
    }
    if (contador >= 3) {
        // brazo derecha
        tablero.moveTo(width * 0.58, height * 0.25);
        tablero.lineTo(width * 0.68, height * 0.29);
    }
    if (contador >= 4) {
        // brazo izquierda
        tablero.moveTo(width * 0.58, height * 0.25);
        tablero.lineTo(width * 0.48, height * 0.29);
    }
    if (contador >= 5) {
        // pierna derecha
        tablero.moveTo(width * 0.58, height * 0.38);
        tablero.lineTo(width * 0.68, height * 0.42);
    }
    if (contador >= 6) {
        // pierna izquierda
        tablero.moveTo(width * 0.58, height * 0.38);
        tablero.lineTo(width * 0.48, height * 0.42);
    }
    tablero.stroke();
    tablero.closePath();
}

function redibujarTodo() {
    const canvas = document.getElementById('canvas');
    const tablero = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    tablero.clearRect(0, 0, width, height);

    dibujeCanvas();
    dibujarLinea();

    if (palabraSecreta) {
        for (let i = 0; i < letras.length; i++) {
            const letra = letras[i];
            if (palabraSecreta.includes(letra)) {
                for (let j = 0; j < palabraSecreta.length; j++) {
                    if (palabraSecreta[j] === letra) {
                        dibujarLetra(j);
                    }
                }
            }
        }

        for (let i = 0; i < letraIncorrecta.length; i++) {
            const letra = letraIncorrecta[i];
            const errorsLeft = 6 - (i + 1);
            dibujarLetraIncorrecta(letra, errorsLeft);
        }

        const numErrors = 6 - errores;
        for (let i = 1; i <= numErrors; i++) {
            dibujarVidaHorca(i);
        }
    }
}

function resizeCanvas() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;
    redibujarTodo();
}

function init() {
    resizeCanvas();    
}

window.addEventListener('resize', resizeCanvas);
window.addEventListener('load', init);


