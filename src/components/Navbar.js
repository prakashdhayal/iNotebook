import React from 'react'
import '../index.css'

import { Link, useHistory, useLocation } from "react-router-dom";

const Navbar = (props) => {
    //use of useLocation
    const history = useHistory();
    let location = useLocation();
    const handleLogout = () => {
        if (window.confirm("Are you sure to Logout your account ??") === true) {
            localStorage.removeItem("auth-token");
            props.showAlert("You are Logged out now...", "success");
            history.push("/");
        }

    }
    const pathname = window.location.pathname;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNoteBook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${(location.path === '/') ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${(location.path === '/about') ? "active" : ""}`} to="/about">About iNotebook</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${(location.path === '/contact') ? "active" : ""}`} to="/contact">Contact Us</Link>
                        </li>
                    </ul>
                    {
                        localStorage.getItem('auth-token') ? <div className="dropdown dropleft">
                            <button className="btn btn-primary dropdown-toggle mx-5 " type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                My Account
                            </button>
                            <div className="dropdown-menu my-3" style={{ width: "220px", border: "2px solid black" }} aria-labelledby="dropdownMenu2">
                                <button className="dropdown-item" disabled={1} type="button">my profile</button>
                                <button className="dropdown-item my-2" disabled={1} type="button">Forgot password??</button>
                                <button className="dropdown-item" type="button" onClick={handleLogout}>Logout</button>
                            </div>
                        </div> : (pathname === '/contact' || pathname === '/about') && <form className="d-flex">
                            <Link className="btn btn-primary mx-2" to="/login" href="#" role="button">Login</Link>
                            <Link className="btn btn-primary mx-2" to="/signup" href="#" role="button">Signup</Link>
                        </form>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar
