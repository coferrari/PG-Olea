import React, { useEffect, useState } from 'react';


export function Products() {
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getProducts());
      }, [dispatch]);


    return (
        <div>
            Algo
        </div>
    )
}