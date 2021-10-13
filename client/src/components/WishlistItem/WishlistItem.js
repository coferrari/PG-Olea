import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromWishlistDB } from "../../wishlist/index";
import { removeFromWishlist } from "../../redux/actions/index";
import { isAuthorized, decodeToken } from "../../utils/index";
import { Card } from "react-bootstrap";
import style from "./WishlistItem.module.css";

const WishlistItem = ({ id, name, image }) => {
  const dispatch = useDispatch();
  const validate = isAuthorized();

  const handleRemoveWishlist = (e) => {
    e.preventDefault();
    dispatch(removeFromWishlist(id));
    if (validate) {
      const user = decodeToken();
      const username = user.username;
      removeFromWishlistDB({
        username: username,
        productId: id,
      });
    }
  };

  return (
    <div className={style.container}>
      <Card className={style.containercard}>
        <div className={style.containerimg}>
          <img className={style.img} src={image} alt={name} />
        </div>
        <Card.Body className={style.containertext}>
          <div>
            <Link to={`/product/${id}`} className={style.link}>
              <h5 className={style.title}>{name}</h5>
            </Link>
          </div>
          <div className={style.delete}>
            <button
              onClick={(e) => handleRemoveWishlist(e)}
              className={style.delete}
            >
              eliminar
            </button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default WishlistItem;
