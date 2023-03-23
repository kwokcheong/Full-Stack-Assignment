module.exports = (sequelize, DataTypes) => {
     const Teachers = sequelize.define("Teachers", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subjectName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        work_contact: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
        },
     })

     return Teachers;
}