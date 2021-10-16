import './topbar.css'
import { NavLink, Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import emptyprofile from "../../images/emptyprofile.png"
import { AppContext } from '../../context/appContext/AppContext';
import axios from 'axios';
import Createstore from '../../App';

export default function Topbar() {

    const { authenticated, user, dispatch } = useContext(AppContext);

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
    }
    const getLoggedIn = async ()=>{
        const res = await axios.get("/api/private/getuser", config);
        if(res){
            dispatch({type: "FETCH_SUCCESS", payload: res.data });
        }else{
            dispatch({type: "EMPTY_STATE"});
        }
    }

    useEffect(()=>{
        getLoggedIn();
    },[]);

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
                                <NavLink exact className="links-hidden" to='/userdashboard/profile'>DashBoard</NavLink>
                            </div>
                        </div>
                        <div className="cartDiv" onClick={()=>history.push('/userdashboard/addtocart')}>
                            <span className="cartNumber">{user.cartItem.length}</span>
                            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                        </div>

                    </div>
                }
            </div>
        </div>
    )
}