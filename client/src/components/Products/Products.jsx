import React, { useState, useEffect } from "react";
import { Product } from "../Product/Product";
import styles from "./Products.module.css";
import styles2 from "../Checkout/CheckoutConfirm.module.css";
import { Pagination } from "../Pagination/Pagination";
import { Spinner } from "react-bootstrap";

export default function Products({ products }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [elementsPerPage, setElementsPerPage] = useState(12);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.screen.width < 500 && setElementsPerPage(6);
    window.screen.width > 1400 && setElementsPerPage(15);
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [window.screen.width, loading]);

  // PARA PAGINAR ----------------------------------------------------------

  const indexOfLastElement = currentPage * elementsPerPage;
  const indexOfFirstElement = indexOfLastElement - elementsPerPage;

  const currentElements = products.slice(
    indexOfFirstElement,
    indexOfLastElement
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading)
  return (
    <Spinner className={styles2.spinner} animation="grow" variant="secondary" />
  );

  return (
    <div>
      {products.length ? (
        <div>
          <div className={styles.center}>
            <div className={styles.container}>
              {currentElements?.map((p) => {
                return (
                  <Product
                    key={p.id}
                    id={p.id}
                    name={p.name}
                    image={p.image[0]}
                    price={p.price}
                    stock={p.stock}
                    categories={p.categories}
                    offer={p.offer}
                    offerday={p.categories?.[0].offerday}
                    categoryOff={p.categories?.[0].offer}
                    productOff={p.offerday}
                  />
                );
              })}
            </div>
          </div>
          <Pagination
            elementsPerPage={elementsPerPage}
            totalElements={products.length}
            paginate={paginate}
          />
        </div>
      ) : (
        <div className={styles.cards}>
              <h4 className={styles.nosearch}>no encontramos ningún producto que coincida con tu búsqueda</h4>
            </div>
      )}
    </div>
  );
}
