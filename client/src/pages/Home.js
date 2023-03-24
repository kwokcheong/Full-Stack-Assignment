import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

function Home() {
  // const submit = () => {
  //     const newTeacher = {
  //       name: name,
  //       subjectName: subjectName,
  //       email: email,
  //       work_contact: work_contact,
  //     };
  //     setTeacherList([...teacherList, newTeacher]);

  //     Axios.post('http://localhost:3001/teachers/insert', newTeacher).then(() => {
  //       console.log('New teacher inserted');
  //     });
  //   };

  return <h1> HOMEE</h1>;
  {
    /* {teacherList
        ? teacherList.map((val) => {
            return (
              <h2 key={val.name}>
                Teacher Name: {val.name}
                Subject: {val.subjectName}
                Email: {val.email}
                Work Contact: {val.work_contact}
              </h2>
            );
          })
        : ''} */
  }
}

export default Home;
