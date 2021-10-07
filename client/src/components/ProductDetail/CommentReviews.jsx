import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import style from "./CommentReviews.module.css";
import userimg from "../../img/images.png";
const Comment = ({ reseñas }) => {
  return (
    <div className={style.container}>
      <div className={style.containerinfo}>
        <div className={style.starsDiv}>
          <span className={style.span}>
            {reseñas.user.username.charAt(0).toUpperCase() +
              reseñas.user.username.slice(1)}
          </span>

          <AiFillStar
            className={reseñas.rating >= 1 ? style.gold : style.dark}
          />
          <AiFillStar
            className={reseñas.rating >= 2 ? style.gold : style.dark}
          />
          <AiFillStar
            className={reseñas.rating >= 3 ? style.gold : style.dark}
          />
          <AiFillStar
            className={reseñas.rating >= 4 ? style.gold : style.dark}
          />
          <AiFillStar
            className={reseñas.rating >= 5 ? style.gold : style.dark}
          />
        </div>
        <div className={style.commentDiv}>
          <div className={style.opinion}>
            {reseñas.opinion.charAt(0).toUpperCase() + reseñas.opinion.slice(1)}
          </div>
          <p className={style.comment}>
            {reseñas.comment.charAt(0).toUpperCase() + reseñas.comment.slice(1)}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Comment;
