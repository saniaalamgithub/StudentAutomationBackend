const Department = function (sequelize, DataTypes) {
  return sequelize.define("department", {
    department_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: { type: DataTypes.STRING, allowNull: false },
    short_code: { type: DataTypes.STRING, allowNull: false }
  });
};

module.exports = Department;
