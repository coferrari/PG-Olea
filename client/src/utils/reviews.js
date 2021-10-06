import axios from "axios";
import { getToken } from "../utils";
const baseUrl = "http://localhost:3001/api/reviews";

export const createReviews = async (
  username,
  productId,
  rating,
  comentario
) => {
  const review = await axios.post(baseUrl, {
    username: username,
    productId: productId,
    comment: comentario,
    rating: rating,
  });
  console.log(review.data);
};
