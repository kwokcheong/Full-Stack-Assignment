const { Teachers } = require('../models');

const showTeachers = async (req, res) => {
  try {
    const listOfTeachers = await Teachers.findAll();

    const formattedResponse = listOfTeachers.map((teacher) => {
      return {
        id: String(teacher.id),
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

const editTeachers = async (req, res) => {
  try {
    const teacher = await Teachers.findOne({ where: { id: req.params.id } });

    teacher.set({
      name: req.body.name,
      subject: req.body.subject,
      email: req.body.email,
      contactNumber: req.body.contactNumber,
    });

    await teacher.save();
    res.status(200).json({ message: 'Teacher updated successfully' });
  } catch (err) {
    console.log(err);
  }
};

const getTeacher = async (req, res) => {
  try {
    const teacher = await Teachers.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ['id'] },
    });

    res.send({ data: teacher });
  } catch {
    console.log(err);
  }
};

const insertTeachers = async (req, res) => {
  const nameRegex = /[a-zA-Z]+/;
  const contactNoRegex = /^[1-9]\d*$/;
  const emailRegex =
    /^[-!#$%&'*+0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+0-9=?A-Z^_a-z`{|}~]){0,63}@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z][a-zA-Z0-9-]{0,22}[a-zA-Z0-9]$/;
  if (!emailRegex.test(req.body.email)) {
    res.status(400).json({ error: 'This is not a valid Email.' });
    return;
  } else if (!contactNoRegex.test(req.body.contactNumber)) {
    res.status(400).json({ error: 'This work contact number is invalid.' });
  } else if (!nameRegex.test(req.body.name)) {
    res
      .status(400)
      .json({ error: 'This name should at least have an alphabet' });
  } else {
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
  }
};

module.exports = {
  showTeachers,
  insertTeachers,
  editTeachers,
  getTeacher,
};
