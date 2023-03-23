module.exports = (sequelize, DataTypes) => {
    const Classes = sequelize.define("Classes", {
       level: {
           type: DataTypes.STRING,
           allowNull: false,
       },
       name: {
           type: DataTypes.STRING,
           allowNull: false,
       }
    })

    return Classes;
}