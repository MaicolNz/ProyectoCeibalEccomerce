var ids = [];
// Calculo de subtotal
function subtotal(cost, cant) {
  return cost * cant;
}
fetch(CART_INFO_URL + "25801")
  .then((response) => response.json())
  .then(function (data) {
    for (let i = 0; i < data.articles.length; i++) {
      fetch(PRODUCT_INFO_URL + data.articles[0].id)
        .then((response) => response.json())
        .then(function (producto) {
          console.log(producto);
          let html = `<tr>
          <th><img src="${producto.images[0]}" width=50px></th>
          <td>${producto.name}</td>
          <td>${producto.currency} ${producto.cost}</td>
          <td><input type="number" id="quantity${
            producto.id
          }" name="quantity" min="1" max="10" value="1"></td>
          <td id="sub${producto.id}"> ${producto.currency} ${subtotal(
            producto.cost,
            1
          )}</td>
          </tr>`;
          ids.push(producto.id);
          document.getElementById("tabla").innerHTML += html;
          document.getElementById("subM").innerHTML = `${
            producto.currency
          } ${subtotal(producto.cost, 1)}`;
          document.getElementById("EnvioM").innerHTML = `${producto.currency} ${
            (5 / 100) * subtotal(producto.cost, 1)
          }`;
          document.getElementById("TotalM").innerHTML = `${producto.currency} ${
            subtotal(producto.cost, 1) + (5 / 100) * subtotal(producto.cost, 1)
          }`;
        });
    }
  });
// Mantener todos los numeros acordes
document.addEventListener("input", function (evento) {
  for (let i = 0; i < ids.length; i++) {
    fetch(PRODUCT_INFO_URL + ids[i])
      .then((response) => response.json())
      .then(function (producto) {
        var total =
          document.getElementById("quantity" + ids[i]).value * producto.cost;
        var totalV;
        document.getElementById("subM").innerHTML = `${producto.currency} ${
          document.getElementById("quantity" + ids[i]).value * producto.cost
        }`;
        document.getElementById("sub" + producto.id).innerHTML = `${
          producto.currency
        } ${
          document.getElementById("quantity" + ids[i]).value * producto.cost
        }`;
        //Envios//
        if (document.getElementById("premium").checked) {
          document.getElementById("EnvioM").innerHTML = `${
            producto.currency
          } ${Math.round((15 / 100) * total)}`;
          totalV = Math.round((15 / 100) * total);
        } else if (document.getElementById("express").checked) {
          document.getElementById("EnvioM").innerHTML = `${
            producto.currency
          } ${Math.round((7 / 100) * total)}`;
          totalV = Math.round((7 / 100) * total);
        } else if (document.getElementById("standard").checked) {
          document.getElementById("EnvioM").innerHTML = `${
            producto.currency
          } ${Math.round((5 / 100) * total)}`;
          totalV = Math.round((5 / 100) * total);
        }
        document.getElementById("TotalM").innerHTML = `${producto.currency} ${
          total + totalV
        }  `;
      });
  }
});
// Comprobar la forma de pago
function comprobarT() {
  if (document.getElementById("tarjeta").checked) {
    document.getElementById("numeroT").disabled = false;
    document.getElementById("codigoT").disabled = false;
    document.getElementById("vencT").disabled = false;
    document.getElementById("CB").disabled = true;
    document.getElementById("forma-de-pago").innerHTML = `Tarjeta`;
  } else if (document.getElementById("banco").checked) {
    document.getElementById("CB").disabled = false;
    document.getElementById("numeroT").disabled = true;
    document.getElementById("codigoT").disabled = true;
    document.getElementById("vencT").disabled = true;
    document.getElementById(
      "forma-de-pago"
    ).innerHTML = `Transeferncia bancaria`;
  }
}
// Verificar y mostrar alerta general
document.getElementById("Fin").addEventListener("click", function (e) {
  verificar();
  if (
    document.getElementById("Calle").value.length > 0 &&
    document.getElementById("Numero").value.length > 0 &&
    document.getElementById("Esquina").value.length > 0 &&
    (document.getElementById("premium").checked ||
      document.getElementById("express").checked ||
      document.getElementById("standard").checked) &&
    (document.getElementById("banco").checked ||
      document.getElementById("tarjeta").checked)
  ) {
    if (
      document.getElementById("CB").value.length > 0 ||
      (document.getElementById("numeroT").value.length > 0 &&
        document.getElementById("codigoT").value.length > 0 &&
        document.getElementById("vencT").value.length > 0)
    ) {
      document.getElementById(
        "alerta"
      ).innerHTML = `<div class="alert alert-success alert-dismissible" role="alert">
      Compra realizada!
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
    } else {
      document.getElementById(
        "alerta"
      ).innerHTML = `<div class="alert alert-danger alert-dismissible" role="alert">
      Faltan datos!
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
    }
  } else {
    document.getElementById(
      "alerta"
    ).innerHTML = `<div class="alert alert-danger alert-dismissible" role="alert">
    Faltan datos!
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
  }
});
// Verificar y mostrar alertas por tipo de error
function verificar() {
  if (document.getElementById("Calle").value.length === 0) {
    document.getElementById(
      "alertaCalle"
    ).innerHTML = `<p class="text-danger"> Debe ingresar una calle</p>
`;
  } else {
    document.getElementById("alertaCalle").innerHTML = ``;
  }
  if (document.getElementById("Numero").value.length === 0) {
    document.getElementById(
      "alertaNum"
    ).innerHTML = `<p class="text-danger"> Debe ingresar un numero valido</p>
`;
  } else {
    document.getElementById("alertaNum").innerHTML = ``;
  }
  if (document.getElementById("Esquina").value.length === 0) {
    document.getElementById(
      "alertaEsquina"
    ).innerHTML = `<p class="text-danger"> Debe ingresar una esquina</p>
`;
  } else {
    document.getElementById("alertaEsquina").innerHTML = ``;
  }
  if (
    document.getElementById("banco").checked ||
    document.getElementById("tarjeta").checked
  ) {
    let html = `<p class="text-danger">`;
    if (document.getElementById("tarjeta").checked) {
      if (document.getElementById("numeroT").value.length === 0) {
        html += `Debe ingersar un numero de tarjeta`;
      }
      if (document.getElementById("codigoT").value.length === 0) {
        html += `   Debe ingersar el codigo de tarjeta`;
      }
      if (document.getElementById("vencT").value.length === 0) {
        html += `     Debe ingersar el vencimiento de la tarjeta`;
      }
    }
    if (
      document.getElementById("numeroT").value.length > 0 &&
      document.getElementById("codigoT").value.length > 0 &&
      document.getElementById("vencT").value.length > 0
    ) {
      html = ``;
    }
    if (
      document.getElementById("banco").checked &&
      document.getElementById("CB").value.length === 0
    ) {
      html += `<p class="text-danger">Debe ingersar una cuenta bancaria`;
    }
    if (
      document.getElementById("tarjeta").checked &&
      document.getElementById("CB").value.length > 0
    ) {
      html = ``;
    }
    html += `</p>`;
    document.getElementById("alertaTipoPag").innerHTML = html;
  } else {
    document.getElementById(
      "alertaTipoPag"
    ).innerHTML = `<p class="text-danger"> Debe seleccionar una forma de pago</p>`;
  }
}
// Colocar nombre o email en la barra
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
// Cerrar sesion
document.getElementById("cerrarS").addEventListener("click", function (e) {
  localStorage.removeItem("datos");
});
