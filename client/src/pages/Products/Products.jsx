import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/auth-context";
import PageTitle from "../../components/Common/PageTitle";
import ProductsArea from "../../components/Products/ProductsArea";
import axios from "axios";
import Footer from "../../components/Footer/Footer";

import { useDispatch, useSelector } from "react-redux";

//actions
import { listProducts } from "../../redux/Product/ProductAction";

function Products() {
  const context = useContext(AuthContext);

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const editProduct = (
    prod_id,
    prod_name,
    prod_description,
    prod_image,
    prod_type,
    prod_price,
    prod_instock,
    imagePublicId,
    prod_image_public_id
  ) => {
    const formData = new FormData();
    formData.append("product_id", prod_id);
    formData.append("product_name", prod_name);
    formData.append("product_description", prod_description);

    formData.append("product_type", prod_type);
    formData.append("product_price", prod_price);
    formData.append("total_in_stock", prod_instock);
    formData.append("image_public_id", prod_image);
    formData.append("upload_preset", "Northern Seeds");

    axios
      .post("/products/edit-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.message === "Product edited") {
          dispatch(listProducts());
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteProduct = (id) => {
    axios
      .post(`/products/delete-product`, {
        productId: id,
      })
      .then((res) => {
        if (res.data.message === "Successfully Deleted") {
          dispatch(listProducts());
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="products-wrap">
      <PageTitle title="Products" />
      <ProductsArea
        products={products}
        editProduct={editProduct}
        deleteProduct={deleteProduct}
      />
      <Footer />
    </div>
  );
}

export default Products;
