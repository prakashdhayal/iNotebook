import React, { useState } from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import LandingPage from './components/landingPage/LandingPage';

function App() {
  const [alert, setAlert] = useState(null)
  const [search, setSearch] = useState("")
  //show alert
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    // automatic remove the alert after 2 second 
    setTimeout(() => {
      setAlert(null);
    }, 2000)
  }
  return (
    <>
      <NoteState >
        <Router>
          <Navbar showAlert={showAlert} setSearch={setSearch} />
          <Alert alert={alert} />
          <div className="container">
            <Switch>
              <Route exact path="/">
                {
                  (localStorage.getItem('auth-token')) ?
                    <Home showAlert={showAlert} search={search} /> : <LandingPage />
                }
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/contact">
                <Contact showAlert={showAlert} />
              </Route>
              <Route exact path="/login">
                <Login showAlert={showAlert} />
              </Route>
              <Route exact path="/signup">
                <Signup showAlert={showAlert} />
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>

    </>
  );
}

export default App;
