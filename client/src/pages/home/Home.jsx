import { useState } from "react";
import { Route } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import './Home.css'
import logo from './PennMedicineLogo.png'

function Home() {

  const history = useHistory();

  const goCheckin = () => {
    history.push("/Checkin");
  };

  const goSchedule = () => {
    history.push("/Schedule");
  };

  const goEmployee = () => {
    history.push("/Employee");
  };



  return (
    <div>
      <div class='logo-vert' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
        <img src={logo} alt="" />
      </div>
      <div class="actions">
        <div class="vertical-center left">
          <Button onClick={goSchedule} size="lg" variant="primary" className="btn-primary">Scheduling an appointment?</Button>
        </div>
        <h4 style={{ display: "inline" }}>or</h4>
        <div class="vertical-center right">
          <Button onClick={goCheckin} size="lg" variant="primary" className="btn-primary">Checking in?</Button>
        </div>
        <p>Are you an employee? Please click <a href="/Login">here</a> to sign in.</p>
      </div>

    </div>
  );
}

export default Home;

