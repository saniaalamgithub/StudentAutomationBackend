const Student = function (sequelize, DataTypes) {
  return sequelize.define("student", {
    student_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: { type: DataTypes.STRING, allowNull: false },
    filePath: { type: DataTypes.STRING, allowNull: true },
    university_student_id: { type: DataTypes.INTEGER, allowNull: false },
    phone_number: { type: DataTypes.BIGINT, allowNull: true }
  });
};

module.exports = Student;
