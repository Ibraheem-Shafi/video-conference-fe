import "./styles/Footer.css";
function Footer(){

    return(

        <div className="Cart-Footercomponent">

            <div className="cart-news-letter">
                <h2 className="cart-news-letter-heading">NEWSLETTER SIGN UP</h2>
                <p className="cart-news-letter-para">Enjoy 15% off* your first order when you sign up to our newsletter</p>   
                <div className="cart-news-letter-form">
                    <form>
                        <input type='text' name='email' placeholder="your e-mail address"/>
                        <input type='submit' value='SUBSCRIBE'/>
                    </form>
                </div>
                <div className="cart-follow-bar">
                    <div className="cart-follow-bar-items"><i className="fa-brands fa-twitter"></i></div>
                    <div className="cart-follow-bar-items"><i className="fa-brands fa-instagram"></i></div>
                    <div className="cart-follow-bar-items"><i className="fa-brands fa-facebook"></i></div>
                    <div className="cart-follow-bar-items"><i className="fa-brands fa-pinterest"></i></div>
                </div>
            </div>

            <div className="cart-footer-lists">
                <div className="cart-footer-list-1">
                    <ul>
                        <li className="cart-footer-list-heading">SERVICES</li>
                        <li>Treats Club</li>
                        <li>Piercing Parlour</li>
                        <li>Student Discount</li>
                        <li>Site Map</li>
                    </ul>
                </div>
                <div className="cart-footer-list-2">
                    <ul>
                        <li className="cart-footer-list-heading">About</li>
                        <li>Our Brand</li>
                        <li>Charity</li>
                        <li>CSR</li>
                        <li>Careers</li>
                    </ul>
                </div>
                <div className="cart-footer-list-3">
                    <ul>
                        <li className="cart-footer-list-heading">DELIVERY & RETURN</li>
                        <li>Check Order</li>
                        <li>Delivery & Collection</li>
                        <li>Careers</li>
                        <li>Delivery Return</li>
                    </ul>
                </div>
                <div className="cart-footer-list-4">
                    <ul>
                        <li className="cart-footer-list-heading">CUSTOMER SERVICES</li>
                        <li>Terms & Policies</li>
                        <li>Contact Us</li>
                        <li>Opening Hours</li>
                        <li>Size Guides</li>
                    </ul>
                </div>
            </div>

            <div className="cart-footer-end">
                <div className="cart-copyright-statement">© Jaroti. All Rights Reserved.</div>
            </div>
        
    </div>
    );
}

export default Footer;
