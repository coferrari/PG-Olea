import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Row, Col, Container, Image } from "react-bootstrap";
import { getCategories } from "../../../redux/actions";
import { getToken } from "../../../utils/index";
import axios from "axios";
import { editStock } from "../../../stock/index";
import swal from "sweetalert";
import { useParams } from "react-router";
import {
  GET_PRODUCTS_URL,
  ADD_CATEGORY_PRODUCT,
  DELET_CATEGORY_PRODUCT,
  GET_PRODUCT_DETAIL_URL,
} from "../../../consts";
import style from "./EditProduct.module.css";

export default function EditProduct() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoryReducer.categories);

  const { productid } = useParams();
  const [newProduct, setNewProduct] = useState({});
  const [editCats, setEditCats] = useState(false);

  const [verImagenes, setVerImagenes] = useState({ compr: false, click: 0 });
  useEffect(() => {
    dispatch(getCategories());
    init();
  }, [dispatch, productid]);
  const init = () => {
    axios.get(GET_PRODUCT_DETAIL_URL + productid).then((response) => {
      setNewProduct(response.data);
    });
  };

  const handleSubmit = async (e) => {
    {
      e.preventDefault();
      newProduct.stock &&
        (await editStock({
          stock: parseInt(newProduct.stock),
          productID: parseInt(productid),
        }));
      await axios.put(`${GET_PRODUCTS_URL}${productid}`, newProduct, {
        headers: {
          authorization: getToken(),
        },
      });

      return swal("Este producto ha sido modificado").then(function () {
        window.location = "/account";
      });
    }
  };
  const handleEdit = () => {
    if (verImagenes.click === 0) {
      setVerImagenes({ click: 1, compr: !verImagenes.compr });
    } else setVerImagenes({ ...verImagenes, compr: !verImagenes.compr });
  };
  const onChangeInput = (e) => {
    e.preventDefault();
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };
  const categoris = async (catID) => {
    if (!newProduct.categoryID.includes(catID)) {
      await axios.post(
        `${ADD_CATEGORY_PRODUCT}`,
        {
          categoriesID: [catID],
          productID: productid,
        },
        {
          headers: {
            authorization: getToken(),
          },
        }
      );
      setNewProduct({
        ...newProduct,
        categoryID: [...newProduct.categoryID, catID],
      });
    } else if (newProduct.categoryID.includes(catID)) {
      await axios.delete(`${DELET_CATEGORY_PRODUCT}`, {
        headers: {
          Authorization: getToken(),
        },

        data: {
          categoriesID: [catID],
          productID: productid,
        },
      });
      setNewProduct({
        ...newProduct,
        categoryID: newProduct.categoryID.filter((e) => e != catID),
      });
    }
  };
  const addImage = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "oleaproyecto");
    axios
      .post(
        "https://api.cloudinary.com/v1_1/oleaproyecto2021/image/upload",
        data
      )
      .then((response) => onAddImage(response.data.url));
  };
  const onAddImage = (image) => {
    if (!newProduct.image?.includes(image)) {
      setNewProduct({
        ...newProduct,
        image: [...newProduct.image, image],
      });
    } else if (newProduct.image?.includes(image)) {
      setNewProduct({
        ...newProduct,
        image: newProduct.image?.filter((e) => e != image),
      });
    }
  };

  return (
    <div className="container">
      <div className="col-lg-4 mx-auto text-center">
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="nombre"
              name="name"
              defaultValue={newProduct.name}
              onChange={(e) => onChangeInput(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese Precio"
              name="price"
              min="0"
              onChange={(e) => onChangeInput(e)}
              defaultValue={newProduct.price}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Group className="mb-3">
              <span>
                {verImagenes.compr ? (
                  <Form.Label>Agregar Imagenes</Form.Label>
                ) : (
                  <Button
                    onClick={(e) =>
                      handleEdit(
                        setNewProduct({
                          ...newProduct,
                          image: [...newProduct.image, e.target.value],
                        })
                      )
                    }
                  >
                    Agregar Imagenes
                  </Button>
                )}
              </span>
              {verImagenes.compr ? (
                <div>
                  <Form.Group className="mb-3">
                    <Form.Label>Subir Imagenes</Form.Label>
                    <div>
                      <span>
                        <i className="fas fa-camera"></i>

                        <input
                          type="file"
                          name="file"
                          id="file_up"
                          onChange={(e) => addImage(e)}
                        />
                      </span>
                    </div>
                  </Form.Group>
                  <Container className={style.containerimg}>
                    {newProduct.image?.map((e) => (
                      <Row key={e}>
                        <Col key={e} xs={6} md={4}>
                          <Button
                            key={e}
                            onClick={() =>
                              setNewProduct({
                                ...newProduct,
                                image: newProduct.image.filter((j) => j != e),
                              })
                            }
                          >
                            x
                          </Button>
                          <Image
                            key={e}
                            src={e}
                            rounded
                            className={style.img}
                          />
                        </Col>
                      </Row>
                    ))}
                  </Container>
                </div>
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
              defaultValue={newProduct.description}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Seleccione las Categorias</Form.Label>

            <div>
              {editCats ? (
                categories?.map((cat) => {
                  return (
                    <span key={cat.id}>
                      <Button
                        variant={
                          newProduct.categoryID?.includes(cat.id)
                            ? "dark"
                            : "secondary"
                        }
                        onClick={() => {
                          categoris(cat.id);
                        }}
                      >
                        {cat.nameCategory}
                      </Button>{" "}
                    </span>
                  );
                })
              ) : (
                <Button
                  onClick={() => {
                    setNewProduct({
                      ...newProduct,
                      categoryID: newProduct.categories.map((e) => e.id),
                    });

                    setEditCats(true);
                  }}
                >
                  Editar Categorias
                </Button>
              )}
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
              defaultValue={newProduct.stock}
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            Completar Edicion
          </Button>
        </Form>
      </div>
    </div>
  );
}
