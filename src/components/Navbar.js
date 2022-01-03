import React from 'react'

import { Link, useHistory, useLocation } from "react-router-dom";

const Navbar = () => {
    //use of useLocation
    const history = useHistory();
    let location = useLocation();
    const handleLogout = () => {
        localStorage.removeItem("auth-token");
        history.push("/login");
    }

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
                    {!localStorage.getItem('auth-token') ? <form className="d-flex">
                        <Link className="btn btn-primary mx-2" to="/login" href="#" role="button">Login</Link>
                        <Link className="btn btn-primary mx-2" to="/signup" href="#" role="button">Signup</Link>
                    </form> : <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar
