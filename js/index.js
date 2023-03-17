// Navegacion por imagenes
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("autos").addEventListener("click", function () {
    localStorage.setItem("catID", 101);
    window.location = "products.html";
  });
  document.getElementById("juguetes").addEventListener("click", function () {
    localStorage.setItem("catID", 102);
    window.location = "products.html";
  });
  document.getElementById("muebles").addEventListener("click", function () {
    localStorage.setItem("catID", 103);
    window.location = "products.html";
  });
});
// Nombre o email en barra de nav
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
} else {
  document.getElementById(
    "navbar-nav"
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
}
// Cerrar sesion
document.getElementById("cerrarS").addEventListener("click", function (e) {
  localStorage.removeItem("datos");
});
