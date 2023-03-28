const { Classes, Teachers } = require('../models');

/*ShowClasses equivalent SQL Query:
```
SELECT cl.level, cl.name, tch.name as formTeacher FROM Classes cl 
INNER JOIN Teachers tch ON cl.TeacherId = tch.id;
...or...
SELECT cl.level, cl.name, tch.name as formTeacher FROM Classes cl, Teachers tch
WHERE cl.TeacherId = tch.id;
```*/

const showClasses = async (req, res) => {
  try {
    const listOfClasses = await Classes.findAll({
      include: [
        {
          model: Teachers,
          as: 'Teacher',
          attributes: ['name'],
        },
      ],
    });

    const formattedResponse = listOfClasses.map((val) => {
      return {
        level: String(val.level),
        name: String(val.name),
        formTeacher: { name: String(val.Teacher.name) },
      };
    });

    res.json({ data: formattedResponse });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const insertClasses = async (req, res) => {
  const { level, name, teacherEmail } = req.body;

  try {
    const teacher = await Teachers.findOne({
      where: {
        email: teacherEmail,
      },
    });
    if (!teacher) {
      res.status(400).json({ error: 'Teacher email not found' });
    } else {
      const classInfo = {
        level: level,
        name: name,
        TeacherId: teacher.id,
      };

      await Classes.create(classInfo);
      res.status(201).json({ message: 'Class created successfully' });
    }
  } catch (err) {
    const error = err.errors ? err.errors[0].message : 'Server Error';
    res.status(400).json({ error: error });
  }
};

module.exports = {
  showClasses,
  insertClasses,
};
