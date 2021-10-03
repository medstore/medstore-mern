import './storedashboard.css'
import { useHistory } from 'react-router'
import { useContext } from 'react';
import { AppContext } from '../../context/appContext/AppContext';

export default function Storedashboard() {

    const history = useHistory();
    const {dispatch} = useContext(AppContext);

    const changePage = (e) => {
        e.preventDefault();
        history.push(`/storedashboard/${e.target.id}`);
    }
 
    return (
        <div className="storedashboard">
            <div className="left">
                <ul className="dashboardul">
                    <li id="analytics" className={"dashboardListItem"} onClick={changePage}>Analytics</li>
                    <li id="addProduct" className={"dashboardListItem"} onClick={changePage} >Add Product</li>
                    <li id="allstoreproduct" className={"dashboardListItem"} onClick={changePage}>All Product</li>
                    <li id="orders" className={"dashboardListItem"} onClick={changePage}>Orders</li>
                    <li id="setting" className={"dashboardListItem"} onClick={changePage}>Setting</li>
                </ul>
            </div>
            <div className="right">

            </div>
        </div>
    )
}