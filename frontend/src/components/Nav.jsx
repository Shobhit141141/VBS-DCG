import { Link } from 'react-router-dom'
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

import '../css/Nav.css'
import { useState } from 'react';
function Nav() {
    const [menu, setmenu] = useState(false);

    const handleToggle = () => {
        setmenu(!menu);
        const navbar = document.querySelector("#navbar")
        const menubar = document.querySelector("#menubar")

    }

    return (
        <div id='navbar'>
            <Link to='/' className='nav_home'><h4 >Home</h4></Link>

            <Link to='/Book' className='nav_book'><h4 >Book</h4></Link>

            <Link to='/Contact' className='nav_contact'><h4 >Contact Us</h4></Link>

            <Link to='/Login' className='nav_login'><h4 >Login</h4></Link>

            <Link to='/Signup' className='nav_signup'><h4 >Signup</h4></Link>

            <div id='menubar'>
                {menu && <Link to='/Signup' className='nav_toggle' onClick={handleToggle}><FaBars /></Link>}

                {!menu && <Link to='/Signup' className='nav_toggle' onClick={handleToggle}><FaXmark /></Link>}
            </div>
        </div>
    );
}


export default Nav;