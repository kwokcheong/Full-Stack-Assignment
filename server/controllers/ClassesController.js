const { Classes } = require('../models');

const showClasses = async (req, res) => {
  const listOfClasses = await Classes.findAll();
  res.send(listOfClasses);
};

const insertClasses = async (req, res) => {
  let classInfo = req.body;

  await Classes.create(classInfo);
  res.json(classInfo);
};

module.exports = {
  showClasses,
  insertClasses,
};
