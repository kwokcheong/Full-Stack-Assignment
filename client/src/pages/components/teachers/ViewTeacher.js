import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../../../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import CustomCard from '../CustomCard';
import Button from 'react-bootstrap/Button';
import { Plus } from 'react-bootstrap-icons';

function ViewTeacher() {
  const [teacherList, setTeacherList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const response = await Axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/teachers`
        );
        const record = response.data;
        setTeacherList(record.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeacherData();
  }, []);

  const handleAddTeacherClick = () => {
    navigate('/createTeacher');
  };

  const shouldShowAddButton = (teacherList) => {
    return teacherList.length > 0;
  };

  const showAddButton = shouldShowAddButton(teacherList);

  return (
    <CustomCard
      title="Teachers"
      handleClick={handleAddTeacherClick}
      showAddButton={showAddButton}
      modelName="teacher"
    >
      {isLoading ? (
        <div>Loading...</div>
      ) : teacherList.length > 0 ? (
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
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{val.name}</td>
                  <td>{val.subject}</td>
                  <td>{val.email}</td>
                  <td>{val.contactNumber}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <div
          className="container d-flex flex-column align-items-center"
          style={{ justifyContent: 'center', minHeight: '65vh' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <b>There are no existing teachers yet.</b>
          </div>
          <Button
            variant="primary"
            style={{ marginTop: '20px', backgroundColor: '#135BB4' }}
            onClick={handleAddTeacherClick}
          >
            <Plus
              size={20}
              style={{ marginBottom: '2px', marginRight: '5px' }}
            />
            Add Teachers
          </Button>
        </div>
      )}
    </CustomCard>
  );
}

export default ViewTeacher;
