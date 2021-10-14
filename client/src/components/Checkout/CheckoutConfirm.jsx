import React, { useEffect } from "react";
import {useParams, useLocation} from 'react-router-dom';

const CheckoutConfirm = () => {
  
const {search} = useLocation()
console.log(search)
  
  return (
    <div>
      Compra confirmada
    </div>
  );
};
export default CheckoutConfirm;
