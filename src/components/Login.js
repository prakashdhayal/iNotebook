import React, { useState,useEffect } from 'react'
import { Link, useHistory } from "react-router-dom";

const Login = (props) => {
    let history = useHistory();
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    useEffect(() => {
        if(localStorage.getItem('auth-token'))
        {
            props.showAlert("You are already Loggedin user !","danger");
            history.push("/")
        }
        // eslint-disable-next-line
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        //API Call
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        // console.log(json);
        if (json.success) {
            //save the auth token and redirect
            localStorage.setItem("auth-token", json.authtoken)
            props.showAlert("Logged in successfully", "success");
            history.push("/");
        }
        else {
            props.showAlert(json.error, "danger");
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className="mt-3">
            <h2>Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="text" className="form-control" id="email" onChange={onChange} value={credentials.email} name="email" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={credentials.password} id="password" name="password" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary my-2">Submit</button>
            </form>
            <div className="my-3">
                <h6>Don't have iNotebook Account ?? <Link to="/signup">Register here...</Link></h6>
            </div>
        </div> 
    )
}

export default Login
