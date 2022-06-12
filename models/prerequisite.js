const Prerequisite = function (sequelize, DataTypes) {
  return sequelize.define("prerequisite", {
    prerequisite_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    dependency_id: { type: DataTypes.INTEGER, allowNull: false },
  });
};
module.exports = Prerequisite;
