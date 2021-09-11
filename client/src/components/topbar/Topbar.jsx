import './topbar.css'
import { NavLink } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import emptyprofile from "../../images/emptyprofile.png"
import { AppContext } from '../../context/appContext/AppContext';

export default function Topbar() {

    const { authenticated, user, dispatch } = useContext(AppContext);

    const history = useHistory();
    const logoutHandler = () => {
        localStorage.removeItem("authToken")
        dispatch({ type: "EMPTY_STATE" });
        history.push("/signin")
    }
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <NavLink exact className="nav-link" to="/"><span className="homeLogo">MedStore</span></NavLink>

                <ul className="topbarList">
                    {
                        authenticated === true && (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link" onClick={logoutHandler}>Logout</span>
                                </li>
                            </>
                        )
                    }
                    {
                        authenticated === false && (
                            <>
                                <li className="nav-item">
                                    <NavLink exact className="nav-link" to="/signin">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink exact className="nav-link" to="/signup">Sign Up</NavLink>
                                </li>
                            </>
                        )
                    }
                </ul>
                {
                    authenticated &&
                        <div className="topbarProfile">
                            <img className="topbarProfImg" src={emptyprofile} />
                            <span className="topbarEmail">{user.email}</span>
                            <div className="cartDiv">
                                <span className="cartNumber">15</span>
                                <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                            </div>

                        </div> 
                }
            </div>
        </div>
    )
}