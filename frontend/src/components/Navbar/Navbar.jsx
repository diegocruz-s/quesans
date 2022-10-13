import './Navbar.css';
import { BsFillHouseFill, BsShieldLock, BsFillPersonPlusFill, BsFillDiagram2Fill, BsJournals, BsBoxArrowInRight } from 'react-icons/bs';
import { useAuth } from '../../utils/useAuth';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

const Navbar = ()=>{

    const { auth } = useAuth();
    const { logout } = useContext(AuthContext);

    return(
        <nav className="navbar">
            {auth ? (
                <ul className="listNav">
                    <li className='elementList'>
                        <NavLink to='/' end><BsFillHouseFill /></NavLink>
                    </li>
                    <li className='elementList'>
                        <NavLink to='/dashboard'><BsFillDiagram2Fill /></NavLink>
                    </li>
                    <li className='elementList'>
                        <NavLink className='logout' onClick={logout}><BsBoxArrowInRight /></NavLink>
                    </li>
                </ul>
            ) : (
                <ul className='listNav'>
                    <li className='elementList'>
                        <NavLink to='/' end><BsFillHouseFill /></NavLink>
                    </li>
                    <li className='elementList'>
                        <NavLink to='/login'><BsShieldLock /></NavLink>
                    </li>
                    <li className='elementList'>
                        <NavLink to='/register'><BsFillPersonPlusFill /></NavLink>
                    </li>
                </ul>
                
            )}
        </nav>
    )
}


export default Navbar;