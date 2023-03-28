module.exports = (sequelize, DataTypes) => {
  const Classes = sequelize.define(
    'Classes',
    {
      level: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Class level cannot be empty',
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: 'Class name cannot be empty',
          },
        },
      },
    },
    {
      timestamps: false,
    }
  );

  Classes.associate = (models) => {
    Classes.belongsTo(models.Teachers, {
      foreignKey: {
        allowNull: false,
        unique: true,
      },
      as: 'Teacher',
    });
  };

  return Classes;
};
