const Guardian = function (sequelize, DataTypes) {
  return sequelize.define("guardian", {
    guardian_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: { type: DataTypes.STRING, allowNull: false },
    phone_number: { type: DataTypes.BIGINT, allowNull: true }
  });
};
module.exports = Guardian;
