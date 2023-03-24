import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

function CreateTeacher() {
  const initialValues = {
    name: '',
    subjectName: '',
    email: '',
    work_contact: '',
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      Axios.post('http://localhost:3001/teachers/insert', formValues).then(
        () => {
          setIsSubmit(false);
          console.log('New teacher inserted');
          navigate('/');
        }
      );
    }
  }, [formErrors, formValues, isSubmit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!values.name) {
      errors.name = 'Name is required!';
    }
    if (!values.email) {
      errors.email = 'Email is required!';
    } else if (!emailRegex.test(values.email)) {
      errors.email = 'This is not a valid Email!';
    }
    if (!values.subjectName) {
      errors.subjectName = 'SubjectName is required!';
    }
    if (!values.work_contact) {
      errors.work_contact = 'Work Contact Number is required!';
    } else if (values.work_contact.toString().length < 8) {
      errors.work_contact = 'Work Contact Number must be more than 8 digits';
    } else if (values.work_contact.toString().length > 10) {
      errors.work_contact = 'Work Contact Number must be less than 10 digits';
    }
    return errors;
  };

  return (
    <div className="container" style={{ maxWidth: '95%' }}>
      <h2
        style={{
          textAlign: 'left',
          fontSize: '25px',
          fontWeight: 'bold',
          paddingTop: '25px',
          paddingBottom: '25px',
        }}
      >
        Add Teacher
      </h2>
      <Card
        style={{
          boxShadow: '0px 1px 2px 1px rgba(152, 152, 152, 0.2)',
        }}
      >
        <div style={{ maxWidth: '40%' }}>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  size="lg"
                  placeholder="Name"
                  name="name"
                  onChange={handleChange}
                />
                <p className="errorText">{formErrors.name}</p>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="select"
                  size="lg"
                  placeholder="Select a subject"
                  name="subjectName"
                  onChange={handleChange}
                />
                <p className="errorText">{formErrors.subjectName}</p>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  size="lg"
                  placeholder="Email address"
                  name="email"
                  onChange={handleChange}
                />
                <p className="errorText">{formErrors.email}</p>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Work Contact Number</Form.Label>
                <Form.Control
                  type="number"
                  size="lg"
                  placeholder="Work contact number"
                  name="work_contact"
                  onChange={handleChange}
                />
                <p className="errorText">{formErrors.work_contact}</p>
              </Form.Group>
            </Form>
          </Card.Body>
        </div>
      </Card>
      <Button
        variant="primary"
        className="float-end"
        style={{ margin: '15px', backgroundColor: '#135BB4' }}
        onClick={handleSubmit}
      >
        Add Teacher
      </Button>
    </div>
  );
}

export default CreateTeacher;
