const Notice = function (sequelize, DataTypes) {
  return sequelize.define("notice", {
    notice_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: true },
    filePath: { type: DataTypes.STRING, allowNull: true }
  });
};
module.exports = Notice;
