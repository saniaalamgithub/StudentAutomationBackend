const Semester = function (sequelize, DataTypes) {
  return sequelize.define("semester", {
    semester_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.ENUM("FALL", "SPRING", "SUMMER"),
      allowNull: false
    },
    year: { type: DataTypes.STRING, allowNull: false }
  });
};

module.exports = Semester;
