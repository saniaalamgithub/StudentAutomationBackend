const Course = function (sequelize, DataTypes) {
  return sequelize.define("course", {
    course_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    credit: { type: DataTypes.INTEGER, allowNull: false },
    serial: { type: DataTypes.INTEGER, allowNull: false },
    is_offered: { type: DataTypes.BOOLEAN, defaultValue: false },
  });
};

module.exports = Course;
