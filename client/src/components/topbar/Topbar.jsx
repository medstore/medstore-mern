import './topbar.css'
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import emptyprofile from "../../images/emptyprofile.png"

export default function Topbar() {
    const [user, setUser] = useState(true);
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <span className="homeLogo">MedStore</span>
                <ul className="topbarList">
                    <li className="nav-item">
                        <NavLink exact className="nav-link" to="/">Home</NavLink>
                    </li>
                    {
                        !user ? null :
                            <>
                                <li className="nav-item">
                                    <NavLink exact className="nav-link" to="/signin">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink exact className="nav-link" to="/signup">Sign Up</NavLink>
                                </li>
                            </>
                    }
                </ul>
                {
                    user ? 
                    <div className="topbarProfile">
                            <img className="topbarProfImg" src={emptyprofile} />
                            <span className="topbarEmail">abcd@gmail.com</span>
                            <div className="cartDiv">
                                <span className="cartNumber">15</span>
                                <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                            </div>
                            
                        </div> : null
                }
            </div>
        </div>
    )
}