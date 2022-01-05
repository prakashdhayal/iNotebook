import React from 'react'
import '../index.css';

const About = () => {
    return (
        <div>
            <h1 className='text-center my-3'>iNotebook</h1>
            <div className="container about" style={{ height: "100%", width: "70%", border: "2px solid black", backgroundColor: "rgb(229, 220, 220)" }}>
                <h4 style={{margin:"10px"}}>What is iNotebook ??</h4>
                <p style={{margin:"10px"}}>
                 Remember everything and tackle any project with your notes, tasks, and schedule all in one place. <br />
                 Capture important ideas and information in ways that help you stay productive. <br />
                 iNotebook gives you everything you need to keep life organized—great note taking, project planning, and easy ways to find what you need, when you need it. 
                </p>
                <h4 style={{margin:"10px"}}>Developers At iNotebook</h4>
                <p style={{margin:"10px"}}>
                    <ul>
                        <li><b>Prakash Dhayal</b></li>
                        <li><b>Khuma Ram Choudhary</b> </li>
                    </ul>
                </p>
            </div>
        </div>
    )
}

export default About
