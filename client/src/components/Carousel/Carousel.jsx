import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/index";
import { Card, Container } from "react-bootstrap";
import styles from "./Carousel.module.css";
import CarosuelBoots from "react-bootstrap/Carousel";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function Carousel({ img }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsReducer.products);

  const [product, setProduct] = useState(0);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

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
    <div>
      {img ? (
        <Container>
          <div className={styles.carruselcontainer}>
            {img?.map((p, i) => {
              if (product === i) {
                return (
                  <div className={styles.imgs}>
                    <img className={styles.img} key={i} variant="top" src={p} />
                  </div>
                );
              } else return "";
            })}
            <div>
              <button
                className={styles.btncarousel}
                onClick={() => productPrev()}
              >
                <MdKeyboardArrowLeft className={styles.arrows} />
              </button>
              <button
                className={styles.btncarousel}
                onClick={() => productNext()}
              >
                <MdKeyboardArrowRight className={styles.arrows} />
              </button>
            </div>
          </div>
        </Container>
      ) : (
        <Container>
          <CarosuelBoots
            variant="dark"
            desvanecerse="true"
            className={styles.carruselcontainer}
          >
            {newItemProducts?.map((p, i) => {
              return (
                <CarosuelBoots.Item key={i} className={styles.contenedorimg}>
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
    </div>
  );
}
