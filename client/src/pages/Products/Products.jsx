import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/auth-context";
import PageTitle from "../../components/Common/PageTitle";
import ProductsArea from "../../components/Products/ProductsArea";
import axios from "axios";
import Footer from "../../components/Footer/Footer";

//actions
function Products() {
  const context = useContext(AuthContext);

  useEffect(() => {}, []);

  return (
    <div className="products-wrap">
      <PageTitle title="Products" />
      <ProductsArea />
      <Footer />
    </div>
  );
}

export default Products;
