import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import CustomCard from './CustomCard';
import Button from 'react-bootstrap/Button';

function ViewClass() {
  const [classList, setClassList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get('http://localhost:3001/api/classes').then((response) => {
      setClassList(response.data);
    });
  }, []);

  const handleAddClassesClick = () => {
    navigate('/createClass');
  };

  return (
    <CustomCard
      title="Classes"
      handleClick={handleAddClassesClick}
      showAddButton={true}
    >
      {classList.length > 0 ? (
        <Table style={{ tableLayout: 'fixed' }}>
          <thead style={{ backgroundColor: 'rgba(182, 182, 182, 0.2)' }}>
            <tr>
              <th style={{ width: '10%' }}>#</th>
              <th style={{ width: '20%' }}>Class Level</th>
              <th style={{ width: '25%' }}>Class Name</th>
              <th style={{ width: '25%' }}>Form Teacher</th>
            </tr>
          </thead>
          <tbody>
            {classList.map((val, i) => {
              return (
                <tr key={val.id}>
                  <td>{i + 1}</td>
                  <td>{val.level}</td>
                  <td>{val.name}</td>
                  <td>{val.TeacherId}</td>
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
            onClick={handleAddClassesClick}
          >
            + Add Teacher
          </Button>
        </div>
      )}
    </CustomCard>
  );
}

export default ViewClass;
