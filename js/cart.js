var ids = [];
var costs = [];
function subtotal(cost, cant) {
  return cost * cant;
}
fetch("https://japceibal.github.io/emercado-api/user_cart/" + "25801" + ".json")
  .then((response) => response.json())
  .then(function (data) {
    console.log(data);

    for (let i = 0; i < data.articles.length; i++) {
      fetch(PRODUCT_INFO_URL + data.articles[0].id + ".json")
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
          costs.push(producto.cost);
          document.getElementById("tabla").innerHTML += html;
        });
    }
  });

document.addEventListener("input", function (evento) {
  for (let i = 0; i < ids.length; i++) {
    document.getElementById("sub" + ids[i]).innerHTML = `$ ${
      document.getElementById("quantity" + ids[i]).value * costs[i]
    }`;
  }
});
