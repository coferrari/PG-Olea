import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/index";
import { Product } from "../Product/Product";
import { Link } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import styles from "./Carousel.module.css";

import CarosuelBoots from "react-bootstrap/Carousel";

export default function Carousel({ img }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsReducer.products);

  const [product, setProduct] = useState(0);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const newItemProducts = img
    ? img
    : products.filter((products) => products.newItem === true);

  function productNext() {
    if (product < newItemProducts.length - 1 || product < img?.length - 1) {
      setProduct(product + 1);
    }
  }
  function productPrev() {
    if (product >= 1) {
      setProduct(product - 1);
    }
  }

  return (
    <Container>
      {img ? (
        <div className={styles.contenedor}>
          .<button onClick={() => productPrev()}>-</button>
          <button onClick={() => productNext()}>+</button>
          {img?.map((p, i) => {
            if (product === i) {
              return <Card.Img variant="top" src={p} />;
            }
          })}
        </div>
      ) : (
        <Container>
          <CarosuelBoots
            variant="dark"
            desvanecerse="true"
            className={styles.carruselcontainer}
          >
            {newItemProducts?.map((p, i) => {
              return (
                <CarosuelBoots.Item className={styles.contenedorimg}>
                  <img
                    className={styles.img}
                    src={p.image[0]}
                    alt="First slide"
                  />
                </CarosuelBoots.Item>
              );
            })}
          </CarosuelBoots>
        </Container>
      )}
    </Container>
  );
}
