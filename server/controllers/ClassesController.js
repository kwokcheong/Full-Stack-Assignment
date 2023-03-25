const e = require('cors');
const { Classes, Teachers } = require('../models');

/*
ShowClasses equivalent SQL Query:
```
SELECT cl.level, cl.name, tch.name as formTeacher FROM Classes cl 
INNER JOIN Teachers tch ON cl.TeacherId = tch.id;
...or...
SELECT cl.level, cl.name, tch.name as formTeacher FROM Classes cl, Teachers tch
WHERE cl.TeacherId = tch.id;
```
*/
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

    const formattedClassesJson = listOfClasses.map((val) => {
      return {
        level: val.level,
        name: val.name,
        formTeacher: { name: val.Teacher.name },
      };
    });

    res.json({ data: formattedClassesJson });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const insertClasses = async (req, res) => {
  const { level, name, formTeacher } = req.body;

  try {
    const teacher = await Teachers.findOne({
      where: {
        email: formTeacher,
      },
    });
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    } else {
      const classInfo = {
        level: level,
        name: name,
        TeacherId: teacher.id,
      };

      await Classes.create(classInfo);
      res.json(classInfo);
    }
  } catch {
    res.status(500).json({ error: 'Error creating class' });
  }
};

module.exports = {
  showClasses,
  insertClasses,
};
