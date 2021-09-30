import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../../redux/actions/index";
import styles from "./ProductDetail.module.css";

export function ProductDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector(
    (state) => state.productDetailReducer.productDetail
  );

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id]);
  console.log(product);
  return (
    <div className={styles.container}>
      <img src={product?.image?.[0]} alt="imagenproducto" />
      <h1>{product?.name}</h1>
      <span>{product?.price}</span> <br />
      <span>{product?.description}</span> <br />
      <span>{product?.rating}</span> <br />
    </div>
  );
}
