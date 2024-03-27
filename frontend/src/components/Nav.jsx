import {Link} from 'react-router-dom'
function Nav() {
    return ( 
        <div style={{display:'flex' , width:'60%', justifyContent:'space-around' , margin:'20px auto'}}>
            <Link to='/'><h4>Home</h4></Link>
            
            <Link to='/Book'><h4>Book</h4></Link>

            <Link to='/Login'><h4>Login</h4></Link>

            <Link to='/Signup'><h4>Signup</h4></Link>
        </div>
     );
}

export default Nav;