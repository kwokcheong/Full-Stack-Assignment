const { Teachers } = require('../models');

const showTeachers = async (req, res) => {
  const listOfTeachers = await Teachers.findAll();
  res.send(listOfTeachers);
};

const insertTeachers = async (req, res) => {
  let teacherInfo = req.body;

  await Teachers.create(teacherInfo);
  res.json(teacherInfo);
};

module.exports = {
  showTeachers,
  insertTeachers,
};
