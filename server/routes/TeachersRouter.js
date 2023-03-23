const express = require('express');
const {showTeachers, insertTeachers } = require('../controllers/TeachersController');
const router = express.Router();

router.get("/show", showTeachers);
router.post("/insert", insertTeachers);

module.exports = router;
