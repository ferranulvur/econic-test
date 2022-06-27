import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/auth-context";
import PageTitle from "../../components/Common/PageTitle";
import CategoriesArea from "../../components/Categories/CategoriesArea";
import axios from "axios";
import Footer from "../../components/Footer/Footer";

function Categories() {
  const [categories, setCategories] = useState([]);
  const context = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("/categories/")
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((err) => console.log(err));
  }, []);

  const editCategory = (prod_id, prod_name, prod_description) => {
    const formData = new FormData();
    formData.append("category_id", prod_id);
    formData.append("category_name", prod_name);
    formData.append("category_description", prod_description);
    formData.append("upload_preset", "Northern Seeds");

    axios
      .post("/categories/edit-category", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.message === "Category edited") {
          return axios.get("/categories/").then((res) => {
            setCategories(res.data.categories);
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteCategory = (id) => {
    axios
      .post(`/categories/delete-category`, {
        categoryId: id,
      })
      .then((res) => {
        if (res.data.message === "Successfully Deleted") {
          setCategories(res.data.categories);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="categories-wrap">
      <PageTitle title="Categories" />
      <CategoriesArea
        categories={categories}
        editCategory={editCategory}
        deleteCategory={deleteCategory}
      />
      <Footer />
    </div>
  );
}

export default Categories;
