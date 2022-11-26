document.addEventListener("DOMContentLoaded", function (e) {
  let datos = JSON.parse(localStorage.getItem("datos"));
  if (datos.Nombre) {
    document.getElementById("Nombre").value = `${datos.Nombre}`;
  }

  if (datos.SNombre) {
    document.getElementById("SNombre").value = `${datos.SNombre}`;
  }
  if (datos.Apellido) {
    document.getElementById("Apellido").value = `${datos.Apellido}`;
  }
  if (datos.SApellido) {
    document.getElementById("SApellido").value = `${datos.SApellido}`;
  }
  document.getElementById("Email").value = `${datos.Email}`;

  if (datos.telefono) {
    document.getElementById("Telefono").value = `${datos.Telefono}`;
  }
});
let formulario = document.forms["datosN"];
console.log(formulario.SNombre.value);
formulario.addEventListener("submit", function (e) {
  let validacionN = formulario.Nombre.validity;
  let validacionA = formulario.Apellido.validity;
  let validacionE = formulario.Email.validity;
  if (!validacionN.valid) {
    document.getElementById("alerta-nombre").classList.remove("fade");
  } else {
    document.getElementById("dropdownMenuLink").innerHTML =
      formulario.Nombre.value;
  }
  if (!validacionA.valid) {
    document.getElementById("alerta-apellido").classList.remove("fade");
  }
  if (!validacionE.valid) {
    document.getElementById("alerta-email").classList.remove("fade");
  }
  e.preventDefault();
  guardarDatos();
});

function guardarDatos() {
  let datosN = {};
  datosN.Nombre = formulario.Nombre.value;
  if (formulario.SNombre.value.length > 0)
    datosN.SNombre = formulario.SNombre.value;
  datosN.Apellido = formulario.Apellido.value;
  if (formulario.SApellido.value.length > 0)
    datosN.SApellido = formulario.SApellido.value;
  datosN.Email = formulario.Email.value;
  if (formulario.Telefono.value.length > 0)
    datosN.Telefono = formulario.Telefono.value;
  localStorage.setItem("datos", JSON.stringify(datosN));
}

let datos = JSON.parse(localStorage.getItem("datos"));
if (datos.Nombre) {
  document.getElementById(
    "navbarNav"
  ).innerHTML += `<li class="nav-item"><div class="dropdown">
  <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
    ${datos.Nombre}
  </a>

  <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
    <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
    <li><a class="dropdown-item" href="index.html" id="cerrarS" 
>Cerrar sesión</a></li>
  </ul>
</div></li>`;
} else if (datos.Email) {
  document.getElementById(
    "navbarNav"
  ).innerHTML += `<li class="nav-item"><div class="dropdown">
  <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
    ${datos.Email}
  </a>

  <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
    <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
    <li><a class="dropdown-item" href="index.html" id="cerrarS" 
>Cerrar sesión</a></li>
  </ul>
</div></li>`;
} else {
  document.getElementById(
    "navbarNav"
  ).innerHTML += `<li class="nav-item"><div class="dropdown">
  <a class="btn btn-secondary dropdown-toggle disabled" href="#"">
    Debe logearse
  </a>`;
}
document.getElementById("cerrarS").addEventListener("click", function (e) {
  localStorage.removeItem("datos");
});
