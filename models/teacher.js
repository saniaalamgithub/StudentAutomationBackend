const Teacher = function (sequelize, DataTypes) {
  return sequelize.define("teacher", {
    teacher_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: { type: DataTypes.STRING, allowNull: false },
    filePath: { type: DataTypes.STRING, allowNull: true },
    designation: { type: DataTypes.STRING, allowNull: false },
    phone_number: { type: DataTypes.INTEGER, allowNull: true }
  });
};

module.exports = Teacher;
