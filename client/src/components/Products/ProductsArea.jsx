import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import authContext from "../../contexts/auth-context";

/* Components */
import { Button } from "react-bootstrap";
import { Image } from "cloudinary-react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import ModalProductForm from "./ModalProductForm";

/* Redux Actions */
import {
  listProducts,
  listProduct,
  updateProductAction,
  deleteProductAction,
  individualProductReducer,
  cleanProduct,
} from "../../redux/Product/ProductAction";

import { listCategories } from "../../redux/Category/CategoryAction";

function ProductsArea({ history }) {
  /* Auth */
  const context = useContext(authContext);

  /* useState Definitions */
  const [role, setRole] = useState("user");
  const [addModalShow, setAddModalShow] = React.useState(false);
  const [editModalShow, setEditModalShow] = React.useState(false);

  /* Redux */
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);
  const { product } = useSelector((state) => state.individualProductReducer);
  const { success } = useSelector((state) => state.productAddReducer);
  const { categories } = useSelector((state) => state.categoryReducer);

  /* Use Effect */
  useEffect(() => {
    axios
      .post("/user/check-role", {
        userId: context.userId,
      })
      .then((res) => setRole(res.data.role))
      .catch((err) => console.log(err));
    dispatch(listProducts());
    dispatch(listCategories());
  }, [success]);

  /* Helper Functions */
  /* Details */
  const goToDetails = (id) => {
    history.push(`/products-details/${id}`);
  };

  /* Modal Functions */

  /* Edit */
  const openAddModal = () => {
    dispatch(cleanProduct());
    setAddModalShow(true);
  };

  /* Delete */
  const openDeleteModal = (product) => {
    dispatch(listProduct(product._id));
    Swal.fire({
      title: "Delete Product!",
      text: `Are you sure you want to delete ${product.name} product?`,
      icon: "warning",
      confirmButtonText: "Yes, delete it!",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(product._id);
        dispatch(deleteProductAction(product._id));
        dispatch(listProducts());
        Swal.fire("Deleted!", "", "success");
      } else if (result.isDenied) {
      }
    });
  };

  /* Edit */
  const openEditModal = (product) => {
    dispatch(listProduct(product._id));
    setEditModalShow(true);
  };

  /* Datatable Columns Definition */
  const columns = [
    {
      name: "Image",
      selector: (row) => row.images,
      sortable: true,
      cell: (row) => (
        <Image
          onClick={() => goToDetails(row._id)}
          cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
          publicId={row.publicImage}
          width="64"
          crop="scale"
        />
      ),
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "In Stock",
      selector: (row) => row.inStock,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <Button
            onClick={() => openEditModal(row)}
            variant="primary btn-sm mr-2"
          >
            Edit
          </Button>
          <Button
            onClick={() => openDeleteModal(row)}
            variant="danger btn-sm mr-2"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <ModalProductForm
        show={addModalShow}
        onHide={() => setAddModalShow(false)}
        title="Add Product"
        type="Add"
        onSubmit={() => setAddModalShow(false)}
      />

      <ModalProductForm
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        title="Edit Product"
        type="Edit"
        data={product}
      />

      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <Button onClick={() => openAddModal()} variant="primary my-3">
              Add Product
            </Button>
          </div>
        </div>
        <DataTable columns={columns} data={products} />
      </div>
    </>
  );
}

export default withRouter(ProductsArea);
