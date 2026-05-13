import Swal from 'sweetalert2';
import { state } from './state.js';
import { dibujeCanvas, dibujarLinea, dibujarLetra, dibujarLetraIncorrecta, dibujarVidaHorca } from './canvas.js';

function getSwalWidth() {
  const w = window.innerWidth;
  if (w < 600) return '90%';
  if (w < 1024) return '60%';
  return '25%';
}

function escojerPalabraSecreta() {
  const palabra = state.palabras[Math.floor(Math.random() * state.palabras.length)];
  state.palabraSecreta = palabra;
}

function anhadirLetraIncorrecta(letra) {
  state.errores -= 1;
  state.letraIncorrecta.push(letra);
  dibujarVidaHorca(6 - state.errores);
}

function comprobarSiGano() {
  let aciertosTemp = 0;
  for (let i = 0; i < state.palabraSecreta.length; i++) {
    if (state.letras.includes(state.palabraSecreta[i])) {
      aciertosTemp++;
    }
  }

  if (aciertosTemp === state.palabraSecreta.length) {
    Swal.fire({
      title: 'Acertaste!!!',
      text: 'La palabra adivinada era: ' + state.palabraSecreta,
      icon: 'success',
      background: 'rgb(255,255,255)',
      timer: 5000,
      timerProgressBar: true,
      backdrop: true,
      width: getSwalWidth(),
      allowOutsideClick: false,
    });
    reiniciarJuego();
  }

  if (state.errores <= 0) {
    Swal.fire({
      icon: 'error',
      title: 'PERDISTE!!!',
      text: 'La palabra adivinada era: ' + state.palabraSecreta,
      background: 'rgb(255,255,255)',
      timer: 5000,
      timerProgressBar: true,
      backdrop: true,
      width: getSwalWidth(),
      allowOutsideClick: false,
    });
    reiniciarJuego();
  }
}

function reiniciarJuego() {
  document.addEventListener('keydown', _ => {
    location.reload();
  });
}

function nuevoJuego() {
  escojerPalabraSecreta();
  dibujeCanvas();
  dibujarLinea();

  state.aciertos = 0;
  state.errores = 6;
  state.letras = [];
  state.letraIncorrecta = [];

  document.onkeydown = (e) => {
    const tecla = e.key.toUpperCase();

    if (/^[A-Z]$/.test(tecla)) {
      if (!state.letras.includes(tecla)) {
        state.letras.push(tecla);

        if (state.palabraSecreta.includes(tecla)) {
          for (let i = 0; i < state.palabraSecreta.length; i++) {
            if (state.palabraSecreta[i] === tecla) {
              dibujarLetra(i);
            }
          }
        } else if (!state.letraIncorrecta.includes(tecla)) {
          anhadirLetraIncorrecta(tecla);
          dibujarLetraIncorrecta(tecla, 6 - state.errores);
        }

        comprobarSiGano();
      }
    }
  };
}

window.onload = nuevoJuego;
