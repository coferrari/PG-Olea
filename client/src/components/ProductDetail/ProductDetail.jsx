import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../../redux/actions/index";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  Modal,
  ProgressBar,
} from "react-bootstrap";
import Carousel from "../../components/Carousel/Carousel";
import { AiFillHtml5, AiFillStar } from "react-icons/ai";
import { updateCart } from "../../redux/actions/index";
import { isAuthorized, decodeToken } from "../../utils/index";
import { addOrEditCart, removeProductCart } from "../../cart/index";
import { reviewsByProduct } from "../../utils/reviews";
import Comment from "./CommentReviews.jsx";
import style from "./ProductReview.module.css";
export function ProductDetail() {
  const dispatch = useDispatch();
  const { idParams } = useParams();
  const [add, setAdd] = useState(false);
  const [remove, setRemove] = useState(false);
  const [reseñas, setReseñas] = useState();
  const [lgShow, setLgShow] = useState(false);
  const [puntuacion, setPuntuacion] = useState([0, 0, 0, 0, 0]);
  const validate = isAuthorized();
  const product = useSelector(
    (state) => state.productDetailReducer.productDetail
  );
  const { id, image, name, price } = useSelector(
    (state) => state.productDetailReducer.productDetail
  );
  const { productsCarrito } = useSelector((state) => state.carritoReducer);
  const quantity = 1;
  const getReviews = async (id) => {
    const reviews = await reviewsByProduct(id);
    setReseñas(reviews);
  };
  useEffect(() => {
    if (add) {
      const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));
      const cartAdded = [
        ...cartFromLocalStorage,
        { id, name, image, price, quantity },
      ];
      localStorage.setItem("cart", JSON.stringify(cartAdded));
      dispatch(updateCart(cartAdded));
      setAdd(false);
    }
    if (remove) {
      const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));
      const cartRemoved = cartFromLocalStorage.filter(
        (product) => product.id !== id
      );
      localStorage.setItem("cart", JSON.stringify(cartRemoved));
      dispatch(updateCart(cartRemoved));
      setRemove(false);
    }
  }, [add, remove]);

  const isInStore = productsCarrito.filter((product) => product.id === id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    setAdd(true);
    if (validate) {
      const user = decodeToken();
      const username = user.username;
      addOrEditCart({
        productID: id,
        quantity: quantity,
        username: username,
      });
    }
  };

  const handleRemoveFromCart = (e) => {
    e.preventDefault();
    setRemove(true);
    if (validate) {
      const user = decodeToken();
      const username = user.username;
      removeProductCart({
        productID: id,
        username: username,
      });
    }
  };
  const Rating = () => {
    const x = reseñas?.reduce((acc, el) => {
      return acc + parseInt(el.rating);
    }, 0);
    return x / reseñas?.length;
  };
  const tickets = () => {
    let [$1, $2, $3, $4, $5] = [0, 0, 0, 0, 0];
    reseñas?.forEach((el) => {
      parseInt(el.rating) === 1
        ? $1++
        : parseInt(el.rating) === 2
        ? $2++
        : parseInt(el.rating) === 3
        ? $3++
        : parseInt(el.rating) === 4
        ? $4++
        : $5++;
    });
    setPuntuacion([$1, $2, $3, $4, $5]);
  };

  console.log(puntuacion);
  const rating = Rating();
  useEffect(() => {
    dispatch(getProductDetail(idParams));
    getReviews(idParams);
  }, [dispatch, idParams]);
  console.log(reseñas);
  return (
    <div className="container">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Carousel img={product.image} />
          <Card.Title>{product?.name}</Card.Title>
          <Card.Text>{product?.description}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Precio: ${product?.price} </ListGroupItem>
          <ListGroupItem>
            {" "}
            <Button
              onClick={() => {
                setLgShow(true);
                tickets();
              }}
            >
              Large modal
            </Button>{" "}
          </ListGroupItem>
        </ListGroup>
        {isInStore.length === 0 && (
          <Button
            variant="dark"
            type="submit"
            onClick={(e) => handleAddToCart(e)}
          >
            Agregar al carrito
          </Button>
        )}
        {isInStore.length > 0 && (
          <Button
            variant="secondary"
            type="submit"
            onClick={(e) => handleRemoveFromCart(e)}
          >
            Eliminar del carrito
          </Button>
        )}
      </Card>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Opiniones sobre el producto
          </Modal.Title>
        </Modal.Header>
        {reseñas?.length >= 1 ? (
          <Modal.Body>
            <div className={style.h3}>
              <h5 className={style.titleh3}>{rating.toString().slice(0, 4)}</h5>
              <div className={style.barraspan}>
                <span className={style.spanbarra}>
                  <b>Votos por 5 estrellas</b>
                </span>
                <ProgressBar
                  variant="success"
                  className={style.barra}
                  now={(puntuacion[4] / reseñas?.length) * 100}
                />

                <span>
                  <b>Votos por 4 estrellas</b>
                </span>
                <ProgressBar
                  className={style.barra}
                  now={(puntuacion[3] / reseñas?.length) * 100}
                />
                <span>
                  <b>Votos por 3 estrellas</b>
                </span>
                <ProgressBar
                  className={style.barra}
                  now={(puntuacion[2] / reseñas?.length) * 100}
                />
                <span>
                  <b>Votos por 2 estrellas</b>
                </span>
                <ProgressBar
                  className={style.barra}
                  now={(puntuacion[1] / reseñas?.length) * 100}
                />
                <span>
                  <b>Votos por 1 estrellas</b>
                </span>
                <ProgressBar
                  className={style.barra}
                  now={(puntuacion[0] / reseñas?.length) * 100}
                />
              </div>
            </div>
            <div className={style.containerStars}>
              <AiFillStar className={rating >= 1 ? style.gold : style.dark} />
              <AiFillStar className={rating >= 2 ? style.gold : style.dark} />
              <AiFillStar className={rating >= 3 ? style.gold : style.dark} />
              <AiFillStar className={rating >= 4 ? style.gold : style.dark} />
              <AiFillStar className={rating >= 5 ? style.gold : style.dark} />
            </div>
            <div className={style.reseñas}>
              Promedio entre {reseñas.length} puntuaciones
            </div>
            <div>
              {reseñas?.map((c) => {
                return <Comment reseñas={c} key={c.username} />;
              })}
            </div>
          </Modal.Body>
        ) : (
          <div>
            <h1>Aun no hay reseñas</h1>
          </div>
        )}
      </Modal>
    </div>
  );
}
