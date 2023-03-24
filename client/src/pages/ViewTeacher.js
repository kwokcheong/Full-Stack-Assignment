import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import CustomCard from './CustomCard';
import Button from 'react-bootstrap/Button';

function ViewTeacher() {
  const [teacherList, setTeacherList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get('http://localhost:3001/api/teachers').then((response) => {
      setTeacherList(response.data);
    });
  }, []);

  const handleAddTeacherClick = () => {
    navigate('/createTeacher');
  };

  return (
    <CustomCard
      title="Teachers"
      handleClick={handleAddTeacherClick}
      showAddButton={true}
    >
      {teacherList.length > 0 ? (
        <Table style={{ tableLayout: 'fixed' }}>
          <thead style={{ backgroundColor: 'rgba(182, 182, 182, 0.2)' }}>
            <tr>
              <th style={{ width: '10%' }}>#</th>
              <th style={{ width: '20%' }}>Name</th>
              <th style={{ width: '25%' }}>Subject</th>
              <th style={{ width: '25%' }}>Email</th>
              <th style={{ width: '20%' }}>Work Contact</th>
            </tr>
          </thead>
          <tbody>
            {teacherList.map((val, i) => {
              return (
                <tr key={val.id}>
                  <td>{i + 1}</td>
                  <td>{val.name}</td>
                  <td>{val.subjectName}</td>
                  <td>{val.email}</td>
                  <td>{val.work_contact}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <div>
          No teachers found
          <Button
            variant="primary"
            className="float-end"
            style={{ marginTop: '20px', backgroundColor: '#135BB4' }}
            onClick={handleAddTeacherClick}
          >
            + Add Teacher
          </Button>
        </div>
      )}
    </CustomCard>
  );
}

export default ViewTeacher;
