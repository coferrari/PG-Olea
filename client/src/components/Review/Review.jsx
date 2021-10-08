import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { AiFillStar } from "react-icons/ai";
import { decodeToken } from "../../utils";
import { createReviews } from "../../utils/reviews";
import { useParams } from "react-router-dom";
import style from "./review.module.css";
const Review = () => {
  const user = decodeToken();
  const { productid } = useParams();
  const [stars, setStars] = useState("");
  const [text, setText] = useState("");
  const [opinion, setOpinion] = useState("");
  const reviewStar = (number) => {
    setStars(number);
  };
  const handleOpinionChange = (e) => {
    setOpinion(e.target.value);
  };
  const handleChange = (e) => {
    setText(e.target.value);
    console.log(text);
  };
  const handleSubmit = async (e) => {
    console.log("adsads");
    e.preventDefault();
    await createReviews(user.username, productid, stars, text, opinion);
  };
  return (
    <div>
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Hola {user.username}</Form.Label>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Opinion</Form.Label>
          <Form.Control
            onChange={(e) => {
              handleOpinionChange(e);
            }}
            type="text"
          />
        </Form.Group>
        <Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Reseña del producto</Form.Label>
            <Form.Control
              onChange={(e) => {
                handleChange(e);
              }}
              as="textarea"
              rows={3}
            />
          </Form.Group>

          <Form.Label>Puntuacion</Form.Label>
          <AiFillStar
            className={stars >= 1 ? style.gold : style.dark}
            onClick={() => reviewStar(1)}
          />
          <AiFillStar
            className={stars >= 2 ? style.gold : style.dark}
            onClick={() => reviewStar(2)}
          />
          <AiFillStar
            className={stars >= 3 ? style.gold : style.dark}
            onClick={() => reviewStar(3)}
          />
          <AiFillStar
            className={stars >= 4 ? style.gold : style.dark}
            onClick={() => reviewStar(4)}
          />
          <AiFillStar
            className={stars >= 5 ? style.gold : style.dark}
            onClick={() => reviewStar(5)}
          />
        </Form.Group>
        <div>
          <Button variant="dark" type="submit">
            Ingresa
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default Review;
