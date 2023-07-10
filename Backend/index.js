const express = require("express");
require("./DB/config");
const User = require("./DB/User");
// const product = require("./DB/Product");
const app = express();
const cors = require("cors");
const Product = require("./DB/Product");

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  res.send(result);
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "No User Found" });
    }
  } else {
    res.send({ result: "No Result Found" });
  }
});

app.post("/add-product",async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
    console.log(result)
  }
);

app.listen(5000);
