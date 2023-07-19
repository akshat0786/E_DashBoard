const express = require("express");
require("./DB/config");
const User = require("./DB/User");
// const product = require("./DB/Product");
const app = express();
const cors = require("cors");
const Product = require("./DB/Product");
const Jwt = require("jsonwebtoken");
const jwtKey = "e-commerce";

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send({
        result: "Something went wrong please try after sometime.",
      });
    }
    // res.send(user, { auth: token });
    res.send({ result, auth: token });
  });
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send({
            result: "Something went wrong please try after sometime.",
          });
        }
        // res.send(user, { auth: token });
        res.send({ user, auth: token });
      });
    } else {
      res.send({ result: "No User Found" });
    }
  } else {
    res.send({ result: "No Result Found" });
  }
});

app.post("/add-product", verifyToken, async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
  console.log(result);
});

app.get("/products", verifyToken, async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No Product Found" });
  }
});

app.delete("/product/:id",verifyToken, async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/product/:id",verifyToken, async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No Result Found" });
  }
});

app.put("/product/:id",verifyToken, async (req, res) => {
  let result = await Product.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: req.body,
    }
  );
  res.send(result);
});

app.get("/search/:key", verifyToken, async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        res.status(401).send({ result: "Please Provide valid token" });
      } else {
        console.log('token verified')
        next();
      }
    });
  } else {
    res.status(403).send({ result: "PLease add token with header" });
  }
}

app.listen(5000);
