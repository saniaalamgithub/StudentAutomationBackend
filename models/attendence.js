const Attendence = function (sequelize, DataTypes) {
  return sequelize.define("attendence", {
    attendence_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    is_present: { type: DataTypes.BOOLEAN, allowNull: false },
    date: { type: DataTypes.STRING, allowNull: false }
  });
};

module.exports = Attendence;
