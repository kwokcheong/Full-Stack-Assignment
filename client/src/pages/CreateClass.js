import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
import CustomCard from './CustomCard';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';

function CreateClass() {
  const initialValues = {
    level: '',
    name: '',
    TeacherId: '',
  };

  const classLevelList = [
    'Primary1',
    'Primary2',
    'Primary3',
    'Primary4',
    'Primary5',
    'Primary6',
  ];

  const [formValues, setFormValues] = useState(initialValues);
  const [teacherList, setTeacherList] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get('http://localhost:3001/api/teachers').then((response) => {
      setTeacherList(response.data);
    });

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      Axios.post('http://localhost:3001/api/classes', formValues).then(() => {
        setIsSubmit(false);
        console.log('New teacher inserted');
        navigate('/viewClasses');
      });
    }
  }, [formErrors, formValues, isSubmit, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //Prevents default reloading
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.level) {
      errors.name = 'Level is required!';
    }
    if (!values.name) {
      errors.email = 'Class Name is required!';
    }
    if (!values.TeacherId) {
      errors.email = 'Teacher is required!';
    }
    return errors;
  };

  return (
    <CustomCard
      title="Add Class"
      handleClick={handleSubmit}
      showSubmitButton={true}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Class Level</Form.Label>
          <Form.Select size="lg" name="level" onChange={handleChange}>
            <option value="" disabled selected hidden>
              Select a level
            </option>
            {classLevelList.map((val) => {
              return <option value={val}>{val}</option>;
            })}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {formErrors.level}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Class Name</Form.Label>
          <Form.Control
            type="select"
            size="lg"
            placeholder="Class Name"
            name="name"
            onChange={handleChange}
          />
          <p className="errorText">{formErrors.name}</p>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Form Teacher</Form.Label>
          <Form.Select size="lg" name="TeacherId" onChange={handleChange}>
            <option value="" disabled selected hidden>
              Assign a form teacher
            </option>
            {teacherList.map((val) => {
              return <option value={val.id}>{val.name}</option>;
            })}
          </Form.Select>
          <p className="errorText">{formErrors.TeacherId}</p>
        </Form.Group>
      </Form>
    </CustomCard>
  );
}

export default CreateClass;
