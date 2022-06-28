import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { withRouter } from "react-router-dom";
import { Image } from "cloudinary-react";
import axios from "axios";
import authContext from "../../contexts/auth-context";
import DataTable from "react-data-table-component";
import { Button } from "react-bootstrap";
import ModalProductForm from "./ModalProductForm";
import Swal from "sweetalert2";
import { dispatch } from "react-hot-toast";

import {
  listProducts,
  listProduct,
  updateProductAction,
  deleteProductAction,
  individualProductReducer,
} from "../../redux/Product/ProductAction";

function ProductsArea({ history }) {
  const [role, setRole] = useState("user");
  const [imagePublicId, setImagePublicId] = useState(null);
  const context = useContext(authContext);
  const [addModalShow, setAddModalShow] = React.useState(false);
  const [editModalShow, setEditModalShow] = React.useState(false);

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);
  const { product } = useSelector((state) => state.individualProductReducer);

  useEffect(() => {
    axios
      .post("/user/check-role", {
        userId: context.userId,
      })
      .then((res) => setRole(res.data.role))
      .catch((err) => console.log(err));
  }, []);

  const goToDetails = (id) => {
    history.push(`/products-details/${id}`);
  };

  const openDeleteModal = (product, imagePublicId) => {
    dispatch(listProduct(product._id));
    setImagePublicId(imagePublicId);
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

  const openEditModal = (product) => {
    dispatch(listProduct(product._id));
    setEditModalShow(true);
  };

  const columns = [
    {
      name: "Image",
      selector: (row) => row.images,
      sortable: true,
      cell: (row) => (
        <Image
          cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
          publicId={row.image_public_id}
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
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "In Stock",
      selector: (row) => row.total_in_stock,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <Button
            onClick={() => openEditModal(row, row.image_public_id)}
            variant="primary btn-sm mr-2"
          >
            Edit
          </Button>
          <Button
            onClick={() => openDeleteModal(row, row.image_public_id)}
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
            <Button
              onClick={() => setAddModalShow(true)}
              variant="primary my-3"
            >
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
