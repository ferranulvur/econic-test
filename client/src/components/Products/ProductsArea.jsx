import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { Image } from "cloudinary-react";
import axios from "axios";
import authContext from "../../contexts/auth-context";
import DataTable from "react-data-table-component";
import {Button} from 'react-bootstrap';
import ModalProductForm from "./ModalProductForm";

function ProductsArea({ products, history, editProduct, deleteProduct }) {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState("");
  const [role, setRole] = useState("user");
  const [product, setProduct] = useState({"name": "", "description": "", "image": "", "type": "", "price": "", "inStock": ""});
  const [imagePublicId, setImagePublicId] = useState(null);
  const [product_images, setProductImages] = useState("");
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

  const handleChange = async e => {

    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "Northern Seeds");
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
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
      selector: row => row.images,
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
      selector: row => row.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: row => row.description,
      sortable: true,
    },
    {
      name: "Type",
      selector: row => row.type,
      sortable: true,
    },
    {
      name: "Price",
      selector: row => row.price,
      sortable: true,
    },
    {
      name: "In Stock",
      selector: row => row.total_in_stock,
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

      <ModalProductForm
        show={addModalShow}
        onHide={() => setAddModalShow(false)}
        title = "Add Product"
        type = "Add"
      />

      <ModalProductForm
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        title = "Edit Product"
        type = "Edit"
        data = {product}
      />

      <div className="container">
        <div className="row">
            <div className="col-md-4">
              <Button onClick={() => setAddModalShow(true)} variant = "primary my-3">
                Add Product
              </Button>
            </div>
        </div>
        <DataTable
          columns={columns}
          data={products}
        />
      </div>

      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">
                Delete - {product.name}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => deleteProduct(product._id, imagePublicId)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">
                Edit - {name}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    placeholder="Product Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="product_images">Product Images</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <select
                    className="form-control"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option>All Type</option>
                    <option value="semillas_cannabis">Semillas Cannabis</option>
                    <option value="semillas_feminizadas">Semillas Feminizadas</option>
                    <option value="semillas_autoflorecientes">Semillas Autoflorecientes</option>
                    <option value="productos_cbd">Productos de CBD</option>
                    <option value="merchandising">Merchandising</option>
                    <option value="hemp_foods">Hemp Foods</option>
                    <option value="vaporizadores">Vaporizadores</option>
                  </select>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Product Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Total in stock"
                    value={inStock}
                    onChange={(e) => setInStock(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                onClick={() =>
                  editProduct(
                    product._id,
                    name,
                    description,
                    product_images,
                    type,
                    price,
                    inStock
                  )
                }
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
    
  )

}

export default withRouter(ProductsArea);
