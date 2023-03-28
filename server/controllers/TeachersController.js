const { Teachers } = require('../models');

const showTeachers = async (req, res) => {
  try {
    const listOfTeachers = await Teachers.findAll({
      attributes: { exclude: ['id'] },
    });

    const formattedResponse = listOfTeachers.map((teacher) => {
      return {
        name: String(teacher.name),
        subject: String(teacher.subject),
        email: String(teacher.email),
        contactNumber: String(teacher.contactNumber),
      };
    });

    res.send({ data: formattedResponse });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const insertTeachers = async (req, res) => {
  try {
    await Teachers.create({
      name: req.body.name,
      subject: req.body.subject,
      email: req.body.email,
      contactNumber: req.body.contactNumber,
    });

    res.status(201).json({ message: 'Teacher created successfully' });
  } catch (err) {
    const error = err.errors ? err.errors[0].message : 'Server Error';
    res.status(400).json({ error: error });
  }
};

module.exports = {
  showTeachers,
  insertTeachers,
};
