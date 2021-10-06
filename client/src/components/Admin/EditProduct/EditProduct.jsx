import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { getCategories } from "../../../redux/actions";
import { getToken } from "../../../utils/index";
import axios from "axios";
import { GET_PRODUCTS_URL } from "../../../consts";
import swal from "sweetalert";

export default function EditProduct() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoryReducer.categories);
  const [newProduct, setNewProduct] = useState({});

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${GET_PRODUCTS_URL}/create`, newProduct, {
      headers: {
        authorization: getToken(),
      },
    });

    return swal("Este producto ha sido modificado");
  };

  const onChangeInput = (e) => {
    console.log(newProduct);
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };
  const onChangeImage = (e) => {
    setNewProduct((previous) => {
      console.log(newProduct);
      return {
        ...previous,
        image: [e.target.value],
      };
    });
  };

  return (
    <div className="container">
      <div className="col-lg-4 mx-auto text-center">
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="nombre"
              placeholder="Ingrese nombre"
              name="name"
              onChange={(e) => {
                onChangeInput(e);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese Precio"
              name="price"
              onChange={(e) => {
                onChangeInput(e);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Imagenes</Form.Label>
            <Form.Control
              type="imagenes"
              placeholder="Ingrese Imagenes"
              name="imagenes"
              onChange={(e) => {
                onChangeImage(e);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              type="descripcion"
              placeholder="Ingrese Descripcion"
              name="description"
              onChange={(e) => {
                onChangeInput(e);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Categorias</Form.Label>
            <Form.Select
              name="categoryID"
              aria-label="Default select example"
              onChange={(e) => {
                onChangeInput(e);
              }}
            >
              <option>Seleccione una categoria</option>
              {categories?.map((cat) => {
                return (
                  <option name="categoryID" value={cat.id}>
                    {cat.nameCategory}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese Stock"
              name="stock"
              onChange={(e) => {
                onChangeInput(e);
              }}
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            Confirmar
          </Button>
        </Form>
      </div>{" "}
    </div>
  );
}
