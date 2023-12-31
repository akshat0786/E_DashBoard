import React, { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
  const addProduct = async () => {
    console.warn(!name);
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "content-type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
  };

  return (
    <div className="register">
      <h1>ADD PRODUCT</h1>
      <input
        className="inputBox"
        type="text"
        value={name}
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
      />
      {error && !name && <span className="err-msg">Enter a valid name</span>}
      <input
        className="inputBox"
        type="text"
        placeholder="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {error && !price && <span className="err-msg">Enter a valid price</span>}

      <input
        className="inputBox"
        value={category}
        type="text"
        placeholder="category"
        onChange={(e) => setCategory(e.target.value)}
      />
      {error && !category && (
        <span className="err-msg">Enter a valid category</span>
      )}

      <input
        className="inputBox"
        value={company}
        type="text"
        placeholder="company"
        onChange={(e) => setCompany(e.target.value)}
      />
      {error && !company && <span className="err-msg">Enter a valid company</span>}

      <button onClick={addProduct} className="form-btn">
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
