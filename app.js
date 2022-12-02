const express = require("express");
const fs = require("fs");
const app = express();
let cors = require("cors");
app.use(cors());

// Categorias en general
app.get("/categorias", function (req, res) {
  res.sendFile("./emercado-api-main/cats/cat.json", {
    root: __dirname,
  });
});
// Categoria especifica
app.get("/categorias/:catID", function (req, res) {
  res.sendFile(
    "./emercado-api-main/cats_products/" + req.params.catID + ".json",
    {
      root: __dirname,
    }
  );
});
// Productos por id
app.get("/productos/:prodID", function (req, res) {
  res.sendFile("./emercado-api-main/products/" + req.params.prodID + ".json", {
    root: __dirname,
  });
});
// Carrito
app.get("/carrito/:user", function (req, res) {
  res.sendFile("./emercado-api-main/user_cart/" + req.params.user + ".json", {
    root: __dirname,
  });
});
app.get("/buy", function (req, res) {
  res.sendFile("./emercado-api-main/cart/buy.json", {
    root: __dirname,
  });
});
// Comentarios de productos
app.get("/comments/:prodID", function (req, res) {
  res.sendFile(
    "./emercado-api-main/products_comments/" + req.params.prodID + ".json",
    {
      root: __dirname,
    }
  );
});
app.listen(3000);
