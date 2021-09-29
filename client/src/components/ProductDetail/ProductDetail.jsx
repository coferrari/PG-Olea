import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetail } from '../../redux/actions/index';

export function ProductDetail () {
    const dispatch = useDispatch();
    const { id } = useParams();
    const product = useSelector(state => state.productDetail);

    useEffect(() => {
        dispatch(getProductDetail(id))
    }, [dispatch, id])

    return (
        <div>
            <img src={product?.image} alt='' />
            <span>{product?.name}</span>
            <span>{product?.price}</span>
            <span>{product?.description}</span>
            <span>{product?.rating}</span>
        </div>
    )
}