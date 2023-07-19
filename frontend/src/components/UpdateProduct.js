import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    console.warn(params);
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  const updateProduct = async () => {
    console.warn(name, price, category, company);
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "Put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.warn(result);
    navigate("/");
  };

  return (
    <div className="register">
      <h1>UPDATE PRODUCT</h1>
      <input
        className="inputBox"
        type="text"
        value={name}
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="inputBox"
        type="text"
        placeholder="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        className="inputBox"
        value={category}
        type="text"
        placeholder="category"
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        className="inputBox"
        value={company}
        type="text"
        placeholder="company"
        onChange={(e) => setCompany(e.target.value)}
      />

      <button onClick={updateProduct} className="form-btn">
        Update
      </button>
    </div>
  );
};

export default UpdateProduct;
