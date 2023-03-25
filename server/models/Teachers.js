module.exports = (sequelize, DataTypes) => {
  const Teachers = sequelize.define(
    'Teachers',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      contactNumber: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
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
