import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/actions/index'; 
import { Product } from '../product/product';


export function Products() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);


    useEffect(() => {
        dispatch(getProducts());
      }, [dispatch]);


    return (
        <div>
            <Product products={products} /> 
        </div>
    )
}