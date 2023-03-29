import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import CustomCard from './CustomCard';
import Button from 'react-bootstrap/Button';
import { Plus } from 'react-bootstrap-icons';

function ViewClass() {
  const [classList, setClassList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      Axios.get(`${process.env.REACT_APP_BASE_URL}/api/classes`).then(
        (response) => {
          const record = response.data;
          setClassList(record.data);
        }
      );
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleAddClassesClick = () => {
    navigate('/createClass');
  };

  const shouldShowAddButton = (classList) => {
    return classList.length > 0;
  };

  const showAddButton = shouldShowAddButton(classList);

  return (
    <CustomCard
      title="Classes"
      handleClick={handleAddClassesClick}
      showAddButton={showAddButton}
      modelName="class"
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
                  <td>{val.formTeacher.name}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <div
          className="container d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: '65vh' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <b>There are no existing classes yet.</b>
          </div>
          <Button
            variant="primary"
            style={{ marginTop: '20px', backgroundColor: '#135BB4' }}
            onClick={handleAddClassesClick}
          >
            <Plus
              size={20}
              style={{ marginBottom: '2px', marginRight: '5px' }}
            />
            Add Classes
          </Button>
        </div>
      )}
    </CustomCard>
  );
}

export default ViewClass;
