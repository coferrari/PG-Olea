import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  InputGroup,
  Row,
  Col,
  Container,
  Image,
} from "react-bootstrap";
import { getCategories, getProductDetail } from "../../../redux/actions";
import { getToken } from "../../../utils/index";
import axios from "axios";
import { GET_PRODUCT_DETAIL_URL } from "../../../consts";
import swal from "sweetalert";
import { useParams } from "react-router";

export default function EditProduct() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoryReducer.categories);
  const product = useSelector(
    (state) => state.productDetailReducer.productDetail
  );
  const { productid } = useParams();
  const [newProduct, setNewProduct] = useState({});
  const [edit, setEdit] = useState(false);
  const [verImagenes, setVerImagenes] = useState({ compr: false, click: 0 });
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProductDetail(productid));
  }, [dispatch]);

  const handleSubmit = async (e) => {
   if(newProduct.image.length > 0 && newProduct.name.length > 0 && newProduct.description.length > 0 && newProduct.price > 0){ e.preventDefault();
    await axios.put(`${GET_PRODUCT_DETAIL_URL}/`, newProduct, {
      headers: {
        authorization: getToken(),
      },
    });

    return swal("Este producto ha sido modificado");}else swal("Debe llenar los campos correctamente")
  };
  const handleEdit = () => {
    if (verImagenes.click === 0) {
      setNewProduct(product);
      setVerImagenes({ click: 1, compr: !verImagenes.compr });
    } else setVerImagenes({ ...verImagenes, compr: !verImagenes.compr });
    console.log(newProduct);
  };
const onChangeInput = (e) => {
e.preventDefault()
setNewProduct({
  ...newProduct,
  [e.target.name]: e.target.value
})

}
  return (
    <div className="container">
      <div className="col-lg-4 mx-auto text-center">
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            
              <Form.Control
                type="nombre"
                name="name"
                defaultValue={product.name}
                onChange={(e) => onChangeInput(e)}
              />
            ) 
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese Precio"
              name="price"
              min="0"
              onChange={(e) => onChangeInput(e)}
              defaultValue={product.price}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Imagenes</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type="imagenes"
                placeholder="Ingrese Imagenes"
                name="imagenes"
              />
              <Button variant="outline-secondary">Añadir</Button>
            </InputGroup>
            <Form.Group className="mb-3">
              <Form.Label>Imagenes Cargadas</Form.Label>{" "}
              <span>
                <Button onClick={(e) => handleEdit(setNewProduct({
                  ...newProduct,
                  image: [...newProduct.image,e.target.value]
                }))}>Ver Imagenes</Button>
              </span>
              {verImagenes.compr ? (
                <Container>
                  {newProduct.image?.map((e) => (
                    <Row>
                      <Col xs={6} md={4}>
                        <Button
                          onClick={() =>
                            setNewProduct({
                              ...newProduct,
                              image: newProduct.image.filter((j) => j != e),
                            })
                          }
                        >
                          x
                        </Button>
                        <Image src={e} rounded />
                      </Col>
                    </Row>
                  ))}
                </Container>
              ) : (
                ""
              )}
            </Form.Group>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              as="textarea"
              style={{ height: "100px" }}
              type="descripcion"
              placeholder="Ingrese Descripcion"
              name="description"
              onChange={(e) => onChangeInput(e)}
              defaultValue={product.description}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Seleccione las Categorias</Form.Label>

            <div>
              {categories?.map((cat) => {
                return (
                  <span key={cat.id}>
                    <Button
                    // variant={
                    //   newProduct.categoryID.includes(cat.id)
                    //     ? "dark"
                    //     : "secondary"
                    // }
                    >
                      {cat.nameCategory}
                    </Button>{" "}
                  </span>
                );
              })}
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese Stock"
              name="stock"
              min="0"
              onChange={(e) => onChangeInput(e)}
              defaultValue={product.stock}
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            Agregar Producto
          </Button>
        </Form>
      </div>{" "}
    </div>
  );
}
