var prodID = localStorage.getItem("prodID");
var products_url = PRODUCT_INFO_URL + prodID;
var cont = document.getElementById("info");
// Info de producto
fetch(products_url)
  .then((response) => response.json())
  .then(function (data) {
    let htmlContentToAppend = `
        <h1 class="mt-3"><strong>${data.name}</strong><h1>
        <hr/>       
        <h3 class="my-2"><strong>Precio</strong></h3>
        <p class="h3 my-2">${data.cost}</p>
        <h3 class="my-2"><strong>Descripcion</strong></h3>
         <p class="h3 my-2">${data.description}</p>
        <h3 class="my-2"><strong>Descripcion</strong></h3>
        <p class="h3 my-2">${localStorage.getItem("CatName")}</p>
        <h3 class="my-2"><strong>Cantidad de vendidos</strong></h3>
        <p class="h3 my-2">${data.soldCount}</p>
              `;
    // Carrusel
    if (data.images.length > 0) {
      htmlContentToAppend += `<div id="carouselExampleControls" class="carousel slide my-4 col-12 col-lg-8 " data-bs-ride="carousel">
    <div class="carousel-inner ">
    <div class="carousel-item active ">
      <img src="${data.images[0]}" class="img-fluid w-100" alt="...">
    </div>}`;
      for (let i = 1; i < data.images.length; i++) {
        htmlContentToAppend += `
    <div class="carousel-item ">
      <img src="${data.images[i]}" class="img-fluid" alt="...">
    </div>}`;
      }
      htmlContentToAppend += `
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;
    } else {
      // Unica
      htmlContentToAppend += `<img src="${data.images[0]}" class="img-fluid" alt="...">`;
    }
    document.getElementById("info").innerHTML = htmlContentToAppend;
  });

// Comentarios
var com_url = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("prodID");

fetch(com_url)
  .then((response) => response.json())
  .then(function (data) {
    let coments = ``;
    for (let i = 0; i < data.length; i++) {
      coments += `<div class="list-group-item">
      <strong>${data[i].user}</strong> ${new Date(
        data[i].dateTime
      ).toLocaleDateString()} `;
      for (let a = 0; a < 5; a++) {
        if (a < data[i].score) {
          coments += `<span class="fa fa-star checked"></span>`;
        } else {
          coments += `<span class="fa fa-star"></span>`;
        }
      }
      coments += `
      <p class="col-12">${data[i].description}</p>
      </div>`;
    }
    document.getElementById("comentarios").innerHTML += coments;
  });
document.getElementById("Ingresar").addEventListener("click", function (e) {
  let comentario = document.getElementById("comentario");
  if (comentario) {
    let id = localStorage.getItem("datos").Nombre
      ? JSON.parse(localStorage.getItem("datos")).Nombre
      : JSON.parse(localStorage.getItem("datos")).Email;
    let puntuacion = document.getElementById("score");
    let coments = `<div class="list-group-item">
      <strong>${id}</strong> ${new Date().toLocaleDateString()} `;
    for (let a = 0; a < 5; a++) {
      if (a < puntuacion.value) {
        coments += `<span class="fa fa-star checked"></span>`;
      } else {
        coments += `<span class="fa fa-star"></span>`;
      }
    }
    coments += `<br>
      <p>${comentario.value}</p>
      </div>`;

    document.getElementById("comentarios").innerHTML += coments;
  }
});

// Productos relacionados
function setProdID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html";
}
fetch(products_url)
  .then((response) => response.json())
  .then(function (data) {
    var relacionados = data.relatedProducts;
    let html = `  `;
    for (let i = 0; i < relacionados.length; i++) {
      html += `<div class="col-8 col-sm-5 mx-2 border p-1 my-1">      
      <div onclick="setProdID(${relacionados[i].id})"  class=" list-group-item-action cursor-active ">
                        <img src=${relacionados[i].image} alt="${relacionados[i].name}" class="img-fluid"  >
                        <h3 class="text-center"> ${relacionados[i].name}</h3>
                    </div>
                </div>
`;
    }

    document.getElementById("Relacionados").innerHTML += html;
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
