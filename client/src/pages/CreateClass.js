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
      Axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/classes`,
        formValues
      ).then(() => {
        navigate('/viewClass');
      });
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
          <Form.Select
            size="lg"
            name="level"
            onChange={handleChange}
            isInvalid={formErrors.level}
            id={
              isLevelPlaceholder
                ? 'custom-validation-placeholder'
                : 'custom-validation'
            }
          >
            <option value="" disabled selected hidden>
              Select a class level
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
            id={
              isTeacherPlaceholder
                ? 'custom-validation-placeholder'
                : 'custom-validation'
            }
          >
            <option value="" disabled selected hidden>
              Assign a form teacher
            </option>
            {teacherList.length > 0 ? (
              teacherList.map((val) => {
                return <option value={val.email}>{val.name}</option>;
              })
            ) : (
              <option value="">No existing teachers.</option>
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
