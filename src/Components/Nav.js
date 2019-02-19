import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => (
    <nav className="main-nav">
        <ul>
            <li><NavLink to='/goats'>Goats</NavLink></li>
            <li><NavLink to='/cats'>Cats</NavLink></li>
            <li><NavLink to='/dogs'>Dogs</NavLink></li>
            {/* <li><NavLink to='/search'>Search</NavLink></li> */}
        </ul>
    </nav>
);

export default Nav;