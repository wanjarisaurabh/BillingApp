import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./menubar.css";
import { load } from "../assets/load.jsx";
import { AppContext } from "../context/AppContext.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Menubar = () => {
    const navigate = useNavigate();
    const { setAuthData, auth } = useContext(AppContext);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setAuthData(null, null);
        navigate("/login");
    };

    const isAdmin = auth.role === "ROLE_ADMIN";


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2">
            <NavLink className="navbar-brand" to="/">
                <img
                    src="https://www.svgrepo.com/show/303109/adobe-xd-logo.svg"
                    alt="Logo"
                    height="40"
                />
            </NavLink>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse p-2" id="navbarNav">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"} to="/dashboard">DASHBOARD</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"} to="/explore">EXPLORE</NavLink>
                    </li>

                    {isAdmin && (
                        <>
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"} to="/users">MANAGE USERS</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"} to="/items">MANAGE ITEMS</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"} to="/category">MANAGE CATEGORIES</NavLink>
                            </li>
                        </>
                    )
                    }

                    <li className="nav-item">
                        <NavLink className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"} to="/order">ORDER HISTORY</NavLink>
                    </li>

                </ul>
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item dropdown">
                        <button
                            className="btn nav-link dropdown-toggle"
                            type="button"
                            id="userDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <img src={load.png3} alt="User Avatar" height={32} width={32} />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                            <li><button className="dropdown-item">Settings</button></li>
                            <li><button className="dropdown-item">Activity Log</button></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li>
                                <button className="dropdown-item" onClick={logout}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Menubar;
