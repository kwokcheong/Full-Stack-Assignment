import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import CustomCard from './CustomCard';

function CreateTeacher() {
  const initialValues = {
    name: '',
    subject: '',
    email: '',
    contactNumber: '',
  };

  const mainSubjectList = [
    'English Language',
    'Mother Tongue Language',
    'Mathematics',
    'Science',
    'Art',
    'Music',
    'Physical Education',
    'Social Studies',
    'Character and Citizenship Education',
  ];

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [teacherList, setTeacherList] = useState({});
  const [isSubjectPlaceholder, setIsSubjectPlaceholder] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_BASE_URL}/api/teachers`).then(
      (response) => {
        const record = response.data;
        setTeacherList(record.data);
      }
    );
  }, []);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      Axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/teachers`,
        formValues
      ).then(() => {
        navigate('/viewTeacher');
      });
    }
  }, [formErrors, formValues, isSubmit, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'subject' && value !== '') {
      setIsSubjectPlaceholder(false);
    } else if (name === 'subject' && value === '') {
      setIsSubjectPlaceholder(true);
    }
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const nameExists = (name) => {
    return teacherList.some((teacher) => teacher.name === name);
  };

  const emailExists = (email) => {
    return teacherList.some((teacher) => teacher.email === email);
  };

  const validate = (values) => {
    const errors = {};
    const contactNoRegex = /^[1-9]\d*$/;
    const emailRegex =
      /^[-!#$%&'*+0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+0-9=?A-Z^_a-z`{|}~]){0,63}@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z][a-zA-Z0-9-]{0,22}[a-zA-Z0-9]$/;
    if (!values.name) {
      errors.name = 'Name is required.';
    } else if (nameExists(values.name)) {
      errors.name = 'This name already exists.';
    }
    if (!values.email) {
      errors.email = 'Email is required.';
    } else if (emailExists(values.email)) {
      errors.email = 'This email already exists.';
    } else if (!emailRegex.test(values.email)) {
      errors.email = 'This is not a valid Email.';
    }
    if (!values.subject) {
      errors.subject = 'Subject is required.';
    }
    if (!values.contactNumber) {
      errors.contactNumber = 'Work Contact Number is required.';
    } else if (values.contactNumber.toString().length < 8) {
      errors.contactNumber =
        'This Work Contact Number must be more than 8 digits.';
    } else if (values.contactNumber.toString().length > 10) {
      errors.contactNumber =
        'This Work Contact Number must be less than 10 digits.';
    } else if (!contactNoRegex.test(values.contactNumber)) {
      errors.contactNumber = 'This Work Contact Number is invalid.';
    }
    return errors;
  };

  return (
    <CustomCard
      title="Add Teacher"
      handleClick={handleSubmit}
      showSubmitButton={true}
      modelName="teacher"
    >
      <Form onSubmit={handleSubmit} className="custom-width">
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            size="lg"
            placeholder="Name"
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
          <Form.Label>Subject</Form.Label>
          <Form.Select
            size="lg"
            name="subject"
            onChange={handleChange}
            isInvalid={formErrors.subject}
            id={
              isSubjectPlaceholder
                ? 'custom-validation-placeholder'
                : 'custom-validation'
            }
          >
            <option value="" disabled selected hidden>
              Select a Subject
            </option>
            {mainSubjectList.map((val, i) => {
              return (
                <option key={i} value={val}>
                  {val}
                </option>
              );
            })}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {formErrors.subject}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            size="lg"
            placeholder="Email address"
            name="email"
            onChange={handleChange}
            isInvalid={formErrors.email}
            id="custom-validation"
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Work Contact Number</Form.Label>
          <Form.Control
            type="text"
            size="lg"
            placeholder="Work contact number"
            name="contactNumber"
            onChange={handleChange}
            isInvalid={formErrors.contactNumber}
            id="custom-validation"
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.contactNumber}
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
    </CustomCard>
  );
}

export default CreateTeacher;
