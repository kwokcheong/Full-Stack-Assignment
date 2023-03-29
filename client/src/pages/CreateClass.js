import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
import CustomCard from './CustomCard';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  FormHelperText,
  OutlinedInput,
  Select,
  MenuItem,
} from '@mui/material';

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
  const [classList, setClassList] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLevelPlaceholder, setIsLevelPlaceholder] = useState(true);
  const [isTeacherPlaceholder, setIsTeacherPlaceholder] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacherList = async () => {
      try {
        const response = await Axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/teachers`
        );
        const teacherRecord = response.data;
        setTeacherList(teacherRecord.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchClassList = async () => {
      try {
        const response = await Axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/classes`
        );
        const classesRecord = response.data;
        setClassList(classesRecord.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeacherList();
    fetchClassList();
  }, []);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      try {
        Axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/classes`,
          formValues
        ).then(() => {
          navigate('/viewClass');
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [formErrors, formValues, isSubmit, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'level' && value !== '') {
      setIsLevelPlaceholder(false);
    } else if (name === 'level' && value === '') {
      setIsLevelPlaceholder(true);
    }
    if (name === 'teacherEmail' && value !== '') {
      setIsTeacherPlaceholder(false);
    } else if (name === 'teacherEmail' && value === '') {
      setIsTeacherPlaceholder(true);
    }
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //Prevents default reloading
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const WhiteSpaceRegex = /^\s|\s+$/;
  const nameRegex = /[a-zA-Z]+/;

  const validate = (values) => {
    const selectedTeacher = teacherList.find(
      (teacher) => teacher.email === values.teacherEmail
    );

    const errors = {};
    if (!values.level) {
      errors.level = 'Level is required.';
    }
    if (!values.name) {
      errors.name = 'Class name is required.';
    } else if (values.name.length > 256) {
      errors.name = 'Class name is too long.';
    } else if (WhiteSpaceRegex.test(values.name)) {
      errors.name = 'Class name is invalid';
    } else if (!nameRegex.test(values.name)) {
      errors.name = 'Class name should at least have an alphabet';
    }
    if (!values.teacherEmail) {
      errors.teacherEmail = 'Teacher is required.';
    }

    for (const record of classList) {
      if (record.name === values.name) {
        errors.name = 'This class name already exists.';
      }

      if (selectedTeacher) {
        if (record.formTeacher.name === selectedTeacher.name) {
          errors.teacherEmail =
            'This teacher has already been assigned to a class.';
        }
      }
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
      title="Add Class"
      handleClick={handleSubmit}
      showSubmitButton={true}
      modelName="class"
    >
      <Form onSubmit={handleSubmit} className="custom-width">
        <Form.Group className="mb-3">
          <Form.Label>Class Level</Form.Label>
          <FormControl fullWidth error={formErrors.level}>
            <Select
              size="lg"
              name="level"
              MenuProps={MenuProps}
              value={formValues.level}
              onChange={handleChange}
              error={formErrors.level}
              id={
                isLevelPlaceholder
                  ? 'custom-validation-placeholder'
                  : 'custom-validation'
              }
              displayEmpty
            >
              <MenuItem value="" disabled hidden>
                Select a Subject
              </MenuItem>
              {classLevelList.map((val) => {
                return (
                  <MenuItem key={val} value={val}>
                    {val}
                  </MenuItem>
                );
              })}
            </Select>
            {formErrors.level && (
              <FormHelperText style={{ marginLeft: '0px', color: 'red' }}>
                {formErrors.level}
              </FormHelperText>
            )}
          </FormControl>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Class Name</Form.Label>
          <FormControl fullWidth error={formErrors.name}>
            <OutlinedInput
              type="name"
              name="name"
              placeholder="Class Name"
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
          <Form.Label>Form Teacher</Form.Label>
          <FormControl fullWidth error={Boolean(formErrors.teacherEmail)}>
            <Select
              size="lg"
              name="teacherEmail"
              MenuProps={MenuProps}
              value={formValues.teacherEmail}
              onChange={handleChange}
              error={Boolean(formErrors.teacherEmail)}
              id={
                isTeacherPlaceholder
                  ? 'custom-validation-placeholder'
                  : 'custom-validation'
              }
              displayEmpty
            >
              <MenuItem value="" disabled hidden>
                Assign a form teacher
              </MenuItem>
              {teacherList.length > 0 ? (
                teacherList.map((val) => {
                  return (
                    <MenuItem key={val.email} value={val.email}>
                      {val.name}
                    </MenuItem>
                  );
                })
              ) : (
                <>
                  <MenuItem value="">
                    <div>
                      <p style={{ margin: '0px' }}>No existing teachers.</p>
                      <a
                        href="/createTeacher"
                        style={{
                          color: 'purple',
                          textDecoration: 'none',
                          margin: '0px',
                        }}
                      >
                        Add a teacher
                      </a>
                    </div>
                  </MenuItem>
                </>
              )}
            </Select>
            {formErrors.teacherEmail && (
              <FormHelperText style={{ marginLeft: '0px', color: 'red' }}>
                {formErrors.teacherEmail}
              </FormHelperText>
            )}
          </FormControl>
        </Form.Group>
      </Form>
    </CustomCard>
  );
}

export default CreateClass;
