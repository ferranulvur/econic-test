import React, { useState } from "react";
import axios from "axios";
import validate from "./validateinfo";

function AddProductArea() {
  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_images, setProductImages] = useState("");
  const [product_type, setProductType] = useState("");
  const [product_price, setProductPrice] = useState("");
  const [product_totalInStock, setTotalInStock] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleAddProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("product_name", product_name);
    formData.append("product_description", product_description);
    formData.append("file", product_images);
    formData.append("product_type", product_type);
    formData.append("product_price", product_price);
    formData.append("total_in_stock", product_totalInStock);
    formData.append("upload_preset", "vikings");
    setErrors(validate(formData));

    axios
      .post("/cloudinary/uploadIMage", formData)
      .then((res) => {
        if (res.statusText === "OK") {
          let image_public_id = res.data.public_id;
          formData.append("image_public_id", image_public_id);
          return axios
            .post("/products/add-product", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              if (res.data.message === "Product added") {
                setMessage(product_name + " added");
                setProductName("");
                setProductDescription("");
                setProductImages("");
                setProductType("");
                setProductPrice("");
                setTotalInStock("");
                setErrors("");
              }
            });
        }
      })
      .catch((err) => console.log(err));

    /*     axios
      .post("https://api.cloudinary.com/v1_1/dev-empty/image/upload", formData)
      .then((res) => {
        if (res.statusText === "OK") {
          let image_public_id = res.data.public_id;
          formData.append("image_public_id", image_public_id);
          return axios
            .post("/products/add-product", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              if (res.data.message === "Product added") {
                setMessage(product_name + " added");
                setProductName("");
                setProductDescription("");
                setProductType("");
                setProductImages("");
                setProductPrice("");
                setTotalInStock("");
                setErrors("");
              }
            });
        }
      })
      .catch((err) => console.log(err)); */
  };

  return (
    <div className="add-product-area-wrap ptb-50">
      <div className="container">
        <div className="add-product-form">
          {message !== "" && (
            <div className={`alert alert-success`} role="alert">
              {message}
            </div>
          )}
          <h2>Add Product</h2>
          <hr />
          <form onSubmit={handleAddProduct} encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="product_name">Product Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                id="product_name"
                value={product_name}
                onChange={(e) => setProductName(e.target.value)}
              />
              {product_name === "" && (
                <p className="error_color">{errors.product_name}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="product_description">Product Description</label>
              <textarea
                className="form-control"
                id="product_description"
                value={product_description}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Description"
              ></textarea>
              {product_description === "" && (
                <p className="error_color">{errors.product_description}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="product_images">Product Images</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => setProductImages(e.target.files[0])}
              />
              {product_images === "" && (
                <p className="error_color">{errors.product_images}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="product_type">Product Type</label>
              <select
                className="form-control"
                value={product_type}
                onChange={(e) => setProductType(e.target.value)}
              >
                <option>All Type</option>
                <option value="semillas_cannabis">Semillas Cannabis</option>
                <option value="semillas_feminizadas">
                  Semillas Feminizadas
                </option>
                <option value="semillas_autoflorecientes">
                  Semillas Autoflorecientes
                </option>
                <option value="productos_cbd">Productos de CBD</option>
                <option value="merchandising">Merchandising</option>
                <option value="hemp_foods">Hemp Foods</option>
                <option value="vaporizadores">Vaporizadores</option>
              </select>
              {product_type === "" && (
                <p className="error_color">{errors.product_type}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="product_price">Product Price</label>
              <input
                type="text"
                className="form-control"
                placeholder="Price"
                id="product_price"
                value={product_price}
                onChange={(e) => setProductPrice(e.target.value)}
              />
              {product_price === "" && (
                <p className="error_color">{errors.product_price}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="product_totalInStock">Total in stock</label>
              <input
                type="text"
                className="form-control"
                placeholder="Total in stock"
                id="product_totalInStock"
                value={product_totalInStock}
                onChange={(e) => setTotalInStock(e.target.value)}
              />
              {product_totalInStock === "" && (
                <p className="error_color">{errors.product_totalInStock}</p>
              )}
            </div>
            <button className="add-product-btn">
              <i className="flaticon-shopping-cart add-product-btn-icon"></i>Add
              Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProductArea;
