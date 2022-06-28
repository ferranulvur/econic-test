import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import authContext from "../../contexts/auth-context";
import { Modal, Button, Form } from "react-bootstrap";
import validate from "./validateinfo";
import Swal from "sweetalert2";

import {
  listProducts,
  updateProductAction,
  deleteProductAction,
  addProductAction,
  listProduct,
  cleanProduct,
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
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.individualProductReducer);
  console.log(product);

  useEffect(() => {
    console.log(props.data);
    setName(props.data ? props.data.name : "");
    setDescription(props.data ? props.data.description : "");
    setProductImages(props.data ? props.data.images : "");
    setPrice(props.data ? props.data.price : "");
    setType(props.data ? props.data.type : "");
    setInStock(props.data ? props.data.total_in_stock : "");
  }, [props.data]);

  const closeHandler = () => {
    setName("");
    setDescription("");
    setType("");
    setImage("");
    setPrice("");
    setInStock("");
    setErrors("");

    props.onHide();
    dispatch(listProducts());
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Creating Product",
      text: "Are you sure you want to create this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, create it!",
    }).then((result) => {
      if (result.value) {
        dispatch(
          addProductAction(
            name,
            description,
            type,
            price,
            inStock,
            product_images
          )
        );
        closeHandler();
        Swal.fire("Created!", "Your product has been created.", "success");
      }
    });
  };

  const editProduct = async (
    e,
    id,
    name,
    description,
    image,
    type,
    price,
    instock
  ) => {
    e.preventDefault();
    Swal.fire({
      title: "Updating Product",
      text: "Are you sure you want to update this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.value) {
        dispatch(
          updateProductAction(
            id,
            name,
            description,
            type,
            price,
            instock,
            image
          )
        );
        closeHandler();
        Swal.fire("Updated!", "Your product has been updated.", "success");
      }
    });
  };

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
              accept="image/*"
              //value={product_images}
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
            onClick={(e) =>
              editProduct(
                e,
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
