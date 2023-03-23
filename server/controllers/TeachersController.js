const { Teachers } = require("../models")

const showTeachers = async (req, res) => {
    const listOfTeachers = await Teachers.findAll();
    res.send(listOfTeachers);
}

const insertTeachers = async (req, res) => {
    let teacher = req.body;

    await Teachers.create(teacher);
    res.json(teacher);
}

module.exports =  {
    showTeachers,
    insertTeachers
};