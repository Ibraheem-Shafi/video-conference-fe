import { Link } from 'react-router-dom';

import "./styles/HeaderBottom.css";

function HeaderBottom(){

    return(

        <div className='cart-header-bottom'>

            <div className='cart-header-bottom-menu-center'>

                <span href='#' className='cart-header-bottom-menuitems-c'>
                    <Link to="/" >Home</Link>
                   <span className="cart-header-bottom-dropdown-icon">
                        <i className="fa-solid fa-angle-down"></i>
                    </span>
                </span>

                <span href='#' className='cart-header-bottom-menuitems-c'>
                    <Link to="/categories?category=Jewelery" >Jewellery</Link>
                   <span className="header-bottom-dropdown-icon">
                        <i className="fa-solid fa-angle-down"></i>
                    </span>
                </span>

                <span href='#' className='cart-header-bottom-menuitems-c'>
                    <Link to="/categories?category=handbags" >Handbags</Link>
                   <span className="header-bottom-dropdown-icon">
                        <i className="fa-solid fa-angle-down"></i>
                    </span>
                </span>

                <span href='#' className='cart-header-bottom-menuitems-c'>
                    Accessories
                   <span className="cart-header-bottom-dropdown-icon">
                        <i className="fa-solid fa-angle-down"></i>
                    </span>
                </span>

                <span href='#' className='cart-header-bottom-menuitems-c'>
                     Sale
                </span>

                <span href='#' className="cart-header-bottom-menuitems-c">
                    About US
                </span>

                <span href='#' className="cart-header-bottom-menuitems-c">
                    Contact US
                </span>

                <span href='#' className="cart-header-bottom-menuitems-c">
                    Blogs
                </span>

            </div>

        </div>
    );
}

export default HeaderBottom;
