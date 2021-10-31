import './topbar.css'
import { NavLink, Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import emptyprofile from "../../images/emptyprofile.png"
import { AppContext } from '../../context/appContext/AppContext';
import axios from 'axios';
import Createstore from '../../App';
import DrawerContext from '../../context/DrawerContext';

export default function StoreTopbar() {

    const { authenticated, user, dispatch, seller } = useContext(AppContext);
    const { isOpen, setOpen } = useContext(DrawerContext);
    const [showButton, setShowButton] = useState(false)

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
    }
    const getLoggedIn = async () => {
        const res = await axios.get("/api/private/getuser", config);
        if (res) {
            dispatch({ type: "FETCH_SUCCESS", payload: res.data });
        } else {
            dispatch({ type: "EMPTY_STATE" });
        }
    }

    /* useEffect(() => {
        getLoggedIn();
    }, []); */


    const handleDrawer = () => {
        setOpen();
    }
    const history = useHistory();
    const logoutHandler = () => {
        localStorage.removeItem("authToken")
        dispatch({ type: "EMPTY_STATE" });
        history.push("/signin")
    }
    console.log("hello",seller.storeId);
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                {/* {
                    showButton ? <button className="drawerButton" onClick={handleDrawer}>open</button> : null
                } */}

                <NavLink exact className="nav-link" to="/"><span className="homeLogo1">{seller.storeId}</span></NavLink>
                <span className="homeLogo" onClick={handleDrawer}>{seller.storeId}</span>

                <ul className="topbarList">
                </ul>
            </div>
        </div>
    )
}