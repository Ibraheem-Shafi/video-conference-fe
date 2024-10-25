import "./styles/HeaderTop.css";

function HeaderTop(){

    return(

        <div className='cart-header-top'>

            <div className="cart-header-top-discription">
                ENJOY 15% OFF WITH TWO OR MORE ITEMS & FREE SHIPPING ON ALL ORDERS.
            </div>

            <div className='cart-header-top-menu-right'>

                <a href='#' className='cart-header-top-menuitems-r'>
                    English
                   <span className="cart-header-dropdown-icon">
                        <i className="fa-solid fa-angle-down"></i>
                    </span>
                </a>

                <a href='#' className="cart-header-top-menuitems-r">
                    USD
                    <span className="cart-header-dropdown-icon">
                        <i className="fa-solid fa-angle-down"></i>
                    </span>
                </a>

            </div>

        </div>
    );
}

export default HeaderTop;
