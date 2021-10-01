import './userdashboard.css'
import { useHistory } from 'react-router'
import { useContext } from 'react';
import { AppContext } from '../../context/appContext/AppContext';

export default function Userdashboard() {

    const history = useHistory();
    const {dispatch} = useContext(AppContext);

    const changePage = (e) => {
        e.preventDefault();
        history.push(`/userdashboard/${e.target.id}`);
    }

    const logoutHandler = () => {
        localStorage.removeItem("authToken")
        dispatch({ type: "EMPTY_STATE" });
        history.push("/signin")
    }

    return (
        <div className="userdashboard">
            <div className="left">
                <ul className="dashboardul">
                    <li id="profile" className={"dashboardListItem"} onClick={changePage}>My Account</li>
                    <li id="purchase" className={"dashboardListItem"} onClick={changePage} >My Orders</li>
                    <li id="history" className={"dashboardListItem"} onClick={changePage}>My Cart</li>

                    <li id="createstore" className={"dashboardListItem"} onClick={changePage}>Create Store / Store Dashboard</li>
                    <li id="logout" className="dashListItemLogout" onClick={logoutHandler}>Logout</li>
                </ul>
            </div>
            <div className="right">

            </div>
        </div>
    )
}