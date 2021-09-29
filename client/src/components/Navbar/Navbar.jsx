import React from 'react';
import { Link } from "react-router-dom";
import Register from '../Register/Register';

const Navbar = () => {
    return (
        <div>
            OLEA
            <ul>
            <Link to="/login"><li>Login</li></Link>
            <Link to="/register"><li>Register</li></Link>
            <Link to="/logout"><li>Logout</li></Link>
            </ul>
            
        </div>
    );
}
 
export default Navbar;