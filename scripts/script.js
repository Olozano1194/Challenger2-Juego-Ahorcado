const palabras = ["ALURA", "ORACLE", "ONE", "JAVASCRIPT"];
//var tablero = document.getElementById("canvas").getContext("2d");
let palabraSecreta = "";
let aciertos = 0;
let letras = [];
let errores = 6;
let letraIncorrecta = [];

convertirPalabra();

//palabra secreta
function escojerPalabraSecreta() {
    var palabra = palabras[Math.floor(Math.random() * palabras.length)];
    palabraSecreta = palabra;
   // console.log(palabraSecreta);

}

//verifica si la tecla que se precionó es una letra
//comparar la entradas de teclado
function compruebaLetra(key) {

    let estado = /^[A-Za-z]$/;
    if (estado.test(key)) {
    console.log(key);
    return false; // Es una letra válida
    } else {
    console.log(key);
    return true; // No es una letra válida
    }

}

function verificaLetra(keycode) {
    if (typeof keycode === "number" && keycode  >= 65 && keycode <= 90) {
        return true;
    } else {
        return false;
    }
}
//validar errores
function anhadirLetraIncorrecta(letra) {
    errores -= 1;
    letraIncorrecta.push(letra);
    dibujarVidaHorca(6 - errores);
    console.log(errores);
}

//boton de iniciar juego
window.onload = function nuevo_juego() {
    escojerPalabraSecreta();
    dibujeCanvas();
    dibujarLinea();

    aciertos = 0;
    errores = 6;
    letras = [];
    letraIncorrecta = [];

    document.onkeydown = (e) => {
        var tecla = e.key.toUpperCase();
        
        // Verificar si la tecla ingresada es una letra
        if (/^[A-Z]$/.test(tecla)) {
          // Verificar si la tecla ya fue ingresada antes
          if (!letras.includes(tecla)) {
            letras.push(tecla); // Agregar la tecla al array letras
            var letra = tecla;
            
            if (palabraSecreta.includes(tecla) && !letras.includes(tecla)) {
               for (var i = 0; i < palabraSecreta.length; i++) {
                 if (palabraSecreta[i] === letra) {
                   dibujarLetra(i);
                   //agregarAcierto(palabraSecreta[i]);
                   //verificarGanador();
                 }
               }
             } else if (!letraIncorrecta.includes(tecla) && !letras.includes(tecla)) {
               anhadirLetraIncorrecta(letra);
               dibujarLetraIncorrecta(letra, errores);
             }
            
            // Verificar si el jugador ganó después de procesar la letra ingresada
            comprobarSiGano();
          }
        }
      }
}


//esto sirve para la captura de las letras del teclado
function capturarTeclado(letra) {

    let btnSelecionada = document.getElementById("tecla" + letra);

    if (!letras.includes(letra)) {
        letras.push(letra);

        if (palabraSecreta.includes(letra)) {
            btnSelecionada.disabled = true;
            btnSelecionada.style.backgroundColor = "green";
            for (var i = 0; i < palabraSecreta.length; i++) {
                if (palabraSecreta[i] === letra) {
                    dibujarLetra(i);
                }
            }
        } else {
            btnSelecionada.style.backgroundColor = "red";
            btnSelecionada.disabled = true;
            anhadirLetraIncorrecta(letra);
            dibujarLetraIncorrecta(letra, errores);
        }
    }
    comprobarSiGano();

}

//comprobación si el jugador gano o no
function comprobarSiGano() {
    // Verificar si el jugador ganó
    let aciertosTemp = 0;
    for (var i = 0; i < palabraSecreta.length; i++) {
        if (letras.includes(palabraSecreta[i])) {
            aciertosTemp++;
        }
    }
    
    if (aciertosTemp == palabraSecreta.length) {
        Swal.fire({
            title: 'Acertaste!!!',
            text: 'la palabra adivinada era: ' + palabraSecreta,
            icon: 'success',
            background: 'rgb(255,255,255)',
            timer: 5000,
            timerProgressBar: true,
            backdrop: true,
            width: '20%',
            allowOutsideClick: false,
        })
        reload();
        escojerPalabraSecreta();
    }
    
    // Verificar si el jugador perdió
    if (errores <= 0) {
        Swal.fire({
            icon: 'error',
            title: 'PERDISTE!!!',
            text: 'La palabra adivinada era: ' + palabraSecreta,
            background: 'rgb(255,255,255)',
            timer: 5000,
            timerProgressBar: true,
            backdrop: true,
            width: '30%',
            allowOutsideClick: false,
        })
        reload();
        escojerPalabraSecreta();
    }
}

function agregarPalabra(){
    let nuevaPalabra = document.getElementById("agregarPalabra").value;

    // incluye la palabra que el usuario digitó en el array de las palabras a seren sorteadas
    if (nuevaPalabra !== "") {
        palabras.push(nuevaPalabra.toUpperCase());
        alert('La palabra fue guardada')


        // haz con que los componentes de la pantalla de agregar palabra desaparezcan
       // document.getElementById("div-aparece-agregar").style.display = "none";
            
            nuevo_juego();
            
    }
    else {
        alert("No hay escrito ninguna palabra")
    }
}

//funcion para guardar las palabras ingresadas por el usuario
function botonGuardar() {
    var contador = 0;
    var palabraNueva = document.getElementById('Ingrese-Palabra').value;

    for(var i = 0;  i<palabraNueva.length; i++){
        if(!palabraNueva[i].match(/^[a-zñ]$/i)){
            alert("Favor solo ingresar letras")
            contador=0;
            break;
        }
        contador++;
    }
    if (palabraNueva == "") {
        alert("casilla vacia, debe escribir una palabra de maximo 8 letras y en mayuscula");
     }else if (contador == palabraNueva.length) {
            palabraNueva = palabraNueva.toUpperCase();
            if (sessionStorage.getItem('data') == null) {
                sessionStorage.setItem('data', '[]');
            }
            var datosViejos = JSON.parse(sessionStorage.getItem('data'));
            datosViejos.push(palabraNueva)
            escojerPalabraSecreta();
            //JSON.stringify nos transforma el objeto javascript a string de json
            sessionStorage.setItem('data', JSON.stringify(datosViejos));

            location.href = "empezar_jugar.html"
        }
    
}

//esta funcion nos sirve para cuando se termine el juego, se reinicie todo, quede desde cero
function reload(){
    document.addEventListener("keydown", _ =>{
        location.reload();
    });
}

//esto nos sirve para convertir un string de la session strong a un objeto de js    
function convertirPalabra(){
    var conPalabra = JSON.parse(sessionStorage.getItem('data'));
    if (conPalabra) {
        var palab;
        for (var i = 0; i < conPalabra.length; i++) {
            if (conPalabra[i] != ['']) {
                palab = conPalabra[i]
                palabras.push(palab)
            }
        }
    }
}

/*function cancel(){  //asi se puede hacer una funcion cuando tenemos varios html
    location.href="";
} */




