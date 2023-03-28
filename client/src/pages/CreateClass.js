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
    teacherEmail: '',
  };

  const classLevelList = [
    'Primary 1',
    'Primary 2',
    'Primary 3',
    'Primary 4',
    'Primary 5',
    'Primary 6',
  ];

  const [formValues, setFormValues] = useState(initialValues);
  const [teacherList, setTeacherList] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get('http://localhost:3001/api/teachers').then((response) => {
      const teacherRecord = response.data;
      setTeacherList(teacherRecord.data);
    });

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      Axios.post('http://localhost:3001/api/classes', formValues).then(() => {
        navigate('/viewClass');
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
      errors.level = 'Level is required!';
    }
    if (!values.name) {
      errors.name = 'Class Name is required!';
    }
    if (!values.teacherEmail) {
      errors.teacherEmail = 'Teacher is required!';
    }
    return errors;
  };

  return (
    <CustomCard
      title="Add Class"
      handleClick={handleSubmit}
      showSubmitButton={true}
      modelName="class"
    >
      <pre>{JSON.stringify(formValues)}</pre>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Class Level</Form.Label>
          <Form.Select
            size="lg"
            name="level"
            onChange={handleChange}
            isInvalid={formErrors.level}
            id="custom-validation"
          >
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
            size="lg"
            placeholder="Class Name"
            name="name"
            onChange={handleChange}
            isInvalid={formErrors.name}
            id="custom-validation"
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.name}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Form Teacher</Form.Label>
          <Form.Select
            size="lg"
            name="teacherEmail"
            onChange={handleChange}
            isInvalid={formErrors.teacherEmail}
            id="custom-validation"
          >
            <option value="" disabled selected hidden>
              Assign a form teacher
            </option>
            {teacherList.length > 0 ? (
              teacherList.map((val) => {
                return <option value={val.email}>{val.name}</option>;
              })
            ) : (
              <option value="">NO TEACHER U GOOTA ADD</option>
            )}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {formErrors.teacherEmail}
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
    </CustomCard>
  );
}

export default CreateClass;
