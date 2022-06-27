import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { Image } from "cloudinary-react";
import axios from "axios";
import authContext from "../../contexts/auth-context";
import DataTable from "react-data-table-component";
import { Modal, Button, Form } from "react-bootstrap";
import validate from "./validateinfo";

function ModalCategoryForm(props) {
  console.log(props);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [role, setRole] = useState("user");
  const context = useContext(authContext);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setName(props.data ? props.data.name : "");
    setSlug(props.data ? props.data.slug : "");
  }, [props.data]);

  const hideModal = () => {
    props.onHide();
  };
  const handleAddCategory = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category_name", name);
    formData.append("category_slug", slug);
    formData.append("upload_preset", "vikings");
    setErrors(validate(formData));

    axios
      .post("/categories/add-category", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.message === "Category added") {
          setMessage(name + " added");
          setName("");
          setSlug("");
          setErrors("");
          hideModal();
        }
      })
      .catch((err) => console.log(err));
  };

  const editCategory = (prod_id, prod_name, prod_slug) => {
    const formData = new FormData();
    formData.append("category_id", prod_id);
    formData.append("category_name", prod_name);
    formData.append("category_slug", prod_slug);

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
            hideModal();
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
          <Form.Group controlId="formCategoryName">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Category Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                console.log(name);
              }}
            />
          </Form.Group>
          <Form.Group controlId="formCategorySlug">
            <Form.Label>Category Slug</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              rows="3"
              placeholder="Enter Category Slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {props.type === "Add" ? (
          <Button variant="primary" onClick={handleAddCategory}>
            Add
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={() => editCategory(props.data._id, name, slug)}
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

export default ModalCategoryForm;
