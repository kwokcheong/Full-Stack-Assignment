const express = require('express');
const {
  showClasses,
  insertClasses,
} = require('../controllers/ClassesController');
const {
  showTeachers,
  insertTeachers,
} = require('../controllers/TeachersController');

const router = express.Router();

// Routes for Teachers
router.get('/teachers', showTeachers);
router.post('/teachers', insertTeachers);

// Routes for Classes
router.get('/classes', showClasses);
router.post('/classes', insertClasses);

module.exports = router;
