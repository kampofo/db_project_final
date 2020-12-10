import React, { useState } from 'react';
import Axios from "axios";
import Select from 'react-select'
import './pretty.css'
import desktopImage from './back.png'


function Schedule() {


    const options = [
        { value: 'Cardiologist', label: 'Cardiologist' },
        { value: 'Endocrinologist', label: 'Endocrinologist' },
        { value: 'Neurologist', label: 'Neurologist' }
    ]
    const [Category, setCategory] = useState("");
    const [Message, setMessage] = useState("");
    const [Fname, setFname] = useState("");
    const [Lname, setLname] = useState("");
    const [DOB, setDOB] = useState("");
    const [Date, setDate] = useState("");
    const [Time, setTime] = useState("");
    const [Status, setStatus] = useState("Absent");

    const submitReservation = () => {
        console.log(Message)
        
        Axios.post("http://localhost:3001/api/log", {
            Fname: Fname,
            Lname: Lname,
            DOB: DOB,
        }).then(() => {
            alert("Patient logged.");
        });

        Axios.post("http://localhost:3001/api/localize", {
            Fname: Fname,
            Lname: Lname,
            Time: Time,
            Message: Message,
            Category: Category
        }).then(() => {
            alert("Localized.");
        });

        Axios.post("http://localhost:3001/api/insert", {
            Fname: Fname,
            Lname: Lname,
            DOB: DOB,
            Date: Date,
            Time: Time,
            Status: Status,
            Category: Category['value'],
        }).then(() => {
            alert("Reservation has been created successfully.");
        });

    }

    const goHome = () => {
        window.location.pathname = "/";
      };

    const divStyle = {
  width: '100%',
  height: '800px',
  backgroundImage: `url(${desktopImage})`,
  backgroundSize: 'cover',
};

    return (
        <div style={divStyle}>
            <div style={{display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center'}}>
            <form onSubmit={submitReservation}>
            <h1>Create Your Reservation.</h1>
                <div style={{width:800, height:30}}>
                    <label htmlFor="Fame"></label>
                    <input type="text" id="Fname" name="Fname" placeholder="First Name" onChange={(e) => {
                        setFname(e.target.value);
                    }} required />
                </div>
                <div style={{width:800, height:30}}>
                    <label htmlFor="Lname"></label>
                    <input type="text" id="Lname" name="Lname" placeholder="Last Name" onChange={(e) => {
                        setLname(e.target.value);
                    }} required />
                </div>
                <div style={{width:800, height:30}}>
                    <label htmlFor="DOB">Date of Birth: </label>
                    <input type="date" id="DOB" name="DOB" onChange={(e) => {
                        setDOB(e.target.value);
                    }} required />
                </div>
                <div style={{width:800, height:30}}>
                    <label htmlFor="Date">Select your appointment date: </label>
                    <input type="date" id="Date" name="Date" onChange={(e) => {
                        setDate(e.target.value);
                    }} />
                </div>
                <div style={{width:800, height:30}}>
                    <label htmlFor="Time">Select your appointment time: </label>
                    <input type="time" id="Time" name="Time" onChange={(e) => {
                        setTime(e.target.value);
                    }}
                        min="09:00" max="18:00"></input>
                </div>
                <div style={{width:800, height:50}}>
                    <Select options={options} onChange={(values) => setCategory(values)} />    
                </div>
                <div style={{width:800, height:30}}>
                    <label></label>
                    <input type="textarea" 
                    placeholder="Reason for Visit"
                    onChange={(values) => setMessage(values)}
                    />
                </div>
                <button>Create Reservation</button>
                <button onClick={goHome}>Go Home</button>
            </form>
            </div>
        </div >
        
    );
}

export default Schedule;