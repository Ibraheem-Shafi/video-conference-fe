import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import "./styles/HeaderCenter.css";

//import logo from "./../../logo.png";

function HeaderBottom(){

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('token');
      console.log(token)
      setIsLoggedIn(!!token); // Check if token exists
  
      return () => {
          
      };
    }, []);

    return(

        <div className='cart-header-center'>

            <div className='cart-header-center-menu-left'>

                <a href='#' className='cart-header-bottom-menuitems-l'>
                   <span className="cart-header-bottom-Search-icon">
                        <i className="fa-solid fa-search"></i>
                    </span>
                    Search
                </a>

                <a href='#' className='cart-header-center-menuitems-l'>
                   <span className="cart-header-bottom-location-icon">
                        <i className="fa-solid fa-location"></i>
                    </span>
                    Find a Store
                </a>

            </div>

            {/*<div className='cart-logo'>
                    <img src={logo} />
            </div>*/}

            <div className='cart-header-center-menu-right'>

                <a href='#' className='cart-header-center-menuitems-r'>
                    <span className='cart-header-center-help'>NEED HELP?</span>
                    <span className="cart-header-center-dropdown-icon">
                        <i className="fa-solid fa-angle-down"></i>
                    </span>
                </a>

                <a href='#' className='cart-header-center-menuitems-r-icon'>
                   <span className="cart-header-center-user-icon">
                         <i className="fa-regular fa-user"></i>
                    </span>
                    {isLoggedIn && <span className='active-user-indicator'></span>}
                </a>

                <a href='#' className='cart-header-center-menuitems-r-icon'>
                   <span className="cart-header-center-favourite-icon">
                        <i className="fa-regular fa-heart"></i>
                    </span>
                </a>

                <a href='#' className='cart-header-center-menuitems-r-icon'>
                   <span className="cart-header-center-cart-icon">
                        <Link to="cart-main" ><i className="fa-solid fa-cart-shopping"></i></Link>
                    </span>
                </a>

            </div>

        </div>
    );
}

export default HeaderBottom;
