import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import CustomCard from './CustomCard';
import {
  FormControl,
  FormHelperText,
  OutlinedInput,
  Select,
  MenuItem,
} from '@mui/material';

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
    } else if (values.name.length > 200) {
      errors.name = 'Name is too long.';
    }
    if (!values.email) {
      errors.email = 'Email is required.';
    } else if (emailExists(values.email)) {
      errors.email = 'This email already exists.';
    } else if (!emailRegex.test(values.email)) {
      errors.email = 'This is not a valid Email.';
    } else if (values.email.length > 200) {
      errors.name = 'Email is too long.';
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
      errors.contactNumber = 'This work contact number is invalid.';
    }
    return errors;
  };

  // For Material UI Dropdown
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
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
          <FormControl fullWidth error={formErrors.name}>
            <OutlinedInput
              type="name"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              error={formErrors.name}
            />
          </FormControl>
          {formErrors.name && (
            <FormHelperText style={{ marginLeft: '0px', color: 'red' }}>
              {formErrors.name}
            </FormHelperText>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Subject</Form.Label>
          <FormControl fullWidth error={formErrors.subject}>
            <Select
              size="lg"
              name="subject"
              MenuProps={MenuProps}
              value={formValues.subject}
              onChange={handleChange}
              error={formErrors.subject}
              id={
                isSubjectPlaceholder
                  ? 'custom-validation-placeholder'
                  : 'custom-validation'
              }
              displayEmpty
            >
              <MenuItem value="" disabled hidden>
                Select a Subject
              </MenuItem>
              {mainSubjectList.map((val) => {
                return (
                  <MenuItem key={val} value={val}>
                    {val}
                  </MenuItem>
                );
              })}
            </Select>
            {formErrors.subject && (
              <FormHelperText style={{ marginLeft: '0px', color: 'red' }}>
                {formErrors.subject}
              </FormHelperText>
            )}
          </FormControl>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <FormControl fullWidth error={formErrors.email}>
            <OutlinedInput
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              error={formErrors.email}
            />
          </FormControl>
          {formErrors.email && (
            <FormHelperText style={{ marginLeft: '0px', color: 'red' }}>
              {formErrors.email}
            </FormHelperText>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Work Contact Number</Form.Label>
          <FormControl fullWidth error={formErrors.contactNumber}>
            <OutlinedInput
              type="text"
              name="contactNumber"
              placeholder="Work contact number"
              onChange={handleChange}
              error={formErrors.contactNumber}
            />
          </FormControl>
          {formErrors.contactNumber && (
            <FormHelperText style={{ marginLeft: '0px', color: 'red' }}>
              {formErrors.contactNumber}
            </FormHelperText>
          )}
        </Form.Group>
      </Form>
    </CustomCard>
  );
}

export default CreateTeacher;
