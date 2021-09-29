import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Products } from '../Products/Products';
import { searchProducts } from '../../redux/actions/index';


export function ProductsByName() {
    const { name } = useParams();
    const dispatch = useDispatch();
    const productsResult = useSelector(state => state.searchedProducts);

    useEffect(() => {
        dispatch(searchProducts(name))
    }, [dispatch, name])

    return (
        <Products products={productsResult} />
    )
}