import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { Image } from "cloudinary-react";
import axios from "axios";
import authContext from "../../contexts/auth-context";
import DataTable from "react-data-table-component";
import { Button } from "react-bootstrap";
import ModalProductForm from "./ModalProductForm";

function ProductsArea({ products, history, editProduct, deleteProduct }) {
  const [role, setRole] = useState("user");
  const [product, setProduct] = useState({
    name: "",
    description: "",
    image: "",
    type: "",
    price: "",
    inStock: "",
  });
  const [imagePublicId, setImagePublicId] = useState(null);
  const [product_images, setProductImages] = useState("");
  const context = useContext(authContext);
  const [addModalShow, setAddModalShow] = React.useState(false);
  const [editModalShow, setEditModalShow] = React.useState(false);

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
    setProduct(product);
    setImagePublicId(imagePublicId);
  };

  const openEditModal = (product, imagePublicId) => {
    setProduct(product);
    console.log(product);
    setEditModalShow(true);
  };

  const handleChange = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "Northern Seeds");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      "https://api.cloudinary.com/v1_1/dev-empty/image/upload",
      formData,
      config
    );

    setProductImages(data.public_id);
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
