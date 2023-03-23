const db = require('../db');

const showTeachers = (req, res) => {
    const sqlGet = `SELECT * FROM teachers`;
    db.query(sqlGet, (error, result) => {
        res.send(result)
    });
}

const insertTeachers = (req, res) => {
    let data = [ 
        req.body.name, 
        req.body.subjectName, 
        req.body.email, 
        req.body.work_contact 
    ];

    const sqlInsert = "INSERT INTO teachers (name, subjectName, email, work_contact) VALUES (?,?,?,?);"

    db.query(sqlInsert, data, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error inserting teacher');
        } else {
            res.send('Teacher added');
        }
    });
}


module.exports =  {
    showTeachers,
    insertTeachers
};