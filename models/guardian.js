const Guardian = function (sequelize, DataTypes) {
  return sequelize.define("guardian", {
    guardian_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: true },
    phone_number: { type: DataTypes.INTEGER, allowNull: true },
    
    
  });
};
module.exports = Guardian;