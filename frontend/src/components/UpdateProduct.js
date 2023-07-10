import React, { useState } from "react";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");

  const updateProduct = () => {
    console.warn(name, price, category, company)
  }

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
