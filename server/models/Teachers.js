module.exports = (sequelize, DataTypes) => {
  const Teachers = sequelize.define(
    'Teachers',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Teacher name cannot be empty',
          },
        },
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Teacher subject cannot be empty',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: 'Teacher email cannot be empty',
          },
        },
      },
      contactNumber: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Teacher contact cannot be empty',
          },
        },
      },
    },
    {
      timestamps: false,
    }
  );

  Teachers.associate = (models) => {
    Teachers.hasOne(models.Classes, {
      onDelete: 'cascade',
    });
  };

  return Teachers;
};
