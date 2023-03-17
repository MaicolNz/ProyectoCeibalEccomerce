var cat = localStorage.getItem("catID");
var products_url = PRODUCTS_URL + cat;
var div_cont = document.getElementsByClassName("pb-5 container");
// Carga DOM y Mostramos productos
fetch(products_url)
  .then((response) => response.json())
  .then(function (data) {
    console.log(data);
    let htmlContentToAppend = `
        <h1><center>Productos</center><h1>
        <h2><center>Veras aqui todos los productos de la categoria <strong>${data.catName}</strong></center><h2>
`;
    document.getElementById("titulo").innerHTML = htmlContentToAppend;
  });
fetch(products_url)
  .then((response) => response.json())
  .then(function (data) {
    localStorage.setItem("CatName", data.catName);

    let htmlContentToAppend = ``;
    for (let i = 0; i < data.products.length; i++) {
      let product = data.products[i];
      htmlContentToAppend += `
      <article onclick="setProdID(${product.id})"  class=" justify-content-center my-4 list-group-item list-group-item-action cursor-active productos d-flex flex-wrap">
                            <div class="col-12 col-lg-6 d-flex justify-content-center ">
                                <img src="${product.image}"  class="img-thumbnail">
                            </div> 
                            <div class="col-12 col-lg-6 p-3 p-lg-1">
                                <h2 class="d -flex">${product.name} - ${product.currency} ${product.cost} </h2>
                                <small class="text-muted d-flex">${product.soldCount} vendidos </small>
                                <h3 >${product.description}</h3></div>
                       </article>
                       `;
    }

    document.getElementById("productos").innerHTML = htmlContentToAppend;
  });

//  Precio Ascendente

var OrdPreAsc = document.getElementById("Ascendente");

OrdPreAsc.addEventListener("click", function (evento) {
  fetch(products_url)
    .then((response) => response.json())
    .then(function (data) {
      let productosOrd = data.products;
      productosOrd.sort(function (a, b) {
        if (a.cost < b.cost) {
          return -1;
        }
        if (a.cost > b.cost) {
          return 1;
        }
        return 0;
      });
      let htmlContentToAppend = ``;
      for (let i = 0; i < productosOrd.length; i++) {
        let product = productosOrd[i];
        htmlContentToAppend += `
      <article onclick="setProdID(${product.id})"  class=" justify-content-center my-4 list-group-item list-group-item-action cursor-active productos d-flex flex-wrap">
                            <div class="col-12 col-lg-6 d-flex justify-content-center ">
                                <img src="${product.image}"  class="img-thumbnail">
                            </div> 
                            <div class="col-12 col-lg-6 p-3 p-lg-1">
                                <h2 class="d -flex">${product.name} - ${product.currency} ${product.cost} </h2>
                                <small class="text-muted d-flex">${product.soldCount} vendidos </small>
                                <h3 >${product.description}</h3></div>
                       </article>
                       `;
      }
      document.getElementById("productos").innerHTML = htmlContentToAppend;
    });
});

// Precio Descendente
var OrdPreAsc = document.getElementById("Descendente");

OrdPreAsc.addEventListener("click", function (evento) {
  fetch(products_url)
    .then((response) => response.json())
    .then(function (data) {
      let productosOrd = data.products;
      productosOrd.sort(function (a, b) {
        if (a.cost < b.cost) {
          return 1;
        }
        if (a.cost > b.cost) {
          return -1;
        }
        return 0;
      });
      let htmlContentToAppend = ``;
      for (let i = 0; i < productosOrd.length; i++) {
        let product = productosOrd[i];
        htmlContentToAppend += `
      <article onclick="setProdID(${product.id})"  class=" justify-content-center my-4 list-group-item list-group-item-action cursor-active productos d-flex flex-wrap">
                            <div class="col-12 col-lg-6 d-flex justify-content-center ">
                                <img src="${product.image}"  class="img-thumbnail">
                            </div> 
                            <div class="col-12 col-lg-6 p-3 p-lg-1">
                                <h2 class="d -flex">${product.name} - ${product.currency} ${product.cost} </h2>
                                <small class="text-muted d-flex">${product.soldCount} vendidos </small>
                                <h3 >${product.description}</h3></div>
                       </article>
                       `;
      }
      document.getElementById("productos").innerHTML = htmlContentToAppend;
    });
});

// Por Relevancia
var OrdPreAsc = document.getElementById("Relevancia");

OrdPreAsc.addEventListener("click", function (evento) {
  fetch(products_url)
    .then((response) => response.json())
    .then(function (data) {
      let productosOrd = data.products;
      productosOrd.sort(function (a, b) {
        if (a.soldCount < b.soldCount) {
          return 1;
        }
        if (a.soldCount > b.soldCount) {
          return -1;
        }
        return 0;
      });
      let htmlContentToAppend = ``;
      for (let i = 0; i < productosOrd.length; i++) {
        let product = productosOrd[i];
        htmlContentToAppend += `
      <article onclick="setProdID(${product.id})"  class=" justify-content-center my-4 list-group-item list-group-item-action cursor-active productos d-flex flex-wrap">
                            <div class="col-12 col-lg-6 d-flex justify-content-center ">
                                <img src="${product.image}"  class="img-thumbnail">
                            </div> 
                            <div class="col-12 col-lg-6 p-3 p-lg-1">
                                <h2 class="d -flex">${product.name} - ${product.currency} ${product.cost} </h2>
                                <small class="text-muted d-flex">${product.soldCount} vendidos </small>
                                <h3 >${product.description}</h3></div>
                       </article>
                       `;
      }
      document.getElementById("productos").innerHTML = htmlContentToAppend;
    });
});

// Rango Definido
var filtOk = document.getElementById("Filtrar");

filtOk.addEventListener("click", function (evento) {
  var min = document.getElementById("min").value;
  var max = document.getElementById("max").value;
  fetch(products_url)
    .then((response) => response.json())
    .then(function (data) {
      let productosFiltrados = data.products.filter(
        (number) => number.cost > min && number.cost < max
      );
      let htmlContentToAppend = ``;
      for (let i = 0; i < productosFiltrados.length; i++) {
        let product = productosFiltrados[i];
        htmlContentToAppend += `
      <article onclick="setProdID(${product.id})"  class=" justify-content-center my-4 list-group-item list-group-item-action cursor-active productos d-flex flex-wrap">
                            <div class="col-12 col-lg-6 d-flex justify-content-center ">
                                <img src="${product.image}"  class="img-thumbnail">
                            </div> 
                            <div class="col-12 col-lg-6 p-3 p-lg-1">
                                <h2 class="d -flex">${product.name} - ${product.currency} ${product.cost} </h2>
                                <small class="text-muted d-flex">${product.soldCount} vendidos </small>
                                <h3 >${product.description}</h3></div>
                       </article>
                       `;
      }
      document.getElementById("productos").innerHTML = htmlContentToAppend;
    });
});

//Setear id de productos en memoria

function setProdID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html";
}
// Email o nombre en navbar
let datos = JSON.parse(localStorage.getItem("datos"));
if (datos.Nombre) {
  document.getElementById(
    "navbar-nav"
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
