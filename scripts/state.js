const state = {
  palabras: ["ALURA", "ORACLE", "ONE", "JAVASCRIPT"],
  palabraSecreta: "",
  aciertos: 0,
  letras: [],
  errores: 6,
  letraIncorrecta: [],
};

function initState() {
  const stored = JSON.parse(sessionStorage.getItem('data'));
  if (stored && Array.isArray(stored)) {
    stored.forEach(p => {
      if (p && !state.palabras.includes(p)) {
        state.palabras.push(p);
      }
    });
  }
}

initState();

export { state, initState };
