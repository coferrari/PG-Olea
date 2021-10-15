import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishlist } from "../../redux/actions/index";
import { isAuthorized, decodeToken } from "../../utils/index";
import WishlistItem from "../WishlistItem/WishlistItem";
import style from "./Wishlist.module.css";

const Wishlist = () => {
  const dispatch = useDispatch();
  const validate = isAuthorized();

  useEffect(() => {
    if (validate) {
      const user = decodeToken();
      const username = user.username;
      dispatch(getWishlist({ username }));
    }
  }, [dispatch]);

  const { wishlist } = useSelector((state) => state.wishlistReducer);

  return (
    <div className="container">
      <div className={style.cards}>
        <div className={style.container}>
          {wishlist?.map((p) => {
            return (
              <WishlistItem
                key={p.id}
                id={p.id}
                name={p.name}
                image={p.image[0]}
              />
            );
          })}
          {wishlist.length === 0 && (
            <div className={style.cards}>
              <h4 className={style.nofavs}>la lista de favoritos esta vacia</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
