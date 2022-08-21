const Message = function (sequelize, DataTypes) {
  return sequelize.define("message", {
    message_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    content: { type: DataTypes.STRING, allowNull: false },
    filePath: { type: DataTypes.STRING, allowNull: true }
  });
};
module.exports = Message;
