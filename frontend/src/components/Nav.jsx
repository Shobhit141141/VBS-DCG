import { Link } from 'react-router-dom'
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

import '../css/Nav.css'
import { useState } from 'react';
function Nav() {
    const [menu, setmenu] = useState(false);
    const handleToggle = () => {
        setmenu(!menu);
        console.log(menu);
        console.log(`navbar${menu ? '_active' : ''}`)
    }

    return (
        <div id= {`navbar ${menu ? '_active' : ''}`} >
            <div id='menubar'>
                {!menu && <div className= 'nav_toggle' onClick={handleToggle}><FaBars /></div>}

                {menu && <div className='nav_toggle' onClick={handleToggle}><FaXmark /></div>}
            </div>
            <div className={`nav_list${menu ? '_active' : ''} `}>
            <Link to='/' className='nav_home'><h4 >Home</h4></Link>

            <Link to='/Book' className='nav_book'><h4 >Book</h4></Link>

            <Link to='/Contact' className='nav_contact'><h4 >Contact Us</h4></Link>

            <Link to='/Login' className='nav_login'><h4 >Login</h4></Link>

            <Link to='/Signup' className='nav_signup'><h4 >Signup</h4></Link>
            </div>
        </div>
    );
}


export default Nav;