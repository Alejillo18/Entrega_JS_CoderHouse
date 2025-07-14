document.addEventListener("DOMContentLoaded", () => {
  const tema = document.getElementById("tema");
  const body = document.getElementById("bodytema");

  if (!tema || !body) return;

  let temaClaro = localStorage.getItem("temaClaro") !== "false";

  function aplicarTema() {
    if (temaClaro) {
      body.style.background = "linear-gradient(0deg, rgba(34, 193, 195, 1), rgba(253, 187, 45, 1))";
      body.style.color = "black";
      tema.innerHTML = `☀️`;
    } else {
      body.style.background = "linear-gradient(0deg, rgb(97, 124, 124), rgb(75, 68, 52))";
      body.style.color = "white";
      tema.innerHTML = `🌕`;
    }
  }

  aplicarTema();

  tema.addEventListener("click", () => {
    temaClaro = !temaClaro;
    localStorage.setItem("temaClaro", temaClaro);
    aplicarTema();
  });
});