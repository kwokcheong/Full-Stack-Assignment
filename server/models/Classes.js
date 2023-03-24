module.exports = (sequelize, DataTypes) => {
  const Classes = sequelize.define(
    'Classes',
    {
      level: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
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
      },
    });
  };

  return Classes;
};
