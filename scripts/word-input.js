import { state } from './state.js';

function botonGuardar() {
  let contador = 0;
  const palabraNueva = document.getElementById('Ingrese-Palabra').value;

  for (let i = 0; i < palabraNueva.length; i++) {
    if (!palabraNueva[i].match(/^[a-zñ]$/i)) {
      alert("Favor solo ingresar letras");
      contador = 0;
      break;
    }
    contador++;
  }

  if (palabraNueva === "") {
    alert("Casilla vacía, debe escribir una palabra de máximo 8 letras y en mayúscula");
  } else if (contador === palabraNueva.length) {
    const palabraUpper = palabraNueva.toUpperCase();
    let datosViejos = [];

    const stored = sessionStorage.getItem('data');
    if (stored) {
      datosViejos = JSON.parse(stored);
    }

    datosViejos.push(palabraUpper);
    sessionStorage.setItem('data', JSON.stringify(datosViejos));
    location.href = "empezar_jugar.html";
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('agregarPalabra');
  if (btn) {
    btn.addEventListener('click', botonGuardar);
  }
});
