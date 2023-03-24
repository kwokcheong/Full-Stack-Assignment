const express = require('express');
const {
  showTeachers,
  insertTeachers,
} = require('../controllers/TeachersController');
const router = express.Router();

router.get('/teachers', showTeachers);
router.post('/teachers', insertTeachers);

module.exports = router;
