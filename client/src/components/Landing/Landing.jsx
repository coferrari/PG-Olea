import React from "react";
import Carousel from "../Carousel/Carousel";
import { Button } from "react-bootstrap";
import styles from "./Landing.module.css";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
function Landing() {
  return (
    <div className={styles.container}>
      <div>
        <Carousel />
      </div>
      <div>
        <Link to="/home">
          <Button className={styles.btn} variant="outline-dark">Ver más productos</Button>
        </Link>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Landing;
