import React, { useState } from 'react'
import '../index.css';

//npm i emailjs-com
import emailjs from 'emailjs-com'

const Contact = (props) => {
    const [data, setData] = useState({ name:"", user_email: "", message: "" })
    const sendEmail = (e) => {
        e.preventDefault();
        props.showAlert("Form submitted successfully, our team will contact you soon...","success");
        emailjs.sendForm('service_yayj06i','template_goeq20s',e.target,'user_VjCENx87ciJ4S0qzdtmaG').then(res=>{
            console.log(res);
        }).catch(err=>console.log(err));
        setData({ name:"", user_email: "", message: "" });
    }
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    return (
        <div className="container border contactform" style={{
            marginTop: "50px", width: "70%", backgroundImage: 'url("")', backgroundPosition: "center", backgroundSize: "cover"
        }}>
            <h1 style={{ marginTop: "25px", textAlign: "center" }}>Contact Form</h1>
            <form className="row" onSubmit={sendEmail} style={{ margin: "25px 85px 75px 100px " }}>
                <label className="inputdata">Name</label>
                <input type="text" onChange={onChange} value={data.name} className="form-control inputdata" name="name" />
                <label className="inputdata">Email</label>
                <input type="email" onChange={onChange} value={data.user_email} className="form-control inputdata" name="user_email" />
                <label className="inputdata">Message</label>
                <textarea name="message" onChange={onChange} value={data.message} className="form-control inputdata" row="4" />
                <input type="submit" className="inputdata form-control btn btn-primary mt-3" value="Send" />
            </form>
        </div>
    )
}

export default Contact
