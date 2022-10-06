var cat = localStorage.getItem("catID");
var products_url =
  "https://japceibal.github.io/emercado-api/cats_products/" + cat + ".json";
var div_cont = document.getElementsByClassName("pb-5 container");
fetch(products_url)
  .then((response) => response.json())
  .then(function (data) {
    let htmlContentToAppend = `
          <br>
<h1><center>Productos</center><h1>
        <h><center>Veras aqui todos los productos de la categoria <strong>${data.catName}</strong></center><h>       <br>
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
      <div onclick="setProdID(${product.id})"  class="list-group-item list-group-item-action cursor-active productos">
                        <div class="row">
                            <div class="col-3">
                                <img src="${product.image}"  class="img-thumbnail">
                            </div>
                            <div class="col">
                                <div class="d-flex w-100 justify-content-between">
                                    <h2 class="mb-1">${product.name} - ${product.currency} ${product.cost} </h2>
                                    <small class="text-muted"><font size = 4>${product.soldCount} vendidos </small>
                                </div>
                                <h4 class="mb-1">${product.description}</h4>
                            </div>
                       </div>
                       </div>
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
      <div class="list-group-item">
                        <div class="row">
                            <div class="col-3">
                                <img src="${product.image}"  class="img-thumbnail">
                            </div>
                            <div class="col">
                                <div class="d-flex w-100 justify-content-between">
                                    <h2 class="mb-1">${product.name} - ${product.currency} ${product.cost} </h2>
                                    <small class="text-muted"><font size = 4>${product.soldCount} vendidos </small>
                                </div>
                                <h4 class="mb-1">${product.description}</h4>
                            </div>
                       </div>
                       </div>
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
      <div class="list-group-item">
                        <div class="row">
                            <div class="col-3">
                                <img src="${product.image}"  class="img-thumbnail">
                            </div>
                            <div class="col">
                                <div class="d-flex w-100 justify-content-between">
                                    <h2 class="mb-1">${product.name} - ${product.currency} ${product.cost} </h2>
                                    <small class="text-muted"><font size = 4>${product.soldCount} vendidos </small>
                                </div>
                                <h4 class="mb-1">${product.description}</h4>
                            </div>
                       </div>
                       </div>
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
      <div class="list-group-item">
                        <div class="row">
                            <div class="col-3">
                                <img src="${product.image}"  class="img-thumbnail">
                            </div>
                            <div class="col">
                                <div class="d-flex w-100 justify-content-between">
                                    <h2 class="mb-1">${product.name} - ${product.currency} ${product.cost} </h2>
                                    <small class="text-muted"><font size = 4>${product.soldCount} vendidos </small>
                                </div>
                                <h4 class="mb-1">${product.description}</h4>
                            </div>
                       </div>
                       </div>
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
      <div class="list-group-item">
                        <div class="row">
                            <div class="col-3">
                                <img src="${product.image}"  class="img-thumbnail">
                            </div>
                            <div class="col">
                                <div class="d-flex w-100 justify-content-between">
                                    <h2 class="mb-1">${product.name} - ${product.currency} ${product.cost} </h2>
                                    <small class="text-muted"><font size = 4>${product.soldCount} vendidos </small>
                                </div>
                                <h4 class="mb-1">${product.description}</h4>
                            </div>
                       </div>
                       </div>
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
