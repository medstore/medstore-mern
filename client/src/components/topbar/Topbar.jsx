import './topbar.css'
import { NavLink, Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import emptyprofile from "../../images/emptyprofile.png"
import { AppContext } from '../../context/appContext/AppContext';
import Createstore from '../../App';

export default function Topbar() {

    const { authenticated, user, dispatch } = useContext(AppContext);

    const history = useHistory();
    const logoutHandler = () => {
        localStorage.removeItem("authToken")
        dispatch({ type: "EMPTY_STATE" });
        history.push("/signin")
        console.log(user);
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

                        <div class="dropdown-menu">
                            <button class="menu-btn">{user.email} </button>
                            <div class="menu-content">
                                <NavLink exact className="links-hidden" to='/createstore/:userid '>DashBoard</NavLink>
                            </div>
                        </div>
                        <div className="cartDiv">
                            <span className="cartNumber">10</span>
                            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                        </div>

                    </div>
                }
            </div>
        </div>
    )
}