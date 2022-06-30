import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import authContext from "../../contexts/auth-context";
import { Modal, Button, Form } from "react-bootstrap";
import validate from "./validateinfo";
import Swal from "sweetalert2";
import { Tabs, Tab } from "react-bootstrap";
import { Image } from "cloudinary-react";
import { Trash, StarFill, Star } from "react-bootstrap-icons";
import "./ModalProductForm.css";
import cloudinary from "cloudinary/lib/cloudinary";

import {
  listProducts,
  updateProductAction,
  deleteProductAction,
  addProductAction,
  listProduct,
  cleanProduct,
  updateProduct,
} from "../../redux/Product/ProductAction";

function ModalProductForm(props) {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.individualProductReducer);

  useEffect(() => {}, [product]);

  const closeHandler = () => {
    dispatch(cleanProduct());
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
            product.name,
            product.description,
            product.category,
            product.price,
            product.inStock,
            product.images,
            product.publicImage
          )
        );
        closeHandler();
        dispatch(listProducts());
        Swal.fire("Created!", "Your product has been created.", "success");
      }
    });
  };

  const editProduct = async (e) => {
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
            product._id,
            product.name,
            product.description,
            product.category,
            product.price,
            product.inStock,
            product.publicImage,
            product.images
          )
        );
        dispatch(listProducts());
        closeHandler();
        Swal.fire("Updated!", "Your product has been updated.", "success");
      }
    });
  };

  const deleteImage = async (image) => {
    let imageArray = product.images ? product.images : [];
    /* Delete Image pending */
    imageArray = imageArray.filter((e) => e !== image);
    dispatch(updateProduct("images", imageArray));
  };

  const addImage = async (e) => {
    e.preventDefault();
    let imageArray = product.images ? product.images : [];

    const formData = new FormData();
    formData.append("upload_preset", "vikings");
    formData.append("file", e.target.files[0]);

    const cloudinaryData = axios
      .post("https://api.cloudinary.com/v1_1/dev-empty/image/upload", formData)
      .then((res) => {
        if (res.statusText === "OK") {
          imageArray.push(res.data.public_id);
          dispatch(updateProduct("images", imageArray));
        }
      })
      .catch((err) => console.log(err));
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
              value={product.name}
              onChange={(e) => dispatch(updateProduct("name", e.target.value))}
            />
          </Form.Group>
          <Form.Group controlId="formProductDescription">
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              rows="3"
              placeholder="Enter Product Description"
              value={product.description}
              onChange={(e) =>
                dispatch(updateProduct("description", e.target.value))
              }
            />
          </Form.Group>
          <Form.Group controlId="formProductType">
            <Form.Label>Product Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product Category"
              value={product.category}
              onChange={(e) =>
                dispatch(updateProduct("category", e.target.value))
              }
            />
          </Form.Group>
          <Form.Group controlId="formProductPrice">
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Product Price"
              value={product.price}
              onChange={(e) => dispatch(updateProduct("price", e.target.value))}
            />
          </Form.Group>
          <Form.Group controlId="formProductStock">
            <Form.Label>Product In Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Product In Stock"
              value={product.inStock}
              onChange={(e) =>
                dispatch(updateProduct("inStock", e.target.value))
              }
            />
          </Form.Group>
          <Form.Group controlId="images" className="d-flex">
            {product.images && product.images.length
              ? product.images.map((image, index) => (
                  <div className="imgContainer" key={index}>
                    <Image
                      fluid="true"
                      cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                      publicId={image}
                      width="64"
                      crop="scale"
                      alt="product"
                      className="img-thumbnail m-2"
                    />
                    <Trash
                      className="imageDeleteIcon"
                      color="red"
                      size={24}
                      onClick={() => deleteImage(image)}
                    />
                    {image === product.publicImage ? (
                      <StarFill
                        className="imagePublicIcon"
                        color="royalblue"
                        size={24}
                      />
                    ) : (
                      <Star
                        className="imageNotPublicIcon"
                        color="royalblue"
                        size={24}
                        onClick={() =>
                          dispatch(updateProduct("publicImage", image))
                        }
                      />
                    )}
                  </div>
                ))
              : ""}
          </Form.Group>
          <Form.Group controlId="formProductImage">
            <Form.Label>Add Image</Form.Label>
            <Form.File
              accept="image/*"
              id="formProductImage"
              placeholder="Enter Product Image"
              onInput={(e) => {
                console.log(e.target.files[0]);
                addImage(e);
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
          <Button variant="primary" onClick={(e) => editProduct(e)}>
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
