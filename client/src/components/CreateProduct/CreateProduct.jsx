import React from "react";

import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
export default function CreateProduct() {
  return (
    <div className="container">
      <div className="col-lg-4 mx-auto text-center">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="npmbre"
              placeholder="Ingrese nombre"
              name="nombre"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="precio"
              placeholder="Ingrese Precio"
              name="precio"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Imagenes</Form.Label>
            <Form.Control
              type="imagenes"
              placeholder="Ingrese Imagenes"
              name="imagenes"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              type="descripcion"
              placeholder="Ingrese Descripcion"
              name="descripcion"
            />
            <Form.Text className="text-muted">Hola</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
            />
          </Form.Group>
        </Form>
      </div>{" "}
    </div>
  );
}
