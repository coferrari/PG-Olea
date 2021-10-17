import axios from "axios";
import { getToken } from "../utils/index";
const baseUrl = "/api/reviews";

export const createReviews = async (
  username,
  productId,
  rating,
  comentario,
  opinion
) => {
  const review = await axios.post(
    baseUrl,
    {
      username: username,
      productId: productId,
      comment: comentario,
      rating: rating,
      opinion: opinion,
    },
    {
      headers: {
        authorization: getToken(),
      },
    }
  );
  return review;
};
export const reviewsByProduct = async (id) => {
  const review = await axios.get(`${baseUrl}/${id}`);
  return review.data;
};
