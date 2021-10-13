import React, {useState, useEffect} from "react";
import { Product } from "../Product/Product";
import styles from "./Products.module.css";
import { Pagination } from "../Pagination/Pagination";
// import Pagination from 'react-responsive-pagination';

export default function Products({ products }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [elementsPerPage, setElementsPerPage] = useState(12);

  useEffect(() => {
    window.screen.width < 500 && setElementsPerPage(6);
    window.screen.width > 1400 && setElementsPerPage(15);
  }, [window.screen.width]);
  
  // PARA PAGINAR ----------------------------------------------------------

  const indexOfLastElement = currentPage * elementsPerPage;
  const indexOfFirstElement = indexOfLastElement - elementsPerPage;
  
  const currentElements = products.slice(indexOfFirstElement, indexOfLastElement);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
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
            />
          );
        })}
      </div>
    </div>
    <Pagination elementsPerPage={elementsPerPage} totalElements={products.length} paginate={paginate} />
    </div>
  );
}
