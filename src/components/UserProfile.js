import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";

const UserProfile = (props) => {
  const [data, setData] = useState({ name: "", email: "", password: "",cpassword:""})
  let history = useHistory();

  const fetchUserData = async () => {
    //API Call
    const response = await fetch(`http://localhost:5000/api/auth/fetchuser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token')
      }
    });
    const json = await response.json();
    if(json.success){
      setData({ name: json.user.name, email: json.user.email, password: json.user.password })
    }
    else{
      props.showAlert(json.error, "danger");
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('auth-token')) {
      history.push('/');
    }
    else {
      fetchUserData();
    }
    // eslint-disable-next-line
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(data.password===data.cpassword)
    {
    //API Call
    const response = await fetch(`http://localhost:5000/api/auth/updateprofile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token')
      },
      body: JSON.stringify({ name: data.name, email: data.email, password: data.password })
    });
    const json = await response.json();
    if (json.success) {
      //save the auth token and redirect
      // localStorage.removeItem("auth-token");
      props.showAlert("Profile Updated successfully", "success");
      history.push("/updateprofile");
    }
    else {
      props.showAlert(json.error, "danger");
    }
  }
  else{
    props.showAlert("password and confirm password must be same", "danger");
  }
}

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  return (
    <div className="container mt-3">
      <h2>Your Profile On iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input type="text" onChange={onChange} value={data.name} className="form-control" id="name" name="name" placeholder="Enter username" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Your Email address</label>
          <input type="email" onChange={onChange} value={data.email} className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Your Password</label>
          <input type="password" onChange={onChange} className="form-control" id="password" name="password" placeholder="previous password is not visible! Enter new to update" />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" onChange={onChange} className="form-control" id="cpassword" name="cpassword" placeholder="Enter new password for confirmation" />
        </div>
        <button type="submit" className="btn btn-primary my-2">Update Profile</button>
      </form>
    </div>
  )
}

export default UserProfile
