import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getCategories } from '../../redux/actions';

export default function SelectCategory(){

    const dispatch = useDispatch();
    const history = useHistory();
    const categories = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(getCategories())
    }, []);

    function handleCategorySelect(id){
        history.push(`/category/${id}`);
      }

    return(
        <div>
            <select onChange={(e) => handleCategorySelect(e.target.value)}>
                <option disabled selected hidden>Category...</option>
                {categories.map(c => <option value={c.id}>{c.NameCategory}</option>)}
            </select>
        </div>
    );
}
