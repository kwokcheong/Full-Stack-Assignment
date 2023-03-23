import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [name, setName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [email, setEmail] = useState("");
  const [work_contact, setWorkContact] = useState("");
  const [teacherList, setTeacherList] = useState([]);
  
  const submit = () => {
    const newTeacher = { name: name, subjectName: subjectName, email: email, work_contact: work_contact};
    setTeacherList([...teacherList, newTeacher]);

    Axios.post("http://localhost:3001/teachers/insert", newTeacher).then(() => {
      console.log("New teacher inserted");
    });
  };

  useEffect(() => {     
    Axios.get("http://localhost:3001/teachers/show").then((response) => {
    setTeacherList(response.data);
  }) }, [])
  

  return (
    <div className="App">
      <h1> CRUD Application</h1>
      <div className="form">
        <label> Teacher Name </label>
        <input type="text" name="name" onChange={(e) => {
          setName(e.target.value);
        }}/>
        <label> Subject </label>
        <input type="text" name="subjectName" onChange={(e) => {
          setSubjectName(e.target.value);
        }}/>
        <label> Email </label>
        <input type="text" name="email" onChange={(e) => {
          setEmail(e.target.value);
        }}/>
        <label> Work Contact </label>
        <input type="number" name="work_contact" onChange={(e) => {
          setWorkContact(e.target.value)
        }}/>

        <button onClick={submit}>Submit</button>

        {teacherList? teacherList.map((val) => {
          return <h2 key={val.name}>Teacher Name: {val.name}
                     Subject: {val.subjectName}
                     Email: {val.email}
                     Work Contact: {val.work_contact}</h2>
        }) : ""}
      </div>
    </div>
  );
}

export default App;