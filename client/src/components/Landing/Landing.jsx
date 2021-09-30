import React from "react";
import Carousel from "../Carousel/Carousel";
import { Button } from "react-bootstrap";
import styles from "./Landing.module.css";
import Footer from "../Footer/Footer";
function Landing() {
  return (
    <div className={styles.container}>
      <h1>NEW</h1>
      <Carousel />
      <Button variant="outline-dark" style={{ width: "30rem" }}>
        Ver más
      </Button>
      <Footer />
    </div>
  );
}

export default Landing;
