import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishlist } from "../../redux/actions/index";
import { isAuthorized, decodeToken } from "../../utils/index";
import WishlistItem from "../WishlistItem/WishlistItem";

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
    <div>
      {wishlist?.map((p) => {
        return (
          <WishlistItem key={p.id} id={p.id} name={p.name} image={p.image[0]} />
        );
      })}
      {wishlist.length === 0 && <div>no hay favoritos</div>}
    </div>
  );
};

export default Wishlist;
