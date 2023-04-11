const express = require('express');
const {
  showClasses,
  insertClasses,
} = require('../controllers/ClassesController');
const {
  showTeachers,
  insertTeachers,
  editTeachers,
  getTeacher,
} = require('../controllers/TeachersController');

const router = express.Router();

// Routes for Teachers
router.get('/teachers', showTeachers);
router.post('/teachers', insertTeachers);
router.put('/teachers/:id', editTeachers);
router.get('/teachers/:id', getTeacher);

// Routes for Classes
router.get('/classes', showClasses);
router.post('/classes', insertClasses);

module.exports = router;
