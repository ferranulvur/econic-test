import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { Image } from "cloudinary-react";
import axios from "axios";
import authContext from "../../contexts/auth-context";
import DataTable from "react-data-table-component";
import {Modal, Button, Form} from 'react-bootstrap';
import validate from './validateinfo';

function ModalProductForm(props) {

    console.log(props)
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [inStock, setInStock] = useState("");
    const [role, setRole] = useState("user");
    const [product, setProduct] = useState("");
    const [imagePublicId, setImagePublicId] = useState(null);
    const [product_images, setProductImages] = useState("");
    const context = useContext(authContext);
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [products, setProducts] = useState([]);  

    useEffect(() => {
        setName(props.data ? props.data.name : "");
        setDescription(props.data ? props.data.description : "");
        setProductImages(props.data ? props.data.images : "");
        setPrice(props.data ? props.data.price : "");
        setType(props.data ? props.data.type : "");
        setInStock(props.data ? props.data.total_in_stock : "");
    }, [props.data])

    console.log(name);

        const handleAddProduct = (e) => {
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
            
            axios
              .post("https://api.cloudinary.com/v1_1/dev-empty/image/upload", formData)
              .then((res) => {
                if (res.statusText === "OK") {
                  let image_public_id = res.data.public_id;
                  formData.append("image_public_id", image_public_id);
                  return axios
                    .post("/products/add-product", formData, {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    })
                    .then((res) => {
                      if (res.data.message === "Product added") {
                        setMessage(name + " added");
                        setName("");
                        setDescription("");
                        setType("");
                        setImage("");
                        setPrice("");
                        setInStock("");
                        setErrors('');
                      }
                    });
                }
              })
              .catch((err) => console.log(err));
        };
    
        const editProduct = (
            prod_id,
            prod_name,
            prod_description,
            prod_image,
            prod_type,
            prod_price,
            prod_instock,
            imagePublicId,
            prod_image_public_id
          ) => {
            const formData = new FormData();
            formData.append("product_id", prod_id);
            formData.append("product_name", prod_name);
            formData.append("product_description", prod_description);
        
            formData.append("product_type", prod_type);
            formData.append("product_price", prod_price);
            formData.append("total_in_stock", prod_instock);
            formData.append("image_public_id", prod_image);
            formData.append("upload_preset", "Northern Seeds");
        
            axios
              .post("/products/edit-product", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((res) => {
                if (res.data.message === "Product edited") {
                  return axios.get("/products/").then((res) => {
                    setProducts(res.data.products);
                  });
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
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                        console.log(name)
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
                    onChange={e => setType(e.target.value)}
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
                        console.log(e.target.files[0])
                        setProductImages(e.target.files[0])
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
              <Button variant="primary" onClick={() => editProduct(
                props.data._id,
                name,
                description,
                product_images,
                type,
                price,
                inStock)}>
                Save Changes
              </Button>
            )}
            <Button variant="danger" onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
        );
    

}

  export default ModalProductForm