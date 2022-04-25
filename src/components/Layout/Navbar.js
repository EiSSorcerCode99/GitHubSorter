import React from 'react';
import './Navbar.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const Navbar = ({icon, title}) => {
        return (
            <nav className='navbar navbar-expand-sm bg-dark'>
                <h1>
                    <i className='fas fa-crown' />{title}
                </h1>
                <ul className='navbar-nav'>
                    <li className='nav-item'>
                        <Link  className='nav-link' to='/'>Home </Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/about'>About</Link>
                    </li>
                </ul>  
            </nav>
        )
}

Navbar.defaultProps = {
    title: 'AppKingz',
    icon: "fas fa-crown"
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired   
}

export default Navbar
