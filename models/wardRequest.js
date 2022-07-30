const WardRequest = function (sequelize, DataTypes) {
  return sequelize.define("ward_request", {
    ward_request_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    is_accepted: { type: DataTypes.BOOLEAN, defaultValue: false }
  });
};

module.exports = WardRequest;
