import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Modal } from "react-bootstrap";
import { createCategory } from "../../../auth/admin";
const CreateCategory = () => {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState("");
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCategory(input);
      alert("Se creo la categoria");
      setShow(false);
    } catch (err) {
      alert("a");
    }
  };
  return (
    <div>
      <Button variant="primary" onClick={() => setShow(true)}>
        Crear una categoria
      </Button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Crear una categoria
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Nombre de la categoria</Form.Label>
              <Form.Control
                type="category"
                placeholder="Ingrese nombre de la categoria"
                name="texto"
                onChange={(e) => handleInputChange(e)}
              />
            </Form.Group>
            <Button type="submit">Crear</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default CreateCategory;
