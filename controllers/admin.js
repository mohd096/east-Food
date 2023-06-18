const Product = require("../models/Products");
const Category = require("../models/Category");
const fs = require('fs')


exports.index_get = (req, res) => {
  res.render("admin/index");
};

exports.product = (req, res) => {
  let count = "";

  Product.count()
    .then(function (c) {
      count = c;
    })
    .catch(function (err) {
      console.log(err);
    });

  //declare the variable `products`
  let products = [];

  //get all products from the database
  Product.find({})
    .then(function (results) {
      //loop through the results and add each product to the `products` array
      results.forEach(function (result) {
        products.push(result);
      });
    })
    .catch(function (err) {
      console.log(err);
    });

  //render the `admin/products` template with the `products` and `count` variables
  res.render("admin/products", {
    products: products,
    count: count,
  });
};

/*
 Get add product
*/
exports.add_product_get = function (req, res) {
  let title = "";
  let desc = "";
  let price = "";
  var quantity = "";

  Category.find()
    .then(function (categories) {
      res.render("admin/add_product", {
        title: title,
        desc: desc,
        categories: categories,
        price: price,
        quantity: quantity,
        msg: "",
      });
    })
    .catch(function (err) {
      console.log(err);
    });
};
exports.add_product_post = async (req, res) => {
  try {
    const { title, price, desc,categories,quantity } = req.body;
    const img = fs.readFileSync(req.file.path);
    img.toString()

    const newProduct = new Product({
      title: title,
      desc: desc,
      categories: categories,
      price: price,
      quantity: quantity,
      img: req.file.filetitle
    });

    await newProduct.save();
    console.log("Saved to database");
    res.redirect('/products');
  } catch (error) {
    console.log(error);
    res.send('Something went wrong add-product-post');
  }
};