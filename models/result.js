const Result = function (sequelize, DataTypes) {
  return sequelize.define("result", {
    result_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    grade: { type: DataTypes.FLOAT, allowNull: false }
  });
};

module.exports = Result;
