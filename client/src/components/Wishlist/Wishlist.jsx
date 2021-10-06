import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getWishlist } from "../../redux/actions/index";

const Wishlist = () => {
    const dispatch = useDispatch();
    
    const { wishlistId } = useParams(); 
    const { wishlist } = useSelector((state) => state.wishlistReducer);
    
    useEffect(() => {
        dispatch(getWishlist(wishlistId));
        }, [dispatch]);
    
    console.log(wishlist);

    return (
        <div>
            {wishlist?.map(p => {
                return <div>{p.name}</div>
            })}
        </div>
    );
}

export default Wishlist;