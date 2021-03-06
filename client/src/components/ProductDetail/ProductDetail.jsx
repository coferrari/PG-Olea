import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  clearDetail,
  getProductDetail,
  addToWishlist,
  removeFromWishlist,
  getProducts
} from "../../redux/actions/index";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  Modal,
  ProgressBar,
} from "react-bootstrap";
import Carousel from "../../components/Carousel/Carousel";
import { AiFillStar } from "react-icons/ai";
import { updateCart, getWishlist } from "../../redux/actions/index";
import { isAuthorized, decodeToken } from "../../utils/index";
import { addOrEditCart, removeProductCart } from "../../cart/index";
import { reviewsByProduct } from "../../utils/reviews";
import Comment from "./CommentReviews.jsx";
import style from "./ProductReview.module.css";
import styles from "./ProductDetail.module.css";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { addToWishlistDB, removeFromWishlistDB } from "../../wishlist/index";
import { USER_URL } from "../../consts";
import axios from "axios";
import Recommendend from "../Recommended/Recommended";

export function ProductDetail() {
  const dispatch = useDispatch();
  const { idParams } = useParams();
  const [add, setAdd] = useState(false);
  const [remove, setRemove] = useState(false);
  const [addWishlist, setAddWishlist] = useState(false);
  const [removeWishlist, setRemoveWishlist] = useState(false);
  const [reseñas, setReseñas] = useState();
  const [lgShow, setLgShow] = useState(false);
  const [puntuacion, setPuntuacion] = useState([0, 0, 0, 0, 0]);
  const validate = isAuthorized();
  const product = useSelector(
    (state) => state.productDetailReducer.productDetail
  );
  const {
    id,
    image,
    name,
    price,
    stock,
    offer,
    offerday,
    productOff,
    categories,
  } = useSelector((state) => state.productDetailReducer.productDetail);
  const { productsCarrito } = useSelector((state) => state.carritoReducer);
  const { wishlist } = useSelector((state) => state.wishlistReducer);
  const quantity = 1;

  const getReviews = async (id) => {
    const reviews = await reviewsByProduct(id);
    setReseñas(reviews);
  };

  useEffect(async () => {
    if (validate) {
      const user = decodeToken();
      const username = user.username;

      dispatch(getWishlist({ username }));

      categories?.map((e) => {
        axios.put(USER_URL + username, {
          nameCategory: e.nameCategory.toLowerCase(),
        });
      });
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getProducts());
    return () => {
      dispatch(clearDetail());
    };
  }, []);

  useEffect(() => {
    if (add) {
      const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));
      const cartAdded = [
        ...cartFromLocalStorage,
        {
          id,
          name,
          image,
          price,
          quantity,
          stock,
          offer,
          offerday,
          productOff: offerday,
          categories,
        },
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
    if (addWishlist) {
      dispatch(addToWishlist({ id, name, image }));
      setAddWishlist(false);
    }
    if (removeWishlist) {
      dispatch(removeFromWishlist(id));
      setRemoveWishlist(false);
    }
  }, [dispatch, add, remove, addWishlist, removeWishlist]);

  const isInStore = productsCarrito.filter((product) => product.id === id);
  const isInWishlist = wishlist?.findIndex((product) => product.id === id);

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

  const handleAddFavorite = (e) => {
    e.preventDefault();
    setAddWishlist(true);
    if (validate) {
      const user = decodeToken();
      const username = user.username;
      addToWishlistDB({
        username: username,
        productId: id,
      });
    }
  };

  const handleRemoveFavorite = (e) => {
    e.preventDefault();
    setRemoveWishlist(true);
    if (validate) {
      const user = decodeToken();
      const username = user.username;
      removeFromWishlistDB({
        username: username,
        productId: id,
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
  const rating = Rating();
  useEffect(() => {
    dispatch(getProductDetail(idParams));
    getReviews(idParams);
  }, [dispatch, idParams]);

  const searchOffer = (categories) => {
    if (categories) {
      let descuento = 0;

      categories.map((c) => {
        if (c.offer !== null) {
          descuento = c.offer;
        }
      });

      return descuento;
    }
    return "";
  };
  var now = new Date().toLocaleDateString();

  // const recommendend = (nameCategory) => {
  //   axios.put(USER_URL + username, { nameCategory: nameCategory });
  // };

  return (
    <div className="container">
      {id ? (
        <Card>
          <Card.Body className={styles.container}>
            <div className={styles.carousel}>
              <Carousel img={product.image} />
              {validate && isInWishlist >= 0 && (
                <button
                  className={styles.fav}
                  onClick={(e) => handleRemoveFavorite(e)}
                >
                  <BsHeartFill className={styles.removefav} />
                </button>
              )}
              {validate && isInWishlist === -1 && (
                <button
                  className={styles.fav}
                  onClick={(e) => handleAddFavorite(e)}
                >
                  <BsHeart className={styles.addfav} />
                </button>
              )}
            </div>
            <div className={styles.info}>
              <div>
                <Card.Title className={styles.title}>
                  {product?.name}
                </Card.Title>
                <Card.Text className={styles.description}>
                  {product?.description}
                </Card.Text>
                <Card.Text className={styles.description}>
                  <p>* {product?.stock} en stock</p>
                </Card.Text>
                <ListGroup className="list-group-flush">
                  <ListGroupItem className={styles.price}>
                    {now === product.offerday ||
                    now === product.categories?.[0].offerday ? (
                      product.offer > searchOffer(product.categories) ? (
                        <div>
                          <span className={styles.oldprice}>${price}</span>
                          <span className={styles.descuento}>
                            ${price - Math.round((price * product.offer) / 100)}
                          </span>
                          <span className={styles.porcentaje}>
                            {product.offer}% OFF
                          </span>
                        </div>
                      ) : searchOffer(product.categories) > 0 ? (
                        <div>
                          <span className={styles.oldprice}>${price}</span>
                          <span className={styles.descuento}>
                            $
                            {price -
                              Math.round(
                                (price * searchOffer(product.categories)) / 100
                              )}
                          </span>
                          <span className={styles.porcentaje}>
                            {product.categories?.[0].offer}% OFF
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span>${price}</span>
                        </div>
                      )
                    ) : (
                      <div>Precio: ${product?.price} </div>
                    )}
                  </ListGroupItem>
                  <ListGroupItem>
                    <Button
                      variant="outline-dark"
                      onClick={() => {
                        setLgShow(true);
                        tickets();
                      }}
                    >
                      <h4 className={styles.opinions}>
                        Opiniones sobre el producto
                      </h4>
                    </Button>{" "}
                  </ListGroupItem>
                </ListGroup>
              </div>
              <div>
                {isInStore.length === 0 && stock > 0 && (
                  <Button
                    variant="dark"
                    className={styles.addcart}
                    type="submit"
                    onClick={(e) => handleAddToCart(e)}
                  >
                    Agregar al carrito
                  </Button>
                )}
                {isInStore.length > 0 && stock > 0 && (
                  <Button
                    variant="secondary"
                    className={styles.removecart}
                    type="submit"
                    onClick={(e) => handleRemoveFromCart(e)}
                  >
                    Eliminar del carrito
                  </Button>
                )}
                {stock === 0 && (
                  <Button
                    variant="secondary"
                    className={styles.removecart}
                    disabled
                  >
                    sin stock
                  </Button>
                )}
              </div>
            </div>
          </Card.Body>
        </Card>
      ) : <div className={styles.loading}></div>}
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton className={style.modal}>
          <Modal.Title id="example-modal-sizes-title-lg">
            <h4 className={style.title}>Opiniones sobre el producto</h4>
          </Modal.Title>
        </Modal.Header>
        {reseñas?.length >= 1 ? (
          <Modal.Body>
            <div className={style.h3}>
              <div className={style.container}>
                <div>
                  <h5 className={style.titleh3}>
                    {rating.toString().slice(0, 4)}
                  </h5>
                </div>
                <div className={style.barraspan}>
                  <span className={style.spanbarra}>
                    <b className={style.subtitlestars}>Votos por 5 estrellas</b>
                  </span>
                  <ProgressBar
                    variant="success"
                    className={style.barra}
                    now={(puntuacion[4] / reseñas?.length) * 100}
                  />
                  <span>
                    <b className={style.subtitlestars}>Votos por 4 estrellas</b>
                  </span>
                  <ProgressBar
                    className={style.barra}
                    now={(puntuacion[3] / reseñas?.length) * 100}
                  />
                  <span>
                    <b className={style.subtitlestars}>Votos por 3 estrellas</b>
                  </span>
                  <ProgressBar
                    className={style.barra}
                    now={(puntuacion[2] / reseñas?.length) * 100}
                  />
                  <span>
                    <b className={style.subtitlestars}>Votos por 2 estrellas</b>
                  </span>
                  <ProgressBar
                    className={style.barra}
                    now={(puntuacion[1] / reseñas?.length) * 100}
                  />
                  <span>
                    <b className={style.subtitlestars}>Votos por 1 estrella</b>
                  </span>
                  <ProgressBar
                    className={style.barra}
                    now={(puntuacion[0] / reseñas?.length) * 100}
                  />
                </div>
              </div>
            </div>
            <div className={style.containerStars}>
              <div>
                <AiFillStar className={rating >= 1 ? style.gold : style.dark} />
                <AiFillStar className={rating >= 2 ? style.gold : style.dark} />
                <AiFillStar className={rating >= 3 ? style.gold : style.dark} />
                <AiFillStar className={rating >= 4 ? style.gold : style.dark} />
                <AiFillStar className={rating >= 5 ? style.gold : style.dark} />
              </div>
              <div className={style.reseñas}>
                Promedio entre {reseñas.length} puntuaciones
              </div>
            </div>
            <div>
              {reseñas?.map((c) => {
                return <Comment reseñas={c} key={c.username} />;
              })}
            </div>
          </Modal.Body>
        ) : (
          <div>
            <h4 className={style.subtitle}>Aun no hay reseñas</h4>
          </div>
        )}
      </Modal>
      {validate && (
        <div className={styles.recommendend}>
          <h3>Podría interesarte</h3>
          <Recommendend />
        </div>
      )}
    </div>
  );
}
