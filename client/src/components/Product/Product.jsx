import React from 'react';
import { Link } from 'react-router-dom';

export function Product ({id, name, image, price}) {
    return (
        // definir qué info mostrar 
        <div>
            <img src={image} alt='' />
            <Link to={`/product/${id}`}>
            <span>{name}</span>
            </Link>
            <span>{price}</span>
        </div>
    )
}