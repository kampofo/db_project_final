import React, { useState } from 'react';
import Axios from "axios";
import desktopImage from './back.png'

function CheckIn() {

    const [Fname, setFname] = useState("");
    const [Lname, setLname] = useState("");
    const [DOB, setDOB] = useState("");
    const [Status, setStatus] = useState("Waiting");


    const checkInPatient = () => {
        Axios.put("https://dbms-project-final.herokuapp.com/api/update", {
            Fname: Fname,
            Lname: Lname,
            DOB: DOB,
            Status: Status,
        }).then(() => {
            alert("Reservation has been created successfully.");
        });
    }

    const divStyle = {
        width: '100%',
        height: '800px',
        backgroundImage: `url(${desktopImage})`,
        backgroundSize: 'cover',
    };

    const goHome = () => {
        window.location.pathname = "/";
    };

    return (
        <div style={divStyle}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <form onSubmit={checkInPatient}>
                    <h1>Check in for your appointment below.</h1>
                    <div style={{ width: 800, height: 30 }}>
                        <label htmlFor="Fname">First Name:</label>
                        <input type="text" id="Fname" name="Fname" placeholder="John" onChange={(e) => {
                            setFname(e.target.value);
                        }} required />
                    </div>

                    <div style={{ width: 800, height: 30 }}>
                        <label htmlFor="Lname">Last Name:</label>
                        <input type="text" id="Lname" name="Lname" placeholder="Doe" onChange={(e) => {
                            setLname(e.target.value);
                        }} required />
                    </div>

                    <div style={{ width: 800, height: 30 }}>
                        <label htmlFor="DOB">Date of Birth:</label>
                        <input type="date" id="DOB" name="DOB" onChange={(e) => {
                            setDOB(e.target.value);
                        }} required />
                    </div>
                    <button>Check In</button>
                    <button onClick={goHome}>Go Home</button>
                </form>
            </div>
        </div >
    );
}

export default CheckIn;