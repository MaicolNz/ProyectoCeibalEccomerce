let datos = {};
// Comprobador
var boton = document.getElementById("Ingresar");
boton.addEventListener("click", function (evento) {
  var control = document.getElementsByClassName("form-control");
  var ok = true;
  for (let i = 0; i < control.length; i++) {
    if (control[i].value.length == 0) {
      ok = false;
    }
  }
  let objeto = document.getElementById("email");
  if (objeto.value) {
    datos.Email = objeto.value;
    localStorage.setItem("datos", JSON.stringify(datos));
  }

  if (ok) {
    window.location = "home.html";
  }
});
