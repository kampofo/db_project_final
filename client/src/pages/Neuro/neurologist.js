import React from 'react';
import { useInput, useState, useEffect, useMemo } from "react";
import Axios from "axios";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import DataGrid from 'react-data-grid';
import 'react-data-grid/dist/react-data-grid.css';



function Neurologist() {

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [patientsList, setPatientsList] = useState([]);
  const [type, setType] = useState("");

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("https://dbms-project-final.herokuapp.com/api/login").then((response) => {
      if (response.data.loggedIn == true) {
        setType(response.data.user[0].Category);
      }
    });
  }, []);

  useEffect(() => {
    Axios.get("https://dbms-project-final.herokuapp.com/api/patients/neuro").then((response) => {
      setPatientsList(response.data)
    })
  }, []);


  const hidePatients = () => {
    setPatientsList([]);
  };

  const handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  }

  const columns = [
    { key: 'Fname', name: 'First Name' },
    { key: 'Lname', name: 'Last Name' },
    { key: 'Date', name: 'Date' },
    { key: 'Time', name: 'Time' },
    { key: 'DOB', name: 'DOB' },
    { key: 'Status', name: 'Status' },
    { key: 'Category', name: 'Category' },

  ];

  const goHome = () => {
    window.location.pathname = "/";
  };
  
  return (
    <div>
       <div>
        <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>Welcome Neurologist!</h1>
        <DataGrid className='rdg-light'
          columns={columns}
          rows={patientsList}
        />
        <button onClick={goHome}>Go Home</button>
      </div> 
    </div>
  );
}

export default Neurologist;