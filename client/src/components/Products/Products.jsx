import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/actions/index'; 
import { Product } from '../Product/Product';


export function Products({products}) {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);


    useEffect(() => {
        dispatch(getProducts());
      }, [dispatch]);

      
    return (
       <div>
           {products.map((p) => {
               return <Product product={p} /> 
           })}
       </div>
    )
}