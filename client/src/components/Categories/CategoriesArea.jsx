import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import authContext from "../../contexts/auth-context";
import DataTable from "react-data-table-component";
import {Button} from 'react-bootstrap';
import ModalCategoryForm from "./ModalCategoryForm";

function CategoriesArea({ categories, history, editCategory, deleteCategory }) {

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [slug, setSlug] = useState("");
  const [inStock, setInStock] = useState("");
  const [role, setRole] = useState("user");
  const context = useContext(authContext);
  const [addModalShow, setAddModalShow] = React.useState(false);
  const [editModalShow, setEditModalShow] = React.useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .post("/user/check-role", {
        userId: context.userId,
      })
      .then((res) => setRole(res.data.role))
      .catch((err) => console.log(err));

  }, [addModalShow]);

  const goToDetails = (id) => {
    history.push(`/categories-details/${id}`);
  };

  const openDeleteModal = (category, imagePublicId) => {
    setCategory(category);
  };

  const openEditModal = (category, imagePublicId) => {
    setCategory(category);
    console.log(category);
    setEditModalShow(true);
  };

  const columns = [
    {
      name: "Name",
      selector: row => row.name,
      sortable: true,
    },
    {
      name: "Slug",
      selector: row => row.slug,
      sortable: true,
    },
    {
      name: "Products",
      selector: row => row.count,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <Button onClick={() => openEditModal(row, row.image_public_id)} variant = "primary btn-sm mr-2">
            Edit
          </Button>
          <Button onClick={() => openDeleteModal(row, row.image_public_id)} variant = "danger btn-sm mr-2">
            Delete
          </Button>
        </div>
      ),
    },
  ]

  return(
    <>   

      <ModalCategoryForm
        show={addModalShow}
        onHide={() => setAddModalShow(false)}
        title = "Add Category"
        type = "Add"
      />

      <ModalCategoryForm
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        title = "Edit Category"
        type = "Edit"
        data = {category}
      />

      <div className="container">
        <div className="row">
            <div className="col-md-4">
              <Button onClick={() => setAddModalShow(true)} variant = "primary my-3">
                Add Category
              </Button>
            </div>
        </div>
        <DataTable
          columns={columns}
          data={categories}
        />
      </div>
    </>
    
  )

}

export default withRouter(CategoriesArea);
