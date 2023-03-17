let datos = {};
// Save data

document.addEventListener("submit", function (evento) {
  evento.preventDefault();
  let objeto = document.getElementById("email");
  if (objeto.value) {
    datos.Email = objeto.value;
    localStorage.setItem("datos", JSON.stringify(datos));
  }
  window.location = "home.html";
});
