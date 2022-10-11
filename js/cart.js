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
          <td><input type="number" id="quantity" name="quantity" min="1" max="10" value="1"></td>
          <td> ${producto.currency} ${producto.cost}</td>
          </tr>`;
          document.getElementById("tabla").innerHTML += html;
        });
    }
  });
