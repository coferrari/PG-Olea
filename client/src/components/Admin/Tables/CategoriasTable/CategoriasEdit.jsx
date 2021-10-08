import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { updateCategory } from "../../../../auth/admin";
import { confirmAlert } from "react-confirm-alert"; // Import
const CategoriasEdit = ({ id, nameCategory }) => {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState("");
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  const update = () => {
    confirmAlert({
      title: "Modificar la categoria",
      message: `Desea modificar ${nameCategory}`,
      buttons: [
        {
          label: "Si",
          onClick: async () => {
            console.log("onlick", id);
            await updateCat(id, input);
            alert("Se a cambiado el nombre de la categoria");
            window.location.reload(false);
          },
        },
        {
          label: "No",
          onClick: () => console.log("zs"),
        },
      ],
    });
  };
  const updateCat = async (id, name) => {
    console.log("update", id);
    await updateCategory(id, name);
  };
  return (
    <div>
      <Button variant="primary" onClick={() => setShow(true)}>
        Editar nombre
      </Button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Editar nombre
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              update();
              setShow(false);
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Nombre de la categoria</Form.Label>
              <Form.Control
                type="category"
                placeholder="Ingrese nombre de la categoria"
                name="texto"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button type="submit">Cambiar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default CategoriasEdit;
