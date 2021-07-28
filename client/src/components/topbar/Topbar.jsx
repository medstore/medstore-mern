import './topbar.css'
import { NavLink } from 'react-router-dom';

export default function Topbar() {
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <span className="homeLogo">MedStore</span>
                <ul className="topbarList">
                    <li className="nav-item">
                        <NavLink exact className="nav-link" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact className="nav-link" to="/signin">Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact className="nav-link" to="/signup">Sign Up</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}