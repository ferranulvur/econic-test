import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import authContext from "../../contexts/auth-context";
import { Modal, Button, Form } from "react-bootstrap";
import validate from "./validateinfo";

import {
  listProducts,
  updateProductAction,
} from "../../redux/Product/ProductAction";

function ModalProductForm(props) {
  console.log(props);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState("");
  const [product_images, setProductImages] = useState("");
  const context = useContext(authContext);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);

  const fetchData = async () => {
    const { data } = await axios.get(
      `/products/fetch-product/${props.data._id}`,
      {
        headers: {
          //Authorization: `Bearer ${userInfo.user.token}`,
          "Content-Type": "application/json",
        },
      }
    );

    setName(data ? data.name : "");
    setDescription(data ? data.description : "");
    setProductImages(data ? data.images : "");
    setPrice(data ? data.price : "");
    setType(data ? data.type : "");
    setInStock(data ? data.total_in_stock : "");
  };

  const resetHandler = () => {
    setName("");
    setDescription("");
    setType("");
    setImage("");
    setPrice("");
    setInStock("");
    setErrors("");
  };

  const axiosHeaders = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("product_name", name);
    formData.append("product_description", description);
    formData.append("file", product_images);
    formData.append("product_type", type);
    formData.append("product_price", price);
    formData.append("total_in_stock", inStock);
    formData.append("upload_preset", "vikings");
    setErrors(validate(formData));

    const cloudinaryData = await axios.post(
      "https://api.cloudinary.com/v1_1/dev-empty/image/upload",
      formData
    );
    if (cloudinaryData.statusText === "OK") {
      let image_public_id = cloudinaryData.data.public_id;
      formData.append("image_public_id", image_public_id);
      const { data } = await axios
        .post("/products/add-product", formData, axiosHeaders)
        .then((res) => {
          if (res.data.message === "Product added") {
            setMessage(name + " added");
            resetHandler();
            props.onHide();
            dispatch(listProducts());
          }
        });
    }
  };

  const editProduct = () => {
    const formData = new FormData();
    dispatch(
      updateProductAction(
        props.data._id,
        name,
        description,
        type,
        price,
        inStock,
        image
      )
    );
    props.onHide();
    dispatch(listProducts());
  };

  useEffect(() => {
    fetchData();
  }, [props.data]);

  return (
    <Modal
      {...props}
      role="document"
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formProductName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                console.log(name);
              }}
            />
          </Form.Group>
          <Form.Group controlId="formProductDescription">
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              rows="3"
              placeholder="Enter Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formProductType">
            <Form.Label>Product Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formProductPrice">
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Product Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formProductStock">
            <Form.Label>Product In Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Product In Stock"
              value={inStock}
              onChange={(e) => setInStock(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formProductImage">
            <Form.Label>Product Image</Form.Label>
            <Form.File
              id="formProductImage"
              placeholder="Enter Product Image"
              onInput={(e) => {
                console.log(e.target.files[0]);
                setProductImages(e.target.files[0]);
              }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {props.type === "Add" ? (
          <Button variant="primary" onClick={handleAddProduct}>
            Add
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={() =>
              editProduct(
                props.data._id,
                name,
                description,
                product_images,
                type,
                price,
                inStock
              )
            }
          >
            Save Changes
          </Button>
        )}
        <Button variant="danger" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalProductForm;
