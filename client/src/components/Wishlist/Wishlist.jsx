import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { getWishlist } from "../../redux/actions/index";
import { decodeToken } from "../../utils/index";
import Products  from "../Products/Products";

const Wishlist = () => {
    const dispatch = useDispatch();
    const { wishlist } = useSelector((state) => state.wishlistReducer);

    const user = decodeToken();
    const username = user.username;

    
    useEffect(() => {
        dispatch(getWishlist({username}));
        }, [dispatch]);

    console.log("esta es la wishlist", wishlist);

    return (
        <Products products={wishlist[0]?.products}/>
    );
}

export default Wishlist;